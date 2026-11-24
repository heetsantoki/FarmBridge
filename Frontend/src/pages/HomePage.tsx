import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  ChevronRight,
  Star,
  ShoppingCart,
  LineChart,
  Wallet,
  Shield,
  Truck,
  Headphones,
  TrendingUp,
  TrendingDown,
  Package,
  User,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Sprout,
  ArrowUpRight,
  Scale,
  Building2,
  Users,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { MandiTicker } from "../components/MandiTicker";
import { NearbyApmcPrices } from "../components/NearbyApmcPrices";

export default function HomePage() {
  const { t } = useTranslation();

  // Mandi Real-Time Ticker
  const mandiRates = [
    { crop: "Sharbati Wheat", price: "₹2,680/Qtl", change: "+2.8%", up: true },
    { crop: "Basmati 1121", price: "₹4,950/Qtl", change: "+1.4%", up: true },
    { crop: "Yellow Soybean", price: "₹4,280/Qtl", change: "-0.6%", up: false },
    { crop: "Mustard Seed", price: "₹5,620/Qtl", change: "+3.1%", up: true },
    { crop: "Nashik Red Onion", price: "₹2,250/Qtl", change: "+4.5%", up: true },
    { crop: "Desi Cotton", price: "₹7,150/Qtl", change: "+0.9%", up: true },
  ];

  const features = [
    {
      title: t("features.directMarket.title") || "Direct Farm-to-Buyer Marketplace",
      description:
        t("features.directMarket.description") ||
        "Connect directly with verified farmers. Bypass exploitative middlemen and retain up to 35% higher profit margins.",
      icon: ShoppingCart,
      color: "bg-[#EEF4EF] text-[#1E3F2D] border-[#D5E4D8]",
    },
    {
      title: t("features.smartPrice.title") || "Real-Time APMC Price Indexing",
      description:
        t("features.smartPrice.description") ||
        "Transparent market rates benchmarked against live APMC Mandi feeds, preventing underpricing and predatory deals.",
      icon: LineChart,
      color: "bg-[#EBF2F6] text-[#224A67] border-[#D0DFE8]",
    },
    {
      title: t("features.securePayments.title") || "Escrow-Protected Settlements",
      description:
        t("features.securePayments.description") ||
        "Guaranteed payment security. Funds are released instantly upon dispatch validation and quality sign-off.",
      icon: Wallet,
      color: "bg-[#F7F2E9] text-[#7A5B22] border-[#EBDDC7]",
    },
    {
      title: t("features.qualityAssurance.title") || "Certified AGMARK Quality",
      description:
        t("features.qualityAssurance.description") ||
        "Strict quality parameter logging including moisture percentage, grain size, and chemical-free cultivation verification.",
      icon: Shield,
      color: "bg-[#EEF4EF] text-[#18392B] border-[#D5E4D8]",
    },
    {
      title: t("features.logistics.title") || "Farm-Gate Cold Chain Logistics",
      description:
        t("features.logistics.description") ||
        "Door-to-door bulk freight coordination. GPS-tracked transport from village farm gate to commercial warehouse.",
      icon: Truck,
      color: "bg-[#F3EFE6] text-[#634827] border-[#E3D9C7]",
    },
    {
      title: t("features.support.title") || "Multilingual Advisory & Support",
      description:
        t("features.support.description") ||
        "24/7 agricultural helpline in Hindi, Gujarati, Marathi, Punjabi, and English for contract and crop guidance.",
      icon: Headphones,
      color: "bg-[#FAF8F3] text-[#1E3F2D] border-[#E8E4DA]",
    },
  ];

  const stats = [
    { value: "10,000+", label: t("stats.farmers") || "Verified Farmers" },
    { value: "5,000+", label: t("stats.buyers") || "Institutional Bulk Buyers" },
    { value: "₹50 Cr+", label: t("stats.volume") || "Harvest Value Transacted" },
    { value: "+32%", label: t("stats.earnings") || "Average Farmer Income Boost" },
  ];

  // High Quality Fresh Produce Showcase
  const sampleProducts = [
    {
      id: 1,
      name: "Organic Sharbati Wheat",
      category: "Grains",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
      price: "₹2,500 - ₹2,700",
      unit: "Quintal",
      farmer: "Amit Patel",
      location: "Madhya Pradesh",
      minQty: "50 Quintals",
      cert: "AGMARK Grade A",
    },
    {
      id: 2,
      name: "Ratnagiri Alphonso Mango",
      category: "Fruits",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80",
      price: "₹1,100 - ₹1,350",
      unit: "Wooden Crate",
      farmer: "Suresh Desai",
      location: "Ratnagiri, MH",
      minQty: "20 Crates",
      cert: "GI Tag Certified",
    },
    {
      id: 3,
      name: "Fresh Red Hybrid Tomatoes",
      category: "Vegetables",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
      price: "₹30 - ₹38",
      unit: "kg",
      farmer: "Rajesh Kumar",
      location: "Nashik, MH",
      minQty: "500 kg",
      cert: "Farm-Fresh Lot",
    },
    {
      id: 4,
      name: "Desi Chana (Bengal Gram)",
      category: "Pulses",
      image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80",
      price: "₹5,600 - ₹5,900",
      unit: "Quintal",
      farmer: "Rameshwar Rao",
      location: "Rajasthan",
      minQty: "25 Quintals",
      cert: "Moisture < 10%",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F5] font-sans antialiased text-[#1A261D] pt-20">
      {/* 1. NATURE-INSPIRED MINIMALIST HERO SECTION */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4EF] border border-[#D5E4D8] text-[#1E3F2D] text-xs font-semibold shadow-soft-xs">
                <Sprout className="w-3.5 h-3.5 text-[#1E3F2D]" />
                {t("home.badge") || "India's Verified Direct Farm-To-Buyer Marketplace"}
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A261D] leading-[1.14]">
                {t("home.heroTitle1") || "Direct Farm-to-Buyer"} <br className="hidden sm:block" />
                <span className="text-[#1E3F2D]">{t("home.heroTitle2") || "Trade Without Intermediaries."}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#5C6B5F] max-w-2xl leading-relaxed font-normal">
                {t("home.heroSubtitle") || "Eliminate commissions, access transparent real-time APMC Mandi pricing, and trade directly with verified bulk buyers and processing units across India."}
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] font-semibold text-xs tracking-wide rounded-xl shadow-soft-sm transition-all hover:scale-[1.01]"
                >
                  {t("home.registerFarmer") || "Join as Producer or Buyer"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/marketplace"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FAF8F3] hover:bg-[#F2EDE2] text-[#1A261D] border border-[#E8E4DA] font-semibold text-xs rounded-xl shadow-soft-xs transition-all"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-[#1E3F2D]" />
                  {t("home.exploreMarketplace") || "Explore Available Harvests"}
                </Link>
              </div>

              {/* Social proof trust points */}
              <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-[#5C6B5F] font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E3F2D]" />
                  <span>{t("home.secureEscrow") || "0% Middleman Deduction"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1E3F2D]" />
                  <span>{t("home.agmarkQuality") || "AGMARK Verified Lots"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#1E3F2D]" />
                  <span>{t("home.viewApmcBhav") || "Fair APMC Daily Indexing"}</span>
                </div>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card */}
                <div className="relative rounded-2xl overflow-hidden border border-[#E8E4DA] bg-[#FFFFFF] shadow-soft p-3">
                  <img
                    src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80"
                    alt="Agricultural Harvest"
                    className="w-full h-80 sm:h-96 object-cover rounded-xl"
                  />

                  {/* Floating Metric 1 */}
                  <div className="absolute top-3 left-3 sm:top-6 sm:left-6 bg-[#FAF8F3]/95 backdrop-blur-xs p-2.5 sm:p-3.5 rounded-xl shadow-soft border border-[#E8E4DA] flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#EEF4EF] text-[#1E3F2D] flex items-center justify-center font-bold border border-[#D5E4D8]">
                      <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <div className="text-[9px] sm:text-[10px] text-[#7F8B82] font-semibold uppercase tracking-wider">Direct Settlements</div>
                      <div className="text-xs sm:text-base font-bold text-[#18392B]">₹18.4 Cr+ Disbursed</div>
                    </div>
                  </div>

                  {/* Floating Metric 2 */}
                  <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 bg-[#FAF8F3]/95 backdrop-blur-xs p-2.5 sm:p-3.5 rounded-xl shadow-soft border border-[#E8E4DA] flex items-center gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#F7F2E9] text-[#7A5B22] flex items-center justify-center font-bold border border-[#EBDDC7]">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <div className="text-[9px] sm:text-[10px] text-[#7F8B82] font-semibold uppercase tracking-wider">Verified Network</div>
                      <div className="text-xs sm:text-base font-bold text-[#18392B]">15,000+ Stakeholders</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME MANDI TICKER (LIVE RUNNING RIGHT TO LEFT) */}
      <MandiTicker />

      {/* 2.5 LOCATION-BASED NEARBY APMC COMMODITY PRICES */}
      <NearbyApmcPrices className="my-6 sm:my-10" />

      {/* 3. HOW FARMBRIDGE WORKS (3-STEP PIPELINE) */}
      <section className="py-20 bg-[#FAF8F3] border-t border-[#E8E4DA]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-lg border border-[#D5E4D8]">
              Direct Trade Pipeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A261D] tracking-tight">
              {t("home.howItWorks") || "How Direct Agricultural Procurement Works"}
            </h2>
            <p className="text-[#5C6B5F] text-sm md:text-base font-normal">
              {t("home.howItWorksSubtitle") || "A transparent digital bridge connecting village producers with wholesale purchasers."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-[#FFFFFF] rounded-2xl p-7 border border-[#E8E4DA] relative shadow-soft-xs hover:shadow-soft transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#1E3F2D] text-[#FAF8F3] font-bold text-sm flex items-center justify-center mb-5">
                1
              </div>
              <h3 className="text-lg font-bold text-[#1A261D] mb-2">{t("home.step1Title") || "Farmer Lists Harvest"}</h3>
              <p className="text-xs sm:text-sm text-[#5C6B5F] leading-relaxed">
                {t("home.step1Desc") || "Farmers upload lot size, variety specs, moisture metrics, and asking rates directly from mobile devices."}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FFFFFF] rounded-2xl p-7 border border-[#E8E4DA] relative shadow-soft-xs hover:shadow-soft transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#2E614B] text-[#FAF8F3] font-bold text-sm flex items-center justify-center mb-5">
                2
              </div>
              <h3 className="text-lg font-bold text-[#1A261D] mb-2">{t("home.step2Title") || "Buyer Orders Wholesale"}</h3>
              <p className="text-xs sm:text-sm text-[#5C6B5F] leading-relaxed">
                {t("home.step2Desc") || "Processors, institutional buyers, and retailers inspect quality certificates and book fresh crop lots."}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FFFFFF] rounded-2xl p-7 border border-[#E8E4DA] relative shadow-soft-xs hover:shadow-soft transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#18392B] text-[#FAF8F3] font-bold text-sm flex items-center justify-center mb-5">
                3
              </div>
              <h3 className="text-lg font-bold text-[#1A261D] mb-2">{t("home.step3Title") || "Dispatch & Direct Settlement"}</h3>
              <p className="text-xs sm:text-sm text-[#5C6B5F] leading-relaxed">
                {t("home.step4Desc") || "Produce is picked up from village farm gate with live tracking. Farmers receive 100% direct bank payout upon verification."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCE MARKETPLACE PREVIEW */}
      <section className="py-20 bg-[#FBF9F5] border-t border-[#E8E4DA]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3 py-1 rounded-lg border border-[#D5E4D8]">
                {t("marketplace.badge") || "Current Marketplace Lots"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A261D] tracking-tight mt-2">
                {t("marketplace.title") || "Fresh Produce in Today's Market"}
              </h2>
              <p className="text-[#5C6B5F] text-sm mt-1">
                {t("marketplace.subtitle") || "Verified harvests available for immediate procurement directly from village farms."}
              </p>
            </div>

            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF8F3] border border-[#E8E4DA] hover:bg-[#F2EDE2] text-[#1A261D] rounded-xl text-xs font-semibold transition-all shadow-soft-xs"
            >
              {t("marketplace.allCrops") || "View Full Marketplace"} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.map((p) => (
              <div
                key={p.id}
                className="group bg-[#FFFFFF] rounded-2xl border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-0.5"
              >
                <div className="relative h-48 w-full bg-[#F5F1E8] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142C1F]/60 via-transparent to-transparent opacity-60" />

                  <span className="absolute top-3 left-3 bg-[#FAF8F3] px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#1A261D] shadow-soft-xs border border-[#E8E4DA]">
                    {p.category}
                  </span>

                  <span className="absolute top-3 right-3 bg-[#FAF8F3] px-2.5 py-1 rounded-lg text-[11px] font-medium text-[#1A261D] shadow-soft-xs flex items-center gap-1 border border-[#E8E4DA]">
                    <MapPin className="w-3 h-3 text-[#1E3F2D]" />
                    {p.location}
                  </span>

                  <div className="absolute bottom-2.5 left-3 text-xs text-[#FAF8F3] font-medium">
                    Min lot: <strong className="font-semibold">{p.minQty}</strong>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-[#1A261D] group-hover:text-[#18392B] transition-colors line-clamp-1">
                      {p.name}
                    </h3>
                    <div className="text-xs text-[#5C6B5F] mt-0.5">Grown by {p.farmer}</div>

                    <div className="mt-3 bg-[#FAF8F3] rounded-xl p-3 border border-[#E8E4DA] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3F2D]">
                          Direct Rate
                        </span>
                        <div className="text-base font-bold text-[#18392B]">
                          {p.price}
                          <span className="text-xs font-normal text-[#5C6B5F]"> / {p.unit}</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 bg-[#EEF4EF] text-[#1E3F2D] border border-[#D5E4D8] rounded-md font-semibold">
                        {p.cert}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/marketplace"
                    className="w-full py-2.5 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-soft-xs"
                  >
                    View Harvest Specs
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PLATFORM CAPABILITIES */}
      <section className="py-20 bg-[#FAF8F3] border-t border-[#E8E4DA]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-lg border border-[#D5E4D8]">
              Why FarmBridge
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A261D] tracking-tight">
              The Digital Backbone for Agricultural Commerce
            </h2>
            <p className="text-[#5C6B5F] text-sm md:text-base font-normal">
              Built to solve market information asymmetry, payment delays, and transit wastage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs hover:shadow-soft transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 ${feature.color}`}>
                  <feature.icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-[#1A261D] mb-1.5">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-[#5C6B5F] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. IMPACT STATS STRIP - Solid Forest Green */}
      <section className="py-16 bg-[#18392B] text-[#FAF8F3] border-y border-[#224A37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((st, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-[#FAF8F3] tracking-tight">
                  {st.value}
                </div>
                <div className="text-xs sm:text-sm text-[#CAD7CD] font-medium">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NATURE-INSPIRED FINAL CTA */}
      <section className="py-20 bg-[#FBF9F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-[#1E3F2D] p-8 sm:p-12 text-[#FAF8F3] text-center shadow-soft border border-[#2B583E]">
            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#2B583E] rounded-full text-xs font-semibold text-[#D8EADB] border border-[#3D7253]">
                🌱 Connecting Over 15,000 Agricultural Stakeholders
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF8F3] leading-tight">
                {t("home.ctaTitle") || "Ready to Trade Directly at Wholesale APMC Benchmarks?"}
              </h2>
              <p className="text-[#CAD7CD] text-sm md:text-base leading-relaxed font-normal">
                {t("home.ctaSubtitle") || "Whether you are a farming cooperative looking to sell your harvest or a commercial buyer seeking verified produce, start today for free."}
              </p>

              <div className="pt-3 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  to="/register"
                  className="px-7 py-3 bg-[#FAF8F3] hover:bg-[#F2EDE2] text-[#1A261D] font-semibold text-xs rounded-xl shadow-soft-xs transition-all"
                >
                  {t("home.registerFarmer") || "Create Free Account"}
                </Link>
                <Link
                  to="/contact"
                  className="px-7 py-3 bg-[#2B583E] hover:bg-[#356B4C] text-[#FAF8F3] font-semibold text-xs rounded-xl border border-[#3D7253] transition-all"
                >
                  {t("nav.contact") || "Talk to Agriculture Specialist"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}