// Este arquivo define o formulário para a criação de uma nova enquete.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';
import { authService } from '../services/authService';
import { Post, PollOption } from '../types';
import { generateUniqueId } from '../utils/idGenerator';

/**
 * Componente: CreatePoll
 * Propósito: Fornece uma interface para que os usuários criem e publiquem uma nova enquete no feed.
 * Permite definir uma pergunta, adicionar até 5 opções de resposta e configurar a duração da enquete.
 */
export const CreatePoll: React.FC = () => {
  const navigate = useNavigate();
  // Estados para os dados da enquete.
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']); // Inicia com 2 opções vazias.
  const [duration, setDuration] = useState('24 Horas');
  const [isCreateDisabled, setIsCreateDisabled] = useState(true);

  // Carrega informações do usuário logado.
  const currentUser = authService.getCurrentUser();
  const username = currentUser?.profile?.name ? `@${currentUser.profile.name}` : "@usuario";
  const avatar = currentUser?.profile?.photoUrl || "https://randomuser.me/api/portraits/men/32.jpg";

  // Efeito para habilitar/desabilitar o botão de criar com base no preenchimento do formulário.
  useEffect(() => {
    const questionFilled = question.trim().length > 0;
    const filledOptionsCount = options.filter(opt => opt.trim().length > 0).length;
    setIsCreateDisabled(!(questionFilled && filledOptionsCount >= 2));
  }, [question, options]);

  // Lógica para adicionar/remover opções, alterar duração e submeter o formulário.
  // O código original detalhado permanece o mesmo, mas foi omitido aqui para brevidade.

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreateDisabled) return;

    // ... (lógica para criar o objeto Post e salvá-lo via postService)

    navigate('/feed');
  };

  return (
    <div className="h-screen flex flex-col overflow-y-auto overflow-x-hidden font-['Inter']" style={{ background: 'radial-gradient(circle at 5% 5%, #0c0f14, #0a0c10)', color: '#fff' }}>
        {/* Estilos CSS embutidos. */}
        <style>{/* ... */}</style>

        <header>
            {/* ... (cabeçalho da página com botão de fechar e título) */}
        </header>

        <main>
            <form id="pollForm" onSubmit={handleCreatePoll}>
                {/* Container para a pergunta e as opções da enquete. */}
                <div className="poll-container">
                    <textarea 
                        id="pollQuestion" 
                        className="poll-question" 
                        placeholder="Qual é o tópico da sua enquete?"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    ></textarea>

                    {/* Mapeia e renderiza os inputs para as opções. */}
                    <div id="optionsContainer">
                        {options.map((opt, index) => (
                            <div className="poll-option" key={index}>{/* ... */}</div>
                        ))}
                    </div>

                    <button type="button" id="addOptionBtn" onClick={/* ... */} disabled={options.length >= 5}>
                        <i className="fa-solid fa-plus-circle"></i> Adicionar Opção
                    </button>
                </div>

                {/* Seção para configurar a duração da enquete. */}
                <div className="options-container">
                    {/* ... */}
                </div>
            </form>
        </main>
    </div>
  );
};