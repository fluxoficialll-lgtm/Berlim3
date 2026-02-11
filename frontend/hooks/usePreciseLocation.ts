import { useState, useCallback } from 'react';
import { LocationFilter, Coordinates, AddressProfile } from '@/types/location.types';

const STORAGE_KEY = 'flux_user_geo_filter';

// ✅ ARQUITETURA NOVA: Funções auxiliares de geolocalização movidas para dentro do hook.

/**
 * Prompts for permission and captures the exact coordinates via GPS.
 */
const getCurrentPosition = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation not supported."));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            }),
            (err) => reject(err),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    });
};

/**
 * Translates coordinates into an address profile using Nominatim (OpenStreetMap).
 */
const reverseGeocode = async (coords: Coordinates): Promise<AddressProfile> => {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&zoom=10&addressdetails=1`, {
            headers: { 'Accept-Language': 'pt-BR' } // Request results in Brazilian Portuguese
        });
        if (!res.ok) {
            throw new Error(`Nominatim request failed with status: ${res.status}`);
        }
        const data = await res.json();
        
        const addr = data.address;
        if (!addr) {
            throw new Error("Address details not found in Nominatim response");
        }

        return {
            city: addr.city || addr.town || addr.village || addr.municipality,
            state: addr.state,
            stateCode: addr['ISO3166-2-lvl4']?.split('-')[1],
            country: addr.country,
            countryCode: addr.country_code?.toUpperCase(),
            displayName: data.display_name
        };
    } catch (e) {
        console.error("Geocoding failed", e);
        throw new Error("Failed to identify address.");
    }
};

export const usePreciseLocation = () => {
    const [loading, setLoading] = useState(false);
    const [currentFilter, setCurrentFilter] = useState<LocationFilter>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : { type: 'global' };
        } catch (e) {
            console.error("Failed to parse saved location filter:", e);
            return { type: 'global' };
        }
    });

    const updateFilter = useCallback((filter: LocationFilter) => {
        setCurrentFilter(filter);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filter));
    }, []);

    const captureGps = async (): Promise<LocationFilter | undefined> => {
        setLoading(true);
        try {
            // ✅ ARQUITETURA NOVA: Chama as funções internas, não mais o serviço.
            const coords = await getCurrentPosition();
            const address = await reverseGeocode(coords);
            
            const newFilter: LocationFilter = {
                type: 'radius',
                radius: 50, // default radius in km
                coords,
                targetAddress: address
            };
            
            updateFilter(newFilter);
            return newFilter;
        } catch (e) {
            console.error("Failed to capture GPS location:", e);
            throw e; // Re-throw to allow calling components to handle it
        } finally {
            setLoading(false);
        }
    };

    const clearFilter = useCallback(() => {
        const globalFilter: LocationFilter = { type: 'global' };
        updateFilter(globalFilter);
    }, [updateFilter]);

    return {
        currentFilter,
        loading,
        captureGps,
        updateFilter,
        clearFilter
    };
};
