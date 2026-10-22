import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Star,
  Quote,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const STORIES = [
  {
    id: "story-1",
    name: "Rameshwar Rao",
    location: "Sehore, Madhya Pradesh",
    crop: "Certified Sharbati Wheat",
    incomeBoost: "+38% Profit Margin",
    buyerType: "Commercial Flour Mill (Pune)",
    verifiedYear: "Trade Verified Oct 2026",
    quote:
      "For 15 years, I took whatever rate the local commission agents dictated at the mandi gate. Last season, I listed 150 quintals on FarmBridge. Within 36 hours, a verified processing mill in Pune matched my asking price. My entire payment was settled directly into my bank account with zero commission.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "story-2",
    name: "Sunita Devi & Saraswati FPO",
    location: "Nashik, Maharashtra",
    crop: "Table Grapes & Pomegranates",
    incomeBoost: "+45% Higher Return",
    buyerType: "Export Aggregator (Mumbai)",
    verifiedYear: "Trade Verified Sep 2026",
    quote:
      "As a women-led Farmer Producer Organization of 45 smallholders, dealing with distant wholesale exporters was impossible. FarmBridge verified our AGMARK grade reports and arranged refrigerated transport straight from our farm gate.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "story-3",
    name: "Harpreet Singh Sandhu",
    location: "Ludhiana, Punjab",
    crop: "Basmati Rice & Seed Potatoes",
    incomeBoost: "+31% Net Earnings",
    buyerType: "Retail Supermarket Chain (Delhi NCR)",
    verifiedYear: "Trade Verified Aug 2026",
    quote:
      "The real-time APMC Mandi ticker on FarmBridge gave me leverage. When local buyers tried to bid 15% below the Punjab state average, I used FarmBridge escrow to sell directly to modern retail procurement teams.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "story-4",
    name: "Dr. Arvind Patel",
    location: "Anand, Gujarat",
    crop: "Organic Spices & Cumin (Jeera)",
    incomeBoost: "+52% Organic Premium",
    buyerType: "Ayurvedic Brand (Ahmedabad)",
    verifiedYear: "Trade Verified Oct 2026",
    quote:
      "Conventional mandis treat organically certified cumin the same as chemical crops. FarmBridge's category filters allowed wellness processors to specifically bid on our organic lot, yielding the premium our soil deserved.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "story-5",
    name: "Kavitha Murugesan",
    location: "Salem, Tamil Nadu",
    crop: "Salem Turmeric & Tapioca",
    incomeBoost: "+29% Realized Value",
    buyerType: "Spice Extract Factory (Coimbatore)",
    verifiedYear: "Trade Verified Jul 2026",
    quote:
      "Instant 24-hour bank transfer through FarmBridge digital escrow transformed our seasonal cash flow. We were able to buy high-yield seed varieties for our next cycle without borrowing from local moneylenders.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "story-6",
    name: "Mukesh & Sons Agribusiness",
    location: "Bengaluru, Karnataka",
    crop: "Bulk Institutional Procurement",
    incomeBoost: "18% Sourcing Cost Saved",
    buyerType: "Restaurant Supply Network",
    verifiedYear: "Buyer Verified Sep 2026",
    quote:
      "As a commercial bulk buyer feeding 60 restaurants daily, sourcing directly from verified growers through FarmBridge cut out three layers of wholesale brokers and guaranteed fresher produce with zero lot rejections.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80",
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F5] font-sans pt-20 pb-16 text-[#1A261D]">
      {/* 1. HERO HEADER */}
      <section className="py-16 md:py-20 bg-[#18392B] text-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F3]/10 text-[#CAD7CD] text-xs font-semibold border border-[#FAF8F3]/15">
            <Users className="w-3.5 h-3.5 text-[#A3B899]" />
            Verified Producer & Buyer Case Studies
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FAF8F3] leading-tight">
            Real Farmers. Real Buyers. <br className="hidden sm:block" />
            <span className="text-[#CAD7CD]">Transformative Impact.</span>
          </h1>

          <p className="text-[#CAD7CD] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Discover how smallholder farmers, producer organizations, and food businesses across India are achieving financial independence through direct digital commerce.
          </p>
        </div>
      </section>

      {/* 2. FEATURED CASE STUDY SPOTLIGHT */}
      <section className="py-16 bg-[#FAF8F3] border-b border-[#E8E4DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#E8E4DA] shadow-soft">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <div className="relative rounded-xl overflow-hidden aspect-square bg-[#F2EDE2]">
                  <img
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                    alt="Featured farmer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#FAF8F3] px-3 py-1 rounded-lg text-xs font-semibold text-[#1E3F2D] border border-[#E8E4DA] shadow-soft-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1E3F2D]" />
                    Spotlight Producer
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3 py-1 rounded-full border border-[#D5E4D8]">
                    Grains & Cereals
                  </span>
                  <span className="text-xs text-[#5C6B5F] font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#7F8B82]" />
                    Sehore, Madhya Pradesh
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A261D] leading-snug">
                  "FarmBridge gave me direct access to flour mills 400 km away, eliminating local auction deductions."
                </h2>

                <p className="text-sm sm:text-base text-[#5C6B5F] leading-relaxed italic">
                  “For 15 years, I took whatever rate the local commission agents dictated at the mandi gate. Last season, I listed 150 quintals of certified Sharbati Wheat on FarmBridge. Within 36 hours, a verified processing mill in Pune matched my asking price. My entire payment was settled directly into my bank account with zero commission.”
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-6 border-t border-[#E8E4DA] pt-4">
                  <div>
                    <div className="text-2xl font-bold text-[#1E3F2D]">+38%</div>
                    <div className="text-xs text-[#5C6B5F] font-medium">Net Profit Increase</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1A261D]">150 Qtl</div>
                    <div className="text-xs text-[#5C6B5F] font-medium">Wheat Volume Traded</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1A261D]">24 Hours</div>
                    <div className="text-xs text-[#5C6B5F] font-medium">Bank Settlement</div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="font-semibold text-[#1A261D]">Rameshwar Rao</div>
                  <div className="text-xs text-[#5C6B5F]">Lead Farmer, Sehore District Farmer Group</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STORIES GRID */}
      <section className="py-20 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-full border border-[#D5E4D8]">
              Community Voices
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A261D] tracking-tight">
              Stories Across Crops & Regions
            </h2>
            <p className="text-[#5C6B5F] text-sm md:text-base">
              From mango orchards in Maharashtra to spice growers in Kerala, see the direct trade difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STORIES.map((st) => (
              <div
                key={st.id}
                className="bg-white rounded-2xl border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-300 p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={st.image}
                      alt={st.name}
                      className="w-13 h-13 rounded-xl object-cover border border-[#E8E4DA] shadow-soft-xs"
                    />
                    <div>
                      <h3 className="font-semibold text-[#1A261D] text-sm">{st.name}</h3>
                      <div className="text-xs text-[#5C6B5F] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#1E3F2D]" />
                        {st.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-[#FAF8F3] p-3 rounded-xl border border-[#E8E4DA]">
                    <span className="font-medium text-[#1A261D]">{st.crop}</span>
                    <span className="font-semibold text-[#1E3F2D] bg-[#EEF4EF] px-2 py-0.5 rounded-md border border-[#D5E4D8]">
                      {st.incomeBoost}
                    </span>
                  </div>

                  <p className="text-xs text-[#5C6B5F] leading-relaxed italic">
                    "{st.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E4DA] flex items-center justify-between text-xs text-[#7F8B82]">
                  <span>Buyer: <strong className="text-[#1A261D] font-medium">{st.buyerType}</strong></span>
                  <span className="text-[11px] font-semibold text-[#1E3F2D]">{st.verifiedYear}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-16 bg-[#FAF8F3] border-t border-[#E8E4DA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A261D]">
            Write Your Own Agricultural Success Story
          </h2>
          <p className="text-sm text-[#5C6B5F] max-w-xl mx-auto">
            Join thousands of producers taking control of their crop pricing, customer contracts, and payouts.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="px-7 py-3 bg-[#1E3F2D] hover:bg-[#18392B] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-colors inline-flex items-center justify-center gap-1.5"
            >
              Start Selling Harvest
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/marketplace"
              className="px-7 py-3 bg-white hover:bg-[#F2EDE2] text-[#1A261D] font-medium text-xs rounded-xl border border-[#E8E4DA] transition-colors inline-flex items-center justify-center"
            >
              Browse Active Lots
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}