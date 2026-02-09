
// React e o hook customizado que orquestra todo o fluxo de criação da campanha.
import React from 'react';
import { useAdCampaignFlow } from '../features/ads/hooks/useAdCampaignFlow';
import { CTA_OPTIONS_CONFIG } from '../features/ads/constants/AdConstants';

// Layout e Cabeçalho do fluxo (caminhos corrigidos).
import { AdFlowHeader } from './components/ads/AdFlowHeader';
import { AdFlowFooter } from './components/ads/AdFlowFooter';

// Componentes que representam cada etapa do fluxo (importados de `features` pois contêm lógica de negócio).
import { CampaignStep } from '../features/ads/components/steps/CampaignStep';
import { AudienceStep } from '../features/ads/components/steps/AudienceStep';
import { CreativeStep } from '../features/ads/components/steps/CreativeStep';

/**
 * Componente: AdPlacementSelector
 * Propósito: Orquestrador principal do fluxo de criação de anúncios. Ele renderiza a etapa atual
 * (Campanha, Público ou Criativo) e utiliza o hook `useAdCampaignFlow` para gerenciar o estado,
 * validação e navegação entre as etapas.
 */
export const AdPlacementSelector: React.FC = () => {
  // O hook `useAdCampaignFlow` abstrai toda a complexidade do formulário multi-etapas.
  const {
    campaign,
    currentStep,
    myGroups,
    selectedContent,
    isLoading,
    previewTab,
    setPreviewTab,
    destinationMode,
    setDestinationMode,
    interestInput,
    setInterestInput,
    fileInputRef,
    isPlacementLocked,
    handleInputChange,
    handlePlacementToggle,
    handleInterestAdd,
    handleInterestRemove,
    handleFileChange,
    nextStep,
    prevStep,
    submitCampaign
  } = useAdCampaignFlow();

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white font-['Inter'] flex flex-col overflow-hidden">
      {/* Estilos dinâmicos para o componente */}
      <style>{/* ... estilos complexos omitidos para brevidade ... */}</style>

      {/* Cabeçalho do fluxo, exibe o progresso */}
      <AdFlowHeader currentStep={currentStep} onBack={prevStep} />

      <main className="no-scrollbar">
          <div className="flow-content animate-fade-in">
              {/* Banner exibido se a campanha for um impulsionamento de conteúdo existente */}
              {selectedContent && (
                  <div className="boost-banner">
                      {/* ... conteúdo do banner ... */}
                  </div>
              )}

              {/* Renderização condicional da etapa atual do fluxo */}
              {currentStep === 'campaign' && (
                  <CampaignStep 
                    campaign={campaign} 
                    onInputChange={handleInputChange} 
                  />
              )}

              {currentStep === 'adset' && (
                  <AudienceStep 
                    campaign={campaign}
                    interestInput={interestInput}
                    setInterestInput={setInterestInput}
                    onInputChange={handleInputChange}
                    onTargetingChange={(f, v) => handleInputChange('targeting', { ...campaign.targeting!, [f]: v })}
                    addInterest={handleInterestAdd} 
                    removeInterest={handleInterestRemove}
                    onTogglePlacement={handlePlacementToggle}
                    isPlacementLocked={isPlacementLocked}
                    myGroups={myGroups}
                  />
              )}

              {currentStep === 'ad' && (
                  <CreativeStep 
                    campaign={campaign}
                    previewTab={previewTab}
                    setPreviewTab={setPreviewTab}
                    destinationMode={destinationMode}
                    setDestinationMode={setDestinationMode}
                    onInputChange={handleInputChange}
                    onNestedChange={(p, f, v) => handleInputChange(p, { ...campaign[p] as any, [f]: v })}
                    onPlacementCreativeChange={(p, u, t) => handleInputChange('placementCreatives', { ...campaign.placementCreatives, [p]: { mediaUrl: u, mediaType: t } })}
                    myGroups={myGroups}
                    selectedContent={selectedContent}
                    fileInputRef={fileInputRef}
                    onFileChange={handleFileChange}
                    onCtaUpdate={(p, l) => handleInputChange('placementCtas', { ...campaign.placementCtas, [p]: l })}
                    isUrlAllowed={true}
                    isGroupAllowed={true}
                    ctaOptions={CTA_OPTIONS_CONFIG}
                  />
              )}
          </div>
      </main>

      {/* Rodapé com botões de navegação (Anterior, Próximo, Finalizar) */}
      <AdFlowFooter 
        currentStep={currentStep} 
        isLoading={isLoading} 
        onPrev={prevStep} 
        onNext={nextStep} 
        onSubmit={submitCampaign} 
      />
    </div>
  );
};