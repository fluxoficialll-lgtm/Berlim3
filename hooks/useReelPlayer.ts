import { useState, useEffect, useRef } from 'react';
import { reelsService } from '../services/reelsService';
import { recommendationService } from '../services/recommendationService';
import { authService } from '../services/authService';
import { Post } from '../types';

export const useReelPlayer = (reels: Post[], containerRef: React.RefObject<HTMLDivElement>) => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const viewedReels = useRef<Set<string>>(new Set());
  const startTimeRef = useRef<number>(0);

  const reportWatchTime = (reelId: string) => {
    const userEmail = authService.getCurrentUserEmail();
    if (!reelId || !startTimeRef.current || !userEmail) return;
    const duration = (Date.now() - startTimeRef.current) / 1000;
    const reel = reels.find(r => r.id === reelId);
    if (reel) {
      recommendationService.recordInteraction(userEmail, reel, 'view_time', duration);
    }
    startTimeRef.current = Date.now();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reels.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveReelIndex(index);
          const reel = reels[index];
          if (reel && !viewedReels.current.has(reel.id)) {
            viewedReels.current.add(reel.id);
            reelsService.incrementView(reel.id);
          }
          startTimeRef.current = Date.now();
        }
      });
    }, { threshold: 0.6 });

    const elements = container.querySelectorAll('.reel-container-wrapper');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [reels, containerRef]);

  return { activeReelIndex, reportWatchTime };
};
