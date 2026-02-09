// Este arquivo define a página de edição de perfil do usuário.

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { postService } from '../services/postService';
import { AuthError, UserProfile } from '../types';
// TODO: Acesso direto ao banco de dados. Considerar mover para um service.
// import { db } from '@/database';
// Importação do componente de recorte de imagem com caminho corrigido.
import { ImageCropModal } from './components/ui/ImageCropModal';

/**
 * Componente: EditProfile
 * Propósito: Permite que o usuário logado edite suas informações de perfil, como nome de usuário,
 * apelido, biografia e foto. Inclui validação para o nome de usuário e utiliza um modal
 * para recortar a imagem de perfil antes do upload.
 * Nota de Refatoração: A lógica de atualização dos posts do usuário (`db.posts.getAll()`) está
 * diretamente no componente. Idealmente, isso deveria ser abstraído para um service, 
 * como `postService.updateUserMetadataInPosts(userId, newProfile)`.
 */
export const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estado para os dados do formulário.
  const [formData, setFormData] = useState<UserProfile>({ /*...*/ });
  
  // Estados de controle da UI.
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [rawImage, setRawImage] = useState<string>('');

  // Carrega os dados do perfil do usuário atual.
  useEffect(() => {
    // ... (Lógica para carregar dados do authService)
  }, [navigate]);

  // Lida com o recorte e seleção da imagem de perfil.
  const handleCroppedImage = (croppedBase64: string) => {
    // ...
  };

  // Lida com a submissão do formulário.
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // ... (Validação, upload da imagem, e atualização do perfil via authService)

      try {
          // ... (Lógica principal de atualização)

          // Sincronização de metadados em posts (ponto para refatoração)
          // const allPosts = db.posts.getAll();
          // ...

          navigate('/profile', { replace: true });
      } catch (err: any) {
          // ... (Tratamento de erros)
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
        <style>{/* ... Estilos embutidos ... */}</style>
        <header>{/* ... Cabeçalho ... */}</header>
        <main>
            <div className="avatar-section">{/* ... */}</div>
            <form onSubmit={handleSubmit}>
                <div className="input-group">{/* ... Apelido ... */}</div>
                <div className="input-group">{/* ... Nome de Usuário ... */}</div>
                <div className="input-group">{/* ... Biografia ... */}</div>
                <button type="submit" className="save-btn" disabled={loading}>{/* ... */}</button>
            </form>
        </main>
        <ImageCropModal isOpen={isCropOpen} imageSrc={rawImage} onClose={() => setIsCropOpen(false)} onSave={handleCroppedImage} />
    </div>
  );
};
