
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { trackingService } from '../services/trackingService';
import { API_BASE } from '../apiConfig';
import { LoginInitialCard } from '../features/auth/components/LoginInitialCard';
import { LoginEmailCard } from '../features/auth/components/LoginEmailCard';
import { useAuth } from '../hooks/useAuth'; // 1. Import the hook

declare const google: any;

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // 2. Use our new hook to manage auth state and actions
    const { isLoading, error, loginWithGoogle, loginWithEmail } = useAuth();
    
    // This state is for the initial page load, to avoid flicker before we check if the user is already logged in.
    const [pageLoading, setPageLoading] = useState(true);

    // State for UI (switching between email and initial view)
    const [showEmailForm, setShowEmailForm] = useState(false);
    
    // State for controlled inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const GOOGLE_BTN_ID = 'googleButtonDiv';

    // Effect for affiliate tracking (no change needed)
    useEffect(() => {
        trackingService.captureUrlParams();
    }, [location]);

    // Effect for checking if user is ALREADY authenticated on page load
    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user && authService.isAuthenticated()) {
            // Re-implement the redirect logic here for the initial page load check.
            // The hook handles redirects after a *new* login action.
            const pendingRedirect = sessionStorage.getItem('redirect_after_login') || (location.state as any)?.from?.pathname;
            if (pendingRedirect && pendingRedirect !== '/' && !pendingRedirect.includes('login')) {
                sessionStorage.removeItem('redirect_after_login');
                navigate(pendingRedirect, { replace: true });
            } else {
                navigate('/feed', { replace: true });
            }
        } else {
            // If not authenticated, we can show the login page.
            setPageLoading(false);
        }
    }, [navigate, location.state]);

    // 3. Create a STABLE callback to pass to the Google script.
    // This function now just calls our hook's login function.
    const handleGoogleResponse = useCallback((response: any) => {
        if (response?.credential) {
            loginWithGoogle(response.credential);
        } else {
            console.error("Invalid Google credential response");
        }
    }, [loginWithGoogle]);

    // 4. Create the email login handler, which now just calls the hook.
    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginWithEmail(email, password);
    };

    // Effect to initialize and render the Google Sign-In button
    useEffect(() => {
        if (showEmailForm) return;

        let isMounted = true;
        const initGoogle = async () => {
            let clientId = "";
            try {
                const res = await fetch(`${API_BASE}/api/auth/config`);
                if (res.ok) clientId = (await res.json()).clientId;
            } catch (err) { console.error("Failed to fetch Google client ID", err); }

            if (!isMounted || !clientId || clientId.includes("CONFIGURADO")) return;

            const interval = setInterval(() => {
                if (typeof google !== 'undefined' && google.accounts && document.getElementById(GOOGLE_BTN_ID)) {
                    clearInterval(interval);
                    google.accounts.id.initialize({
                        client_id: clientId,
                        callback: handleGoogleResponse, // 5. Use our new stable callback
                        auto_select: false
                    });
                    google.accounts.id.renderButton(document.getElementById(GOOGLE_BTN_ID), {
                        theme: 'filled_black',
                        size: 'large',
                        width: '400'
                    });
                }
            }, 100);
        };
        
        initGoogle();
        return () => { isMounted = false; };
    }, [showEmailForm, handleGoogleResponse]);

    // Render nothing until we confirm user is not logged in
    if (pageLoading) return null;

    // 6. Update the JSX to use `isLoading` from the hook
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white font-['Inter'] relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-[400px] mx-4 bg-white/5 backdrop-blur-2xl rounded-[32px] p-10 border border-white/10 shadow-2xl relative z-10 flex flex-col items-center">
                {showEmailForm ? (
                    <LoginEmailCard 
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        onSubmit={handleEmailSubmit}
                        onBackToGoogle={() => setShowEmailForm(false)}
                        loading={isLoading} // Use hook's loading state
                        error={error || ''} // Use hook's error state
                    />
                ) : (
                    <LoginInitialCard 
                        onSelectEmail={() => setShowEmailForm(true)}
                        googleButtonId={GOOGLE_BTN_ID}
                        loading={pageLoading} // This refers to the initial page load check
                        googleProcessing={isLoading} // This refers to the auth action
                    />
                )}
                
                {isLoading && ( // Overlay is now controlled by the hook's state
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-[32px] flex items-center justify-center z-50">
                        <i className="fa-solid fa-circle-notch fa-spin text-[#00c2ff] text-2xl"></i>
                    </div>
                )}
            </div>
        </div>
    );
};
