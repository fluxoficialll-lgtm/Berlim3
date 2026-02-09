// Este arquivo define o formulário para a criação de um novo item no marketplace.

import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { marketplaceService } from '../services/marketplaceService';
import { authService } from '../services/authService';
import { postService } from '../services/postService';
import { MarketplaceItem } from '../types';
import { generateUniqueId } from '../utils/idGenerator';

// Definição das categorias disponíveis para seleção no marketplace.
const SELECTABLE_CATEGORIES = [
    // ... (array de categorias)
];

/**
 * Componente: CreateMarketplaceItem
 * Propósito: Fornece uma interface de formulário para os usuários criarem e publicarem
 * um novo produto ou serviço no marketplace. Inclui campos para título, preço, categoria,
 * descrição e upload de múltiplas mídias (imagem de capa, galeria de imagens/vídeo).
 */
export const CreateMarketplaceItem: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { type?: 'paid' | 'organic' } | null;
  const isPaid = state?.type === 'paid'; // Determina se a criação é para um anúncio pago.
  
  // Estados para os campos do formulário.
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Eletrônicos');
  const [locationVal, setLocationVal] = useState('');
  const [description, setDescription] = useState('');
  
  // Estados para o gerenciamento de mídias.
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
  const [additionalMedia, setAdditionalMedia] = useState<{file: File, url: string, type: 'image' | 'video'}[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs para os inputs de arquivo.
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // A lógica de manipulação de formulário, upload de mídia e submissão permanece a mesma.
  // Omitido para brevidade.
  const handleSubmit = async (e: React.FormEvent) => {
    // ... (lógica de criação do item)
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">
      {/* Estilos CSS embutidos. */}
      <style>{/* ... */}</style>

      <header>
        {/* ... (cabeçalho da página com botão de voltar e título) */}
      </header>

      <main>
        <form onSubmit={handleSubmit}>
            {/* Seção de upload de mídia (capa e galeria) */}
            <div className="form-section">
                {/* ... */}
            </div>

            {/* Seção de informações (título, preço, categoria, etc.) */}
            <div className="form-section">
                {/* ... */}
            </div>

            <button type="submit" className="submit-btn" disabled={!title || !price || !coverImage || isSubmitting}>
                {isSubmitting ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Publicar Agora'}
            </button>
        </form>
      </main>
    </div>
  );
};