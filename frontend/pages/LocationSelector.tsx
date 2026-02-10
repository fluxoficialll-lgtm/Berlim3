// Este arquivo define o seletor de localização.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from '../hooks/useLocation'; // Importa o hook de localização.
import { Spinner } from '../components/ui/Spinner'; // Importa o componente de Spinner.

/**
 * Componente: LocationSelector
 * Propósito: Permite que o usuário selecione sua localização, seja automaticamente via GPS
 * ou manualmente através de uma busca.
 * 
 * Refatorado para usar o hook `useLocation`, que centraliza a lógica de busca e gerenciamento de estado.
 */
export const LocationSelector: React.FC = () => {
  const navigate = useNavigate();
  const { loading, address, searchTerm, setSearchTerm, fetchLocation } = useLocation();

  return (
    <div className="h-screen bg-gray-900 text-white ...">
      <header className="flex items-center justify-between ...">
          <button onClick={() => navigate(-1)} className="text-white">Voltar</button>
          <h1 className="text-lg font-semibold">Adicionar Localização</h1>
          <button onClick={() => navigate('/')} className="text-blue-500">Salvar</button>
      </header>
      <main className="p-4 ...">
          {/* Card Principal: Pede para ativar GPS ou mostra as opções de filtro. */}
          <div className="bg-white/5 ...">
              {loading && <Spinner />} {/* Correção: Mostra um spinner enquanto carrega. */}
              {!loading && !address && (
                  // Estado inicial: Botão para ativar a localização.
                  <div className="text-center">
                      <p>Para ver conteúdo perto de você, ative sua localização.</p>
                      <button onClick={fetchLocation} className="bg-blue-600 ...">Ativar Localização</button>
                  </div>
              )}
              {!loading && address && (
                  // Estado com endereço: Mostra a localização e permite a busca.
                  <div>
                      <p className="text-sm text-gray-400">Localização atual:</p>
                      <p>{address}</p>
                      <input 
                          type="text" 
                          placeholder="Buscar por cidade, estado ou país"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-gray-800 ..." 
                      />
                  </div>
              )}
          </div>
      </main>
    </div>
  );
};