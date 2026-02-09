
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/authService';
import { postService } from '@/services/postService';
import { relationshipService } from '@/services/relationshipService';
import { marketplaceService } from '@/services/marketplaceService';
import { Post, User, MarketplaceItem } from '@/types';
import { useModal } from '@/components/ModalSystem';

export const useProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showConfirm } = useModal();

  const [activeTab, setActiveTab] = useState('posts');
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [myProducts, setMyProducts] = useState<MarketplaceItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followListType, setFollowListType] = useState<'followers' | 'following' | null>(null);
  const [followListData, setFollowListData] = useState<any[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const loadProfileData = useCallback(() => {
      // TODO: This whole function is synchronous and uses services that directly access the DB.
      // It needs to be refactored to use async API calls.
      const currentUser = authService.getCurrentUser();
      if (!currentUser) return;

      setUser(currentUser);
      
      const storedPosts = postService.getUserPosts(currentUser.id) || [];
      setMyPosts(storedPosts.sort((a, b) => b.timestamp - a.timestamp));
      
      const storedProducts = marketplaceService.getItems().filter(i => i.sellerId === currentUser.email || i.sellerId === currentUser.id) || [];
      setMyProducts(storedProducts.sort((a, b) => b.timestamp - a.timestamp));
      
      if (currentUser.profile && currentUser.profile.name) {
          const followers = relationshipService.getFollowers(currentUser.profile.name);
          setFollowersCount(followers.length);
      }
      if (currentUser.id) {
          const following = relationshipService.getFollowing(currentUser.id);
          setFollowingCount(following.length);
      }
  }, []);

  useEffect(() => {
      if (location.state && (location.state as any).activeTab) { 
          setActiveTab((location.state as any).activeTab); 
      }
  }, [location.state]);

  useEffect(() => {
    const userEmail = authService.getCurrentUserEmail();
    if (!userEmail) { 
        navigate('/'); 
        return; 
    }
    loadProfileData();

    // [REMOVED] Direct database subscription was a major architectural flaw.
    // TODO: Implement a proper real-time update mechanism, like a WebSocket listener,
    // to refresh profile data when underlying data changes.
    // const unsubPosts = db.subscribe('posts', loadProfileData);
    // const unsubRels = db.subscribe('relationships', loadProfileData);
    // const unsubUsers = db.subscribe('users', loadProfileData);
    // return () => { unsubPosts(); unsubRels(); unsubUsers(); };
  }, [navigate, loadProfileData]);

  const deletePost = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Replace with async API call
    if (await showConfirm("Excluir Post", "Tem certeza que deseja excluir este post permanentemente?", "Excluir", "Cancelar")) {
        await postService.deletePost(postId);
    }
  };

  const handleLike = (id: string) => {
    // TODO: Replace with async API call and optimistic update
    postService.toggleLike(id);
    setMyPosts(prev => prev.map(post => { if (post.id === id) { const newLiked = !post.liked; return { ...post, liked: newLiked, likes: post.likes + (post.liked ? -1 : 1) }; } return post; }));
  };

  const handleShowFollowList = (type: 'followers' | 'following') => {
      if (!user) return;
      // TODO: Replace with async API call
      let list: any[] = [];
      if (type === 'followers' && user.profile?.name) { list = relationshipService.getFollowers(user.profile.name); }
      else if (type === 'following' && user.id) { list = relationshipService.getFollowing(user.id); }
      setFollowListData(list);
      setFollowListType(type);
  };

  const closeFollowList = () => { setFollowListType(null); setFollowListData([]); };

  const navigateToUserProfile = (username: string) => {
      closeFollowList();
      const clean = username.replace('@', '');
      navigate(`/user/${clean}`);
  };

  const handleShare = async (post: Post) => {
      const url = `${window.location.origin}/#/post/${post.id}`;
      if (navigator.share) { 
          try { 
              await navigator.share({ title: `Post de ${post.username}`, text: (post.text || '').substring(0, 100), url: url }); 
          } catch (err) {}
      } else { 
          navigator.clipboard.writeText(url); 
          alert('Link copiado!'); 
      }
      // TODO: Replace with async API call
      postService.incrementShare(post.id);
  };

  const handleUserClick = (username: string) => { navigate(`/user/${username.replace('@','')}`); };
  
  const handleVote = (postId: string, index: number) => {
      // TODO: Replace with async API call and optimistic update
      setMyPosts(prev => prev.map(p => { if (p.id === postId && p.pollOptions && p.votedOptionIndex == null) { const newOptions = [...p.pollOptions]; newOptions[index].votes += 1; return { ...p, pollOptions: newOptions, votedOptionIndex: index }; } return p; }));
  };

  const handleNickname = user?.profile?.nickname || user?.profile?.name || "Usuário"; 
  const handleUsername = user?.profile?.name ? `@${user.profile.name}` : "@usuario";
  const displayBio = user?.profile?.bio || "Sem biografia definida.";
  const displayAvatar = user?.profile?.photoUrl;
  const displayWebsite = user?.profile?.website;

  return {
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
  };
};
