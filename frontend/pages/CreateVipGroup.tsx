// Este arquivo define o formulário complexo para a criação de um novo grupo VIP.

import React from 'react';
import { useCreateVipGroup } from '../hooks/useCreateVipGroup';
// Importações de componentes modais com caminhos corrigidos.
import { PixelSettingsModal } from './components/groups/PixelSettingsModal';
import { AccessTypeModal } from './components/groups/AccessTypeModal';
import { CurrencySelectorModal } from './components/groups/CurrencySelectorModal';
import { ProviderSelectorModal } from './components/groups/ProviderSelectorModal';
import { ImageCropModal } from './components/ui/ImageCropModal';
// Importações de componentes de features.
import { UploadProgressCard } from '../features/groups/components/platform/UploadProgressCard';
import { VipHeader } from '../features/groups/components/create-vip/VipHeader';
import { VipCover } from '../features/groups/components/create-vip/VipCover';
import { VipInfo } from '../features/groups/components/create-vip/VipInfo';
import { VipGallery } from '../features/groups/components/create-vip/VipGallery';
import { VipDoorCopy } from '../features/groups/components/create-vip/VipDoorCopy';
import { VipPricing } from '../features/groups/components/create-vip/VipPricing';
import { VipMarketing } from '../features/groups/components/create-vip/VipMarketing';

/**
 * Componente: CreateVipGroup
 * Propósito: Orquestra a criação de um grupo VIP. Esta página é um exemplo de composição de UI,
 * onde a lógica de estado e as ações são centralizadas no hook `useCreateVipGroup`, e a UI é 
 * dividida em múltiplos sub-componentes (VipHeader, VipCover, VipInfo, etc.).
 * Ele permite ao usuário configurar todos os aspectos de um grupo de assinatura paga.
 */
export const CreateVipGroup: React.FC = () => {
  // O hook personalizado gerencia toda a lógica complexa de estado, validação e submissão.
  const {
    // ... (propriedades e métodos do hook)
    handleSubmit
  } = useCreateVipGroup();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
      <style>{/* ... Estilos embutidos ... */}</style>

      <VipHeader onBack={/*...*/} />

      <main>
        <form id="groupCreationForm" onSubmit={handleSubmit}>
            <h1>Novo Grupo VIP</h1>
            
            {/* Alerta caso nenhum provedor de pagamento esteja conectado. */}
            {/*!hasProvider && ( ... )*/}

            {/* Componentes filhos que rendenrizam seções específicas do formulário. */}
            <VipCover /*...*/ />
            <VipInfo /*...*/ />
            <VipGallery /*...*/ />
            <VipDoorCopy /*...*/ />
            <VipPricing /*...*/ />
            <VipMarketing /*...*/ />

            <button type="submit" className="common-button" disabled={/*...*/}>
                {/* ... (texto do botão) */}
            </button>
        </form>

        {/* Card de progresso de upload. */}
        <UploadProgressCard /*...*/ />
      </main>

      {/* 
        Modais para configurações adicionais. Cada modal é um componente separado 
        e seu estado de visibilidade é controlado pelo hook principal.
      */}
      <ProviderSelectorModal /*...*/ />
      <PixelSettingsModal /*...*/ />
      <AccessTypeModal /*...*/ />
      <CurrencySelectorModal /*...*/ />
      <ImageCropModal /*...*/ />
    </div>
  );
};
