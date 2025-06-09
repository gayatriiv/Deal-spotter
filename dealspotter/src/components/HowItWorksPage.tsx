import React from 'react';
import { Search, Plus, ThumbsUp, Bell } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How DealSpotter Works 🎯
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join our community of savvy shoppers and help everyone save money by sharing and discovering amazing local deals!
        </p>
      </div>

      {/* How It Works Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="text-center">
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">1. Spot a Deal</h3>
          <p className="text-gray-600">Found an amazing offer? Share it with the community by posting details, photos, and location.</p>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-br from-teal-400 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">2. Discover Deals</h3>
          <p className="text-gray-600">Browse deals by category, location, or search for specific items you're looking for.</p>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ThumbsUp className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">3. Vote & Verify</h3>
          <p className="text-gray-600">Help the community by voting on deals and marking expired offers to keep content fresh.</p>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Bell className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">4. Stay Updated</h3>
          <p className="text-gray-600">Get notified about new deals in your favorite categories and locations.</p>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Community Guidelines 📋
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2">
              <span className="text-xl">✅</span> Do's
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-gray-700">Post accurate deal information with clear photos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-gray-700">Include store name, location, and expiry date</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-gray-700">Be respectful in comments and interactions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-gray-700">Mark deals as expired when they end</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-gray-700">Vote honestly based on deal quality</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
              <span className="text-xl">❌</span> Don'ts
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-700">Post fake or misleading deals</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-700">Spam the same deal multiple times</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-700">Use inappropriate language or content</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-700">Post deals from online-only stores</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span>
                <span className="text-gray-700">Manipulate votes or create fake accounts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-teal-50 rounded-2xl p-8 border-2 border-dashed border-orange-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Frequently Asked Questions 🤔
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Is DealSpotter free to use?</h3>
            <p className="text-gray-700 mb-4">Yes! DealSpotter is completely free for everyone. Just create an account to start posting and interacting with deals.</p>
            
            <h3 className="font-bold text-gray-900 mb-2">What types of deals can I post?</h3>
            <p className="text-gray-700 mb-4">Any legitimate in-store deals, sales, or offers from physical retail locations. This includes discounts, buy-one-get-one offers, clearance sales, and special promotions.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">How do I know if a deal is still valid?</h3>
            <p className="text-gray-700 mb-4">Check the expiry date, recent comments, and vote count. Community members help keep deals current by marking expired offers.</p>
            
            <h3 className="font-bold text-gray-900 mb-2">Can I edit or delete my posts?</h3>
            <p className="text-gray-700 mb-4">Currently, you can mark your own deals as expired. For other changes, please contact our support team.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Start Saving? 💰
        </h2>
        <p className="text-gray-600 mb-6">
          Join thousands of smart shoppers who are already saving money with DealSpotter!
        </p>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-colors shadow-lg transform hover:scale-105">
          Join the Community 🚀
        </button>
      </div>
    </div>
  );
};