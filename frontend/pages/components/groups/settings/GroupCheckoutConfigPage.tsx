
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// --- Hooks de Features ---
// Corrigido de '../../../' para '../../../../' para alcançar o diretório raíz de features.
import { useCheckoutConfig } from '../../../../features/groups/hooks/settings/useCheckoutConfig';

// --- Componentes Modulares de Features ---
// Corrigidos de '../../../' para '../../../../' para refletir a profundidade correta.
import { CheckoutConfigHeader } from '../../../../features/groups/components/settings/checkout/CheckoutConfigHeader';
import { CheckoutStepSelector } from '../../../../features/groups/components/settings/checkout/CheckoutStepSelector';
import { CheckoutMethodItem } from '../../../../features/groups/components/settings/checkout/CheckoutMethodItem';
import { CheckoutLivePreview } from '../../../../features/groups/components/settings/checkout/CheckoutLivePreview';

/**
 * Componente: GroupCheckoutConfigPage
 * 
 * Propósito: Permite que administradores de grupo configurem os métodos de pagamento 
 * disponíveis no checkout para membros VIP. A configuração é granular, permitindo 
 * a seleção de provedores (Stripe, PayPal) e métodos específicos por país.
 */
export const GroupCheckoutConfigPage: React.FC = () => {
    // --- Hooks ---
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    // --- Lógica de Negócios (do Hook) ---
    // O hook `useCheckoutConfig` abstrai toda a complexidade de estado e lógica.
    const {
        group,
        loading,
        provider,
        country,
        availableMethods,      // Métodos disponíveis para a região/provedor selecionado.
        enabledMethods,        // Métodos atualmente habilitados (para o estado do form).
        previewEnabledMethods, // Métodos habilitados para a preview (após salvar).
        handleSelectProvider,
        handleSelectCountry,
        toggleMethod,          // Liga/desliga um método de pagamento.
        handleSave,
        activateAllInRegion    // Ativa todos os métodos disponíveis para a região.
    } = useCheckoutConfig(id);

    // --- Renderização de Carregamento ---
    if (loading || !group) return null;

    // --- Renderização ---
    return (
        <div className="min-h-screen bg-[#0a0c10] text-white font-['Inter'] flex flex-col">
            <CheckoutConfigHeader onBack={() => navigate(-1)} />

            <main className="flex-1 overflow-y-auto p-5 pb-32 max-w-[600px] mx-auto w-full no-scrollbar">
                {/* Card de Dica Estratégica */}
                <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-3xl mb-8 animate-fade-in">
                    <p className="text-xs text-blue-300 leading-relaxed italic text-center">
                        "Personalize o checkout conforme a região do seu tráfego. Métodos locais como ACH nos EUA ou UPI na Índia convertem até 40% mais."
                    </p>
                </div>

                {/* Passo 1 e 2: Seleção de Provedor e País */}
                <CheckoutStepSelector 
                    provider={provider}
                    country={country}
                    onSelectProvider={handleSelectProvider}
                    onSelectCountry={handleSelectCountry}
                />

                {/* Lista de Métodos de Pagamento para a Região */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-4">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[2px] ml-1">Métodos da Região</h4>
                        <button 
                            onClick={activateAllInRegion}
                            className="text-[9px] font-black text-[#00c2ff] uppercase tracking-widest hover:underline"
                        >
                            Ativar Todos
                        </button>
                    </div>
                    <div className="space-y-2.5">
                        {availableMethods.map(m => (
                            <CheckoutMethodItem 
                                key={`${m.id}-${country}`}
                                {...m}
                                isActive={enabledMethods.includes(m.id)}
                                onToggle={toggleMethod}
                            />
                        ))}
                    </div>
                </div>

                {/* Preview do Checkout em Tempo Real */}
                <CheckoutLivePreview enabledMethods={previewEnabledMethods} />

                {/* Botão Fixo para Salvar */}
                <button className="btn-save-fixed" onClick={handleSave}>
                    Salvar Configurações
                </button>
            </main>
        </div>
    );
};
