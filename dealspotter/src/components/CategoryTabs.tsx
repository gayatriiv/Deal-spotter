import React from 'react';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'Grid3X3': '🏷️',
    'Smartphone': '📱',
    'Shirt': '👕',
    'Coffee': '☕',
    'BookOpen': '📚',
    'Dumbbell': '💪',
    'Home': '🏠',
    'Sparkles': '✨',
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-100">
      <div className="flex overflow-x-auto gap-2 pb-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{iconMap[category.icon] || '🏷️'}</span>
              <span>{category.name}</span>
              {isActive && (
                <div 
                  className="w-2 h-2 rounded-full ml-1"
                  style={{ backgroundColor: category.color }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};