import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { FollowListModal } from '../components/profile/FollowListModal';
import { FeedItem } from '../components/feed/FeedItem';
import { Footer } from '../components/layout/Footer';
import { AvatarPreviewModal } from '../components/ui/AvatarPreviewModal';
import { ProfileHeader } from '../features/profile/components/ProfileHeader';
import { ProfileInfoCard } from '../features/profile/components/ProfileInfoCard';
import { ProfileTabNav } from '../components/profile/ProfileTabNav';
import { ProfileReelsGrid } from '../features/profile/components/tabs/ProfileReelsGrid';
import { ProfileProductsGrid } from '../features/profile/components/tabs/ProfileProductsGrid';

export const Profile: React.FC = () => {
  const {
    navigate,
    activeTab,
    setActiveTab,
    myPosts,
    myProducts,
    user,
    followersCount,
    followingCount,
    followListType,
    followListData,
    isPreviewOpen,
    setIsPreviewOpen,
    scrollRef,
    deletePost,
    handleLike,
    handleShowFollowList,
    closeFollowList,
    navigateToUserProfile,
    handleShare,
    handleUserClick,
    handleVote,
    handleNickname,
    handleUsername,
    displayBio,
    displayAvatar,
    displayWebsite,
  } = useProfile();

  return (
    <div className="profile-page h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">
      <style>{`
        main { flex-grow: 1; overflow-y: auto; padding-top: 80px; padding-bottom: 100px; scroll-behavior: smooth; }
        .profile-card-box { background: rgba(30, 35, 45, 0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 30px 20px; width: 90%; max-width: 400px; display: flex; flex-direction: column; align-items: center; margin: 0 auto 20px auto; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); }
        .profile-avatar { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 4px solid #00c2ff; margin-bottom: 15px; background: #1e2531; cursor: pointer; }
        .profile-avatar-placeholder { width: 100px; height: 100px; border-radius: 50%; border: 4px solid #00c2ff; margin-bottom: 15px; background: #1e2531; display: flex; align-items: center; justify-content: center; font-size: 40px; color: #00c2ff; }
        .profile-nickname { font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 2px; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
        .profile-handle { font-size: 14px; color: #00c2ff; margin-bottom: 15px; font-weight: 500; }
        .profile-stats-container { display: flex; justify-content: space-around; width: 100%; margin: 20px 0; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); padding: 15px 0; }
        .stat-box { display: flex; flex-direction: column; align-items: center; cursor: pointer; flex: 1; }
        .stat-value { font-size: 18px; font-weight: 800; color: #fff; }
        .stat-label { font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
        .profile-bio { font-size: 14px; color: #e0e0e0; text-align: center; line-height: 1.5; margin-bottom: 15px; max-width: 90%; }
        .profile-link { font-size: 13px; color: #00c2ff; display: flex; align-items: center; gap: 5px; background: rgba(0,194,255,0.1); padding: 5px 12px; border-radius: 20px; text-decoration: none; }
        .profile-actions { display: flex; gap: 10px; width: 100%; justify-content: center; margin-top: 10px; }
        .profile-actions button { flex: 1; max-width: 140px; padding: 12px; border-radius: 12px; font-weight: 700; font-size: 14px; border: none; cursor: pointer; background: #1e2531; color: #fff; border: 1px solid #555; }
        .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
        .gallery-item { position: relative; aspect-ratio: 9/16; cursor: pointer; background: #000; }
        .gallery-item img, .reel-thumbnail { width: 100%; height: 100%; object-fit: cover; }
        .reel-icon { position: absolute; bottom: 5px; left: 5px; color: #fff; font-size: 12px; display: flex; align-items: center; gap: 4px; text-shadow: 0 1px 2px rgba(0,0,0,0.8); }
        .no-content { text-align: center; color: #666; padding: 30px 0; font-size: 14px; width: 100%; }
      `}</style>

      <ProfileHeader onHomeClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })} />

      <main className="flex-grow w-full overflow-y-auto no-scrollbar" ref={scrollRef}>
        <div style={{width:'100%', maxWidth:'500px', margin:'0 auto', paddingTop:'10px', paddingBottom: '100px'}}>
            
            <ProfileInfoCard 
                avatar={displayAvatar}
                nickname={handleNickname}
                username={handleUsername}
                bio={displayBio}
                website={displayWebsite}
                stats={{
                    posts: myPosts.length,
                    followers: followersCount,
                    following: followingCount
                }}
                onAvatarClick={() => setIsPreviewOpen(true)}
                onFollowersClick={() => handleShowFollowList('followers')}
                onFollowingClick={() => handleShowFollowList('following')}
                onEditClick={() => navigate('/edit-profile')}
                onShareClick={() => alert('Compartilhar')}
            />

            <div className="profile-tabs-container">
                <ProfileTabNav 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    hasProducts={myProducts.length > 0}
                />

                <div className="tab-content">
                    {activeTab === 'posts' && (
                        <div className="post-list animate-fade-in px-3">
                            {myPosts.filter(p => p.type === 'text' || p.type === 'poll').length > 0 ? 
                                myPosts.filter(p => p.type === 'text' || p.type === 'poll').map(post => (
                                    <FeedItem 
                                        key={post.id} 
                                        post={post} 
                                        currentUserId={user?.id} 
                                        onLike={handleLike} 
                                        onDelete={(e, id) => deletePost(id, e)} 
                                        onUserClick={handleUserClick} 
                                        onCommentClick={(id) => navigate(`/post/${id}`)} 
                                        onShare={handleShare} 
                                        onVote={handleVote} 
                                        onCtaClick={(l) => l?.startsWith('http') ? window.open(l,'_blank') : navigate(l||'')} 
                                    />
                                )) : <div className="no-content">Sem posts.</div>}
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <ProfileProductsGrid 
                            products={myProducts}
                            onProductClick={(id) => navigate(`/marketplace/product/${id}`)}
                        />
                    )}

                    {activeTab === 'fotos' && (
                        <div className="post-list animate-fade-in px-3">
                            {myPosts.filter(p => p.type === 'photo').length > 0 ? 
                                myPosts.filter(p => p.type === 'photo').map(post => (
                                    <FeedItem 
                                        key={post.id} 
                                        post={post} 
                                        currentUserId={user?.id} 
                                        onLike={handleLike} 
                                        onDelete={(e, id) => deletePost(id, e)} 
                                        onUserClick={handleUserClick} 
                                        onCommentClick={(id) => navigate(`/post/${id}`)} 
                                        onShare={handleShare} 
                                        onVote={handleVote} 
                                        onCtaClick={(l) => l?.startsWith('http') ? window.open(l,'_blank') : navigate(l||'')} 
                                    />
                                )) : <div className="no-content">Sem fotos.</div>}
                        </div>
                    )}

                    {activeTab === 'reels' && (
                        <ProfileReelsGrid 
                            reels={myPosts.filter(p => p.type === 'video')}
                            onReelClick={(post) => navigate(`/reels/${post.id}`, { state: { authorId: post.authorId } })}
                            onDelete={(id, e) => deletePost(id, e)}
                        />
                    )}
                </div>
            </div>
        </div>
      </main>

      <Footer />

      <FollowListModal 
        type={followListType} 
        data={followListData} 
        onClose={closeFollowList} 
        onUserClick={navigateToUserProfile} 
      />
      
      <AvatarPreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        imageSrc={displayAvatar || ''} 
        username={handleNickname || ''} 
      />
    </div>
  );
};
