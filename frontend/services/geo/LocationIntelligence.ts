
import { Coordinates, AddressProfile } from '@/types/location.types';

export const LocationIntelligence = {
    /**
     * Prompts for permission and captures the exact coordinates via GPS.
     */
    getCurrentPosition: (): Promise<Coordinates> => {
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
    },

    /**
     * Translates coordinates into an address profile using Nominatim (OpenStreetMap).
     */
    reverseGeocode: async (coords: Coordinates): Promise<AddressProfile> => {
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
    }
};
