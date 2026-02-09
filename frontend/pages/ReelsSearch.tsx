// Este arquivo define a página de Busca e Descoberta de Reels.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reelsService } from '../services/reelsService';
import { authService } from '../services/authService';
import { Post } from '../types';

type CategoryFilter = 'relevant' | 'recent' | 'watched' | 'unwatched' | 'liked';

/**
 * Componente: ReelsSearch
 * Propósito: Fornece uma interface de busca e descoberta para os vídeos (Reels). A página
 * contém uma barra de pesquisa com debounce para buscar por termos, e uma barra de filtros
 * com categorias pré-definidas (ex: Relevantes, Recentes, Curtidos). Os resultados da busca,
 * fornecidos pelo `reelsService`, são exibidos em uma grade de duas colunas com miniaturas
 * dos vídeos. O usuário pode clicar em qualquer vídeo para ser levado à visualização em tela
 * cheia (a página de Reels).
 */
export const ReelsSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('relevant');
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  // Efeito com debounce para realizar a busca de forma eficiente.
  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
        const searchResults = reelsService.searchReels(searchTerm, activeCategory);
        setResults(searchResults);
        setLoading(false);
    }, 400); // Debounce de 400ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm, activeCategory]);

  return (
    <div className="min-h-screen bg-[#0c0f14] ... flex flex-col">
      <header>
        <div className="top-row">
            {/* ... Botão de voltar e input de busca ... */}
        </div>
        <div className="filters-row">
            {/* ... Chips de filtro para categorias ... */}
        </div>
      </header>

      <main>
        {loading ? <p>Buscando...</p> : (
            <div className="reels-grid">
                {results.map(reel => (
                    <div key={reel.id} className="reel-card" onClick={() => navigate(`/reels/${reel.id}`)}>
                        <video src={reel.video} muted playsInline />
                        <div className="card-overlay">
                           {/* ... Informações como visualizações e curtidas ... */}
                        </div>
                    </div>
                ))}
            </div>
        )}
        {results.length === 0 && !loading && <p>Nenhum vídeo encontrado.</p>}
      </main>
    </div>
  );
};