import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Tag,
  MapPin,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Sparkles,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { MandiTicker } from "../components/MandiTicker";

interface Product {
  _id?: string;
  id?: string | number;
  name: string;
  category: string;
  unit?: string;
  price?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  minQuantity?: number;
  minOrder?: number;
  farmerName?: string;
  farmer?: string;
  location?: string;
  images?: string[];
  image?: string;
  qualityCertificateNo?: string;
  extraDetails?: string;
}

const FALLBACK_PRODUCE: Product[] = [
  {
    id: "f1",
    name: "Certified Sharbati Wheat",
    category: "Grains",
    unit: "quintal",
    priceRange: { min: 2550, max: 2750 },
    minQuantity: 50,
    farmerName: "Amit Patel",
    location: "Sehore, Madhya Pradesh",
    images: ["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80"],
    qualityCertificateNo: "AGMARK-MP-4481",
    extraDetails: "Premium golden grain with moisture < 11%. Hand-harvested, zero foreign matter.",
  },
  {
    id: "f2",
    name: "Ratnagiri Alphonso Mangoes",
    category: "Fruits",
    unit: "box",
    priceRange: { min: 1100, max: 1350 },
    minQuantity: 20,
    farmerName: "Suresh Desai",
    location: "Ratnagiri, Maharashtra",
    images: ["https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80"],
    qualityCertificateNo: "GI-TAG-MH-029",
    extraDetails: "Naturally ripened GI-tagged Devgad Alphonso. Sweet, aromatic pulp with export grade packaging.",
  },
  {
    id: "f3",
    name: "Fresh Hybrid Red Tomatoes",
    category: "Vegetables",
    unit: "kg",
    priceRange: { min: 32, max: 38 },
    minQuantity: 500,
    farmerName: "Rajesh Kumar",
    location: "Nashik, Maharashtra",
    images: ["https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80"],
    qualityCertificateNo: "APMC-NSK-9902",
    extraDetails: "Firm, thick-skinned tomatoes harvested within 12 hours. Ideal for wholesale pulp or grocery retail.",
  },
  {
    id: "f4",
    name: "Desi Brown Chana (Chickpeas)",
    category: "Pulses",
    unit: "quintal",
    priceRange: { min: 5700, max: 6050 },
    minQuantity: 30,
    farmerName: "Rameshwar Rao",
    location: "Kota, Rajasthan",
    images: ["https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80"],
    qualityCertificateNo: "AGMARK-RJ-8120",
    extraDetails: "High protein unpolished brown chickpeas. Direct from organic farm cooperative.",
  },
  {
    id: "f5",
    name: "Malwa Yellow Soybean",
    category: "Oilseeds",
    unit: "quintal",
    priceRange: { min: 4250, max: 4450 },
    minQuantity: 40,
    farmerName: "Devendra Solanki",
    location: "Indore, Madhya Pradesh",
    images: ["https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80"],
    qualityCertificateNo: "OIL-SEED-FED-01",
    extraDetails: "High oil content (> 19%) certified yellow soybean, suitable for processing mills.",
  },
  {
    id: "f6",
    name: "Gir Kesar Mangoes",
    category: "Fruits",
    unit: "box",
    priceRange: { min: 850, max: 1050 },
    minQuantity: 25,
    farmerName: "Rajesh Patel",
    location: "Junagadh, Gujarat",
    images: ["https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&auto=format&fit=crop&q=80"],
    qualityCertificateNo: "GI-TAG-GJ-014",
    extraDetails: "Authentic Talala Gir Kesar with rich saffron pulp and distinct sweetness.",
  },
  {
    id: "f7",
    name: "Jyoti Cold-Storage Potatoes",
    category: "Vegetables",
    unit: "quintal",
    priceRange: { min: 1800, max: 2100 },
    minQuantity: 100,
    farmerName: "Harpreet Singh",
    location: "Jalandhar, Punjab",
    images: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80"],
    qualityCertificateNo: "PB-AGRI-1002",
    extraDetails: "Medium-to-large grading, free from green spots, ideal for chips and wholesale distribution.",
  },
  {
    id: "f8",
    name: "Basmati 1121 Steam Rice",
    category: "Grains",
    unit: "quintal",
    priceRange: { min: 4850, max: 5200 },
    minQuantity: 50,
    farmerName: "Gurinder Gill",
    location: "Karnal, Haryana",
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"],
    qualityCertificateNo: "BASMATI-EXP-889",
    extraDetails: "Extra long grain (8.35mm average) with characteristic aroma and zero breakage.",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Harvests", icon: "🌱" },
  { id: "Grains", label: "Grains & Cereals", icon: "🌾" },
  { id: "Vegetables", label: "Fresh Vegetables", icon: "🥬" },
  { id: "Fruits", label: "Seasonal Fruits", icon: "🍎" },
  { id: "Pulses", label: "Pulses & Lentils", icon: "🫘" },
  { id: "Oilseeds", label: "Oilseeds", icon: "🌻" },
];

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchLiveProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/product/all");
        if (res.data && res.data.length > 0) {
          const mapped = res.data.map((p: any) => ({
            ...p,
            farmerName: p.farmerId
              ? `${p.farmerId.firstName || ""} ${p.farmerId.lastName || ""}`.trim() || "Verified Farmer"
              : "Verified Farmer",
            location: p.farmerId?.state || "India",
          }));
          setProducts(mapped);
        } else {
          setProducts(FALLBACK_PRODUCE);
        }
      } catch (err) {
        console.warn("Using fallback marketplace inventory", err);
        setProducts(FALLBACK_PRODUCE);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveProducts();
  }, []);

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (prod.location && prod.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" ||
      prod.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9F5] font-sans pt-20 pb-16">
      {/* 1. HERO HEADER - Solid Forest Green */}
      <section className="relative overflow-hidden py-14 md:py-18 bg-[#18392B] text-[#FAF8F3] border-b border-[#224A37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#234E3C] text-[#D8EADB] text-xs font-semibold border border-[#2E614B]">
            <Sparkles className="w-3.5 h-3.5 text-[#A5D6B1]" />
            Live Wholesale Mandi Lots • Direct Producer Rates
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF8F3]">
            Agricultural Produce Marketplace
          </h1>

          <p className="text-[#CAD7CD] text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            Source high-grade farm produce directly from verified farmers across India. Zero middlemen margins, fair APMC index benchmarks, and verified harvest quality.
          </p>

          {/* Search bar inside hero */}
          <div className="max-w-xl mx-auto pt-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-3.5 text-[#7F8B82]" />
              <input
                type="text"
                placeholder="Search by crop, variety, or growing state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-24 py-3 bg-[#FFFFFF] text-[#1A261D] placeholder:text-[#7F8B82] rounded-xl shadow-soft-sm outline-none text-sm font-medium border border-[#E8E4DA] focus:border-[#1E3F2D]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-3 text-xs text-[#7F8B82] hover:text-[#1A261D] font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME MANDI TICKER (LIVE RUNNING RIGHT TO LEFT) */}
      <MandiTicker />

      {/* 3. CATEGORY PILL FILTER BAR */}
      <section className="bg-[#FAF8F3] border-b border-[#E8E4DA] sticky top-20 z-30 shadow-soft-xs py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-[#1E3F2D] text-[#FAF8F3] shadow-soft-xs"
                    : "bg-[#FFFFFF] text-[#5C6B5F] hover:text-[#1A261D] hover:bg-[#F2EDE2] border border-[#E8E4DA]"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="text-xs font-semibold text-[#5C6B5F] whitespace-nowrap hidden sm:block">
            Showing <strong className="text-[#1A261D]">{filteredProducts.length}</strong> available lots
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1E3F2D]"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-[#FAF8F3] rounded-2xl p-14 text-center border border-[#E8E4DA] max-w-lg mx-auto shadow-soft-sm">
            <h3 className="text-xl font-bold text-[#1A261D]">No Lots Matching Criteria</h3>
            <p className="text-[#5C6B5F] text-sm mt-2 leading-relaxed">
              We couldn't find any produce listings matching your filter. Try clearing filters or searching for another crop.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-5 px-5 py-2.5 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] text-xs font-semibold rounded-xl shadow-soft-xs transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p, idx) => {
              const imgUrl =
                p.images && p.images.length > 0
                  ? p.images[0].startsWith("http")
                    ? p.images[0]
                    : `http://localhost:5000${p.images[0]}`
                  : p.image ||
                    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80";

              const minPrice = p.priceRange?.min || p.price || 0;
              const maxPrice = p.priceRange?.max || p.price || 0;
              const unit = p.unit || "kg";
              const minLot = p.minQuantity || p.minOrder || 10;

              return (
                <div
                  key={p._id || p.id || idx}
                  className="group bg-[#FFFFFF] rounded-2xl border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-0.5"
                >
                  {/* Photo area */}
                  <div
                    onClick={() => setSelectedProduct(p)}
                    className="relative h-48 w-full bg-[#F5F1E8] overflow-hidden cursor-pointer"
                  >
                    <img
                      src={imgUrl}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#142C1F]/60 via-transparent to-transparent opacity-60" />

                    <span className="absolute top-3 left-3 bg-[#FAF8F3] px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#1A261D] shadow-soft-xs border border-[#E8E4DA]">
                      {p.category}
                    </span>

                    {p.location && (
                      <span className="absolute top-3 right-3 bg-[#FAF8F3] px-2.5 py-1 rounded-lg text-[11px] font-medium text-[#1A261D] shadow-soft-xs flex items-center gap-1 border border-[#E8E4DA]">
                        <MapPin className="w-3 h-3 text-[#1E3F2D]" />
                        {p.location}
                      </span>
                    )}

                    <div className="absolute bottom-2.5 left-3 text-xs text-[#FAF8F3] font-medium">
                      Min lot: <strong>{minLot} {unit}</strong>
                    </div>
                  </div>

                  {/* Body area */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3
                        onClick={() => setSelectedProduct(p)}
                        className="text-base font-bold text-[#1A261D] group-hover:text-[#18392B] transition-colors line-clamp-1 cursor-pointer"
                      >
                        {p.name}
                      </h3>
                      <div className="text-xs text-[#5C6B5F] mt-0.5">
                        Farmer: <strong className="text-[#1A261D]">{p.farmerName || p.farmer || "Direct Producer"}</strong>
                      </div>

                      {/* Price box */}
                      <div className="mt-3 bg-[#FAF8F3] rounded-xl p-3 border border-[#E8E4DA] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3F2D]">
                            Direct Mandi Rate
                          </span>
                          <div className="text-base font-bold text-[#18392B]">
                            ₹{minPrice}
                            {maxPrice > minPrice ? ` - ₹${maxPrice}` : ""}
                            <span className="text-xs font-normal text-[#5C6B5F]"> / {unit}</span>
                          </div>
                        </div>

                        <span className="text-[10px] px-2 py-0.5 bg-[#EEF4EF] text-[#1E3F2D] border border-[#D5E4D8] rounded-md font-semibold">
                          {p.qualityCertificateNo ? "Certified" : "Verified"}
                        </span>
                      </div>
                    </div>

                    {/* Bottom CTA actions */}
                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => setSelectedProduct(p)}
                        className="p-2.5 bg-[#FAF8F3] hover:bg-[#F2EDE2] text-[#1A261D] border border-[#E8E4DA] rounded-xl transition-colors flex items-center justify-center"
                        title="View Full Specifications"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <Link
                        to="/login"
                        className="flex-1 py-2.5 px-4 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Buy Wholesale Lot
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. DETAIL INSPECTION MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-[#142C1F]/50 flex justify-center items-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="bg-[#FAF8F3] rounded-2xl p-6 md:p-8 max-w-2xl w-full shadow-soft-lg relative overflow-hidden max-h-[90vh] overflow-y-auto border border-[#E8E4DA] font-sans"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-[#FFFFFF] hover:bg-[#F2EDE2] border border-[#E8E4DA] rounded-full w-8 h-8 flex items-center justify-center text-[#5C6B5F] hover:text-[#1A261D] z-10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <span className="bg-[#EEF4EF] text-[#1E3F2D] px-2.5 py-0.5 rounded-lg text-xs font-semibold border border-[#D5E4D8]">
                  {selectedProduct.category}
                </span>

                <h2 className="text-2xl font-bold text-[#1A261D]">{selectedProduct.name}</h2>

                <div className="rounded-xl overflow-hidden h-64 bg-[#F5F1E8] border border-[#E8E4DA]">
                  <img
                    src={
                      selectedProduct.images?.[0]?.startsWith("http")
                        ? selectedProduct.images[0]
                        : selectedProduct.images?.[0]
                        ? `http://localhost:5000${selectedProduct.images[0]}`
                        : selectedProduct.image ||
                          "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80"
                    }
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="bg-[#FFFFFF] rounded-xl p-4 border border-[#E8E4DA] flex justify-between items-center">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D]">Direct Rate</span>
                    <div className="text-xl font-bold text-[#18392B]">
                      ₹{selectedProduct.priceRange?.min || selectedProduct.price} / {selectedProduct.unit || "kg"}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#7F8B82] block">Min. Lot Size</span>
                    <strong className="text-[#1A261D] font-bold">
                      {selectedProduct.minQuantity || selectedProduct.minOrder || 10} {selectedProduct.unit || "kg"}
                    </strong>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E8E4DA] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#5C6B5F]">Producer / Cooperative:</span>
                    <strong className="text-[#1A261D]">{selectedProduct.farmerName || selectedProduct.farmer}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C6B5F]">Origin / Region:</span>
                    <strong className="text-[#1A261D]">{selectedProduct.location || "India"}</strong>
                  </div>
                  {selectedProduct.qualityCertificateNo && (
                    <div className="flex justify-between">
                      <span className="text-[#5C6B5F]">Quality Certificate:</span>
                      <strong className="font-mono text-[#1E3F2D]">{selectedProduct.qualityCertificateNo}</strong>
                    </div>
                  )}
                </div>

                {selectedProduct.extraDetails && (
                  <p className="text-xs text-[#5C6B5F] bg-[#FFFFFF] p-3 rounded-xl border border-[#E8E4DA] leading-relaxed">
                    {selectedProduct.extraDetails}
                  </p>
                )}

                <div className="pt-2 flex gap-3">
                  <Link
                    to="/login"
                    className="flex-1 py-3 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs text-center transition-all"
                  >
                    Login / Sign In to Place Wholesale Order
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-3 bg-[#FFFFFF] hover:bg-[#F2EDE2] border border-[#E8E4DA] text-[#1A261D] font-semibold text-xs rounded-xl text-center transition-colors"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
