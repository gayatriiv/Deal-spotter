import React, { useState } from 'react';
import { X, Upload, MapPin, Tag, Calendar, DollarSign, Camera } from 'lucide-react';
import { Category } from '../types';

interface PostOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  locations: string[];
  onSubmit: (offer: any) => void;
  user: any;
}

export const PostOfferModal: React.FC<PostOfferModalProps> = ({
  isOpen,
  onClose,
  categories,
  locations,
  onSubmit,
  user,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    storeName: '',
    originalPrice: '',
    salePrice: '',
    discount: '',
    category: '',
    location: '',
    customLocation: '',
    expiryDate: '',
    tags: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use custom location if "Other" is selected
    const finalLocation = formData.location === 'Other (specify below)' 
      ? formData.customLocation 
      : formData.location;
    
    const newOffer = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      storeName: formData.storeName,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      salePrice: formData.salePrice ? parseFloat(formData.salePrice) : undefined,
      discount: formData.discount,
      category: categories.find(c => c.id === formData.category) || categories[1],
      location: finalLocation,
      imageUrl: imagePreview,
      datePosted: new Date(),
      expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : undefined,
      isExpired: false,
      upvotes: 0,
      downvotes: 0,
      userVote: null,
      comments: [],
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      postedBy: user?.username || 'Anonymous',
      userId: user?.id || '',
    };

    onSubmit(newOffer);
    onClose();
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      storeName: '',
      originalPrice: '',
      salePrice: '',
      discount: '',
      category: '',
      location: '',
      customLocation: '',
      expiryDate: '',
      tags: '',
    });
    setImagePreview(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isOnlineStore = ['Amazon', 'Flipkart', 'Myntra', 'Nykaa', 'BigBasket', 'Swiggy', 'Zomato', 'Paytm Mall', 'Snapdeal', 'Ajio'].includes(formData.location);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-orange-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-2">Spot a New Deal! 🎯</h2>
          <p className="text-orange-100">Share an amazing deal you found with the community</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Deal Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., 50% Off Gaming Headsets"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the deal, what's included, any conditions..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Store and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Store Name *
              </label>
              <input
                type="text"
                required
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                placeholder={isOnlineStore ? "e.g., Official Store" : "e.g., Tech Zone"}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Location *
              </label>
              <select
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Select location</option>
                <optgroup label="🌐 Online Stores">
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Custom Location Input */}
          {formData.location === 'Other (specify below)' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Specify Location *
              </label>
              <input
                type="text"
                required
                value={formData.customLocation}
                onChange={(e) => setFormData({ ...formData, customLocation: e.target.value })}
                placeholder="Enter the exact location or store name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Category *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select category</option>
              {categories.filter(c => c.id !== 'all').map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Original Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="100.00"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Sale Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                placeholder="50.00"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Discount Text *
              </label>
              <input
                type="text"
                required
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                placeholder="50% OFF"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Expiry Date (Optional)
            </label>
            <input
              type="datetime-local"
              value={formData.expiryDate}
              onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <Tag className="inline w-4 h-4 mr-1" />
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="electronics, gaming, headsets"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <Camera className="inline w-4 h-4 mr-1" />
              Photo (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                {imagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-xl mx-auto"
                    />
                    <p className="text-sm text-gray-600">Click to change photo</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-600">Click to upload a photo</p>
                    <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-colors font-bold"
            >
              Spot This Deal! 🎯
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};