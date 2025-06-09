import React from 'react';
import { Star, Users, TrendingUp, Gift, Zap, ArrowRight, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onAuthClick: () => void;
  totalSpotters: number;
  hotDeals: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onAuthClick, 
  totalSpotters, 
  hotDeals 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 text-8xl">🏷️</div>
          <div className="absolute top-40 right-32 text-6xl">💰</div>
          <div className="absolute bottom-40 left-32 text-7xl">🛍️</div>
          <div className="absolute bottom-20 right-20 text-8xl">⚡</div>
          <div className="absolute top-60 left-1/2 text-5xl">🎯</div>
          <div className="absolute top-32 left-1/3 text-6xl">💝</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-4 rounded-2xl shadow-lg">
                <Zap className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-6xl font-black text-gray-900">
                  Deal<span className="text-teal-600">Spotter</span>
                  <span className="text-orange-500 ml-2">⚡</span>
                </h1>
                <p className="text-xl text-gray-600 font-medium">Community Finds</p>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Your Neighborhood's
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                Digital Notice Board
              </span>
            </h2>

            <p className="text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              Discover amazing deals, share student-friendly finds, and{' '}
              <span className="bg-yellow-200 px-3 py-1 rounded-lg font-bold text-yellow-800">
                earn rewards
              </span>{' '}
              for helping your community save money! 🎯
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-teal-200">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-teal-600" />
                  <div>
                    <div className="text-3xl font-black text-teal-700">{totalSpotters}</div>
                    <div className="text-sm text-gray-600 font-medium">Community Spotters</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                  <div>
                    <div className="text-3xl font-black text-orange-700">{hotDeals}</div>
                    <div className="text-sm text-gray-600 font-medium">Hot Deals Active</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onAuthClick}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-6 rounded-2xl font-black text-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-2xl transform hover:scale-105 flex items-center gap-4 mx-auto"
            >
              <Star className="w-8 h-8" />
              Join the Community
              <ArrowRight className="w-8 h-8" />
            </button>

            <p className="text-gray-600 mt-4 text-lg">
              Start earning points and unlock exclusive rewards! 🎁
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-gray-900 mb-4">
              How DealSpotter Works 🚀
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our gamified community where sharing deals earns you real rewards!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-3xl">📸</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">1. Spot & Share</h4>
              <p className="text-gray-600 leading-relaxed">
                Found an amazing deal? Share it with photos and details to help your community save money.
              </p>
              <div className="mt-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                Earn +10 Points
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-3xl">👍</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">2. Vote & Verify</h4>
              <p className="text-gray-600 leading-relaxed">
                Help the community by upvoting great deals and verifying their authenticity.
              </p>
              <div className="mt-4 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                Earn +2 Points
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Star className="w-10 h-10 text-yellow-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">3. Earn Points</h4>
              <p className="text-gray-600 leading-relaxed">
                Every contribution earns you points. Level up and unlock exclusive rewards from partner brands.
              </p>
              <div className="mt-4 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                Level Up System
              </div>
            </div>

            {/* Step 4 */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Gift className="w-10 h-10 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">4. Redeem Rewards</h4>
              <p className="text-gray-600 leading-relaxed">
                Use your points to unlock real discounts, free items, and exclusive offers from local businesses.
              </p>
              <div className="mt-4 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                Real Value Rewards
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Preview */}
      <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-gray-900 mb-4">
              Unlock Amazing Rewards 🎁
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Earn points by contributing to the community and redeem them for real value!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sample Rewards */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200 transform hover:scale-105 transition-all">
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">₹100 Off Electronics</h4>
                <p className="text-gray-600 mb-4">Get ₹100 discount on any electronics purchase above ₹1000</p>
                <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold">
                  200 Points
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-teal-200 transform hover:scale-105 transition-all">
              <div className="text-center">
                <div className="text-4xl mb-4">☕</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Free Coffee Week</h4>
                <p className="text-gray-600 mb-4">Get 7 free coffees at Campus Brew locations</p>
                <div className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full font-bold">
                  150 Points
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200 transform hover:scale-105 transition-all">
              <div className="text-center">
                <div className="text-4xl mb-4">👕</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">30% Off Fashion</h4>
                <p className="text-gray-600 mb-4">Get 30% discount on any fashion item up to ₹500</p>
                <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-bold">
                  300 Points
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-black text-gray-900 mb-6">
                Why Join DealSpotter? 🤔
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Save Money Together</h4>
                    <p className="text-gray-600">Discover deals you'd never find alone and help others save too.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Earn Real Rewards</h4>
                    <p className="text-gray-600">Get points for every contribution and redeem them for actual discounts and freebies.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Build Community</h4>
                    <p className="text-gray-600">Connect with neighbors and fellow students who share your passion for great deals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Level Up Your Savings</h4>
                    <p className="text-gray-600">The more you contribute, the better rewards you unlock. It's like a game, but with real benefits!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-100 to-teal-100 rounded-3xl p-12 border-4 border-dashed border-orange-300">
                <div className="text-8xl mb-6">🎯</div>
                <h4 className="text-2xl font-black text-gray-900 mb-4">Ready to Start?</h4>
                <p className="text-gray-600 mb-8 text-lg">
                  Join thousands of smart shoppers who are already saving money with DealSpotter!
                </p>
                <button
                  onClick={onAuthClick}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-colors shadow-lg transform hover:scale-105"
                >
                  Get Started Now! 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-xl">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">
                Deal<span className="text-teal-400">Spotter</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-4">Your neighborhood's digital notice board 📌</p>
            <p className="text-gray-500 text-sm">Help your community save money, one deal at a time 💝</p>
          </div>
        </div>
      </footer>
    </div>
  );
};