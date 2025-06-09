import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SearchAndFilters } from './components/SearchAndFilters';
import { OfferCard } from './components/OfferCard';
import { PostOfferModal } from './components/PostOfferModal';
import { AuthModal } from './components/AuthModal';
import { EmptyState } from './components/EmptyState';
import { MapView } from './components/MapView';
import { CategoriesPage } from './components/CategoriesPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { LandingPage } from './components/LandingPage';
import { PointsDisplay } from './components/PointsDisplay';
import { RewardsModal } from './components/RewardsModal';
import { PointsNotification } from './components/PointsNotification';
import { useOffers } from './hooks/useOffers';
import { useAuth } from './hooks/useAuth';
import { usePoints } from './hooks/usePoints';
import { useRewards } from './hooks/useRewards';
import { categories, locations } from './data/categories';

function App() {
  const { user, isAuthenticated, signUp, signIn, signOut, getTotalUsers, updateUser } = useAuth();
  const {
    offers,
    allOffers,
    totalOffers,
    filters,
    setFilters,
    addOffer,
    voteOnOffer,
    markExpired,
    addComment,
    verifyOffer,
    markPointsAwarded,
  } = useOffers(user?.id);

  const { 
    awardPoints, 
    redeemPoints, 
    getPointsForAction, 
    getProgressToNextReward 
  } = usePoints(user);

  const {
    rewards,
    userRedemptions,
    redeemReward,
    getUserRedemptions,
    getAvailableRewards,
    getRewardById,
  } = useRewards();

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [pointsNotification, setPointsNotification] = useState<{
    points: number;
    reason: string;
    isVisible: boolean;
  }>({ points: 0, reason: '', isVisible: false });

  const showPointsNotification = (points: number, reason: string) => {
    setPointsNotification({ points, reason, isVisible: true });
  };

  const handlePostOffer = () => {
    if (isAuthenticated) {
      setIsPostModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleOfferSubmit = (newOffer: any) => {
    addOffer(newOffer);
    
    // Award points for posting
    if (user) {
      const points = getPointsForAction('post', !!newOffer.imageUrl);
      const success = awardPoints(points, 'posting a deal', newOffer.id, updateUser);
      
      if (success) {
        showPointsNotification(points, 'posting a deal');
        markPointsAwarded(newOffer.id);
      }
    }
  };

  const handleVote = (offerId: string, vote: 'up' | 'down') => {
    if (isAuthenticated) {
      voteOnOffer(offerId, vote);
      
      // Award points for upvoting (only for upvotes)
      if (vote === 'up' && user) {
        const points = getPointsForAction('upvote');
        const success = awardPoints(points, 'upvoting a deal', offerId, updateUser);
        
        if (success) {
          showPointsNotification(points, 'upvoting a deal');
        }
      }
    }
  };

  const handleComment = (offerId: string, comment: string) => {
    if (isAuthenticated && user) {
      addComment(offerId, comment, user.username);
    }
  };

  const handleRedeemReward = (rewardId: string) => {
    if (!user) return;
    
    const reward = getRewardById(rewardId);
    if (!reward || user.points < reward.pointsCost) return;
    
    const redemptionCode = redeemReward(rewardId, user.id);
    if (redemptionCode) {
      const success = redeemPoints(reward.pointsCost, `redeeming ${reward.title}`, rewardId, updateUser);
      if (success) {
        // Show success message or notification
        alert(`Reward redeemed successfully! Your code: ${redemptionCode}`);
      }
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setFilters({ ...filters, category: categoryId });
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Calculate dynamic stats
  const totalSpotters = getTotalUsers();
  const hotDeals = offers.filter(offer => !offer.isExpired && offer.upvotes > 5).length;

  // Show landing page for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Header 
          user={user}
          isAuthenticated={isAuthenticated}
          onPostOffer={handlePostOffer}
          onAuthClick={() => setIsAuthModalOpen(true)}
          onSignOut={signOut}
          totalOffers={totalOffers}
          onNavigate={handleNavigate}
          currentPage={currentPage}
          onViewRewards={() => setIsRewardsModalOpen(true)}
        />
        
        <LandingPage 
          onAuthClick={() => setIsAuthModalOpen(true)}
          totalSpotters={totalSpotters}
          hotDeals={hotDeals}
        />

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSignIn={signIn}
          onSignUp={signUp}
        />
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'map':
        return <MapView />;
      case 'categories':
        return <CategoriesPage categories={categories} onCategorySelect={handleCategorySelect} offers={allOffers} />;
      case 'how-it-works':
        return <HowItWorksPage />;
      default:
        return (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Hero Section */}
                <HeroSection totalSpotters={totalSpotters} hotDeals={hotDeals} />

                {/* Search and Filters */}
                <SearchAndFilters
                  filters={filters}
                  categories={categories}
                  locations={locations}
                  onFilterChange={setFilters}
                  onSpotDeal={handlePostOffer}
                  isAuthenticated={isAuthenticated}
                />

                {/* Results Info */}
                {offers.length > 0 && (
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-gray-600">
                      <span className="font-bold text-gray-900 text-lg">{offers.length}</span> deals found
                      {filters.search && (
                        <span> for "<span className="font-bold text-gray-900">{filters.search}</span>"</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Offers Grid */}
                {offers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {offers.map((offer) => (
                      <OfferCard
                        key={offer.id}
                        offer={offer}
                        onVote={handleVote}
                        onMarkExpired={markExpired}
                        onComment={handleComment}
                        isAuthenticated={isAuthenticated}
                        currentUsername={user?.username}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState 
                    onPostOffer={handlePostOffer}
                    isAuthenticated={isAuthenticated}
                    onAuthClick={() => setIsAuthModalOpen(true)}
                  />
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {isAuthenticated && user && (
                  <div className="sticky top-24">
                    <PointsDisplay
                      user={user}
                      progress={getProgressToNextReward(user.points)}
                      onViewRewards={() => setIsRewardsModalOpen(true)}
                    />
                  </div>
                )}
              </div>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-teal-50">
      <Header 
        user={user}
        isAuthenticated={isAuthenticated}
        onPostOffer={handlePostOffer}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onSignOut={signOut}
        totalOffers={totalOffers}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        onViewRewards={() => setIsRewardsModalOpen(true)}
      />
      
      {renderCurrentPage()}

      {/* Modals */}
      <PostOfferModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        categories={categories}
        locations={locations}
        onSubmit={handleOfferSubmit}
        user={user}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSignIn={signIn}
        onSignUp={signUp}
      />

      <RewardsModal
        isOpen={isRewardsModalOpen}
        onClose={() => setIsRewardsModalOpen(false)}
        user={user!}
        rewards={getAvailableRewards(user?.points || 0)}
        userRedemptions={getUserRedemptions(user?.id || '')}
        onRedeemReward={handleRedeemReward}
        getRewardById={getRewardById}
      />

      {/* Points Notification */}
      <PointsNotification
        points={pointsNotification.points}
        reason={pointsNotification.reason}
        isVisible={pointsNotification.isVisible}
        onClose={() => setPointsNotification(prev => ({ ...prev, isVisible: false }))}
      />

      {/* Footer */}
      {currentPage === 'home' && isAuthenticated && (
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2 font-medium">DealSpotter - Your neighborhood's digital notice board 📌</p>
              <p className="text-sm">Help your community save money, one deal at a time 💝</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;