import { useState, useEffect } from 'react';
import { PointsTransaction, User } from '../types';

const DAILY_POINTS_LIMIT = 50;
const POINTS_FOR_POST = 10;
const POINTS_FOR_UPVOTE = 2;
const POINTS_FOR_PHOTO = 5;

export const usePoints = (user: User | null) => {
  const [pointsHistory, setPointsHistory] = useState<PointsTransaction[]>([]);

  useEffect(() => {
    if (user) {
      const savedHistory = localStorage.getItem(`points_history_${user.id}`);
      if (savedHistory) {
        try {
          const parsed = JSON.parse(savedHistory).map((transaction: any) => ({
            ...transaction,
            date: new Date(transaction.date),
          }));
          setPointsHistory(parsed);
        } catch (error) {
          console.error('Failed to load points history:', error);
        }
      }
    }
  }, [user]);

  const savePointsHistory = (history: PointsTransaction[]) => {
    if (user) {
      localStorage.setItem(`points_history_${user.id}`, JSON.stringify(history));
      setPointsHistory(history);
    }
  };

  const canEarnDailyPoints = (user: User): boolean => {
    const today = new Date().toDateString();
    return user.lastPointsDate !== today || user.dailyPointsEarned < DAILY_POINTS_LIMIT;
  };

  const awardPoints = (
    points: number, 
    reason: string, 
    offerId?: string,
    updateUser?: (user: User) => void
  ): boolean => {
    if (!user || !updateUser) return false;

    const today = new Date().toDateString();
    let dailyPoints = user.lastPointsDate === today ? user.dailyPointsEarned : 0;

    if (dailyPoints + points > DAILY_POINTS_LIMIT) {
      return false; // Daily limit reached
    }

    const newTransaction: PointsTransaction = {
      id: Date.now().toString(),
      userId: user.id,
      points,
      type: 'earned',
      reason,
      offerId,
      date: new Date(),
    };

    const updatedUser: User = {
      ...user,
      points: user.points + points,
      totalPointsEarned: user.totalPointsEarned + points,
      dailyPointsEarned: dailyPoints + points,
      lastPointsDate: today,
      level: Math.floor((user.totalPointsEarned + points) / 100) + 1,
    };

    updateUser(updatedUser);
    savePointsHistory([newTransaction, ...pointsHistory]);
    
    return true;
  };

  const redeemPoints = (
    points: number, 
    reason: string, 
    rewardId: string,
    updateUser?: (user: User) => void
  ): boolean => {
    if (!user || !updateUser || user.points < points) return false;

    const newTransaction: PointsTransaction = {
      id: Date.now().toString(),
      userId: user.id,
      points: -points,
      type: 'redeemed',
      reason,
      rewardId,
      date: new Date(),
    };

    const updatedUser: User = {
      ...user,
      points: user.points - points,
    };

    updateUser(updatedUser);
    savePointsHistory([newTransaction, ...pointsHistory]);
    
    return true;
  };

  const getPointsForAction = (action: string, hasPhoto: boolean = false): number => {
    switch (action) {
      case 'post':
        return POINTS_FOR_POST + (hasPhoto ? POINTS_FOR_PHOTO : 0);
      case 'upvote':
        return POINTS_FOR_UPVOTE;
      default:
        return 0;
    }
  };

  const getNextRewardThreshold = (currentPoints: number): number => {
    const thresholds = [50, 100, 200, 500, 1000];
    return thresholds.find(threshold => threshold > currentPoints) || 2000;
  };

  const getProgressToNextReward = (currentPoints: number): { current: number; target: number; percentage: number } => {
    const target = getNextRewardThreshold(currentPoints);
    const percentage = Math.min((currentPoints / target) * 100, 100);
    
    return {
      current: currentPoints,
      target,
      percentage,
    };
  };

  return {
    pointsHistory,
    awardPoints,
    redeemPoints,
    canEarnDailyPoints,
    getPointsForAction,
    getNextRewardThreshold,
    getProgressToNextReward,
    DAILY_POINTS_LIMIT,
  };
};