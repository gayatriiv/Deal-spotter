import React from 'react';

interface HeroSectionProps {
  totalSpotters: number;
  hotDeals: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ totalSpotters, hotDeals }) => {
  return (
    <div className="relative bg-gradient-to-br from-orange-50 via-yellow-50 to-teal-50 rounded-2xl p-8 mb-8 overflow-hidden border-2 border-dashed border-orange-200 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 text-4xl">🏷️</div>
        <div className="absolute top-8 right-8 text-3xl">💰</div>
        <div className="absolute bottom-4 left-8 text-3xl">🛍️</div>
        <div className="absolute bottom-8 right-4 text-4xl">⚡</div>
      </div>
      
      <div className="relative text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Deal<span className="text-teal-600">Spotter</span>
          <span className="text-orange-500 ml-2">⚡</span>
        </h2>
        <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
          Your neighborhood's digital notice board for{' '}
          <span className="bg-yellow-200 px-2 py-1 rounded-lg font-semibold text-yellow-800">
            amazing deals
          </span>{' '}
          and student-friendly finds! 🎯
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-center gap-8">
          <div className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full flex items-center gap-2">
            <span className="text-lg">👥</span>
            <span className="font-bold">{totalSpotters}</span>
            <span className="text-sm">{totalSpotters === 1 ? 'Spotter' : 'Spotters'}</span>
          </div>
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full flex items-center gap-2">
            <span className="text-lg">🔥</span>
            <span className="font-bold">{hotDeals}</span>
            <span className="text-sm">Hot {hotDeals === 1 ? 'Deal' : 'Deals'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};