import React, { useState } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageCircle, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Tag,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { Offer } from '../types';

interface OfferCardProps {
  offer: Offer;
  onVote: (offerId: string, vote: 'up' | 'down') => void;
  onMarkExpired: (offerId: string) => void;
  onComment: (offerId: string, comment: string) => void;
  isAuthenticated: boolean;
  currentUsername?: string;
}

export const OfferCard: React.FC<OfferCardProps> = ({ 
  offer, 
  onVote, 
  onMarkExpired,
  onComment,
  isAuthenticated,
  currentUsername
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleVote = (vote: 'up' | 'down') => {
    if (!isAuthenticated) return;
    onVote(offer.id, vote);
  };

  const handleComment = () => {
    if (newComment.trim() && isAuthenticated && currentUsername) {
      onComment(offer.id, newComment.trim());
      setNewComment('');
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const formatExpiryTime = (date?: Date) => {
    if (!date) return null;
    const now = new Date();
    const diffInHours = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 0) return 'Expired';
    if (diffInHours < 24) return `${diffInHours}h left`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d left`;
  };

  const expiryText = formatExpiryTime(offer.expiryDate);
  const isExpiringSoon = offer.expiryDate && (offer.expiryDate.getTime() - new Date().getTime()) < (24 * 60 * 60 * 1000);

  return (
    <div className={`bg-white rounded-2xl shadow-lg border-2 ${offer.isExpired ? 'border-gray-300 opacity-75' : 'border-orange-200'} overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] relative`}>
      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-10">
        <div 
          className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
          style={{ backgroundColor: offer.category.color }}
        >
          {offer.category.name}
        </div>
      </div>

      {/* Status Badges */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {offer.isExpired && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
            EXPIRED
          </span>
        )}
        {isExpiringSoon && !offer.isExpired && (
          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg">
            <AlertTriangle className="w-3 h-3" />
            ENDING SOON
          </span>
        )}
      </div>

      {/* Image */}
      {offer.imageUrl && (
        <div className="relative h-48 bg-gray-100">
          <img 
            src={offer.imageUrl} 
            alt={offer.title}
            className="w-full h-full object-cover"
          />
          {/* Price Overlay */}
          {offer.originalPrice && offer.salePrice && (
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-80 text-white px-3 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="line-through text-gray-300 text-sm">${offer.originalPrice}</span>
                <span className="font-bold text-lg">${offer.salePrice}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-xl text-gray-900 mb-2">{offer.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{offer.storeName}</span>
              <span>•</span>
              <span>{offer.location}</span>
            </div>
          </div>
          
          {/* Discount Badge */}
          <div className="bg-gradient-to-br from-green-400 to-green-500 text-white px-4 py-2 rounded-xl shadow-lg transform rotate-2">
            <div className="text-xs font-bold">SAVE</div>
            <div className="text-lg font-black leading-none">{offer.discount}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 leading-relaxed">{offer.description}</p>
        
        {/* Tags */}
        {offer.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {offer.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-teal-50 text-teal-700 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            {/* Voting */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleVote('up')}
                disabled={!isAuthenticated}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  offer.userVote === 'up' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:bg-green-50 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>{offer.upvotes}</span>
              </button>
              <button
                onClick={() => handleVote('down')}
                disabled={!isAuthenticated}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  offer.userVote === 'down' 
                    ? 'bg-red-100 text-red-700' 
                    : 'text-gray-600 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span>{offer.downvotes}</span>
              </button>
            </div>

            {/* Comments */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{offer.comments.length}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            {expiryText && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className={isExpiringSoon ? 'text-yellow-600 font-medium' : ''}>{expiryText}</span>
              </div>
            )}
            <span>Posted {formatTimeAgo(offer.datePosted)}</span>
            {!offer.isExpired && isAuthenticated && (
              <button
                onClick={() => onMarkExpired(offer.id)}
                className="text-red-500 hover:text-red-700 text-xs underline font-medium"
              >
                Mark expired
              </button>
            )}
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            {/* Existing Comments */}
            {offer.comments.map((comment) => (
              <div key={comment.id} className="mb-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                  <span className="text-xs text-gray-500">{formatTimeAgo(comment.datePosted)}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-600 transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    {comment.upvotes}
                  </button>
                </div>
              </div>
            ))}

            {/* Add Comment */}
            {isAuthenticated ? (
              <div className="flex gap-3 mt-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                />
                <button
                  onClick={handleComment}
                  className="px-6 py-3 bg-orange-500 text-white rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors"
                >
                  Post
                </button>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p>Sign in to join the conversation!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};