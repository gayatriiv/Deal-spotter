import React from 'react';
import { Star, TrendingUp, Gift } from 'lucide-react';
import { User } from '../types';

interface PointsDisplayProps {
  user: User;
  progress: {
    current: number;
    target: number;
    percentage: number;
  };
  onViewRewards: () => void;
}

export const PointsDisplay: React.FC<PointsDisplayProps> = ({ 
  user, 
  progress, 
  onViewRewards 
}) => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-3 rounded-xl">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Your Points</h3>
            <p className="text-sm text-gray-600">Level {user.level} Spotter</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-orange-600">{user.points}</div>
          <div className="text-sm text-gray-600">points</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress to next reward
          </span>
          <span className="text-sm text-gray-600">
            {progress.current}/{progress.target}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-1">
          {progress.target - progress.current} more points to unlock rewards!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-teal-600">{user.totalPointsEarned}</div>
          <div className="text-xs text-gray-600">Total Earned</div>
        </div>
        <div className="bg-white rounded-xl p-3 text-center">
          <div className="text-lg font-bold text-green-600">{user.dailyPointsEarned}</div>
          <div className="text-xs text-gray-600">Today</div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onViewRewards}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-orange-600 hover:to-orange-700 transition-colors"
      >
        <Gift className="w-5 h-5" />
        View Rewards Store
      </button>

      {/* Points Earning Tips */}
      <div className="mt-4 p-3 bg-white rounded-xl border border-orange-200">
        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-orange-500" />
          Earn More Points
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Post verified deals: +10 points</li>
          <li>• Add photos to posts: +5 bonus</li>
          <li>• Get upvotes: +2 points each</li>
          <li>• Daily limit: 50 points</li>
        </ul>
      </div>
    </div>
  );
};