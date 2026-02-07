import { Post } from '../types';
import { reelsService } from '../services/reelsService';
import { postService } from '../services/postService';
import { useModal } from '../components/ModalSystem';

export const useReelInteractions = (setReels: React.Dispatch<React.SetStateAction<Post[]>>) => {
  const { showConfirm } = useModal();

  const handleLike = async (reelId: string) => {
    setReels(prevReels => prevReels.map(r => {
        if (r.id === reelId) {
            const newLiked = !r.liked;
            const newLikes = r.likes + (newLiked ? 1 : -1);
            return { ...r, liked: newLiked, likes: newLikes };
        }
        return r;
    }));
    await reelsService.toggleLike(reelId);
  };

  const handleDeleteReel = async (reelId: string) => {
      const confirmed = await showConfirm("Excluir Reel", "Tem certeza que deseja excluir este reel? A ação não pode ser desfeita.", "Excluir", "Cancelar");
      if (confirmed) {
          await postService.deletePost(reelId);
          setReels(prev => prev.filter(r => r.id !== reelId));
      }
  };

  const handleShare = async (reel: Post) => {
      const url = `${window.location.origin}/#/post/${reel.id}`;
      if (navigator.share) {
          try { 
              await navigator.share({ title: 'Confira este Reel!', url: url }); 
              postService.incrementShare(reel.id); 
          } catch (err) {}
      } else {
          navigator.clipboard.writeText(url); 
          alert("Link copiado!"); 
          postService.incrementShare(reel.id);
      }
  };

  return { handleLike, handleDeleteReel, handleShare };
};
