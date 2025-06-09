import React, { useState } from 'react';
import { X, Gift, Star, ExternalLink, MessageCircle, Mail, Globe, Check } from 'lucide-react';
import { Reward, User, UserRedemption } from '../types';

interface RewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  rewards: Reward[];
  userRedemptions: UserRedemption[];
  onRedeemReward: (rewardId: string) => void;
  getRewardById: (rewardId: string) => Reward | undefined;
}

export const RewardsModal: React.FC<RewardsModalProps> = ({
  isOpen,
  onClose,
  user,
  rewards,
  userRedemptions,
  onRedeemReward,
  getRewardById,
}) => {
  const [activeTab, setActiveTab] = useState<'available' | 'redeemed'>('available');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  if (!isOpen) return null;

  const availableRewards = rewards.filter(reward => 
    reward.isActive && 
    reward.pointsCost <= user.points &&
    (!reward.maxRedemptions || reward.currentRedemptions < reward.maxRedemptions)
  );

  const lockedRewards = rewards.filter(reward => 
    reward.isActive && 
    reward.pointsCost > user.points
  );

  const handleRedeemClick = (reward: Reward) => {
    setSelectedReward(reward);
  };

  const confirmRedeem = () => {
    if (selectedReward) {
      onRedeemReward(selectedReward.id);
      setSelectedReward(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Electronics': '📱',
      'Food & Drinks': '☕',
      'Fashion': '👕',
      'Sports & Fitness': '💪',
      'Books & Education': '📚',
      'Beauty & Health': '✨',
    };
    return icons[category] || '🎁';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-orange-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white bg-opacity-20 p-2 rounded-xl">
              <Gift className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Rewards Store</h2>
          </div>
          <p className="text-orange-100">
            You have <span className="font-bold">{user.points} points</span> to spend!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('available')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'available'
                ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Available Rewards ({availableRewards.length})
          </button>
          <button
            onClick={() => setActiveTab('redeemed')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'redeemed'
                ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Rewards ({userRedemptions.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'available' ? (
            <div className="space-y-6">
              {/* Available Rewards */}
              {availableRewards.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-500" />
                    Ready to Redeem
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableRewards.map((reward) => (
                      <RewardCard
                        key={reward.id}
                        reward={reward}
                        userPoints={user.points}
                        onRedeem={() => handleRedeemClick(reward)}
                        isAvailable={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Locked Rewards */}
              {lockedRewards.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-gray-400" />
                    Unlock with More Points
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lockedRewards.map((reward) => (
                      <RewardCard
                        key={reward.id}
                        reward={reward}
                        userPoints={user.points}
                        onRedeem={() => {}}
                        isAvailable={false}
                      />
                    ))}
                  </div>
                </div>
              )}

              {availableRewards.length === 0 && lockedRewards.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎁</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No rewards available</h3>
                  <p className="text-gray-600">Check back later for new rewards!</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              {userRedemptions.length > 0 ? (
                <div className="space-y-4">
                  {userRedemptions.map((redemption) => {
                    const reward = getRewardById(redemption.rewardId);
                    if (!reward) return null;

                    return (
                      <div key={redemption.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl">{getCategoryIcon(reward.category)}</span>
                              <h4 className="font-bold text-gray-900">{reward.title}</h4>
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                                Redeemed
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{reward.description}</p>
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Redemption Code:</span>
                                <span className="font-mono font-bold text-orange-600">{redemption.redemptionCode}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Contact Options */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {reward.contactInfo.email && (
                            <a
                              href={`mailto:${reward.contactInfo.email}?subject=Reward Redemption - ${redemption.redemptionCode}`}
                              className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                            >
                              <Mail className="w-4 h-4" />
                              Email
                            </a>
                          )}
                          {reward.contactInfo.whatsapp && (
                            <a
                              href={`https://wa.me/${reward.contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hi! I want to redeem my reward. Code: ${redemption.redemptionCode}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                              WhatsApp
                            </a>
                          )}
                          {reward.contactInfo.website && (
                            <a
                              href={reward.contactInfo.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                            >
                              <Globe className="w-4 h-4" />
                              Website
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎫</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No rewards redeemed yet</h3>
                  <p className="text-gray-600">Start earning points to unlock amazing rewards!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        {selectedReward && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Redemption</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to redeem <strong>{selectedReward.title}</strong> for{' '}
                <strong>{selectedReward.pointsCost} points</strong>?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedReward(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRedeem}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                >
                  Redeem Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: () => void;
  isAvailable: boolean;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, userPoints, onRedeem, isAvailable }) => {
  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Electronics': '📱',
      'Food & Drinks': '☕',
      'Fashion': '👕',
      'Sports & Fitness': '💪',
      'Books & Education': '📚',
      'Beauty & Health': '✨',
    };
    return icons[category] || '🎁';
  };

  const progressPercentage = reward.maxRedemptions 
    ? (reward.currentRedemptions / reward.maxRedemptions) * 100 
    : 0;

  return (
    <div className={`bg-white rounded-xl border-2 p-4 transition-all ${
      isAvailable 
        ? 'border-orange-200 hover:border-orange-300 hover:shadow-lg' 
        : 'border-gray-200 opacity-75'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getCategoryIcon(reward.category)}</span>
          <div>
            <h4 className="font-bold text-gray-900">{reward.title}</h4>
            <p className="text-sm text-gray-600">{reward.brandName}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-orange-600">{reward.pointsCost}</div>
          <div className="text-xs text-gray-500">points</div>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-3">{reward.description}</p>

      <div className="flex items-center justify-between mb-3">
        <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full font-medium">
          Value: {reward.value}
        </span>
        {reward.maxRedemptions && (
          <span className="text-xs text-gray-500">
            {reward.currentRedemptions}/{reward.maxRedemptions} claimed
          </span>
        )}
      </div>

      {reward.maxRedemptions && (
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-400 h-2 rounded-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      <button
        onClick={onRedeem}
        disabled={!isAvailable}
        className={`w-full py-2 rounded-lg font-medium transition-colors ${
          isAvailable
            ? 'bg-orange-500 text-white hover:bg-orange-600'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isAvailable ? (
          <span className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            Redeem Now
          </span>
        ) : (
          `Need ${reward.pointsCost - userPoints} more points`
        )}
      </button>
    </div>
  );
};