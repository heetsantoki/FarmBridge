import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export interface ApmcMarket {
  id: string;
  name: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  address?: string;
  distanceKm?: number | null;
  specialties?: string[];
  isNearest?: boolean;
}

export interface ApmcCommodity {
  commodity: string;
  rawCommodity?: string;
  variety: string;
  grade: string;
  market: string;
  district: string;
  state: string;
  arrivalDate: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  priceUnit: string;
  pricePer20kg: string | null;
  priceDisplay: string;
  source: string;
}

export interface UserLocationConfig {
  lat: number | null;
  lng: number | null;
  district: string;
  state: string;
  marketId: string;
  marketName: string;
  isAuto: boolean; // true if detected via GPS
}

interface LocationContextType {
  locationConfig: UserLocationConfig;
  selectedMarket: ApmcMarket | null;
  nearbyMarkets: ApmcMarket[];
  commodities: ApmcCommodity[];
  allMarkets: ApmcMarket[];
  availableStates: { state: string; districts: string[] }[];
  isLoading: boolean;
  isLocating: boolean;
  permissionDenied: boolean;
  errorMessage: string | null;
  isPromptOpen: boolean;
  setIsPromptOpen: (open: boolean) => void;
  isSelectorOpen: boolean;
  setIsSelectorOpen: (open: boolean) => void;
  detectLocation: () => Promise<void>;
  selectMarketById: (marketId: string) => Promise<void>;
  selectDistrict: (district: string, state?: string) => Promise<void>;
  refreshPrices: () => Promise<void>;
}

const API_BASE = "http://localhost:5000";
const STORAGE_KEY = "farmbridge_location_config";
const PROMPTED_KEY = "farmbridge_location_prompted";

