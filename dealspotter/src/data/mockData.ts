import { Offer, Category } from '../types';

export const categories: Category[] = [
  { id: 'all', name: 'All Categories', icon: 'Grid3X3', color: '#6B7280' },
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone', color: '#3B82F6' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', color: '#EC4899' },
  { id: 'food', name: 'Food & Drinks', icon: 'Coffee', color: '#F59E0B' },
  { id: 'books', name: 'Books & Stationery', icon: 'BookOpen', color: '#10B981' },
  { id: 'sports', name: 'Sports & Fitness', icon: 'Dumbbell', color: '#F97316' },
  { id: 'home', name: 'Home & Garden', icon: 'Home', color: '#14B8A6' },
  { id: 'beauty', name: 'Beauty & Health', icon: 'Sparkles', color: '#8B5CF6' },
];

export const locations = [
  'Downtown Mall',
  'University District',
  'Market Street',
  'Shopping Plaza',
  'City Center',
  'East Side',
  'West End',
  'Uptown',
];

export const mockOffers: Offer[] = [
  {
    id: '1',
    title: '50% Off Gaming Headsets',
    description: 'Spotted amazing deals on gaming headsets at Tech Zone. Multiple brands available including Razer and SteelSeries!',
    storeName: 'Tech Zone',
    originalPrice: 120,
    salePrice: 60,
    discount: '50% OFF',
    category: categories[1],
    location: 'Downtown Mall',
    imageUrl: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: new Date('2024-01-15T10:30:00'),
    expiryDate: new Date('2024-01-20T23:59:59'),
    isExpired: false,
    upvotes: 24,
    downvotes: 2,
    userVote: null,
    comments: [
      {
        id: 'c1',
        text: 'Just grabbed one! Thanks for the tip!',
        author: 'StudentSaver',
        datePosted: new Date('2024-01-15T11:00:00'),
        upvotes: 5,
      },
      {
        id: 'c2',
        text: 'Are there any left? Heading there now.',
        author: 'GamerliFe',
        datePosted: new Date('2024-01-15T14:30:00'),
        upvotes: 2,
      },
    ],
    tags: ['electronics', 'gaming', 'headsets'],
    postedBy: 'DealHunter22',
  },
  {
    id: '2',
    title: 'Buy 2 Get 1 Free Coffee',
    description: 'Local coffee shop has this amazing deal running until Thursday. Perfect for study sessions!',
    storeName: 'Campus Brew',
    originalPrice: 15,
    salePrice: 10,
    discount: 'Buy 2 Get 1',
    category: categories[3],
    location: 'University District',
    imageUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: new Date('2024-01-14T08:15:00'),
    expiryDate: new Date('2024-01-18T20:00:00'),
    isExpired: false,
    upvotes: 18,
    downvotes: 0,
    userVote: 'up',
    comments: [
      {
        id: 'c3',
        text: 'Best coffee near campus! 🔥',
        author: 'CoffeeAddict',
        datePosted: new Date('2024-01-14T09:00:00'),
        upvotes: 8,
      },
    ],
    tags: ['coffee', 'study', 'campus'],
    postedBy: 'StudyBuddy',
  },
  {
    id: '3',
    title: 'Winter Jacket Clearance',
    description: 'End of season clearance at Fashion Forward. Saw some really good quality jackets marked down 70%!',
    storeName: 'Fashion Forward',
    originalPrice: 200,
    salePrice: 60,
    discount: '70% OFF',
    category: categories[2],
    location: 'Shopping Plaza',
    imageUrl: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: new Date('2024-01-13T16:45:00'),
    expiryDate: new Date('2024-01-25T23:59:59'),
    isExpired: false,
    upvotes: 31,
    downvotes: 1,
    userVote: null,
    comments: [
      {
        id: 'c4',
        text: 'Sizes still available?',
        author: 'Fashionista',
        datePosted: new Date('2024-01-13T17:30:00'),
        upvotes: 3,
      },
      {
        id: 'c5',
        text: 'Just checked - they have S, M, L in most styles',
        author: 'DealHunter22',
        datePosted: new Date('2024-01-13T18:00:00'),
        upvotes: 7,
      },
    ],
    tags: ['fashion', 'winter', 'clearance'],
    postedBy: 'StyleSaver',
  },
  {
    id: '4',
    title: 'Textbook Sale - Up to 80% Off',
    description: 'University bookstore clearing out last semester\'s textbooks. Lots of popular titles available!',
    storeName: 'Campus Books',
    originalPrice: 250,
    salePrice: 50,
    discount: '80% OFF',
    category: categories[4],
    location: 'University District',
    imageUrl: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: new Date('2024-01-12T12:00:00'),
    expiryDate: new Date('2024-01-30T18:00:00'),
    isExpired: false,
    upvotes: 45,
    downvotes: 3,
    userVote: 'up',
    comments: [
      {
        id: 'c6',
        text: 'Found my chemistry textbook for $20! 🙌',
        author: 'ChemStudent',
        datePosted: new Date('2024-01-12T14:30:00'),
        upvotes: 12,
      },
    ],
    tags: ['textbooks', 'student', 'education'],
    postedBy: 'BookWorm',
  },
  {
    id: '5',
    title: 'Free Protein Shake Samples',
    description: 'New supplement store giving out free protein shake samples all week. Great for trying different flavors!',
    storeName: 'Muscle Max',
    originalPrice: 0,
    salePrice: 0,
    discount: 'FREE',
    category: categories[5],
    location: 'East Side',
    imageUrl: 'https://images.pexels.com/photos/4004344/pexels-photo-4004344.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: new Date('2024-01-11T09:30:00'),
    expiryDate: new Date('2024-01-19T19:00:00'),
    isExpired: false,
    upvotes: 15,
    downvotes: 4,
    userVote: null,
    comments: [],
    tags: ['fitness', 'protein', 'free', 'samples'],
    postedBy: 'FitnessFan',
  },
  {
    id: '6',
    title: 'Plant Sale - Succulents $5 Each',
    description: 'Local garden center has a huge succulent sale. Perfect for dorm rooms and apartments!',
    storeName: 'Green Thumb Garden',
    originalPrice: 15,
    salePrice: 5,
    discount: '$5 EACH',
    category: categories[6],
    location: 'West End',
    imageUrl: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400',
    datePosted: new Date('2024-01-10T15:20:00'),
    expiryDate: new Date('2024-01-22T17:00:00'),
    isExpired: false,
    upvotes: 22,
    downvotes: 1,
    userVote: null,
    comments: [
      {
        id: 'c7',
        text: 'Perfect for my new apartment!',
        author: 'PlantParent',
        datePosted: new Date('2024-01-10T16:00:00'),
        upvotes: 6,
      },
    ],
    tags: ['plants', 'succulents', 'home-decor'],
    postedBy: 'GreenThumb',
  }
];