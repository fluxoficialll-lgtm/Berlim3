
import React, { useState, useEffect } from 'react';
import { syncPayService } from '../../../services/syncPayService';
import { authService } from '../../../services/authService';
import { PaymentProviderConfig } from '../../../types';

interface SyncPayFormProps {
    isConnected: boolean;
    onStatusChange: (providerId: string, connected: boolean) => void;
}

export const SyncPayForm: React.FC<SyncPayFormProps> = ({ isConnected, onStatusChange }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPreferred, setIsPreferred] = useState(localStorage.getItem('flux_preferred_provider') === 'syncpay');
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    useEffect(() => {
        const checkPreferred = () => setIsPreferred(localStorage.getItem('flux_preferred_provider') === 'syncpay');
        window.addEventListener('storage', checkPreferred);
        return () => window.removeEventListener('storage', checkPreferred);
    }, []);

    const handleConnect = async () => {
        setIsLoading(true);
        setFeedback({ type: null, message: '' });

        try {
            // The backend will handle the secure connection logic
            const config: PaymentProviderConfig = { 
                providerId: 'syncpay', 
                isConnected: true 
            };
            
            await authService.updatePaymentConfig(config);
            
            if (!localStorage.getItem('flux_preferred_provider')) {
                localStorage.setItem('flux_preferred_provider', 'syncpay');
                setIsPreferred(true);
            }

            onStatusChange('syncpay', true);
            setFeedback({ type: 'success', message: 'Conectado com sucesso! Redirecionando...' });
            // Optionally, redirect to a confirmation page or back

        } catch (err: any) {
            setFeedback({ type: 'error', message: err.message || 'Falha na conexão com o provedor.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSetPreferred = () => {
        localStorage.setItem('flux_preferred_provider', 'syncpay');
        setIsPreferred(true);
        window.dispatchEvent(new Event('storage'));
    };

    const handleDisconnect = async () => {
        if (!window.confirm("Deseja desconectar o SyncPay? Isso desativará o Pix nos seus grupos VIP.")) return;
        setIsLoading(true);
        try {
            await authService.updatePaymentConfig({ providerId: 'syncpay', isConnected: false });
            if (localStorage.getItem('flux_preferred_provider') === 'syncpay') {
                localStorage.removeItem('flux_preferred_provider');
            }
            onStatusChange('syncpay', false);
        } catch (e) {
            alert("Erro ao desconectar");
        } finally {
            setIsLoading(false);
        }
    };

    if (isConnected) {
        return (
            <div className="animate-fade-in" style={{textAlign:'center', padding:'10px'}}>
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="feedback-msg success !mt-0">
                        <i className="fa-solid fa-circle-check"></i> SyncPay Ativo
                    </div>
                    <button 
                        onClick={handleSetPreferred}
                        className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all ${isPreferred ? 'text-[#00c2ff] border-[#00c2ff]/50 bg-[#00c2ff]/10' : 'text-gray-400 hover:text-[#00c2ff]'}`}
                        title={isPreferred ? "Ativo no Painel" : "Definir como Principal"}
                    >
                        <i className="fa-solid fa-star"></i>
                    </button>
                </div>
                <button className="disconnect-btn" onClick={handleDisconnect} disabled={isLoading}>
                    {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Desconectar Provedor'}
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="p-4 text-center bg-gray-800/20 rounded-lg">
                <p className="text-sm text-gray-400 mb-4">Conecte sua conta SyncPay para começar a receber pagamentos via PIX em seus grupos VIP.</p>
                 <button className="save-btn" onClick={handleConnect} disabled={isLoading}>
                    {isLoading ? <i className="fa-solid fa-circle-notch fa-spin mr-2"></i> : null}
                    {isLoading ? 'Conectando...' : 'Conectar SyncPay'}
                </button>
            </div>
            
            {feedback.message && (
                <div className={`feedback-msg ${feedback.type} mt-4`}>
                    <i className={`fa-solid ${feedback.type === 'success' ? 'fa-check' : 'fa-triangle-exclamation'}`}></i>
                    {feedback.message}
                </div>
            )}
        </div>
    );
};
