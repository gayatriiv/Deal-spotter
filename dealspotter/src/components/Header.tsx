import React, { useState } from 'react';
import { Plus, Bell, User, Zap, MapPin, Grid3X3, HelpCircle, LogOut, Star, Gift } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  isAuthenticated: boolean;
  onPostOffer: () => void;
  onAuthClick: () => void;
  onSignOut: () => void;
  totalOffers: number;
  onNavigate: (page: string) => void;
  currentPage: string;
  onViewRewards?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  isAuthenticated, 
  onPostOffer, 
  onAuthClick, 
  onSignOut,
  totalOffers,
  onNavigate,
  currentPage,
  onViewRewards
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock notifications count - in real app this would come from props
  const notificationCount = 0; // No notifications for now

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-2 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Deal<span className="text-teal-600">Spotter</span>
                <span className="text-orange-500 ml-1">⚡</span>
              </h1>
              <p className="text-xs text-gray-500">Community Finds</p>
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-2 transition-colors ${
                currentPage === 'home' 
                  ? 'text-orange-600 font-medium' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              <span className="text-orange-500">🔥</span>
              <span className="font-medium">Hot Deals</span>
            </button>
            <button 
              onClick={() => onNavigate('map')}
              className={`flex items-center gap-2 transition-colors ${
                currentPage === 'map' 
                  ? 'text-orange-600 font-medium' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Map View</span>
            </button>
            <button 
              onClick={() => onNavigate('categories')}
              className={`flex items-center gap-2 transition-colors ${
                currentPage === 'categories' 
                  ? 'text-orange-600 font-medium' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="font-medium">Categories</span>
            </button>
            <button 
              onClick={() => onNavigate('how-it-works')}
              className={`flex items-center gap-2 transition-colors ${
                currentPage === 'how-it-works' 
                  ? 'text-orange-600 font-medium' 
                  : 'text-gray-700 hover:text-orange-600'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span className="font-medium">How it Works</span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={onPostOffer}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:from-orange-600 hover:to-orange-700 transition-colors shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Spot a Deal</span>
                </button>

                {/* Points Display */}
                {user && onViewRewards && (
                  <button
                    onClick={onViewRewards}
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 rounded-lg hover:from-yellow-200 hover:to-orange-200 transition-colors border border-orange-200"
                  >
                    <Star className="w-4 h-4" />
                    <span className="font-bold">{user.points}</span>
                    <Gift className="w-4 h-4" />
                  </button>
                )}
                
                {notificationCount > 0 && (
                  <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  </button>
                )}
                
                <div className="relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden sm:inline text-sm font-medium">{user?.username}</span>
                    {user && (
                      <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-bold">
                        L{user.level}
                      </span>
                    )}
                  </button>
                  
                  {/* Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-100">
                        <p className="font-medium text-gray-900">{user?.username}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                        {user && (
                          <div className="mt-2 flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-orange-500" />
                              <span className="font-bold">{user.points} points</span>
                            </div>
                            <div className="text-gray-500">Level {user.level}</div>
                          </div>
                        )}
                      </div>
                      {onViewRewards && (
                        <button
                          onClick={() => {
                            onViewRewards();
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Gift className="w-4 h-4" />
                          Rewards Store
                        </button>
                      )}
                      <button
                        onClick={() => {
                          onSignOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:from-orange-600 hover:to-orange-700 transition-colors shadow-md"
              >
                <User className="w-4 h-4" />
                <span>Join Community</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};