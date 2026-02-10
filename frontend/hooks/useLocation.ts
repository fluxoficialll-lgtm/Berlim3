// frontend/hooks/useLocation.ts

import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

/**
 * Hook: useLocation
 * Propósito: Gerencia a lógica de localização do usuário.
 *
 * Responsabilidades:
 * - Obter a localização atual do usuário (cidade, estado, país).
 * - Manter o estado de `loading` durante a busca da localização.
 * - Armazenar o endereço encontrado.
 * - Lidar com a seleção manual de localização.
 */
export const useLocation = () => {
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchLocation = useCallback(async () => {
        setLoading(true);
        try {
            // Simula a obtenção da localização do usuário
            const userLocation = await authService.getUserLocation();
            if (userLocation) {
                setAddress(`${userLocation.city}, ${userLocation.state}, ${userLocation.country}`);
            }
        } catch (error) {
            console.error("Erro ao obter a localização:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLocation();
    }, [fetchLocation]);

    return {
        loading,
        address,
        searchTerm,
        setSearchTerm,
        fetchLocation,
    };
};