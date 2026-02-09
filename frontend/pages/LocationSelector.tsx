// Este arquivo define a página do seletor de localização.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePreciseLocation } from '../hooks/usePreciseLocation';
import { RadiusSelector } from '../features/location/components/RadiusSelector';
import { LocationFilter } from '../types/location.types';

// Tipos para controle de estado interno da página.
type PlacementType = 'feed' | 'reels' | 'marketplace';
type DiscoveryMode = 'territory' | 'custom_radius';

/**
 * Componente: LocationSelector
 * Propósito: Renderiza a página "Explorar Mapa", que permite aos usuários filtrar o conteúdo
 * do aplicativo (Feed, Reels, Mercado) com base em sua localização. Utiliza o hook
 * `usePreciseLocation` para capturar as coordenadas de GPS e gerenciar o estado do filtro.
 * O usuário pode escolher entre filtros de "Território" (cidade, estado, país) ou um
 * "Raio Personalizado". Após configurar o alcance, o usuário aplica o filtro e é redirecionado
 * para a seção de conteúdo escolhida.
 */
export const LocationSelector: React.FC = () => {
  const navigate = useNavigate();
  const { currentFilter, loading, captureGps, updateFilter, clearFilter } = usePreciseLocation();
  
  // Estados para controlar a UI (seção de conteúdo e modo de seleção).
  const [activePlacement, setActivePlacement] = useState<PlacementType>('feed');
  const [mode, setMode] = useState<DiscoveryMode>('territory');

  // Ativa a captura de GPS através do hook.
  const handleCaptureGps = async () => { /* ... */ };

  // Salva o filtro no localStorage e navega para a página de conteúdo selecionada.
  const handleApplyFilter = () => {
    // ... (lógica para salvar a label do filtro e navegar)
    navigate('/feed'); // ou /reels, /marketplace
  };

  const hasAddress = !!currentFilter.targetAddress;

  return (
    <div className="min-h-screen bg-[#0c0f14] ...">
      <header>{/* ... Cabeçalho da página ... */}</header>

      <main className="pt-[90px] ...">
        {/* Card Principal: Pede para ativar GPS ou mostra as opções de filtro. */}
        <div className="bg-white/5 ...">
            {loading && (/* Indicador de carregamento */)}
            {!hasAddress ? (
                // Estado inicial: Botão para ativar a localização.
                <div><button onClick={handleCaptureGps}>Ativar Localização</button></div>
            ) : (
                // Estado com GPS ativo: Mostra opções de território ou raio.
                <div>
                    {mode === 'territory' ? (
                        <div className="territory-grid">{/* Botões Cidade, Estado, País */}</div>
                    ) : (
                        <RadiusSelector /* ... */ />
                    )}
                    <button onClick={() => setMode(mode === 'territory' ? 'custom_radius' : 'territory')}>
                        {/* Alterna entre Território e Raio */}
                    </button>
                </div>
            )}
        </div>

        {/* Card para selecionar onde aplicar o filtro (Feed, Reels, etc.). */}
        {hasAddress && (
            <div className="bg-white/5 ...">{/* ... lista de placements ... */}</div>
        )}

        {/* Botão para confirmar e aplicar o filtro. */}
        {hasAddress && (
            <button onClick={handleApplyFilter}>Confirmar Filtro</button>
        )}

        {/* Botão para limpar o filtro e ver conteúdo global. */}
        <div className="mt-4 ...">
            <button onClick={() => { clearFilter(); /* ... */ }}>Limpar Filtro (Ver Global)</button>
        </div>
      </main>
    </div>
  );
};
