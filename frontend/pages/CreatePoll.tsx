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

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreatePoll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreateDisabled || !currentUser) return;

    const pollOptions: PollOption[] = options
      .filter(opt => opt.trim() !== '')
      .map(opt => ({ option: opt, votes: 0 }));

    const newPost: Post = {
        id: generateUniqueId(),
        userId: currentUser.uid,
        username: currentUser.profile.name ?? 'Unknown User',
        avatar: currentUser.profile.photoUrl || "https://randomuser.me/api/portraits/men/32.jpg",
        content: question,
        type: 'poll',
        pollOptions: pollOptions,
        pollDuration: duration,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
    };

    await postService.createPost(newPost);
    navigate('/feed');
  };

  return (
    <div className="h-screen flex flex-col overflow-y-auto overflow-x-hidden font-['Inter']" style={{ background: 'radial-gradient(circle at 5% 5%, #0c0f14, #0a0c10)', color: '#fff' }}>
        <header className="flex items-center justify-between p-4">
            <button onClick={() => navigate(-1)} className="text-white text-2xl">
                <i className="fa-solid fa-times"></i>
            </button>
            <h1 className="text-xl font-bold">Criar Enquete</h1>
            <button form="pollForm" type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold" disabled={isCreateDisabled}>
                Postar
            </button>
        </header>

        <main className="flex-grow p-4">
            <form id="pollForm" onSubmit={handleCreatePoll}>
                <div className="poll-container bg-gray-800 p-4 rounded-lg">
                    <textarea 
                        id="pollQuestion" 
                        className="poll-question bg-transparent w-full resize-none text-lg placeholder-gray-400" 
                        placeholder="Qual é o tópico da sua enquete?"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    ></textarea>

                    <div id="optionsContainer" className="mt-4 space-y-2">
                        {options.map((opt, index) => (
                            <div className="poll-option flex items-center" key={index}>
                                <input 
                                  type="text" 
                                  className="bg-gray-700 w-full px-3 py-2 rounded-md placeholder-gray-500" 
                                  placeholder={`Opção ${index + 1}`} 
                                  value={opt}
                                  onChange={(e) => handleOptionChange(index, e.target.value)}
                                />
                                {options.length > 2 && (
                                  <button type="button" onClick={() => handleRemoveOption(index)} className="ml-2 text-red-500">
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <button type="button" id="addOptionBtn" onClick={handleAddOption} disabled={options.length >= 5} className="mt-4 text-blue-500 disabled:text-gray-500">
                        <i className="fa-solid fa-plus-circle"></i> Adicionar Opção
                    </button>
                </div>

                <div className="options-container mt-6">
                    <h2 className="text-lg font-bold mb-2">Duração da Enquete</h2>
                    <div className="flex space-x-2">
                        {['1 Hora', '12 Horas', '24 Horas', '3 Dias', '7 Dias'].map(d => (
                            <button key={d} type="button" onClick={() => setDuration(d)} className={`px-3 py-1 rounded-full ${duration === d ? 'bg-blue-500' : 'bg-gray-700'}`}>
                                {d}
                            </button>
                        ))}
                    </div>
                </div>
            </form>
        </main>
    </div>
  );
};
