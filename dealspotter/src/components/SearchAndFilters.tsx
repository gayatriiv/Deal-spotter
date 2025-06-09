import React from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { FilterState, Category } from '../types';

interface SearchAndFiltersProps {
  filters: FilterState;
  categories: Category[];
  locations: string[];
  onFilterChange: (filters: FilterState) => void;
  onSpotDeal: () => void;
  isAuthenticated: boolean;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  categories,
  locations,
  onFilterChange,
  onSpotDeal,
  isAuthenticated,
}) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Hunt for deals, stores, or goodies..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Filters Button */}
          <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-700">Filters</span>
          </button>

          {/* Sort Dropdown */}
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium"
          >
            <option value="newest">Fresh Deals</option>
            <option value="popular">Most Popular</option>
            <option value="ending-soon">Ending Soon</option>
          </select>

          {/* Location Filter */}
          <select
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Spot Deal Button */}
        {isAuthenticated && (
          <button
            onClick={onSpotDeal}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:from-orange-600 hover:to-orange-700 transition-colors shadow-lg transform hover:scale-105"
          >
            <span className="text-lg">+</span>
            <span>Spot a Deal</span>
          </button>
        )}
      </div>
    </div>
  );
};