// Default fallback to Rajkot APMC
const DEFAULT_CONFIG: UserLocationConfig = {
  lat: 22.3039,
  lng: 70.8022,
  district: "Rajkot",
  state: "Gujarat",
  marketId: "rajkot",
  marketName: "Rajkot APMC",
  isAuto: false,
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locationConfig, setLocationConfig] = useState<UserLocationConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return DEFAULT_CONFIG;
  });

  const [selectedMarket, setSelectedMarket] = useState<ApmcMarket | null>(null);
  const [nearbyMarkets, setNearbyMarkets] = useState<ApmcMarket[]>([]);
  const [commodities, setCommodities] = useState<ApmcCommodity[]>([]);
  const [allMarkets, setAllMarkets] = useState<ApmcMarket[]>([]);
  const [availableStates, setAvailableStates] = useState<{ state: string; districts: string[] }[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isPromptOpen, setIsPromptOpen] = useState<boolean>(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);

  // Fetch full APMC directory for manual search modal
  useEffect(() => {
    const fetchDirectory = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/mandi/directory`);
        if (res.data?.success) {
          setAllMarkets(res.data.markets || []);
          setAvailableStates(res.data.states || []);
        }
      } catch (err) {
        console.warn("Failed to load APMC directory:", err);
      }
    };
    fetchDirectory();
  }, []);

  // Fetch market rates given coordinates or market ID
  const fetchMarketPrices = useCallback(async (config: UserLocationConfig) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      let res;
      if (config.isAuto && config.lat && config.lng) {
        res = await axios.get(`${API_BASE}/api/mandi/nearest`, {
          params: { lat: config.lat, lng: config.lng },
        });
      } else {
        res = await axios.get(`${API_BASE}/api/mandi/market`, {
          params: {
            id: config.marketId,
            district: config.district,
            lat: config.lat,
            lng: config.lng,
          },
        });
      }

      const data = res.data?.data;
      if (data) {
        const primary = data.primaryMarket || data.selectedMarket;
        if (primary) {
          setSelectedMarket(primary);
          const updatedConfig: UserLocationConfig = {
            ...config,
            marketId: primary.id,
            marketName: primary.name,
            district: primary.district || config.district,
            state: primary.state || config.state,
          };
          setLocationConfig(updatedConfig);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfig));
          } catch (e) {
            // ignore
          }
        }

        if (data.nearbyMarkets) {
          setNearbyMarkets(data.nearbyMarkets);
        }

        if (data.commodities) {
          setCommodities(data.commodities);
        }
      }
    } catch (err: any) {
      console.error("Error fetching APMC prices:", err);
      setErrorMessage("Unable to fetch live APMC prices right now.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Detect location via Browser Geolocation API
  const detectLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setPermissionDenied(true);
      setErrorMessage("Geolocation is not supported by your browser.");
      setIsSelectorOpen(true);
      return;
    }

    setIsLocating(true);
    setPermissionDenied(false);
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const newConfig: UserLocationConfig = {
          ...locationConfig,
          lat: latitude,
          lng: longitude,
          isAuto: true,
        };

        setIsLocating(false);
        setIsPromptOpen(false);
        try {
          localStorage.setItem(PROMPTED_KEY, "true");
        } catch (e) {
          // ignore
        }

        await fetchMarketPrices(newConfig);
      },
      (error) => {
        setIsLocating(false);
        setPermissionDenied(true);
        try {
          localStorage.setItem(PROMPTED_KEY, "true");
        } catch (e) {
          // ignore
        }

        if (error.code === error.PERMISSION_DENIED) {
          setErrorMessage("Location permission was denied. Please select your district manually.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setErrorMessage("Location information is unavailable. Please select your district manually.");
        } else {
          setErrorMessage("Location request timed out. Please select your district manually.");
        }

        setIsSelectorOpen(true);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, [fetchMarketPrices, locationConfig]);

  // Select market by ID manually
  const selectMarketById = useCallback(
    async (marketId: string) => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const res = await axios.get(`${API_BASE}/api/mandi/market`, {
          params: {
            id: marketId,
            lat: locationConfig.lat,
            lng: locationConfig.lng,
          },
        });

        const data = res.data?.data;
        if (data?.selectedMarket) {
          const m = data.selectedMarket;
          const updatedConfig: UserLocationConfig = {
            lat: locationConfig.lat,
            lng: locationConfig.lng,
            district: m.district,
            state: m.state,
            marketId: m.id,
            marketName: m.name,
            isAuto: false,
          };

          setLocationConfig(updatedConfig);
          setSelectedMarket(m);
          setNearbyMarkets(data.nearbyMarkets || []);
          setCommodities(data.commodities || []);
          setIsSelectorOpen(false);

          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfig));
            localStorage.setItem(PROMPTED_KEY, "true");
          } catch (e) {
            // ignore
          }
        }
      } catch (err) {
        console.error("Error switching market:", err);
        setErrorMessage("Could not switch to selected APMC market.");
      } finally {
        setIsLoading(false);
      }
    },
    [locationConfig.lat, locationConfig.lng]
  );

  // Select district manually
  const selectDistrict = useCallback(
    async (district: string, state?: string) => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const res = await axios.get(`${API_BASE}/api/mandi/market`, {
          params: {
            district,
            lat: locationConfig.lat,
            lng: locationConfig.lng,
          },
        });

        const data = res.data?.data;
        if (data?.selectedMarket) {
          const m = data.selectedMarket;
          const updatedConfig: UserLocationConfig = {
            lat: locationConfig.lat,
            lng: locationConfig.lng,
            district: m.district,
            state: state || m.state,
            marketId: m.id,
            marketName: m.name,
            isAuto: false,
          };

          setLocationConfig(updatedConfig);
          setSelectedMarket(m);
          setNearbyMarkets(data.nearbyMarkets || []);
          setCommodities(data.commodities || []);
          setIsSelectorOpen(false);

          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedConfig));
            localStorage.setItem(PROMPTED_KEY, "true");
          } catch (e) {
            // ignore
          }
        }
      } catch (err) {
        console.error("Error selecting district:", err);
        setErrorMessage("Could not load market for selected district.");
      } finally {
        setIsLoading(false);
      }
    },
    [locationConfig.lat, locationConfig.lng]
  );

  const refreshPrices = useCallback(async () => {
    await fetchMarketPrices(locationConfig);
  }, [fetchMarketPrices, locationConfig]);

  useEffect(() => {
    fetchMarketPrices(locationConfig);
  }, []);

  return (
    <LocationContext.Provider
      value={{
        locationConfig,
        selectedMarket,
        nearbyMarkets,
        commodities,
        allMarkets,
        availableStates,
        isLoading,
        isLocating,
        permissionDenied,
        errorMessage,
        isPromptOpen,
        setIsPromptOpen,
        isSelectorOpen,
        setIsSelectorOpen,
        detectLocation,
        selectMarketById,
        selectDistrict,
        refreshPrices,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }
  return context;
};
