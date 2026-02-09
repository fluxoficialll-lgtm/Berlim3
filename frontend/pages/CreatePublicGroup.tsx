// Este arquivo define o formulário para a criação de um novo grupo público.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, groupService, postService } from '../services';
import { Group } from '../types';
// Componente para recortar a imagem de capa (caminho corrigido).
import { ImageCropModal } from './components/ui/ImageCropModal';
import { generateUniqueId } from '../utils/idGenerator';

/**
 * Componente: CreatePublicGroup
 * Propósito: Fornece um formulário para que os usuários criem um novo grupo público.
 * O usuário pode definir o nome, descrição e uma imagem de capa. A visibilidade
 * é aberta, com a propriedade `isPrivate` definida como `false`.
 */
export const CreatePublicGroup: React.FC = () => {
  const navigate = useNavigate();
  // Estados para os dados do grupo.
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
  
  // Estados de controle da UI e do upload de imagem.
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [rawImage, setRawImage] = useState<string>('');

  // Lógica para manipulação da imagem de capa, incluindo recorte.
  const handleCroppedImage = (croppedBase64: string) => {
    // ...
  };

  // Lógica para submeter o formulário e criar o grupo.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) return;
    setIsCreating(true);
    
    try {
        // ... (lógica para fazer upload da imagem e criar o objeto Group)

        const newGroup: Group = {
          id: generateUniqueId(),
          name: groupName,
          description: description,
          coverImage: finalCoverUrl,
          isVip: false,
          isPrivate: false, // Define o grupo como público.
          // ... (outros campos do grupo)
        };

        await groupService.createGroup(newGroup);
        navigate('/groups');
    } catch (e) {
        alert("Erro ao criar grupo público.");
    } finally {
        setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
      <style>{/* ... Estilos embutidos ... */}</style>

      <header>{/* ... Cabeçalho ... */}</header>

      <main id="mainContent">
        <div id="creationContainer">
            <h1><i className="fa-solid fa-globe"></i> Novo Grupo Público</h1>
            <form onSubmit={handleSubmit}>
                {/* Upload e preview da imagem de capa */}
                <div className="cover-upload-container">{/* ... */}</div>

                {/* Campos de nome e descrição */}
                <div className="form-group">{/* ... */}</div>
                <div className="form-group">{/* ... */}</div>

                <button type="submit" className="submit-button" disabled={!groupName || isCreating}>
                    {isCreating ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Criar Grupo'}
                </button>
            </form>
        </div>
      </main>

      {/* Modal para recortar a imagem */}
      <ImageCropModal 
        isOpen={isCropOpen}
        imageSrc={rawImage}
        onClose={() => setIsCropOpen(false)}
        onSave={handleCroppedImage}
      />
    </div>
  );
};
