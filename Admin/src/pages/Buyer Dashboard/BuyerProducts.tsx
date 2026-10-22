import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package2,
  MapPin,
  ShoppingCart,
  X,
  Sparkles,
  Eye,
} from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRecoilValue } from "recoil";
import tokenAtom from "../../hooks/tokenAtom";
import { toast } from "react-toastify";
import MandiTicker from "../../components/MandiTicker";

// Custom styles for slick slider
const sliderStyles = `
  .custom-slider .slick-dots {
    bottom: 12px;
  }
  .custom-slider .slick-dots li button:before {
    color: white;
    opacity: 0.7;
    font-size: 8px;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
  }
  .custom-slider .slick-dots li.slick-active button:before {
    color: #1E3F2D;
    opacity: 1;
  }
  .custom-slider .slick-prev,
  .custom-slider .slick-next {
    z-index: 10;
    width: 34px;
    height: 34px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  .custom-slider .slick-prev { left: 12px; }
  .custom-slider .slick-next { right: 12px; }
  .custom-slider .slick-prev:before,
  .custom-slider .slick-next:before {
    color: #0f172a;
    font-size: 16px;
  }
`;

interface FarmerId {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  country: string;
}

interface Product {
  _id: string;
  name: string;
  category: string;
  unit: string;
  priceRange: {
    min: number;
    max: number;
  };
  extraDetails: string;
  images: string[];
  minQuantity: number;
  qualityCertificateNo?: string;
  farmerId: FarmerId;
  farmerName?: string;
  contact?: string;
  location?: string;
}

const CATEGORY_CHIPS = [
  { id: "all", label: "All Harvests", icon: "🌱" },
  { id: "Grains", label: "Grains & Cereals", icon: "🌾" },
  { id: "Vegetables", label: "Fresh Vegetables", icon: "🥬" },
  { id: "Fruits", label: "Fruits", icon: "🍎" },
  { id: "Pulses", label: "Pulses & Lentils", icon: "🫘" },
  { id: "Spices", label: "Spices & Herbs", icon: "🌶️" },
  { id: "Oilseeds", label: "Oilseeds", icon: "🌻" },
];

const BuyerProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Order checkout modal state
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState<number>(0);
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [isOrdering, setIsOrdering] = useState(false);

  const token = useRecoilValue(tokenAtom) || localStorage.getItem("token");

  const handleOpenBuyModal = (prod: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedProduct(prod);
    setOrderQuantity(prod.minQuantity || 10);
    setShowModal(false);
    setShowOrderModal(true);
  };

  const handleOpenDetailModal = (prod: Product) => {
    setSelectedProduct(prod);
    setShowModal(true);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    if (!token) {
      toast.error("Please log in to place an order");
      return;
    }

    if (orderQuantity < (selectedProduct.minQuantity || 1)) {
      toast.error(`Minimum order quantity is ${selectedProduct.minQuantity} ${selectedProduct.unit}`);
      return;
    }

    if (!deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.phone) {
      toast.error("Please provide street, city, and contact phone number");
      return;
    }

    setIsOrdering(true);
    try {
      const pricePerUnit = selectedProduct.priceRange?.min || 0;
      const totalAmount = orderQuantity * pricePerUnit;

      const payload = {
        productId: selectedProduct._id,
        quantity: Number(orderQuantity),
        unit: selectedProduct.unit,
        pricePerUnit,
        totalAmount,
        deliveryAddress,
        paymentMethod,
      };

      await axios.post("http://localhost:5000/api/orders/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(
        `Order placed successfully! Total: ₹${totalAmount.toLocaleString("en-IN")}. Farmer has been notified.`,
        { autoClose: 4000 }
      );
      setShowOrderModal(false);
      // Reset form
      setDeliveryAddress({ street: "", city: "", state: "", pincode: "", phone: "" });
    } catch (err: any) {
      console.error("Order error:", err);
      toast.error(err.response?.data?.message || err.message || "Failed to place order");
    } finally {
      setIsOrdering(false);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const response = await axios.get("http://localhost:5000/api/product/all", { headers });
      const mapped = (response.data || []).map((p: any) => ({
        ...p,
        farmerName: p.farmerId
          ? `${p.farmerId.firstName || ""} ${p.farmerId.lastName || ""}`.trim() || "Verified Farmer"
          : "Verified Farmer",
        contact: p.farmerId?.phone || "Via FarmBridge",
        location: p.farmerId?.state || "India",
      }));
      setProducts(mapped);
    } catch (err: any) {
      setError("Failed to fetch fresh produce listings. Please verify the backend is running.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.location && product.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "custom-slider",
  };

  return (
    <div className="w-full max-w-full min-w-0 pb-16 font-sans">
      <style>{sliderStyles}</style>

      {/* 1. HERO BANNER - Nature-Inspired Minimalist Forest Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#18392B] p-7 md:p-10 text-[#FAF8F3] shadow-soft mb-6 border border-[#224A37]">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#234E3C] rounded-full text-xs font-semibold text-[#D8EADB] border border-[#2E614B]">
            <Sparkles className="w-3.5 h-3.5 text-[#A5D6B1]" />
            Direct Producer-To-Buyer Agri Marketplace
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF8F3] leading-tight">
            Fresh Farm Harvest, Direct from Verified Producers
          </h1>
          <p className="text-[#CAD7CD] text-sm md:text-base leading-relaxed font-normal">
            Source high-grade grains, fresh vegetables, fruits, and oilseeds directly from village farms at wholesale rates with zero middleman commissions.
          </p>
        </div>
      </div>

      {/* 2. REAL-TIME RUNNING MANDI TICKER (RIGHT TO LEFT) */}
      <MandiTicker className="mb-6" />

      {/* 3. SEARCH & FILTER CONTROLS */}
      <div className="space-y-4 mb-8">
        <div className="bg-[#FAF8F3] rounded-2xl p-4 md:p-5 border border-[#E8E4DA] shadow-soft-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#7F8B82]" />
            <input
              type="text"
              placeholder="Search by crop, variety, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-sm font-medium text-[#1A261D] placeholder:text-[#7F8B82] transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-3 text-[#7F8B82] hover:text-[#1A261D] text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#5C6B5F]">
            <span>Showing <strong className="text-[#1A261D]">{filteredProducts.length}</strong> available lots</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORY_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setSelectedCategory(chip.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === chip.id
                  ? "bg-[#1E3F2D] text-[#FAF8F3] shadow-soft-sm"
                  : "bg-[#FAF8F3] text-[#5C6B5F] hover:text-[#1A261D] hover:bg-[#F2EDE2] border border-[#E8E4DA]"
              }`}
            >
              <span>{chip.icon}</span>
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. PRODUCT CARDS GRID */}
      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1E3F2D]"></div>
        </div>
      ) : error ? (
        <div className="bg-[#FAF8F3] rounded-2xl p-10 text-center border border-[#E8E4DA] max-w-lg mx-auto shadow-soft-sm">
          <p className="text-[#842A2A] font-semibold mb-4 text-sm">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-6 py-2.5 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-colors"
          >
            Retry Connection
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-[#FAF8F3] rounded-2xl p-14 text-center border border-[#E8E4DA] max-w-lg mx-auto shadow-soft-sm">
          <div className="w-14 h-14 bg-[#EEF4EF] text-[#1E3F2D] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#D5E4D8]">
            <Package2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#1A261D]">No Produce Found</h3>
          <p className="text-[#5C6B5F] text-sm mt-2 leading-relaxed">
            We couldn't find any listings matching your search or category filter. Try selecting another category or clearing filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="mt-5 px-5 py-2.5 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] text-xs font-semibold rounded-xl shadow-soft-xs transition-all"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const imgUrl =
              product.images && product.images.length > 0
                ? `http://localhost:5000${product.images[0]}`
                : "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80";

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="group bg-[#FFFFFF] rounded-2xl border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-0.5"
              >
                {/* Image Frame */}
                <div
                  onClick={() => handleOpenDetailModal(product)}
                  className="relative h-48 w-full bg-[#F5F1E8] overflow-hidden cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142C1F]/60 via-transparent to-transparent opacity-60" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-[#FAF8F3] px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#1A261D] shadow-soft-xs border border-[#E8E4DA]/80">
                      {product.category}
                    </span>
                  </div>

                  {product.location && (
                    <div className="absolute top-3 right-3 bg-[#FAF8F3] px-2.5 py-1 rounded-lg text-[11px] font-medium text-[#1A261D] shadow-soft-xs flex items-center gap-1 border border-[#E8E4DA]/80">
                      <MapPin className="w-3 h-3 text-[#1E3F2D]" />
                      {product.location}
                    </div>
                  )}

                  <div className="absolute bottom-2.5 left-3 text-xs text-[#FAF8F3] font-medium">
                    Min order: <strong>{product.minQuantity} {product.unit}</strong>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => handleOpenDetailModal(product)}
                      className="text-base font-bold text-[#1A261D] group-hover:text-[#18392B] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-1.5 text-xs text-[#5C6B5F]">
                      <div className="w-5 h-5 rounded-full bg-[#EEF4EF] text-[#1E3F2D] flex items-center justify-center font-bold text-[10px] border border-[#D5E4D8]">
                        {product.farmerName?.charAt(0) || "F"}
                      </div>
                      <span className="font-medium text-[#1A261D] line-clamp-1">
                        By {product.farmerName}
                      </span>
                    </div>

                    {/* Price Block */}
                    <div className="mt-3.5 bg-[#FAF8F3] rounded-xl p-3 border border-[#E8E4DA] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3F2D]">
                          Direct Producer Rate
                        </span>
                        <div className="text-base font-bold text-[#18392B]">
                          ₹{product.priceRange?.min}
                          <span className="text-xs font-normal text-[#5C6B5F]"> / {product.unit}</span>
                        </div>
                      </div>

                      <span className="text-[11px] px-2 py-0.5 bg-[#EEF4EF] text-[#1E3F2D] border border-[#D5E4D8] rounded-md font-semibold">
                        Fresh Lot
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => handleOpenDetailModal(product)}
                      title="View Details"
                      className="p-2.5 bg-[#FAF8F3] hover:bg-[#F2EDE2] text-[#1A261D] border border-[#E8E4DA] rounded-xl transition-colors flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => handleOpenBuyModal(product, e)}
                      className="flex-1 py-2.5 px-4 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] font-semibold text-xs rounded-xl shadow-soft-xs transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 4. PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {showModal && selectedProduct && (
          <div className="fixed inset-0 bg-[#142C1F]/50 flex justify-center items-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="bg-[#FAF8F3] rounded-2xl p-6 md:p-8 max-w-4xl w-full shadow-soft-lg relative grid grid-cols-1 md:grid-cols-2 gap-7 overflow-hidden max-h-[90vh] overflow-y-auto border border-[#E8E4DA]"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-[#FFFFFF] hover:bg-[#F2EDE2] border border-[#E8E4DA] rounded-full w-8 h-8 flex items-center justify-center text-[#5C6B5F] hover:text-[#1A261D] z-10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Slider Left */}
              <div className="overflow-hidden rounded-xl border border-[#E8E4DA] bg-[#FFFFFF]">
                <Slider {...sliderSettings}>
                  {(selectedProduct.images && selectedProduct.images.length > 0
                    ? selectedProduct.images
                    : ["/default-crop.jpg"]
                  ).map((img, index) => (
                    <div key={index} className="outline-none h-80">
                      <img
                        src={`http://localhost:5000${img}`}
                        alt={`${selectedProduct.name} - ${index + 1}`}
                        className="w-full h-80 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Details Right */}
              <div className="flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#EEF4EF] text-[#1E3F2D] px-2.5 py-0.5 rounded-lg text-xs font-semibold border border-[#D5E4D8]">
                      {selectedProduct.category}
                    </span>
                    {selectedProduct.location && (
                      <span className="bg-[#FFFFFF] text-[#5C6B5F] px-2.5 py-0.5 rounded-lg text-xs font-medium flex items-center gap-1 border border-[#E8E4DA]">
                        <MapPin className="w-3 h-3 text-[#1E3F2D]" />
                        {selectedProduct.location}
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold text-[#1A261D]">{selectedProduct.name}</h2>

                  {/* Price Box */}
                  <div className="mt-4 bg-[#FFFFFF] rounded-xl p-4 border border-[#E8E4DA]">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D]">Direct Producer Price</span>
                      <span className="text-xl font-bold text-[#18392B]">
                        ₹{selectedProduct.priceRange?.min} - ₹{selectedProduct.priceRange?.max}
                        <span className="text-xs font-normal text-[#5C6B5F]"> / {selectedProduct.unit}</span>
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-[#5C6B5F] flex justify-between">
                      <span>Minimum Purchase Requirement:</span>
                      <strong className="text-[#1A261D]">{selectedProduct.minQuantity} {selectedProduct.unit}</strong>
                    </div>
                  </div>

                  {/* Farmer Info */}
                  <div className="mt-4 bg-[#FFFFFF] rounded-xl p-4 border border-[#E8E4DA] space-y-2">
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[#7F8B82] mb-1">
                      Verified Producer Contact
                    </h4>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#5C6B5F]">Farmer:</span>
                      <span className="font-bold text-[#1A261D]">{selectedProduct.farmerName}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#5C6B5F]">Phone:</span>
                      <a href={`tel:${selectedProduct.contact}`} className="font-semibold text-[#1E3F2D] hover:underline">
                        {selectedProduct.contact}
                      </a>
                    </div>
                    {selectedProduct.qualityCertificateNo && (
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E8E4DA]">
                        <span className="text-[#5C6B5F]">Quality Cert:</span>
                        <span className="font-mono font-semibold text-[#1A261D]">{selectedProduct.qualityCertificateNo}</span>
                      </div>
                    )}
                  </div>

                  {selectedProduct.extraDetails && (
                    <div className="mt-3 text-xs text-[#5C6B5F] bg-[#FFFFFF] p-3 rounded-xl border border-[#E8E4DA] leading-relaxed">
                      {selectedProduct.extraDetails}
                    </div>
                  )}
                </div>

                {/* Bottom CTA */}
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => handleOpenBuyModal(selectedProduct)}
                    className="w-full py-3.5 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] rounded-xl font-semibold text-xs shadow-soft-xs transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Proceed to Instant Checkout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. CHECKOUT MODAL */}
      <AnimatePresence>
        {showOrderModal && selectedProduct && (
          <div className="fixed inset-0 bg-[#142C1F]/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-[#FAF8F3] rounded-2xl max-w-lg w-full p-6 md:p-7 shadow-soft-lg relative max-h-[90vh] overflow-y-auto border border-[#E8E4DA] font-sans"
            >
              <button
                onClick={() => setShowOrderModal(false)}
                className="absolute top-4 right-4 text-[#7F8B82] hover:text-[#1A261D] p-1.5 rounded-full hover:bg-[#F2EDE2] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EEF4EF] text-[#1E3F2D] rounded-lg text-xs font-semibold mb-2 border border-[#D5E4D8]">
                <ShoppingCart className="w-3.5 h-3.5" />
                Verified Purchase Order
              </div>
              <h2 className="text-xl font-bold text-[#1A261D] mb-4">Complete Harvest Order</h2>

              {/* Product Mini Summary */}
              <div className="bg-[#FFFFFF] border border-[#E8E4DA] rounded-xl p-3.5 flex gap-3.5 items-center mb-5">
                <img
                  src={
                    selectedProduct.images?.[0]
                      ? `http://localhost:5000${selectedProduct.images[0]}`
                      : "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=200&q=80"
                  }
                  alt={selectedProduct.name}
                  className="w-14 h-14 object-cover rounded-xl border border-[#E8E4DA]"
                />
                <div>
                  <h3 className="font-bold text-[#1A261D] text-sm leading-snug">{selectedProduct.name}</h3>
                  <div className="text-xs text-[#5C6B5F]">Produced by {selectedProduct.farmerName}</div>
                  <div className="text-xs font-bold text-[#18392B] mt-1">
                    ₹{selectedProduct.priceRange?.min} / {selectedProduct.unit}
                  </div>
                </div>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-4">
                {/* Quantity */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#1A261D]">
                      Quantity to Purchase ({selectedProduct.unit}) <span className="text-[#842A2A]">*</span>
                    </label>
                    <span className="text-xs text-[#7F8B82] font-normal">
                      Min: {selectedProduct.minQuantity} {selectedProduct.unit}
                    </span>
                  </div>
                  <input
                    type="number"
                    required
                    min={selectedProduct.minQuantity || 1}
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-[#FFFFFF] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-base font-bold text-[#1A261D]"
                  />
                </div>

                {/* Total Preview */}
                <div className="bg-[#FFFFFF] p-3.5 rounded-xl border border-[#E8E4DA] flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#5C6B5F]">Total Value:</span>
                  <span className="text-xl font-bold text-[#18392B]">
                    ₹{((orderQuantity || 0) * (selectedProduct.priceRange?.min || 0)).toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Delivery Address Form */}
                <div className="space-y-2.5 pt-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#1E3F2D]" />
                    Delivery Destination
                  </h4>

                  <input
                    type="text"
                    required
                    placeholder="Street Address / Warehouse Location *"
                    value={deliveryAddress.street}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-xs text-[#1A261D]"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="City / District *"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-xs text-[#1A261D]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="State *"
                      value={deliveryAddress.state}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, state: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-xs text-[#1A261D]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Pincode / ZIP"
                      value={deliveryAddress.pincode}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, pincode: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-xs text-[#1A261D]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Contact Phone *"
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#E8E4DA] rounded-xl focus:border-[#1E3F2D] outline-none text-xs text-[#1A261D]"
                    />
                  </div>
                </div>

                {/* Payment Option */}
                <div className="pt-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#5C6B5F] block mb-1.5">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("Cash on Delivery")}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        paymentMethod === "Cash on Delivery"
                          ? "bg-[#EEF4EF] border-[#1E3F2D] text-[#1E3F2D]"
                          : "bg-[#FFFFFF] border-[#E8E4DA] text-[#5C6B5F]"
                      }`}
                    >
                      Cash on Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("UPI / Online Transfer")}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        paymentMethod === "UPI / Online Transfer"
                          ? "bg-[#EEF4EF] border-[#1E3F2D] text-[#1E3F2D]"
                          : "bg-[#FFFFFF] border-[#E8E4DA] text-[#5C6B5F]"
                      }`}
                    >
                      UPI / Direct Transfer
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-3 flex gap-3">
                  <button
                    type="submit"
                    disabled={isOrdering}
                    className="flex-1 py-3.5 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] rounded-xl font-semibold text-xs shadow-soft-xs transition-all disabled:opacity-50"
                  >
                    {isOrdering ? "Transmitting Order..." : "Confirm & Place Purchase Order"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowOrderModal(false)}
                    className="px-5 py-3.5 bg-[#FFFFFF] hover:bg-[#F2EDE2] border border-[#E8E4DA] text-[#5C6B5F] hover:text-[#1A261D] rounded-xl text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuyerProducts;

