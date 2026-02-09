
// frontend/services/configService.ts

interface AppConfig {
  API_URL: string;
  GOOGLE_CLIENT_ID: string;
  PIXEL_ID: string;
  R2_PUBLIC_URL: string;
  NODE_ENV: string;
}

// Singleton instance to hold the configuration
let config: AppConfig;

// Promise to ensure the config is loaded only once
let configPromise: Promise<AppConfig> | null = null;

const fetchConfig = async (): Promise<AppConfig> => {
  try {
    // The request is to a relative path, which works because the API is served from the same origin.
    const response = await fetch('/api/config');
    if (!response.ok) {
      throw new Error('Failed to fetch configuration from server');
    }
    const fetchedConfig = await response.json();
    config = fetchedConfig;
    return config;
  } catch (error) {
    console.error('CRITICAL: Could not load app configuration.', error);
    // In a real app, you might want to show a user-friendly error page here.
    throw new Error('Could not initialize application configuration.');
  }
};

export const getConfig = (): AppConfig => {
  if (!config) {
    throw new Error('Configuration has not been loaded yet. Ensure you call initializeAppConfig first.');
  }
  return config;
};

export const initializeAppConfig = (): Promise<AppConfig> => {
  if (!configPromise) {
    configPromise = fetchConfig();
  }
  return configPromise;
};
