import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  MapPin,
  Navigation,
  Building2,
  Check,
  ChevronRight,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { useLocationContext, ApmcMarket } from "../contexts/LocationContext";

export const LocationSelectorModal: React.FC = () => {
  const {
    isSelectorOpen,
    setIsSelectorOpen,
    allMarkets,
    selectedMarket,
    selectMarketById,
    detectLocation,
    isLocating,
    permissionDenied,
    errorMessage
  } = useLocationContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("All");

  const stateOptions = useMemo(() => {
    const states = Array.from(new Set(allMarkets.map((m) => m.state))).filter(Boolean);
    states.sort((a, b) => (a === "Gujarat" ? -1 : b === "Gujarat" ? 1 : a.localeCompare(b)));
    return ["All", ...states];
  }, [allMarkets]);

  const filteredMarkets = useMemo(() => {
    return allMarkets.filter((m) => {
      const matchState = selectedState === "All" || m.state === selectedState;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchState;

      const matchName = m.name.toLowerCase().includes(query);
      const matchDistrict = m.district.toLowerCase().includes(query);
      const matchStateText = m.state.toLowerCase().includes(query);
      const matchSpecialty = m.specialties?.some((s) => s.toLowerCase().includes(query));

      return matchState && (matchName || matchDistrict || matchStateText || matchSpecialty);
    });
  }, [allMarkets, selectedState, searchQuery]);

  if (!isSelectorOpen) return null;

  const handleSelect = async (market: ApmcMarket) => {
    await selectMarketById(market.id);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#FAF8F3] border border-[#E4DFD3] rounded-2xl sm:rounded-3xl shadow-soft-xl overflow-hidden font-sans flex flex-col max-h-[90vh] sm:max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E4DFD3] bg-[#F4EFE6] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#1E3F2D] text-white flex items-center justify-center shadow-soft-xs flex-shrink-0">
                <Building2 className="w-4 h-4 text-[#BCE3C7]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-[#1A261D] tracking-tight truncate">
                  Select APMC Market / District
                </h3>
                <p className="text-[10px] sm:text-[11px] text-[#5C6B5F] truncate">
                  Choose from {allMarkets.length}+ verified APMC Mandis across India
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSelectorOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#E8E2D5] text-[#5C6B5F] hover:text-[#1A261D] transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* GPS Quick Action & Search */}
          <div className="px-4 sm:px-5 pt-3 sm:pt-4 pb-2 bg-[#FAF8F3] space-y-2.5 sm:space-y-3">
            {errorMessage && (
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#FDF2F0] border border-[#F5C7C2] flex items-start gap-2 text-xs text-[#A63628]">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              onClick={detectLocation}
              disabled={isLocating}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#EEF4EF] hover:bg-[#E2ECE4] text-[#1E3F2D] border border-[#CDE0D2] rounded-xl sm:rounded-2xl font-bold text-xs transition-colors cursor-pointer disabled:opacity-60"
            >
              <Navigation className={`w-3.5 h-3.5 text-[#246A3E] ${isLocating ? "animate-spin" : ""}`} />
              <span>{isLocating ? "Locating Nearest APMC..." : "Detect Current Location via GPS"}</span>
              <Sparkles className="w-3.5 h-3.5 ml-auto text-[#246A3E] hidden xs:inline" />
            </button>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#7A887E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search market name, city, district..."
                className="w-full pl-9 pr-4 py-2 sm:py-2.5 bg-white border border-[#DDD7C8] focus:border-[#246A3E] rounded-xl text-xs text-[#1A261D] placeholder-[#8F9D91] focus:outline-none transition-all shadow-soft-xs"
              />
            </div>

            {/* State filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
              {stateOptions.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedState(st)}
                  className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex-shrink-0 ${
                    selectedState === st
                      ? "bg-[#1E3F2D] text-white shadow-soft-xs"
                      : "bg-white text-[#5C6B5F] hover:bg-[#EFECE3] border border-[#E0D9CB]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Markets List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2 sm:space-y-2.5">
            {filteredMarkets.length === 0 ? (
              <div className="text-center py-8 sm:py-10 text-xs text-[#7A887E]">
                No APMC market found matching "{searchQuery}". Try searching for another city or district.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {filteredMarkets.map((market) => {
                  const isSelected = selectedMarket?.id === market.id;
                  return (
                    <div
                      key={market.id}
                      onClick={() => handleSelect(market)}
                      className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#EEF4EF] border-[#246A3E] shadow-soft-xs"
                          : "bg-white hover:bg-[#FDFBF7] border-[#E4DFD3] hover:border-[#CBD6CD]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-[#1E3F2D] tracking-tight truncate">
                              {market.name}
                            </h4>
                            {isSelected && (
                              <span className="p-0.5 rounded-full bg-[#246A3E] text-white flex-shrink-0">
                                <Check className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#5C6B5F] flex items-center gap-1 mt-0.5 truncate">
                            <MapPin className="w-2.5 h-2.5 text-[#7A887E] flex-shrink-0" />
                            <span className="truncate">
                              {market.district}, {market.state}
                            </span>
                          </p>
                        </div>

                        {market.distanceKm !== undefined && market.distanceKm !== null && (
                          <span className="text-[10px] font-bold text-[#246A3E] bg-[#E2ECE4] px-1.5 sm:px-2 py-0.5 rounded-md flex-shrink-0">
                            {market.distanceKm} km
                          </span>
                        )}
                      </div>

                      {market.specialties && market.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2 sm:mt-2.5 pt-2 border-t border-[#F0EBE0]">
                          {market.specialties.slice(0, 3).map((spec, i) => (
                            <span
                              key={i}
                              className="text-[9px] font-medium text-[#46574B] bg-[#F4EFE6] px-1.5 py-0.5 rounded-md truncate max-w-[120px]"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
