import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { postService } from '../services/postService';
import { recommendationService } from '../services/recommendationService';
import { Post } from '../types';
import { useModal } from '../components/ModalSystem';

export const useFeed = () => {
  const navigate = useNavigate();
  const { showConfirm } = useModal();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [uiVisible, setUiVisible] = useState(true);
  const [activeLocationFilter, setActiveLocationFilter] = useState<string | null>(null);

  const [nextCursor, setNextCursor] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 15;

  const lastScrollY = useRef(0);
  const isFetchingRef = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const viewedPostsRef = useRef<Set<string>>(new Set());
  const loaderRef = useRef<HTMLDivElement>(null);

  const currentUser = useMemo(() => authService.getCurrentUser(), []);
  const currentUserId = currentUser?.id;
  const isAdultContentAllowed = useMemo(() => localStorage.getItem('settings_18_plus') === 'true', []);

  const mergePosts = useCallback((newPosts: Post[], reset: boolean = false) => {
    if (!newPosts) return;

    setPosts(prev => {
        const combined = reset ? newPosts : [...prev, ...newPosts];
        const uniqueMap = new Map<string, Post>();

        combined.forEach(p => {
            if (p && p.id && !uniqueMap.has(p.id)) {
                uniqueMap.set(p.id, p);
            }
        });

        const scored = Array.from(uniqueMap.values()).map(p => ({
            p,
            score: recommendationService.scorePost(p, currentUser?.email)
        }));

        return scored.sort((a, b) => b.score - a.score).map(item => item.p);
    });
  }, [currentUser?.email]);

  const fetchPosts = useCallback(async (cursor?: number, reset = false) => {
    if (isFetchingRef.current && !reset) return;
    isFetchingRef.current = true;
    setLoading(true);

    try {
        const storedFilter = localStorage.getItem('feed_location_filter');
        const filterValue = (storedFilter === 'Global' || !storedFilter) ? null : storedFilter;

        const response = await postService.getFeedPaginated({
            limit: PAGE_SIZE,
            cursor: cursor,
            locationFilter: filterValue,
            allowAdultContent: isAdultContentAllowed
        });

        const fetched = (response.data || []).filter(p => p && (p.type !== 'video' || p.isAd));

        if (reset) {
            mergePosts(fetched, true);
        } else if (fetched.length > 0) {
            mergePosts(fetched, false);
        }

        setNextCursor(response.nextCursor);
        setHasMore(!!response.nextCursor && fetched.length > 0);
    } catch (error) {
        console.error("Feed sync error", error);
        setHasMore(false);
    } finally {
        setLoading(false);
        isFetchingRef.current = false;
    }
  }, [isAdultContentAllowed, mergePosts]);

  useEffect(() => {
    const userEmail = authService.getCurrentUserEmail();
    if (!userEmail) {
        navigate('/');
        return;
    }

    const filter = localStorage.getItem('feed_location_filter');
    setActiveLocationFilter(filter);

    // Initial fetch from the server
    fetchPosts(undefined, true);

  }, [navigate, fetchPosts]);

  // Observer for post views
  useEffect(() => {
      if (posts.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  const postId = entry.target.getAttribute('data-post-id');
                  if (postId && !viewedPostsRef.current.has(postId)) {
                      viewedPostsRef.current.add(postId);
                      postService.incrementView(postId);
                      recommendationService.trackImpression(postId);
                  }
              }
          });
      }, { threshold: 0.15 });

      const postElements = document.querySelectorAll('.feed-post-item');
      postElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
  }, [posts]);

  // Observer for infinite scroll
  useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore && !loading && !isFetchingRef.current && nextCursor) {
              fetchPosts(nextCursor);
          }
      }, { root: null, threshold: 0.1 });

      if (loaderRef.current) observer.observe(loaderRef.current);
      return () => observer.disconnect();
  }, [hasMore, nextCursor, fetchPosts, loading]);

  const handleContainerScroll = () => {
      if (!scrollContainerRef.current) return;
      const currentScroll = scrollContainerRef.current.scrollTop;
      setUiVisible(currentScroll <= lastScrollY.current || currentScroll <= 100);
      lastScrollY.current = currentScroll;
  };

  const handlePostLike = async (id: string) => {
      const updatedPost = await postService.toggleLike(id);
      if (updatedPost) {
          setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: updatedPost.liked, likes: updatedPost.likes } : p));
      }
  };

  const handlePostDelete = async (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      if (await showConfirm("Excluir Post", "Deseja excluir permanentemente?", "Excluir", "Cancelar")) {
          await postService.deletePost(id);
          setPosts(prev => prev.filter(p => p.id !== id));
      }
  };

  const handleUserClick = (username: string) => {
      navigate(`/user/${username.replace('@','')}`);
  };

  const handleCommentClick = (id: string) => {
      navigate(`/post/${id}`);
  };

  const handleShare = async (post: Post) => {
      const url = `${window.location.origin}/#/post/${post.id}`;
      if (navigator.share) {
          try { await navigator.share({ title: `Post de ${post.username}`, url }); } catch (err) {}
      } else {
          navigator.clipboard.writeText(url);
          alert('Link copiado!');
      }
      postService.incrementShare(post.id);
  };

  const handleVote = (postId: string, index: number) => {
      postService.voteOnPoll(postId, index);
      setPosts(prev => prev.map(p => {
          if (p.id === postId && p.pollOptions && p.votedOptionIndex == null) {
              const newOptions = [...p.pollOptions];
              newOptions[index].votes += 1;
              return { ...p, pollOptions: newOptions, votedOptionIndex: index, totalVotes: (p.totalVotes || 0) + 1 };
          }
          return p;
      }));
  };

  const handleCtaClick = (link?: string) => {
      if (link?.startsWith('http')) {
          window.open(link, '_blank');
      } else if (link) {
          navigate(link);
      }
  };

  return {
    posts,
    uiVisible,
    activeLocationFilter,
    loading,
    hasMore,
    isMenuOpen,
    setIsMenuOpen,
    scrollContainerRef,
    loaderRef,
    currentUserId,
    handleContainerScroll,
    handlePostLike,
    handlePostDelete,
    handleUserClick,
    handleCommentClick,
_handleShare,
    handleVote,
    handleCtaClick,
    navigate,
  };
};
