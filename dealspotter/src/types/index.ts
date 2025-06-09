export interface User {
  id: string;
  email: string;
  username: string;
  joinDate: Date;
  avatar?: string;
  points: number;
  totalPointsEarned: number;
  level: number;
  dailyPointsEarned: number;
  lastPointsDate: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  storeName: string;
  originalPrice?: number;
  salePrice?: number;
  discount: string;
  category: Category;
  location: string;
  imageUrl?: string;
  datePosted: Date;
  expiryDate?: Date;
  isExpired: boolean;
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down' | null;
  comments: Comment[];
  tags: string[];
  postedBy: string;
  userId: string;
  isVerified: boolean;
  pointsAwarded: boolean;
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  userId: string;
  datePosted: Date;
  upvotes: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface FilterState {
  category: string;
  location: string;
  search: string;
  sortBy: 'newest' | 'popular' | 'ending-soon';
  showExpired: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface PointsTransaction {
  id: string;
  userId: string;
  points: number;
  type: 'earned' | 'redeemed';
  reason: string;
  offerId?: string;
  rewardId?: string;
  date: Date;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  brandName: string;
  brandLogo?: string;
  pointsCost: number;
  value: string;
  termsAndConditions: string;
  expiryDate?: Date;
  isActive: boolean;
  category: string;
  contactInfo: {
    email?: string;
    whatsapp?: string;
    website?: string;
  };
  redemptionCode?: string;
  maxRedemptions?: number;
  currentRedemptions: number;
}

export interface UserRedemption {
  id: string;
  userId: string;
  rewardId: string;
  redemptionCode: string;
  redeemedAt: Date;
  isUsed: boolean;
  usedAt?: Date;
}

export interface BrandPartner {
  id: string;
  name: string;
  email: string;
  logo?: string;
  description: string;
  contactPerson: string;
  isVerified: boolean;
  joinDate: Date;
}