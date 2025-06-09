import React from 'react';
import { MapPin, Navigation, Filter } from 'lucide-react';

export const MapView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Deal Map 🗺️
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover deals around you! See where the best offers are located and plan your shopping route.
        </p>
      </div>

      {/* Map Controls */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-medium">
              <Navigation className="w-4 h-4" />
              Find My Location
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
              <Filter className="w-4 h-4" />
              Filter Deals
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-bold">0</span> deals visible on map
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
          {/* Map Placeholder */}
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Interactive Map Coming Soon!</h3>
            <p className="text-gray-600 max-w-md">
              We're working on an interactive map to show you exactly where deals are located. 
              For now, check the location details in each deal card.
            </p>
          </div>

          {/* Mock Map Pins */}
          <div className="absolute top-8 left-8 bg-orange-500 text-white p-2 rounded-full shadow-lg">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="absolute top-16 right-12 bg-teal-500 text-white p-2 rounded-full shadow-lg">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="absolute bottom-12 left-16 bg-yellow-500 text-white p-2 rounded-full shadow-lg">
            <MapPin className="w-4 h-4" />
          </div>
        </div>

        {/* Map Legend */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Map Legend</h4>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Electronics Deals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Food & Drinks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Fashion Deals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Books & Education</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="text-3xl mb-2">📍</div>
          <h3 className="font-bold text-gray-900 mb-1">0 Locations</h3>
          <p className="text-gray-600 text-sm">Stores with active deals</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="text-3xl mb-2">🏪</div>
          <h3 className="font-bold text-gray-900 mb-1">0 Stores</h3>
          <p className="text-gray-600 text-sm">Participating retailers</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
          <div className="text-3xl mb-2">💰</div>
          <h3 className="font-bold text-gray-900 mb-1">$0 Saved</h3>
          <p className="text-gray-600 text-sm">Community savings</p>
        </div>
      </div>
    </div>
  );
};