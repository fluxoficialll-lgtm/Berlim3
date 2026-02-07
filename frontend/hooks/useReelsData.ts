import { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { reelsService } from '../services/reelsService';
import { postService } from '../services/postService';
import { authService } from '../services/authService';
import { db } from '@/database';
import { Post } from '../types';
import { useDatabaseSubscription } from './useDatabaseSubscription';

export const useReelsData = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navState = location.state as { authorId?: string } | null;
  const [reels, setReels] = useState<Post[]>([]);

  const loadReels = useCallback(async () => {
    try {
      const userEmail = authService.getCurrentUserEmail();
      const allowAdult = localStorage.getItem('settings_18_plus') === 'true';
      let videoPosts: Post[] = [];

      if (navState?.authorId) {
        videoPosts = reelsService.getReelsByAuthor(navState.authorId, allowAdult);
      } else {
        videoPosts = reelsService.getReels(userEmail || undefined, allowAdult);
        if (id && !videoPosts.find(r => r.id === id)) {
          const specificReel = postService.getPostById(id);
          if (specificReel && specificReel.type === 'video') {
            videoPosts = [specificReel, ...videoPosts];
          }
        }
      }
      setReels(videoPosts);
    } catch (error) {
      console.error("Failed to load reels.", error);
    }
  }, [id, navState?.authorId]);

  useEffect(() => {
    const fetchAndLoad = async () => {
      try {
        await reelsService.fetchReels();
        loadReels();
      } catch (error) {
        console.error("Failed to fetch initial reels.", error);
      }
    };
    fetchAndLoad();
  }, [loadReels]);

  const handlePostsUpdate = useCallback(() => {
    setReels(currentReels => {
      let hasChanged = false;
      const nextReels = currentReels.map(reel => {
        const latestVersion = db.posts.findById(reel.id);
        if (latestVersion && (
          latestVersion.likes !== reel.likes ||
          latestVersion.comments !== reel.comments ||
          latestVersion.views !== reel.views ||
          latestVersion.liked !== reel.liked
        )) {
          hasChanged = true;
          return { ...reel, ...latestVersion };
        }
        return reel;
      });
      return hasChanged ? nextReels : currentReels;
    });
  }, [setReels]);

  useDatabaseSubscription('posts', handlePostsUpdate);

  return { reels, setReels };
};
