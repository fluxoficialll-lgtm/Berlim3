// Este arquivo define a tela onde os usuários selecionam o conteúdo (posts ou reels) que desejam impulsionar.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Serviços para buscar dados de posts e autenticação.
import { postService } from '../services/postService';
import { authService } from '../services/authService';
import { Post } from '../types';

// Componentes de UI com caminhos corrigidos.
import { AdSelectionHeader } from './components/ads/selection/AdSelectionHeader';
import { AdContentTabs } from './components/ads/selection/AdContentTabs';
import { PostSelectionCard } from './components/ads/selection/PostSelectionCard';
import { ReelSelectionCard } from './components/ads/selection/ReelSelectionCard';

/**
 * Componente: AdContentSelector
 * Propósito: Permitir que o usuário navegue e selecione um de seus posts ou reels existentes para impulsionar em uma campanha.
 */
export const AdContentSelector: React.FC = () => {
    const navigate = useNavigate();
    // Estado para controlar a aba ativa (Posts ou Reels).
    const [activeTab, setActiveTab] = useState<'posts' | 'reels'>('posts');
    // Estado para armazenar o conteúdo (posts e reels) do usuário.
    const [content, setContent] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    // Efeito para carregar o conteúdo do usuário ao montar o componente.
    useEffect(() => {
        const loadContent = async () => {
            const user = authService.getCurrentUser();
            if (user) {
                // Busca todos os posts do usuário através do serviço.
                const allPosts = await postService.getUserPosts(user.id);
                setContent(allPosts);
            }
            setLoading(false);
        };
        loadContent();
    }, []);

    // Filtra o conteúdo com base na aba ativa.
    const filteredContent = content.filter(p => 
        activeTab === 'reels' ? p.type === 'video' : (p.type === 'photo' | p.type === 'text')
    );

    // Navega para a próxima etapa do fluxo, passando o conteúdo selecionado.
    const handleSelect = (post: Post) => {
        navigate('/ad-placement-selector', { state: { boostedContent: post } });
    };

    return (
        <div className="min-h-screen bg-[#0a0c10] text-white font-['Inter'] flex flex-col">
            <AdSelectionHeader 
                onBack={() => navigate('/ad-type-selector')} 
                title="Escolher Conteúdo" 
            />

            {/* Abas para alternar entre Posts e Reels */}
            <AdContentTabs 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
            />

            <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
                {/* Indicador de carregamento */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 opacity-40">
                        <i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff] mb-2"></i>
                        <p className="text-[10px] font-black uppercase tracking-widest">Sincronizando Galeria...</p>
                    </div>
                // Renderiza o conteúdo se houver, caso contrário, mostra mensagem de estado vazio.
                ) : filteredContent.length > 0 ? (
                    <div className="animate-fade-in">
                        {activeTab === 'posts' ? (
                            <div className="flex flex-col p-4 max-w-[500px] mx-auto w-full px-3">
                                {filteredContent.map(p => (
                                    <PostSelectionCard 
                                        key={p.id} 
                                        post={p} 
                                        onSelect={handleSelect} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-[2px] p-[2px]">
                                {filteredContent.map(p => (
                                    <ReelSelectionCard 
                                        key={p.id} 
                                        reel={p} 
                                        onSelect={handleSelect} 
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-40 opacity-20 text-center px-12">
                        <i className={`fa-solid ${activeTab === 'reels' ? 'fa-video-slash' : 'fa-file-circle-exclamation'} text-5xl mb-6`}></i>
                        <p className="text-sm font-bold uppercase tracking-widest leading-relaxed">
                            Você ainda não publicou nenhum {activeTab === 'reels' ? 'reel' : 'post'} para impulsionar.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};