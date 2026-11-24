import React from "react";
import { NearbyApmcPrices } from "../components/NearbyApmcPrices";
import { Building2, ChevronRight, Home, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

export const ApmcPricesPage: React.FC = () => {
  const role = localStorage.getItem("role") || "farmer";
  const { language } = useTranslation();
  const langKey = language === "gu" || language === "hi" ? language : "en";

  const dict = {
    en: {
      dashboard: "Dashboard",
      title: "APMC Mandi Prices",
      liveRates: "Live Rates",
      subtitle: "Real-time agricultural commodity prices directly benchmarked with your nearest government APMC mandi.",
      agmarknetFeed: "Official AGMARKNET Feed",
    },
    gu: {
      dashboard: "ડેશબોર્ડ",
      title: "APMC મંડી ભાવ",
      liveRates: "લાઇવ દરો",
      subtitle: "તમારા નજીકના સરકારી APMC માર્કેટ યાર્ડ સાથે જોડાયેલા રીયલ-ટાઇમ કૃષિ બજાર ભાવ.",
      agmarknetFeed: "સત્તાવાર AGMARKNET ફીડ",
    },
    hi: {
      dashboard: "डैशबोर्ड",
      title: "APMC मंडी भाव",
      liveRates: "लाइव दरें",
      subtitle: "आपकी नजदीकी सरकारी APMC मंडी से सीधे जुड़े वास्तविक समय के कृषि जिंस मूल्य।",
      agmarknetFeed: "आधिकारिक AGMARKNET फ़ीड",
    },
  };

  const tTxt = dict[langKey];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-[#7A887E] mb-1.5">
            <Link
              to={role === "buyer" ? "/buyer-products" : "/home"}
              className="hover:text-[#1E3F2D] flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{tTxt.dashboard}</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-[#1E3F2D]">{tTxt.title}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] tracking-tight flex items-center gap-2">
            <Building2 className="w-7 h-7 text-[#246A3E]" />
            <span>{tTxt.title}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#246A3E] bg-[#EEF4EF] border border-[#D5E4D8] px-2.5 py-0.5 rounded-full hidden sm:inline-block">
              {tTxt.liveRates}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B5F] mt-1">
            {tTxt.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EEF4EF] border border-[#D5E4D8] text-xs font-semibold text-[#1E3F2D]">
            <Sparkles className="w-3.5 h-3.5 text-[#246A3E]" />
            <span>{tTxt.agmarknetFeed}</span>
          </div>
        </div>
      </div>

      {/* Main APMC Prices Component */}
      <NearbyApmcPrices />
    </div>
  );
};

export default ApmcPricesPage;
