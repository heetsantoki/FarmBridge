import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Clock,
  ChevronRight,
  TrendingUp,
  FileText,
  AlertCircle,
  HelpCircle,
  Calendar,
  Layers,
} from "lucide-react";

const RESOURCE_CATEGORIES = [
  { id: "all", label: "All Resources" },
  { id: "pricing", label: "Mandi Pricing & Trends" },
  { id: "quality", label: "AGMARK & Crop Grading" },
  { id: "policy", label: "Subsidies & Gov Policies" },
  { id: "logistics", label: "Cold Storage & Freight" },
];

const ARTICLES = [
  {
    id: "mandi-apmc-rates-2026",
    category: "Mandi Pricing & Trends",
    title: "Understanding Daily APMC Mandi Modal Rates & Settlement Rules",
    summary:
      "A complete guide on how modal prices are calculated across regional APMC yards, how quality deductions work, and how direct e-mandis help farmers lock spot prices.",
    readTime: "6 min read",
    date: "Updated Oct 2026",
    tag: "Essential Handbook",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "agmark-grain-moisture-standards",
    category: "AGMARK & Crop Grading",
    title: "AGMARK Standard Tolerances: Wheat, Paddy, and Pulses Moisture Limits",
    summary:
      "Avoid gate rejections and severe weight cuts by testing grain moisture before loading freight. Standard permissible moisture thresholds for commercial buyers.",
    readTime: "8 min read",
    date: "Updated Sep 2026",
    tag: "Quality Specification",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "pm-kisan-fpo-subsidies",
    category: "Subsidies & Gov Policies",
    title: "Central & State Subsidies for Farmer Producer Organizations (FPOs)",
    summary:
      "How registered FPOs can apply for equity matching grants, warehouse construction incentives, and solar pump support under current agricultural initiatives.",
    readTime: "5 min read",
    date: "Updated Oct 2026",
    tag: "Policy Advisory",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "cold-chain-perishables-guide",
    category: "Cold Storage & Freight",
    title: "Reefer Truck Dispatch: Managing Post-Harvest Transit Losses in Fruits",
    summary:
      "Optimizing temperature-controlled transit for mangoes, pomegranates, and tomatoes to maintain shelf appearance and command premium prices at metropolitan markets.",
    readTime: "7 min read",
    date: "Updated Aug 2026",
    tag: "Logistics Guide",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "digital-escrow-farm-contracts",
    category: "Mandi Pricing & Trends",
    title: "How Digital Escrow Works in FarmBridge B2B Bulk Trades",
    summary:
      "Learn how funds are secured before crops leave the farm-gate, protecting growers against buyer defaults and delayed bank reconciliations.",
    readTime: "4 min read",
    date: "Updated Oct 2026",
    tag: "Trade Security",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "soil-health-organic-certification",
    category: "AGMARK & Crop Grading",
    title: "NPOP Organic Certification Checklist for Indian Smallholders",
    summary:
      "Step-by-step accreditation process under the National Programme for Organic Production to earn export-ready verification and 40%+ price premiums.",
    readTime: "9 min read",
    date: "Updated Jul 2026",
    tag: "Certification",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=700&q=80",
  },
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "all" || art.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F5] font-sans pt-20 pb-16 text-[#1A261D]">
      {/* 1. HERO HEADER */}
      <section className="py-16 md:py-20 bg-[#18392B] text-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F3]/10 text-[#CAD7CD] text-xs font-semibold border border-[#FAF8F3]/15">
            <BookOpen className="w-3.5 h-3.5 text-[#A3B899]" />
            Knowledge Base & Practical Advisory Hub
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FAF8F3] leading-tight">
            Agricultural Intelligence & <br className="hidden sm:block" />
            <span className="text-[#CAD7CD]">Producer Resources</span>
          </h1>

          <p className="text-[#CAD7CD] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Essential handbooks, APMC price discovery guides, AGMARK quality specifications, and policy updates designed to empower agricultural producers.
          </p>

          <div className="max-w-md mx-auto pt-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-3.5 text-[#7F8B82]" />
              <input
                type="text"
                placeholder="Search handbooks, schemes, or crop topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white text-[#1A261D] rounded-xl shadow-soft-sm outline-none text-xs font-medium border border-[#E8E4DA] focus:border-[#1E3F2D] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER PILLS */}
      <section className="bg-[#FAF8F3] border-b border-[#E8E4DA] sticky top-20 z-30 py-3.5 shadow-soft-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full no-scrollbar">
            {RESOURCE_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === c.id
                    ? "bg-[#1E3F2D] text-[#FAF8F3] shadow-soft-xs"
                    : "bg-white text-[#5C6B5F] hover:bg-[#F2EDE2] border border-[#E8E4DA]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ARTICLES / GUIDES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative h-48 w-full bg-[#F2EDE2] overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#FAF8F3] px-3 py-1 rounded-lg text-xs font-semibold text-[#1A261D] border border-[#E8E4DA] shadow-soft-xs">
                  {art.tag}
                </span>
                <span className="absolute bottom-3 right-3 bg-[#18392B] px-2.5 py-1 rounded-lg text-[11px] font-medium text-[#FAF8F3] flex items-center gap-1 shadow-soft-xs">
                  <Clock className="w-3 h-3 text-[#A3B899]" />
                  {art.readTime}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] font-semibold text-[#1E3F2D] uppercase tracking-wider mb-1">
                    {art.category} • {art.date}
                  </div>
                  <h3 className="text-base font-semibold text-[#1A261D] leading-snug">
                    {art.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#5C6B5F] line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E4DA] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1E3F2D] flex items-center gap-1 hover:underline cursor-pointer">
                    Read Full Handbook <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] text-[#7F8B82] font-medium">Free Access</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SEASONAL HARVEST CALENDAR CHEATSHEET */}
      <section className="py-16 bg-[#FAF8F3] border-t border-[#E8E4DA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-full border border-[#D5E4D8]">
              Trade Planning
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A261D]">
              India Crop Cycle & Mandi Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-[#5C6B5F]">
              Key cropping seasons to anticipate bulk market volumes and wholesale rate swings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs space-y-3">
              <span className="text-xs font-semibold uppercase text-[#1E3F2D] bg-[#EEF4EF] px-2.5 py-1 rounded-md border border-[#D5E4D8]">
                Kharif Season (Monsoon)
              </span>
              <h4 className="font-semibold text-[#1A261D] text-sm">Sowing: Jun - Jul | Harvest: Sep - Oct</h4>
              <p className="text-xs text-[#5C6B5F] leading-relaxed">
                Paddy (Rice), Maize, Jowar, Bajra, Soybean, Cotton, Groundnut. High volume liquidity occurs between October and December.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs space-y-3">
              <span className="text-xs font-semibold uppercase text-[#3A5A40] bg-[#EEF4EF] px-2.5 py-1 rounded-md border border-[#D5E4D8]">
                Rabi Season (Winter)
              </span>
              <h4 className="font-semibold text-[#1A261D] text-sm">Sowing: Oct - Nov | Harvest: Mar - Apr</h4>
              <p className="text-xs text-[#5C6B5F] leading-relaxed">
                Wheat, Barley, Mustard, Gram (Chana), Peas. Highest institutional bidding period runs from late March through May.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs space-y-3">
              <span className="text-xs font-semibold uppercase text-[#7A5B3E] bg-[#F5EFE6] px-2.5 py-1 rounded-md border border-[#E8DDCD]">
                Zaid Season (Summer)
              </span>
              <h4 className="font-semibold text-[#1A261D] text-sm">Sowing: Mar - Apr | Harvest: May - Jun</h4>
              <p className="text-xs text-[#5C6B5F] leading-relaxed">
                Watermelon, Cucumber, Summer Vegetables, Fodder crops. Fast-turnaround cash crops traded directly with regional retail aggregators.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}