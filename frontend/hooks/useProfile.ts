// frontend/hooks/useProfile.ts

import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import { postService } from '../services/postService';
import { User, Post } from '../types';

/**
 * Hook: useProfile
 * Propósito: Gerencia os dados e a lógica da página de perfil de um usuário.
 *
 * Responsabilidades:
 * - Buscar os dados do perfil do usuário (informações, posts, etc.).
 * - Gerenciar o estado de carregamento.
 * - Fornecer os dados para o componente de UI.
 */
export const useProfile = (username: string) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    const fetchProfileData = useCallback(async () => {
        setLoading(true);
        try {
            // Busca os dados do usuário pelo username.
            const profileUser = await authService.getUserByUsername(username);
            setUser(profileUser);

            if (profileUser) {
                // Busca os posts do usuário.
                const userPosts = await postService.getPostsByUser(profileUser.id);
                setPosts(userPosts);
            }
        } catch (error) {
            console.error("Erro ao buscar dados do perfil:", error);
        } finally {
            setLoading(false);
        }
    }, [username]);

    useEffect(() => {
        if (username) {
            fetchProfileData();
        }
    }, [username, fetchProfileData]);

    // Retorna os dados e o estado para o componente.
    return {
        loading,
        user,
        posts,
    };
};