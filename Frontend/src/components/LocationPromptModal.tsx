import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Sparkles, X, ChevronRight, Building2, CheckCircle2 } from "lucide-react";
import { useLocationContext } from "../contexts/LocationContext";

export const LocationPromptModal: React.FC = () => {
  const {
    isPromptOpen,
    setIsPromptOpen,
    detectLocation,
    isLocating,
    setIsSelectorOpen
  } = useLocationContext();

  if (!isPromptOpen) return null;

  const handleAllowLocation = async () => {
    await detectLocation();
  };

  const handleManualSelect = () => {
    setIsPromptOpen(false);
    setIsSelectorOpen(true);
  };

  const handleDismiss = () => {
    setIsPromptOpen(false);
    try {
      localStorage.setItem("farmbridge_location_prompted", "true");
    } catch (e) {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-md bg-[#FAF8F3] border border-[#E4DFD3] rounded-3xl shadow-soft-xl overflow-hidden font-sans"
        >
          {/* Top Decorative Nature Banner */}
          <div className="bg-gradient-to-r from-[#1E3F2D] to-[#246A3E] p-6 text-[#FAF8F3] relative">
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF8F3] transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center mb-3 shadow-inner">
              <Navigation className="w-6 h-6 text-[#BCE3C7] animate-pulse" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-bold text-[#E2F0E6] mb-2 tracking-wide uppercase">
              <Sparkles className="w-3 h-3 text-[#BCE3C7]" />
              <span>Smart Mandi Prices</span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              See Live APMC Rates Near You
            </h3>
            <p className="text-xs text-[#D5E4D8] mt-1 leading-relaxed">
              Enable location access so FarmBridge can automatically find your nearest APMC market yard (e.g. Rajkot, Gondal, Unjha) and show live commodity prices.
            </p>
          </div>

          {/* Content Body */}
          <div className="p-6 space-y-4">
            <div className="space-y-2.5 text-xs text-[#5C6B5F]">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#246A3E] flex-shrink-0" />
                <span>Real-time official AGMARKNET mandi rates for your district</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#246A3E] flex-shrink-0" />
                <span>Transparent Min, Max, and Modal prices (₹/Quintal & ₹/20kg)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#246A3E] flex-shrink-0" />
                <span>Zero hassle: auto-detects nearest market distance in kilometers</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2.5">
              <button
                onClick={handleAllowLocation}
                disabled={isLocating}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1E3F2D] hover:bg-[#163324] text-white rounded-2xl font-bold text-sm shadow-soft-sm transition-all transform active:scale-[0.99] disabled:opacity-70 cursor-pointer"
              >
                <Navigation className={`w-4 h-4 ${isLocating ? "animate-spin" : ""}`} />
                <span>{isLocating ? "Detecting Nearest Market..." : "Allow Location Access"}</span>
              </button>

              <button
                onClick={handleManualSelect}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-[#F2EDE2] text-[#1E3F2D] border border-[#D5DFD7] rounded-2xl font-semibold text-xs transition-colors cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-[#4A7856]" />
                <span>Select District / City Manually</span>
                <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#7A887E]" />
              </button>
            </div>

            {/* Skip */}
            <div className="text-center pt-1">
              <button
                onClick={handleDismiss}
                className="text-[11px] text-[#7A887E] hover:text-[#1A261D] font-medium transition-colors"
              >
                Skip for now (default to Rajkot APMC)
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
