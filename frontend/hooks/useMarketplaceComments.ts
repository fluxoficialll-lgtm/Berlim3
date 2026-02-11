import { useState, useCallback, useEffect } from 'react';
import { Comment } from '@/types';
import { useModal } from '@/components/ModalSystem';
import { API_BASE } from '@/apiConfig';

// ✅ ARQUITETURA NOVA: A lógica de API (mesmo que mock) agora vive aqui.
const COMMENTS_API_URL = (itemId: string) => `${API_BASE}/api/marketplace/items/${itemId}/comments`;

export const useMarketplaceComments = (itemId: string) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { showConfirm } = useModal();

    const fetchComments = useCallback(async () => {
        if (!itemId) return;
        setLoading(true);
        setError(null);
        try {
            // TODO: Implementar a chamada real à API quando o backend estiver pronto.
            // const response = await fetch(COMMENTS_API_URL(itemId));
            // if (!response.ok) throw new Error('API call failed');
            // const fetchedComments: Comment[] = await response.json();
            
            console.warn(`[Mock] Fetching comments for item ${itemId}. API call not implemented.`);
            const fetchedComments: Comment[] = []; // O serviço antigo retornava uma lista vazia.
            setComments(fetchedComments);

        } catch (e) {
            console.error("Failed to fetch comments:", e);
            setError("Não foi possível carregar os comentários.");
        } finally {
            setLoading(false);
        }
    }, [itemId]);

    const addComment = async (text: string) => {
        if (!text.trim()) return;
        try {
            // TODO: Implementar a chamada real à API.
            // await fetch(COMMENTS_API_URL(itemId), {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ text: text.trim() })
            // });

            console.warn(`[Mock] Adding comment. API call not implemented.`);
            
            // Re-fetch comments para atualizar a lista (mesmo que mock).
            await fetchComments();

        } catch (e) {
            console.error("Failed to add comment:", e);
            setError("Não foi possível enviar o seu comentário.");
        }
    };

    const deleteComment = async (commentId: string) => {
        const confirmed = await showConfirm("Excluir comentário", "Deseja realmente excluir este comentário?");
        if (confirmed) {
            try {
                // TODO: Implementar a chamada real à API.
                // await fetch(`${API_BASE}/api/comments/${commentId}`, { // Endpoint genérico para deletar comentário
                //     method: 'DELETE'
                // });

                console.warn(`[Mock] Deleting comment ${commentId}. API call not implemented.`);
                
                // Re-fetch para atualizar a lista.
                await fetchComments();

            } catch (e) {
                console.error("Failed to delete comment:", e);
                setError("Não foi possível excluir o comentário.");
            }
        }
    };

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return {
        comments,
        loading,
        error,
        fetchComments,
        addComment,
        deleteComment
    };
};
