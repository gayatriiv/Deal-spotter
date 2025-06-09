import { useState, useMemo, useEffect } from 'react';
import { Offer, FilterState, Comment } from '../types';

export const useOffers = (userId?: string) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    location: '',
    search: '',
    sortBy: 'newest',
    showExpired: false,
  });

  // Load offers from localStorage on mount
  useEffect(() => {
    const savedOffers = localStorage.getItem('dealspotter_offers');
    if (savedOffers) {
      try {
        const parsedOffers = JSON.parse(savedOffers).map((offer: any) => ({
          ...offer,
          datePosted: new Date(offer.datePosted),
          expiryDate: offer.expiryDate ? new Date(offer.expiryDate) : undefined,
          comments: offer.comments.map((comment: any) => ({
            ...comment,
            datePosted: new Date(comment.datePosted),
          })),
          isVerified: offer.isVerified || false,
          pointsAwarded: offer.pointsAwarded || false,
        }));
        setOffers(parsedOffers);
      } catch (error) {
        console.error('Failed to load offers:', error);
      }
    }
  }, []);

  // Save offers to localStorage whenever offers change
  useEffect(() => {
    localStorage.setItem('dealspotter_offers', JSON.stringify(offers));
  }, [offers]);

  const filteredOffers = useMemo(() => {
    let filtered = offers.filter((offer) => {
      // Category filter
      if (filters.category !== 'all' && offer.category.id !== filters.category) {
        return false;
      }

      // Location filter
      if (filters.location && offer.location !== filters.location) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          offer.title.toLowerCase().includes(searchLower) ||
          offer.description.toLowerCase().includes(searchLower) ||
          offer.storeName.toLowerCase().includes(searchLower) ||
          offer.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }

      // Expired filter
      if (!filters.showExpired && offer.isExpired) {
        return false;
      }

      return true;
    });

    // Sort offers
    switch (filters.sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        break;
      case 'ending-soon':
        filtered.sort((a, b) => {
          if (!a.expiryDate && !b.expiryDate) return 0;
          if (!a.expiryDate) return 1;
          if (!b.expiryDate) return -1;
          return a.expiryDate.getTime() - b.expiryDate.getTime();
        });
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.datePosted.getTime() - a.datePosted.getTime());
        break;
    }

    return filtered;
  }, [offers, filters]);

  const addOffer = (newOffer: Offer) => {
    const offerWithDefaults = {
      ...newOffer,
      isVerified: false,
      pointsAwarded: false,
    };
    setOffers(prev => [offerWithDefaults, ...prev]);
  };

  const voteOnOffer = (offerId: string, vote: 'up' | 'down') => {
    if (!userId) return;

    setOffers(prev => prev.map(offer => {
      if (offer.id === offerId) {
        const currentVote = offer.userVote;
        let newUpvotes = offer.upvotes;
        let newDownvotes = offer.downvotes;
        let newUserVote: 'up' | 'down' | null = vote;

        // Remove previous vote
        if (currentVote === 'up') {
          newUpvotes--;
        } else if (currentVote === 'down') {
          newDownvotes--;
        }

        // Apply new vote
        if (vote === 'up') {
          if (currentVote === 'up') {
            // Cancel upvote
            newUserVote = null;
          } else {
            newUpvotes++;
          }
        } else if (vote === 'down') {
          if (currentVote === 'down') {
            // Cancel downvote
            newUserVote = null;
          } else {
            newDownvotes++;
          }
        }

        return {
          ...offer,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote,
        };
      }
      return offer;
    }));
  };

  const markExpired = (offerId: string) => {
    setOffers(prev => prev.map(offer => 
      offer.id === offerId ? { ...offer, isExpired: true } : offer
    ));
  };

  const addComment = (offerId: string, commentText: string, username: string) => {
    if (!userId) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      text: commentText,
      author: username,
      userId,
      datePosted: new Date(),
      upvotes: 0,
    };

    setOffers(prev => prev.map(offer => 
      offer.id === offerId 
        ? { ...offer, comments: [...offer.comments, newComment] }
        : offer
    ));
  };

  const verifyOffer = (offerId: string) => {
    setOffers(prev => prev.map(offer => 
      offer.id === offerId ? { ...offer, isVerified: true } : offer
    ));
  };

  const markPointsAwarded = (offerId: string) => {
    setOffers(prev => prev.map(offer => 
      offer.id === offerId ? { ...offer, pointsAwarded: true } : offer
    ));
  };

  return {
    offers: filteredOffers,
    allOffers: offers, // Return all offers for categories page
    totalOffers: offers.length,
    filters,
    setFilters,
    addOffer,
    voteOnOffer,
    markExpired,
    addComment,
    verifyOffer,
    markPointsAwarded,
  };
};