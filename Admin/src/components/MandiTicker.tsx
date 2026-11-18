import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles, TrendingUp, TrendingDown, MapPin } from "lucide-react";

export interface MandiItem {
  crop: string;
  price: string;
  change: string;
  up: boolean;
  mandi: string;
}

export const FALLBACK_MANDI_RATES: MandiItem[] = [
  { crop: "Sharbati Wheat", price: "Rs 2,740/Qtl", change: "+2.4%", up: true, mandi: "Sehore APMC (MP)" },
  { crop: "Basmati 1121 Paddy", price: "Rs 4,890/Qtl", change: "+1.8%", up: true, mandi: "Karnal (HR)" },
  { crop: "Yellow Soybean", price: "Rs 4,450/Qtl", change: "-0.5%", up: false, mandi: "Indore (MP)" },
  { crop: "Mustard Seed", price: "Rs 5,680/Qtl", change: "+3.2%", up: true, mandi: "Kota (RJ)" },
  { crop: "Red Onion (Nashik)", price: "Rs 2,350/Qtl", change: "+4.1%", up: true, mandi: "Lasalgaon (MH)" },
  { crop: "Fresh Hybrid Tomato", price: "Rs 1,850/Qtl", change: "-2.1%", up: false, mandi: "Kolar (KA)" },
  { crop: "Potato (Jyoti)", price: "Rs 1,480/Qtl", change: "+1.2%", up: true, mandi: "Agra (UP)" },
  { crop: "Desi Cotton (Kapas)", price: "Rs 7,320/Qtl", change: "+0.8%", up: true, mandi: "Rajkot (GJ)" },
  { crop: "Tur / Arhar Dal", price: "Rs 10,250/Qtl", change: "+1.5%", up: true, mandi: "Gulbarga (KA)" },
  { crop: "Chana Desi (Chickpea)", price: "Rs 5,980/Qtl", change: "+2.0%", up: true, mandi: "Bikaner (RJ)" },
  { crop: "Groundnut (Bold)", price: "Rs 6,450/Qtl", change: "+1.7%", up: true, mandi: "Gondal (GJ)" },
];

interface MandiTickerProps {
  className?: string;
}

const MandiTicker: React.FC<MandiTickerProps> = ({ className = "" }) => {
  const [rates, setRates] = useState<MandiItem[]>(FALLBACK_MANDI_RATES);

  useEffect(() => {
    let isMounted = true;
    const fetchMandiRates = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/mandi/rates");
        if (res.data?.rates && res.data.rates.length > 0 && isMounted) {
          setRates(res.data.rates);
        }
      } catch (err) {
        // Fallback gracefully preserved
      }
    };

    fetchMandiRates();
    const interval = setInterval(fetchMandiRates, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const duplicatedRates = [...rates, ...rates];

  return (
    <div
      className={`bg-[#F5F1E8] rounded-2xl p-2.5 sm:p-3 border border-[#E4DFD3] shadow-soft-xs flex items-center gap-3 overflow-hidden w-full max-w-full min-w-0 ${className}`}
    >
      {/* Live APMC Badge */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FAF8F3] bg-[#1E3F2D] border border-[#163324] px-3 py-1.5 rounded-xl whitespace-nowrap flex-shrink-0 z-10 shadow-soft-xs">
        <span className="w-2 h-2 rounded-full bg-[#75B98A] inline-block animate-pulse"></span>
        <Sparkles className="w-3.5 h-3.5 text-[#BCE3C7] hidden sm:inline-block" />
        <span>Live APMC Mandi Rates</span>
      </div>

      {/* Right to Left Running Marquee Ticker */}
      <div className="relative flex-1 overflow-hidden min-w-0">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F5F1E8] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F5F1E8] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee gap-3 text-xs py-0.5 items-center select-none cursor-default">
          {duplicatedRates.map((m, idx) => (
            <div
              key={`${m.crop}-${idx}`}
              className="flex items-center gap-2 bg-[#FAF8F3] hover:bg-white border border-[#E4DFD3] px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors flex-shrink-0"
              title={`${m.crop} at ${m.mandi}: ${m.price}`}
            >
              <span className="font-bold text-[#1E3F2D]">{m.crop}</span>
              <span className="font-bold text-[#1A261D] bg-[#EFECE3] px-1.5 py-0.5 rounded-md border border-[#DFD9CC]">
                {m.price}
              </span>
              <span
                className={`font-bold inline-flex items-center gap-0.5 text-[11px] ${
                  m.up ? "text-[#246A3E]" : "text-[#B94438]"
                }`}
              >
                {m.up ? <TrendingUp className="w-3 h-3 stroke-[2.5]" /> : <TrendingDown className="w-3 h-3 stroke-[2.5]" />}
                {m.change}
              </span>
              <span className="text-[10px] text-[#7A887E] font-medium hidden md:inline-flex items-center gap-0.5 pl-1 border-l border-[#E0D9CB]">
                <MapPin className="w-2.5 h-2.5 text-[#7A887E]" />
                {m.mandi}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MandiTicker;
