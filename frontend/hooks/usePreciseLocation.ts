
import { useState, useCallback } from 'react';
import { LocationFilter, Coordinates, AddressProfile } from '@/types/location.types';
import { LocationIntelligence } from '@/services/geo/LocationIntelligence';

const STORAGE_KEY = 'flux_user_geo_filter';

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
            const coords = await LocationIntelligence.getCurrentPosition();
            const address = await LocationIntelligence.reverseGeocode(coords);
            
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
            // Optionally, update UI to show an error state to the user
            // For instance: setError("Não foi possível obter sua localização.");
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
