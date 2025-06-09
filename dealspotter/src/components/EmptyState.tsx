import React from 'react';

interface EmptyStateProps {
  onPostOffer: () => void;
  isAuthenticated: boolean;
  onAuthClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  onPostOffer, 
  isAuthenticated, 
  onAuthClick 
}) => {
  return (
    <div className="text-center py-16">
      <div className="text-8xl mb-6">🛒</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">No deals spotted yet!</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Be the first to share an amazing deal with the community. Help your neighbors save money!
      </p>
      {isAuthenticated ? (
        <button
          onClick={onPostOffer}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-colors shadow-lg transform hover:scale-105"
        >
          Spot Your First Deal! 🎯
        </button>
      ) : (
        <button
          onClick={onAuthClick}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-colors shadow-lg transform hover:scale-105"
        >
          Join Community to Post Deals! 🎯
        </button>
      )}
    </div>
  );
};