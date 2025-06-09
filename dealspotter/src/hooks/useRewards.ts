import { useState, useEffect } from 'react';
import { Reward, UserRedemption } from '../types';

const mockRewards: Reward[] = [
  {
    id: '1',
    title: '₹100 Off on Electronics',
    description: 'Get ₹100 discount on any electronics purchase above ₹1000',
    brandName: 'TechZone',
    pointsCost: 200,
    value: '₹100',
    termsAndConditions: 'Valid for 30 days from redemption. Minimum purchase ₹1000. Cannot be combined with other offers.',
    isActive: true,
    category: 'Electronics',
    contactInfo: {
      email: 'offers@techzone.com',
      whatsapp: '+91-9876543210',
      website: 'https://techzone.com/offers'
    },
    currentRedemptions: 45,
    maxRedemptions: 100,
  },
  {
    id: '2',
    title: 'Free Coffee for a Week',
    description: 'Get 7 free coffees at Campus Brew',
    brandName: 'Campus Brew',
    pointsCost: 150,
    value: '₹350',
    termsAndConditions: 'One coffee per day for 7 consecutive days. Valid only at Campus Brew locations.',
    isActive: true,
    category: 'Food & Drinks',
    contactInfo: {
      email: 'hello@campusbrew.com',
      whatsapp: '+91-9876543211',
    },
    currentRedemptions: 23,
    maxRedemptions: 50,
  },
  {
    id: '3',
    title: '30% Off Fashion Items',
    description: 'Get 30% discount on any fashion item',
    brandName: 'StyleHub',
    pointsCost: 300,
    value: 'Up to ₹500',
    termsAndConditions: 'Valid for 15 days. Maximum discount ₹500. Applicable on regular priced items only.',
    isActive: true,
    category: 'Fashion',
    contactInfo: {
      email: 'rewards@stylehub.com',
      website: 'https://stylehub.com/student-offers'
    },
    currentRedemptions: 12,
    maxRedemptions: 30,
  },
  {
    id: '4',
    title: 'Free Gym Day Pass',
    description: 'One day free access to FitZone gym facilities',
    brandName: 'FitZone',
    pointsCost: 100,
    value: '₹200',
    termsAndConditions: 'Valid for 7 days from redemption. Includes access to all equipment and group classes.',
    isActive: true,
    category: 'Sports & Fitness',
    contactInfo: {
      whatsapp: '+91-9876543212',
      website: 'https://fitzone.com'
    },
    currentRedemptions: 67,
    maxRedemptions: 100,
  },
  {
    id: '5',
    title: '₹50 BookStore Credit',
    description: 'Get ₹50 credit for any book purchase',
    brandName: 'Campus Books',
    pointsCost: 120,
    value: '₹50',
    termsAndConditions: 'Valid for 60 days. Can be used for textbooks, novels, and stationery.',
    isActive: true,
    category: 'Books & Education',
    contactInfo: {
      email: 'student@campusbooks.com',
    },
    currentRedemptions: 34,
    maxRedemptions: 75,
  },
];

export const useRewards = () => {
  const [rewards, setRewards] = useState<Reward[]>(mockRewards);
  const [userRedemptions, setUserRedemptions] = useState<UserRedemption[]>([]);

  useEffect(() => {
    const savedRedemptions = localStorage.getItem('user_redemptions');
    if (savedRedemptions) {
      try {
        const parsed = JSON.parse(savedRedemptions).map((redemption: any) => ({
          ...redemption,
          redeemedAt: new Date(redemption.redeemedAt),
          usedAt: redemption.usedAt ? new Date(redemption.usedAt) : undefined,
        }));
        setUserRedemptions(parsed);
      } catch (error) {
        console.error('Failed to load redemptions:', error);
      }
    }
  }, []);

  const redeemReward = (rewardId: string, userId: string): string | null => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || !reward.isActive) return null;
    
    if (reward.maxRedemptions && reward.currentRedemptions >= reward.maxRedemptions) {
      return null;
    }

    const redemptionCode = `${reward.brandName.toUpperCase()}-${Date.now().toString().slice(-6)}`;
    
    const newRedemption: UserRedemption = {
      id: Date.now().toString(),
      userId,
      rewardId,
      redemptionCode,
      redeemedAt: new Date(),
      isUsed: false,
    };

    const updatedRedemptions = [...userRedemptions, newRedemption];
    setUserRedemptions(updatedRedemptions);
    localStorage.setItem('user_redemptions', JSON.stringify(updatedRedemptions));

    // Update reward redemption count
    setRewards(prev => prev.map(r => 
      r.id === rewardId 
        ? { ...r, currentRedemptions: r.currentRedemptions + 1 }
        : r
    ));

    return redemptionCode;
  };

  const getUserRedemptions = (userId: string): UserRedemption[] => {
    return userRedemptions.filter(r => r.userId === userId);
  };

  const getAvailableRewards = (userPoints: number): Reward[] => {
    return rewards.filter(reward => 
      reward.isActive && 
      reward.pointsCost <= userPoints &&
      (!reward.maxRedemptions || reward.currentRedemptions < reward.maxRedemptions)
    );
  };

  const getRewardById = (rewardId: string): Reward | undefined => {
    return rewards.find(r => r.id === rewardId);
  };

  return {
    rewards,
    userRedemptions,
    redeemReward,
    getUserRedemptions,
    getAvailableRewards,
    getRewardById,
  };
};