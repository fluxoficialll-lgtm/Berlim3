
import React from 'react';
import { useLogin } from '../../hooks/useLogin'; // ✅ ARQUITETURA NOVA

// Componentes de UI
import { LoginInitialCard } from '../features/auth/components/LoginInitialCard';
import { LoginEmailCard } from '../features/auth/components/LoginEmailCard';
import { Spinner } from '../components/ui/Spinner'; // Supondo que exista um spinner

/**
 * ✅ ARQUITETURA NOVA: Página de Login refatorada.
 * A lógica foi movida para o hook `useLogin`.
 */
export const Login: React.FC = () => {
    const {
        isLoading,
        error,
        showEmailForm,
        setShowEmailForm,
        loginWithGoogle,
        loginWithEmail,
        setError,
    } = useLogin();

    // Efeito para inicializar o botão do Google (pode permanecer aqui ou ir para o hook)
    React.useEffect(() => {
        // A lógica de inicialização do Google SDK pode ser complexa e acoplada ao DOM,
        // então mantê-la aqui pode ser uma separação de responsabilidade razoável.
        // No entanto, ela deve ser acionada pelo estado do hook.
        if (!showEmailForm) {
            // @ts-ignore
            google.accounts.id.initialize({
                client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // Deve vir de uma variável de ambiente
                callback: (response: any) => loginWithGoogle(response.credential)
            });
            // @ts-ignore
            google.accounts.id.renderButton(
                document.getElementById('google-signin-btn'),
                { theme: 'outline', size: 'large' } 
            );
        }
    }, [showEmailForm, loginWithGoogle]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4">
            <div className="relative w-full max-w-sm bg-white/5 backdrop-blur-2xl rounded-2xl shadow-lg overflow-hidden">
                
                {error && (
                    <div className="bg-red-500/80 text-white text-center p-2 absolute top-0 left-0 right-0 z-10">
                        <p>{error}</p>
                        <button onClick={() => setError(null)} className="absolute top-1 right-2">&times;</button>
                    </div>
                )}

                {showEmailForm ? (
                    <LoginEmailCard 
                        isLoading={isLoading}
                        onLogin={loginWithEmail}
                        onBackToInitial={() => setShowEmailForm(false)}
                    />
                ) : (
                    <LoginInitialCard 
                        onSelectEmail={() => setShowEmailForm(true)}
                    />
                )}

                {isLoading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Spinner />
                    </div>
                )}
            </div>
        </div>
    );
};
