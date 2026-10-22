import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Scale,
  TrendingUp,
  Sprout,
  Users,
  Award,
  ArrowRight,
  Heart,
  Landmark,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Fair Pricing & Transparency",
      description: "Direct price discovery benchmarked to real-time APMC Mandi rates with zero intermediary commission cuts.",
      icon: Scale,
      color: "bg-[#EEF4EF] text-[#1E3F2D] border-[#D5E4D8]",
    },
    {
      title: "Direct Producer Settlement",
      description: "Guaranteed prompt 24-hour bank settlements to verified farmer accounts upon lot delivery confirmation.",
      icon: TrendingUp,
      color: "bg-[#F5EFE6] text-[#7A5B3E] border-[#E8DDCD]",
    },
    {
      title: "AGMARK Quality Assurance",
      description: "Every crop lot includes moisture level testing, crop grading, and batch photos before sale execution.",
      icon: Award,
      color: "bg-[#EEF4EF] text-[#1E3F2D] border-[#D5E4D8]",
    },
    {
      title: "Pan-India Freight Logistics",
      description: "On-demand verified freight matching from farm-gate storage straight to institutional buyer warehouses.",
      icon: Users,
      color: "bg-[#F5EFE6] text-[#7A5B3E] border-[#E8DDCD]",
    },
  ];

  const milestones = [
    { year: "2024", title: "Inception & Research", desc: "Initiated at Marwadi University Agri-Tech Lab to study mandi pricing disparities across western India." },
    { year: "2025", title: "Direct Trading Prototype", desc: "Launched peer-to-peer farmer-buyer pilot across Gujarat and Maharashtra agricultural clusters." },
    { year: "2026", title: "Enterprise Scaled Ecosystem", desc: "Over 10,000 farmers and 5,000 commercial buyers trading across 8 agricultural states." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F5] font-sans pt-20 pb-16 text-[#1A261D]">
      {/* 1. HERO HEADER */}
      <section className="py-16 md:py-20 bg-[#18392B] text-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F3]/10 text-[#CAD7CD] text-xs font-semibold border border-[#FAF8F3]/15">
            <Sprout className="w-3.5 h-3.5 text-[#A3B899]" />
            Our Mission & Agricultural Vision
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FAF8F3] leading-tight">
            Bridging India's Farm Gate to <br className="hidden sm:block" />
            <span className="text-[#CAD7CD]">Commercial Markets</span>
          </h1>

          <p className="text-[#CAD7CD] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            FarmBridge is a digital agricultural exchange transforming how crops are priced, verified, and traded across India with zero middlemen commissions.
          </p>
        </div>
      </section>

      {/* 2. THE STORY & MISSION */}
      <section className="py-20 bg-[#FAF8F3] border-b border-[#E8E4DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Visual Left */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E8E4DA] shadow-soft p-3 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                  alt="Harvesting crops"
                  className="rounded-xl w-full h-80 sm:h-96 object-cover"
                />

                <div className="absolute bottom-6 left-6 right-6 bg-[#FAF8F3] rounded-xl p-4 shadow-soft border border-[#E8E4DA] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EEF4EF] text-[#1E3F2D] flex items-center justify-center font-bold">
                      <Heart className="w-5 h-5 fill-[#1E3F2D]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-[#5C6B5F] uppercase tracking-wider">Impact Focus</div>
                      <div className="text-sm font-semibold text-[#1A261D]">Farmer-First Economic Model</div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-[#EEF4EF] text-[#1E3F2D] rounded-lg font-medium border border-[#D5E4D8]">
                    +32% Margins
                  </span>
                </div>
              </div>
            </div>

            {/* Content Right */}
            <div className="space-y-6 text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-full border border-[#D5E4D8]">
                The Founding Purpose
              </span>

              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A261D] tracking-tight leading-snug">
                Why We Built FarmBridge
              </h2>

              <p className="text-sm sm:text-base text-[#5C6B5F] leading-relaxed">
                For generations, Indian farmers have faced steep intermediary fees, delayed payouts, and opaque mandi auctions where commission agents capture up to 40% of the harvest's retail value.
              </p>

              <p className="text-sm sm:text-base text-[#5C6B5F] leading-relaxed">
                FarmBridge was built as an academic and technological innovation at <strong>Marwadi University</strong> to replace exploitative supply chains with a verified, transparent, and direct e-commerce exchange.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#E8E4DA] shadow-soft-xs">
                  <div className="text-2xl font-bold text-[#1E3F2D]">₹0</div>
                  <div className="text-xs text-[#5C6B5F] font-medium mt-1">Intermediary Commission Fees</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#E8E4DA] shadow-soft-xs">
                  <div className="text-2xl font-bold text-[#1E3F2D]">24 Hours</div>
                  <div className="text-xs text-[#5C6B5F] font-medium mt-1">Direct Farmer Payment Cycle</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES & PILLARS */}
      <section className="py-20 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-full border border-[#D5E4D8]">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A261D] tracking-tight">
              Our Core Commitments
            </h2>
            <p className="text-[#5C6B5F] text-sm md:text-base">
              The ethical and technological standards driving our agricultural marketplace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-5 ${v.color}`}>
                    <v.icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1A261D] mb-2">{v.title}</h3>
                  <p className="text-xs text-[#5C6B5F] leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. UNIVERSITY LAB & ROADMAP */}
      <section className="py-20 bg-[#FAF8F3] border-t border-[#E8E4DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-full border border-[#D5E4D8]">
              Academic Innovation Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A261D] tracking-tight">
              Developed at Marwadi University
            </h2>
            <p className="text-[#5C6B5F] text-sm md:text-base">
              Engineered with advanced full-stack architectures, real-time APMC indexing, and verified database schemas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-7 border border-[#E8E4DA] shadow-soft-xs relative">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3 py-1 rounded-full border border-[#D5E4D8]">
                  {m.year}
                </span>
                <h3 className="text-lg font-semibold text-[#1A261D] mt-4 mb-2">{m.title}</h3>
                <p className="text-xs text-[#5C6B5F] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-16 bg-[#FBF9F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-[#18392B] p-8 sm:p-12 text-[#FAF8F3] text-center shadow-soft">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Join the Direct Agriculture Movement</h2>
            <p className="text-[#CAD7CD] text-sm max-w-xl mx-auto mb-8">
              Whether you cultivate 2 acres or source 50 tons of grain monthly, FarmBridge ensures transparent fair-market execution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-7 py-3 bg-[#FAF8F3] text-[#18392B] font-semibold text-xs rounded-xl hover:bg-[#F2EDE2] transition-colors shadow-soft-xs inline-flex items-center justify-center gap-1.5"
              >
                Register Your Account
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/marketplace"
                className="px-7 py-3 bg-transparent hover:bg-white/10 text-[#FAF8F3] font-medium text-xs rounded-xl border border-[#FAF8F3]/30 transition-colors inline-flex items-center justify-center"
              >
                Browse Marketplace Lots
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
