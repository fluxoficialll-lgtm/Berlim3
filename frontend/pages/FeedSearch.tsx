// Este arquivo define a página de busca para o feed.

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';
import { authService } from '../services/authService';
import { Post, User } from '../types';
// Importação de componentes da UI de busca com caminhos corrigidos.
import { FeedSearchHeader } from './components/feed/search/FeedSearchHeader';
import { FeedSearchFilters } from './components/feed/search/FeedSearchFilters';
import { FeedSearchResults } from './components/feed/search/FeedSearchResults';

export type FeedSearchFilter = 'relevant' | 'recent';
export type SearchTab = 'posts' | 'users';

/**
 * Componente: FeedSearch
 * Propósito: Fornece uma interface de busca para o conteúdo da aplicação. Permite aos usuários
 * buscar por posts ou por outros usuários. A página é dividida em três componentes principais:
 * - FeedSearchHeader: A barra de busca e o botão de voltar.
 * - FeedSearchFilters: Abas para alternar entre 'posts' e 'usuários' e filtros de ordenação.
 * - FeedSearchResults: Exibe os resultados da busca de forma contextual.
 */
export const FeedSearch: React.FC = () => {
    const navigate = useNavigate();
    
    // Estados para controlar o termo de busca, a aba ativa e o filtro.
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<SearchTab>('posts');
    const [filter, setFilter] = useState<FeedSearchFilter>('relevant');
    
    // Estados para armazenar os resultados da busca e o estado de carregamento.
    const [postResults, setPostResults] = useState<Post[]>([]);
    const [userResults, setUserResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    
    const currentUser = authService.getCurrentUser();

    // Função para executar a busca, chamada com um debounce.
    const handleSearch = useCallback(async (query: string, tab: SearchTab) => {
        if (!query.trim()) {
            setPostResults([]);
            setUserResults([]);
            return;
        }
        setLoading(true);
        try {
            if (tab === 'posts') {
                const posts = await postService.searchPosts(query);
                setPostResults(posts || []);
                setUserResults([]);
            } else if (tab === 'users') {
                const users = await authService.searchUsers(query);
                setUserResults(users || []);
                setPostResults([]);
            }
        } catch (error) {
            console.error("Search failed:", error);
            setPostResults([]);
            setUserResults([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Efeito para disparar a busca com debounce sempre que o termo ou a aba mudam.
    useEffect(() => {
        // Correção: A função de busca agora é chamada com os parâmetros corretos.
        const timeout = setTimeout(() => handleSearch(searchTerm, activeTab), 400);
        return () => clearTimeout(timeout);
    }, [searchTerm, activeTab, handleSearch]);

    // Memoriza a ordenação dos posts para evitar re-cálculos desnecessários.
    const sortedPosts = useMemo(() => {
        if (filter === 'recent') {
            return [...postResults].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        }
        // Lógica de relevância simples: posts com mais engajamento (curtidas + comentários) aparecem primeiro.
        return [...postResults].sort((a, b) => {
            const scoreA = (a.likes || 0) + (a.comments || 0) * 2;
            const scoreB = (b.likes || 0) + (b.comments || 0) * 2;
            return scoreB - scoreA;
        });
    }, [postResults, filter]);

    return (
        <div className="h-screen bg-[#0a0c10] text-white font-['Inter'] flex flex-col overflow-hidden">
            {/* Componente de cabeçalho com o input de busca. */}
            <FeedSearchHeader 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onBack={() => navigate(-1)} // Correção: Sintaxe corrigida e funcionalidade implementada.
                loading={loading}
            />
            
            {/* Componente de filtros (abas e ordenação). */}
            <FeedSearchFilters 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                activeFilter={filter}
                onFilterChange={setFilter}
                show={searchTerm.trim().length > 0}
            />

            {/* Container principal que exibe os resultados da busca. */}
            <main className="flex-1 overflow-y-auto no-scrollbar">
                <FeedSearchResults 
                    activeTab={activeTab}
                    postResults={sortedPosts}
                    userResults={userResults}
                    loading={loading}
                    searchTerm={searchTerm}
                    currentUser={currentUser}
                />
            </main>
        </div>
    );
};