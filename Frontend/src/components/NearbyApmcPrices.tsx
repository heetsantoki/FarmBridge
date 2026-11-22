import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  RefreshCw,
  Search,
  Building2,
  Sparkles,
  Calendar,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useLocationContext } from "../contexts/LocationContext";

interface NearbyApmcPricesProps {
  className?: string;
  showTitle?: boolean;
}

export const NearbyApmcPrices: React.FC<NearbyApmcPricesProps> = ({
  className = "",
  showTitle = true,
}) => {
  const {
    locationConfig,
    selectedMarket,
    nearbyMarkets,
    commodities,
    isLoading,
    isLocating,
    detectLocation,
    selectMarketById,
    setIsSelectorOpen,
    refreshPrices,
  } = useLocationContext();

  const [searchCrop, setSearchCrop] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredCommodities = useMemo(() => {
    return commodities.filter((item) => {
      const query = searchCrop.trim().toLowerCase();
      const matchQuery =
        !query ||
        item.commodity.toLowerCase().includes(query) ||
        (item.variety && item.variety.toLowerCase().includes(query));

      if (!matchQuery) return false;

      if (activeCategory === "All") return true;
      if (activeCategory === "Cash Crops") {
        return /cotton|kapas|castor|tobacco|sugarcane/i.test(item.commodity);
      }
      if (activeCategory === "Oilseeds") {
        return /groundnut|mustard|soybean|sesamum|til|castor/i.test(item.commodity);
      }
      if (activeCategory === "Spices") {
        return /jeera|cumin|saunf|fennel|turmeric|haldi|chilli|coriander|dhanya|garlic/i.test(item.commodity);
      }
      if (activeCategory === "Grains & Pulses") {
        return /wheat|paddy|rice|maize|chana|gram|moong|urad|tur|dal/i.test(item.commodity);
      }
      return true;
    });
  }, [commodities, searchCrop, activeCategory]);

  return (
    <section className={`w-full font-sans antialiased ${className}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Card Container */}
        <div className="bg-[#FAF8F3] border border-[#E4DFD3] rounded-2xl sm:rounded-3xl shadow-soft-sm overflow-hidden">
          {/* 1. TOP HEADER & LOCATION INDICATOR */}
          <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-b from-[#F3EFE6] to-[#FAF8F3] border-b border-[#E4DFD3]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                {/* Live Badge */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#1E3F2D] text-[#FAF8F3] text-[11px] sm:text-xs font-bold shadow-soft-xs">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#75B98A] inline-block animate-pulse" />
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#BCE3C7]" />
                  <span>Real-Time APMC Mandi Bhav (Official AGMARKNET)</span>
                </div>

                {showTitle && (
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1A261D] tracking-tight">
                    Live Commodity Prices from Nearest APMC
                  </h2>
                )}

                {/* Location & Nearest Market Status */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 pt-1 text-xs md:text-sm text-[#46574B]">
                  <div className="flex items-center gap-1.5 bg-white border border-[#DDD7C8] px-2.5 sm:px-3 py-1.5 rounded-xl shadow-soft-xs w-full sm:w-auto">
                    <MapPin className="w-3.5 h-3.5 text-[#246A3E] flex-shrink-0" />
                    <span className="truncate">
                      Location:{" "}
                      <strong className="text-[#1A261D]">
                        {locationConfig.district || "Rajkot"}, {locationConfig.state || "Gujarat"}
                      </strong>
                    </span>
                    {locationConfig.isAuto && (
                      <span className="text-[10px] font-bold bg-[#E2ECE4] text-[#246A3E] px-1.5 py-0.5 rounded-md ml-auto sm:ml-0 flex-shrink-0">
                        GPS Active
                      </span>
                    )}
                  </div>

                  {selectedMarket && (
                    <div className="flex items-center gap-1.5 bg-[#EEF4EF] border border-[#CDE0D2] px-2.5 sm:px-3 py-1.5 rounded-xl text-[#1E3F2D] shadow-soft-xs w-full sm:w-auto">
                      <Building2 className="w-3.5 h-3.5 text-[#246A3E] flex-shrink-0" />
                      <span className="truncate">
                        Market: <strong className="font-bold">{selectedMarket.name}</strong>
                      </span>
                      {selectedMarket.distanceKm !== undefined && selectedMarket.distanceKm !== null && (
                        <span className="font-bold text-[10px] sm:text-[11px] text-[#246A3E] bg-white px-2 py-0.5 rounded-md border border-[#CDE0D2] ml-auto sm:ml-0 flex-shrink-0">
                          ~{selectedMarket.distanceKm} km
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Auto-detect & Change Market */}
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 pt-2 sm:pt-0">
                <button
                  onClick={detectLocation}
                  disabled={isLocating}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-white hover:bg-[#F2EDE2] text-[#1E3F2D] border border-[#DDD7C8] rounded-xl text-xs font-bold transition-all shadow-soft-xs cursor-pointer disabled:opacity-60"
                  title="Detect your current location using device GPS"
                >
                  <Navigation className={`w-3.5 h-3.5 text-[#246A3E] ${isLocating ? "animate-spin" : ""}`} />
                  <span className="truncate">{isLocating ? "Detecting..." : "Detect Location"}</span>
                </button>

                <button
                  onClick={() => setIsSelectorOpen(true)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-[#1E3F2D] hover:bg-[#163324] text-white rounded-xl text-xs font-bold transition-all shadow-soft-xs cursor-pointer"
                  title="Switch to another district or APMC market"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#BCE3C7]" />
                  <span>Change Market</span>
                  <ChevronRight className="w-3 h-3 text-[#BCE3C7] hidden xs:inline" />
                </button>

                <button
                  onClick={refreshPrices}
                  disabled={isLoading}
                  className="col-span-2 sm:col-span-1 flex items-center justify-center p-2 sm:p-2.5 bg-white hover:bg-[#F2EDE2] text-[#5C6B5F] hover:text-[#1A261D] border border-[#DDD7C8] rounded-xl transition-all shadow-soft-xs cursor-pointer"
                  title="Refresh latest prices"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#246A3E]" : ""}`} />
                  <span className="sm:hidden text-xs font-semibold ml-1.5">Refresh Rates</span>
                </button>
              </div>
            </div>

            {/* 2. NEARBY APMC MARKET SWITCHER CHIPS */}
            {nearbyMarkets.length > 1 && (
              <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-[#E8E2D5]">
                <div className="text-[10px] sm:text-[11px] font-bold text-[#7A887E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>Nearby APMCs in your radius:</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
                  {nearbyMarkets.map((m) => {
                    const isCurrent = selectedMarket?.id === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => selectMarketById(m.id)}
                        className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                          isCurrent
                            ? "bg-[#1E3F2D] text-white shadow-soft-xs font-bold"
                            : "bg-white hover:bg-[#EFECE3] text-[#46574B] border border-[#E0D9CB]"
                        }`}
                      >
                        <Building2 className={`w-3 h-3 ${isCurrent ? "text-[#BCE3C7]" : "text-[#7A887E]"}`} />
                        <span>{m.name}</span>
                        {m.distanceKm !== undefined && m.distanceKm !== null && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                              isCurrent ? "bg-white/20 text-[#FAF8F3]" : "bg-[#F3EFE6] text-[#246A3E] font-bold"
                            }`}
                          >
                            {m.distanceKm} km
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 3. SEARCH & CATEGORY FILTER BAR */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#F7F4EC] border-b border-[#E4DFD3] flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-[#7A887E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCrop}
                onChange={(e) => setSearchCrop(e.target.value)}
                placeholder="Search crop (e.g. Cotton, Groundnut, Wheat, Jeera)..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#DDD7C8] focus:border-[#246A3E] rounded-xl text-xs text-[#1A261D] placeholder-[#8F9D91] focus:outline-none transition-all shadow-soft-xs"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
              {["All", "Cash Crops", "Oilseeds", "Spices", "Grains & Pulses"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex-shrink-0 ${
                    activeCategory === cat
                      ? "bg-[#1E3F2D] text-white shadow-soft-xs"
                      : "bg-white text-[#5C6B5F] hover:bg-[#EFECE3] border border-[#DDD7C8]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 4. COMMODITY PRICE CARDS GRID */}
          <div className="p-4 sm:p-6 md:p-8">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E2D5] animate-pulse space-y-3"
                  >
                    <div className="h-4 bg-[#EFECE3] rounded w-3/4" />
                    <div className="h-7 bg-[#EFECE3] rounded w-1/2" />
                    <div className="h-3 bg-[#EFECE3] rounded w-full" />
                    <div className="h-3 bg-[#EFECE3] rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : filteredCommodities.length === 0 ? (
              <div className="text-center py-10 sm:py-12 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF4EF] text-[#246A3E] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-[#1A261D]">No commodities found</h4>
                <p className="text-xs text-[#7A887E] max-w-sm mx-auto px-4">
                  No commodities matched "{searchCrop}" in {selectedMarket?.name}. Try clearing your search or switching to another nearby APMC market.
                </p>
                <button
                  onClick={() => {
                    setSearchCrop("");
                    setActiveCategory("All");
                  }}
                  className="px-4 py-2 bg-[#1E3F2D] text-white rounded-xl text-xs font-bold hover:bg-[#163324] transition-colors"
                >
                  Show All Commodities
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {filteredCommodities.map((item, idx) => {
                  const min = item.minPrice || 0;
                  const max = item.maxPrice || 0;
                  const modal = item.modalPrice || 0;
                  const spread = max > min ? max - min : 1;
                  const percentPos = max > min ? Math.min(100, Math.max(0, ((modal - min) / spread) * 100)) : 50;

                  return (
                    <motion.div
                      key={`${item.commodity}-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.02 }}
                      className="bg-white hover:bg-[#FDFBF7] border border-[#E4DFD3] hover:border-[#CBD6CD] p-4 sm:p-5 rounded-2xl shadow-soft-xs hover:shadow-soft-sm transition-all flex flex-col justify-between"
                    >
                      {/* Top Row: Crop Name & Variety */}
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="text-base font-bold text-[#1E3F2D] tracking-tight leading-snug truncate">
                              {item.commodity}
                            </h3>
                            <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-[11px] text-[#7A887E]">
                              <span>Variety: <strong className="text-[#46574B]">{item.variety}</strong></span>
                              <span>•</span>
                              <span>Grade: <strong className="text-[#46574B]">{item.grade}</strong></span>
                            </div>
                          </div>

                          <span className="text-[10px] font-bold text-[#246A3E] bg-[#EEF4EF] px-2 py-0.5 rounded-md border border-[#D5E4D8] flex-shrink-0">
                            Live Bhav
                          </span>
                        </div>

                        {/* Middle: Modal Price Highlight & 20kg calculation */}
                        <div className="mt-3 sm:mt-4 pt-3 border-t border-[#F0EBE0] flex items-baseline justify-between gap-2">
                          <div>
                            <span className="text-[9px] sm:text-[10px] font-bold text-[#7A887E] uppercase tracking-wider block">
                              Modal / Average Price
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-[#1A261D] tracking-tight mt-0.5">
                              ₹{modal.toLocaleString("en-IN")}{" "}
                              <span className="text-xs font-semibold text-[#7A887E]">/ Quintal</span>
                            </div>
                          </div>

                          {item.pricePer20kg && (
                            <div className="text-right flex-shrink-0">
                              <span className="text-[9px] font-bold text-[#7A887E] uppercase tracking-wider block">
                                20kg (મણ)
                              </span>
                              <span className="text-xs font-bold text-[#246A3E] bg-[#EEF4EF] px-2 py-0.5 sm:py-1 rounded-lg border border-[#D5E4D8] inline-block mt-0.5">
                                {item.pricePer20kg}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Price Spread Range Bar */}
                        <div className="mt-3 sm:mt-4 bg-[#F8F5EE] p-2 sm:p-2.5 rounded-xl border border-[#ECE5D8]">
                          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#5C6B5F] font-semibold mb-1.5">
                            <span>Min: <strong className="text-[#1A261D]">₹{min.toLocaleString("en-IN")}</strong></span>
                            <span>Max: <strong className="text-[#1A261D]">₹{max.toLocaleString("en-IN")}</strong></span>
                          </div>

                          {/* Visual slider bar */}
                          <div className="relative w-full h-2 bg-[#E2DBD0] rounded-full overflow-hidden">
                            <div
                              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#75B98A] to-[#246A3E] rounded-full"
                              style={{ width: `${percentPos}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Footer: Arrival Date & Source */}
                      <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-[#F0EBE0] flex items-center justify-between text-[10px] text-[#7A887E]">
                        <span className="flex items-center gap-1 font-medium truncate">
                          <Calendar className="w-3 h-3 text-[#7A887E] flex-shrink-0" />
                          <span>Arrival: {item.arrivalDate}</span>
                        </span>

                        <span className="flex items-center gap-1 text-[#246A3E] font-bold flex-shrink-0">
                          <ShieldCheck className="w-3 h-3 text-[#246A3E]" />
                          <span>AGMARKNET</span>
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 5. FOOTER INFO */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#F4EFE6] border-t border-[#E4DFD3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5C6B5F]">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <ShieldCheck className="w-4 h-4 text-[#246A3E] flex-shrink-0 hidden xs:inline" />
              <span>
                Data sourced directly from <strong>AGMARKNET / Ministry of Agriculture & Farmers Welfare</strong>, Government of India.
              </span>
            </div>

            <button
              onClick={() => setIsSelectorOpen(true)}
              className="font-bold text-[#1E3F2D] hover:underline flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <span>Browse other mandis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
