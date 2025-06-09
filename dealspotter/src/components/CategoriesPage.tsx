import React from 'react';
import { Category } from '../types';

interface CategoriesPageProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
  offers: any[];
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ categories, onCategorySelect, offers }) => {
  const iconMap: { [key: string]: string } = {
    'Grid3X3': '🏷️',
    'Smartphone': '📱',
    'Shirt': '👕',
    'Coffee': '☕',
    'BookOpen': '📚',
    'Dumbbell': '💪',
    'Home': '🏠',
    'Sparkles': '✨',
  };

  // Count deals per category
  const getDealsCount = (categoryId: string) => {
    return offers.filter(offer => offer.category.id === categoryId && !offer.isExpired).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Browse Categories 🏷️
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find deals by category. From electronics to fashion, discover amazing offers in your favorite shopping areas.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.filter(cat => cat.id !== 'all').map((category) => {
          const dealsCount = getDealsCount(category.id);
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: category.color + '20' }}
                >
                  <span>{iconMap[category.icon] || '🏷️'}</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{category.name}</h3>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">
                    {dealsCount} active {dealsCount === 1 ? 'deal' : 'deals'}
                  </span>
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Popular Categories */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Popular This Week 🔥
        </h2>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.slice(1, 5).map((category, index) => {
              const dealsCount = getDealsCount(category.id);
              return (
                <div key={category.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="text-2xl">{iconMap[category.icon] || '🏷️'}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-600">{dealsCount} deals</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Tips */}
      <div className="mt-12 bg-gradient-to-br from-orange-50 via-yellow-50 to-teal-50 rounded-2xl p-8 border-2 border-dashed border-orange-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            💡 Pro Tips for Deal Hunting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-bold text-gray-900 mb-2">Be Specific</h3>
              <p className="text-sm text-gray-600">Include exact product names and store locations for better visibility</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="text-2xl mb-2">📸</div>
              <h3 className="font-bold text-gray-900 mb-2">Add Photos</h3>
              <p className="text-sm text-gray-600">Pictures help others quickly identify and verify deals</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="font-bold text-gray-900 mb-2">Set Expiry</h3>
              <p className="text-sm text-gray-600">Help the community by setting accurate expiration dates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};