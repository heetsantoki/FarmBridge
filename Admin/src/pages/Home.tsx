import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  PlusCircle,
  Trash2,
  Phone,
  MapPin,
  CheckCircle,
  Truck,
  AlertCircle,
  Calendar,
  Layers,
  ArrowUpRight,
  RefreshCw,
  ShieldCheck,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";
import MandiTicker from "../components/MandiTicker";

interface Product {
  _id: string;
  name: string;
  category: string;
  minQuantity: number;
  unit: string;
  priceRange: {
    min: number;
    max: number;
  };
  images: string[];
  qualityCertificateNo?: string;
  qualityParameters?: string;
  extraDetails?: string;
  createdAt?: string;
}

interface Order {
  _id: string;
  productName: string;
  productImage?: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Dispatched" | "Delivered" | "Cancelled";
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  buyer?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city?: string;
    state?: string;
  };
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    pincode?: string;
    phone: string;
  };
}

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "add">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [farmerName, setFarmerName] = useState<string>("Farmer");

  // Quick Add Product Form State
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Grains",
    minQuantity: "",
    unit: "kg",
    priceMin: "",
    priceMax: "",
    qualityCertificateNo: "",
    qualityParameters: "",
    extraDetails: "",
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const token = localStorage.getItem("token");



  const fetchData = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      // 1. Fetch Farmer Profile for Name
      try {
        const profileRes = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (profileRes.data?.user?.firstName) {
          setFarmerName(`${profileRes.data.user.firstName} ${profileRes.data.user.lastName || ""}`.trim());
        }
      } catch (e) {
        console.warn("Could not fetch profile name", e);
      }

      // 2. Fetch Farmer's Uploaded Products
      const productsRes = await axios.get("http://localhost:5000/api/product/my-products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(productsRes.data || []);

      // 3. Fetch Farmer's Received Orders
      const ordersRes = await axios.get("http://localhost:5000/api/orders/farmer-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(ordersRes.data || []);
    } catch (err: any) {
      console.error("Dashboard Fetch Error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        toast.warn("Session expired. Redirecting to login...");
        setTimeout(() => {
          window.location.href = "http://localhost:5173/login";
        }, 1200);
        return;
      }
      toast.error(err.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update order status (Confirm / Dispatch / Deliver)
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Order marked as ${newStatus}`);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus as any } : o))
      );
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update order status");
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to remove this crop from marketplace?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Crop removed successfully");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to remove crop");
    }
  };

  // Image handling for Quick Add Form
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...filesArray]);

      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Quick Add Product Form Submit
  const handleQuickAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please log in to add products");
      return;
    }

    if (selectedImages.length === 0) {
      toast.error("Please upload at least one image of your harvest");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("category", newProduct.category);
    formData.append("minQuantity", newProduct.minQuantity);
    formData.append("unit", newProduct.unit);
    formData.append("priceMin", newProduct.priceMin);
    formData.append("priceMax", newProduct.priceMax || newProduct.priceMin);
    formData.append("qualityCertificateNo", newProduct.qualityCertificateNo);
    formData.append("qualityParameters", newProduct.qualityParameters);
    formData.append("extraDetails", newProduct.extraDetails);

    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post("http://localhost:5000/api/product/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Crop listed successfully!");
      setNewProduct({
        name: "",
        category: "Grains",
        minQuantity: "",
        unit: "kg",
        priceMin: "",
        priceMax: "",
        qualityCertificateNo: "",
        qualityParameters: "",
        extraDetails: "",
      });
      setSelectedImages([]);
      setImagePreviews([]);
      setActiveTab("products");
      fetchData();
    } catch (err: any) {
      toast.error(err.response?.data?.error || err.message || "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Metrics calculations
  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Confirmed").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  return (
    <div className="w-full max-w-full space-y-6 pb-16 font-sans">
      {/* 1. NATURE-INSPIRED MINIMALIST HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-[#18392B] p-7 md:p-9 text-[#FAF8F3] border border-[#142E23] shadow-soft">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-3 max-w-2xl min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#254C3A] rounded-full text-xs font-semibold text-[#D8EADB] border border-[#2F5E48]">
              <span className="w-2 h-2 rounded-full bg-[#75B98A] inline-block" />
              Verified Agricultural Producer Portal
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF8F3] leading-tight">
              Welcome, <span className="text-[#F2EDE2] font-extrabold">{farmerName}</span>
            </h1>

            <p className="text-[#CAD7CD] text-sm md:text-base leading-relaxed">
              Track your farm inventory, fulfill incoming buyer purchase orders directly with zero middlemen, and monitor real-time Mandi rates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setActiveTab("add")}
              className="flex items-center gap-2 px-5 py-3 bg-[#FAF8F3] hover:bg-[#F0EAE0] text-[#18392B] font-bold rounded-2xl shadow-soft-sm transition-colors text-sm whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4 text-[#18392B] stroke-[2.5]" />
              Upload New Crop
            </button>

            <button
              onClick={fetchData}
              title="Refresh Data"
              className="p-3 bg-[#244C3A] hover:bg-[#2C5B46] rounded-2xl border border-[#2F5E48] transition-colors text-[#FAF8F3]"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#BCE3C7]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. REAL-TIME RUNNING MANDI TICKER (RIGHT TO LEFT) */}
      <MandiTicker />

      {/* 3. NATURE-INSPIRED REFINED KPI STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Listed Crops */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-150 min-w-0">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F7A71]">Active Listings</span>
            <div className="w-10 h-10 rounded-2xl bg-[#EEF4EF] text-[#245437] flex items-center justify-center border border-[#DDE9DF] flex-shrink-0">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#1A261D]">{products.length}</span>
            <span className="text-xs text-[#7F8B82] font-medium">crops in market</span>
          </div>
          <div className="mt-3 text-xs text-[#245437] font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" /> Ready for buyer orders
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-150 min-w-0">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F7A71]">Buyer Orders</span>
            <div className="w-10 h-10 rounded-2xl bg-[#EEF2F6] text-[#2C485E] flex items-center justify-center border border-[#DCE4EC] flex-shrink-0">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#1A261D]">{orders.length}</span>
            <span className="text-xs text-[#7F8B82] font-medium">transactions</span>
          </div>
          <div className="mt-3 text-xs text-[#2C485E] font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" /> {deliveredOrders} delivered
          </div>
        </div>

        {/* Card 3: Revenue */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-150 min-w-0">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F7A71]">Sales Realized</span>
            <div className="w-10 h-10 rounded-2xl bg-[#F7F2E9] text-[#7E5724] flex items-center justify-center border border-[#ECE0CE] flex-shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#1A261D] truncate">₹{totalRevenue.toLocaleString("en-IN")}</span>
          </div>
          <div className="mt-3 text-xs text-[#7E5724] font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" /> 100% Direct Payout
          </div>
        </div>

        {/* Card 4: Action Needed */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-150 min-w-0">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6F7A71]">Pending Actions</span>
            <div className="w-10 h-10 rounded-2xl bg-[#F9EFEF] text-[#9A3838] flex items-center justify-center border border-[#F2DCDC] flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#1A261D]">{pendingOrders}</span>
            <span className="text-xs text-[#7F8B82] font-medium">pending dispatch</span>
          </div>
          <div className="mt-3 text-xs text-[#9A3838] font-semibold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> Requires action
          </div>
        </div>
      </div>

      {/* 4. REFINED SEGMENTED PILL TAB SWITCHER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E4DA] pb-3">
        <div className="inline-flex p-1.5 bg-[#EFECE3] border border-[#E0DBCF] rounded-2xl gap-1.5 shadow-soft-xs">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              activeTab === "products"
                ? "bg-[#1E3F2D] text-[#FAF8F3] shadow-soft-xs"
                : "text-[#556358] hover:text-[#18392B] hover:bg-[#FAF8F3]/60"
            }`}
          >
            <Layers className="w-4 h-4" />
            My Listed Crops ({products.length})
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              activeTab === "orders"
                ? "bg-[#1E3F2D] text-[#FAF8F3] shadow-soft-xs"
                : "text-[#556358] hover:text-[#18392B] hover:bg-[#FAF8F3]/60"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Buyer Orders & Sales ({orders.length})
            {pendingOrders > 0 && (
              <span className="px-2 py-0.5 bg-[#B94438] text-white rounded-full text-xs font-bold">
                {pendingOrders}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              activeTab === "add"
                ? "bg-[#1E3F2D] text-[#FAF8F3] shadow-soft-xs"
                : "text-[#556358] hover:text-[#18392B] hover:bg-[#FAF8F3]/60"
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            + Upload New Crop
          </button>
        </div>

        <div className="text-xs font-medium text-[#6F7A71]">
          Status: <span className="text-[#245437] font-bold">● Connected to FarmBridge DB</span>
        </div>
      </div>

      {/* 5. TAB 1: MY LISTED CROPS (GRID VIEW) */}
      {activeTab === "products" && (
        <div>
          {products.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-[#E0DBCF] max-w-xl mx-auto my-6">
              <div className="w-16 h-16 bg-[#EEF4EF] text-[#245437] rounded-3xl flex items-center justify-center mx-auto mb-4 border border-[#DDE9DF]">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1A261D]">No Crops Listed In Marketplace Yet</h3>
              <p className="text-[#6F7A71] max-w-md mx-auto mt-2 text-sm leading-relaxed">
                Add your farm harvest details, photos, and price per kg/quintal. Once listed, verified buyers can view and purchase directly.
              </p>
              <button
                onClick={() => setActiveTab("add")}
                className="mt-6 px-6 py-3.5 bg-[#1E3F2D] hover:bg-[#163324] text-[#FAF8F3] rounded-2xl font-bold shadow-soft transition-colors inline-flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                Upload Your First Crop
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => {
                const imgUrl =
                  prod.images && prod.images.length > 0
                    ? `http://localhost:5000${prod.images[0]}`
                    : "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80";

                return (
                  <div
                    key={prod._id}
                    className="group bg-white rounded-3xl border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all duration-200 overflow-hidden flex flex-col"
                  >
                    {/* Image Area */}
                    <div className="relative h-52 w-full bg-[#F4F1E8] overflow-hidden">
                      <img
                        src={imgUrl}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80";
                        }}
                      />

                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="bg-[#FAF8F3] border border-[#E0DBCF] px-3 py-1 rounded-full text-xs font-bold text-[#1A261D] shadow-soft-xs">
                          {prod.category}
                        </span>
                        <span className="bg-[#1E3F2D] text-[#FAF8F3] px-2.5 py-1 rounded-full text-[11px] font-bold shadow-soft-xs">
                          Verified
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteProduct(prod._id)}
                        title="Delete Listing"
                        className="absolute top-3.5 right-3.5 w-9 h-9 bg-[#FAF8F3] border border-[#E0DBCF] text-[#6F7A71] hover:text-[#9A3838] rounded-full flex items-center justify-center shadow-soft-xs transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="absolute bottom-3 left-3.5 right-3.5 flex justify-between items-end">
                        <span className="text-xs font-medium text-white bg-[#1A261D]/80 backdrop-blur-none px-2.5 py-1 rounded-lg">
                          Min. Order: <strong className="text-white">{prod.minQuantity} {prod.unit}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#1A261D] group-hover:text-[#1E3F2D] transition-colors line-clamp-1">
                          {prod.name}
                        </h3>

                        <div className="mt-3.5 bg-[#F5F1E8] rounded-2xl p-3.5 border border-[#E4DFD3] flex items-center justify-between">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#637266]">Direct Price</span>
                            <div className="text-lg font-extrabold text-[#1A261D]">
                              ₹{prod.priceRange?.min} - ₹{prod.priceRange?.max}
                              <span className="text-xs font-semibold text-[#56655B]"> / {prod.unit}</span>
                            </div>
                          </div>
                          <span className="text-xs px-2.5 py-1 bg-[#FAF8F3] text-[#245437] rounded-xl font-bold border border-[#D5E2D7] shadow-soft-xs">
                            Active
                          </span>
                        </div>

                        {prod.qualityCertificateNo && (
                          <div className="mt-3 text-xs text-[#556358] flex items-center gap-1.5 bg-[#FAF8F3] px-3 py-1.5 rounded-xl border border-[#E4DFD3]">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#245437] flex-shrink-0" />
                            <span>Cert: <strong className="font-mono text-[#1A261D]">{prod.qualityCertificateNo}</strong></span>
                          </div>
                        )}

                        {prod.extraDetails && (
                          <p className="mt-3 text-xs text-[#6F7A71] line-clamp-2 leading-relaxed">
                            {prod.extraDetails}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-[#EFECE3] flex justify-between items-center text-xs text-[#7F8B82]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#7F8B82]" />
                          {prod.createdAt ? new Date(prod.createdAt).toLocaleDateString() : "Listed"}
                        </span>
                        <span className="text-[#245437] font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#3D8254] inline-block" />
                          Live on Marketplace
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 6. TAB 2: BUYER ORDERS & SALES HISTORY */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-3xl border border-[#E8E4DA] shadow-soft-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-[#E8E4DA] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#F8F5EE]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF2F6] text-[#2C485E] rounded-full text-xs font-bold mb-1.5 border border-[#DCE4EC]">
                <ShoppingCart className="w-3.5 h-3.5" />
                Live Purchase Orders
              </div>
              <h2 className="text-2xl font-bold text-[#1A261D]">Buyer Orders & Fulfillment</h2>
              <p className="text-sm text-[#6F7A71] mt-1">
                Fulfill orders placed by verified buyers, manage logistics status, and coordinate deliveries.
              </p>
            </div>
            <div className="text-xs font-bold text-[#4F5D52] bg-[#FAF8F3] border border-[#E0DBCF] px-4 py-2.5 rounded-2xl shadow-soft-xs">
              Total Transactions: <span className="text-[#1E3F2D] font-extrabold">{orders.length}</span>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="p-16 text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#EEF2F6] text-[#2C485E] rounded-3xl flex items-center justify-center mx-auto mb-4 border border-[#DCE4EC]">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1A261D]">No Orders Placed Yet</h3>
              <p className="text-[#6F7A71] text-sm mt-2 leading-relaxed">
                When buyers order your crops from the marketplace, their order details, shipping address, and phone numbers will appear here instantly.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto w-full min-w-0">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#F5F1E8] text-[#556358] border-b border-[#E4DFD3] text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Buyer & Contact</th>
                    <th className="py-4 px-6">Crop & Quantity</th>
                    <th className="py-4 px-6">Order Value</th>
                    <th className="py-4 px-6">Destination</th>
                    <th className="py-4 px-6">Fulfillment Stage</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE3]">
                  {orders.map((ord) => {
                    const statusStyles: Record<string, string> = {
                      Pending: "bg-[#FAF4EB] text-[#855D25] border-[#EDE2D0]",
                      Confirmed: "bg-[#EEF3F7] text-[#2D506B] border-[#D7E3EC]",
                      Dispatched: "bg-[#F4EFF8] text-[#5C3C75] border-[#E6DCF0]",
                      Delivered: "bg-[#EAF3EC] text-[#245D3B] border-[#D5E6DA]",
                      Cancelled: "bg-[#F9EFEF] text-[#9A3838] border-[#F2DCDC]",
                    };

                    const buyerName = ord.buyer
                      ? `${ord.buyer.firstName || ""} ${ord.buyer.lastName || ""}`.trim() || "Registered Buyer"
                      : "Verified Buyer";

                    return (
                      <tr key={ord._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black flex items-center justify-center text-sm shadow-xs">
                              {buyerName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{buyerName}</div>
                              <a
                                href={`tel:${ord.deliveryAddress?.phone || ord.buyer?.phone || ""}`}
                                className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 mt-0.5"
                              >
                                <Phone className="w-3 h-3 text-emerald-600" />
                                {ord.deliveryAddress?.phone || ord.buyer?.phone || "Phone via portal"}
                              </a>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="font-black text-slate-900">{ord.productName}</div>
                          <div className="text-xs font-mono font-semibold text-slate-500">
                            {ord.quantity} {ord.unit} • ₹{ord.pricePerUnit}/{ord.unit}
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div className="font-black text-emerald-800 text-base">
                            ₹{ord.totalAmount?.toLocaleString("en-IN")}
                          </div>
                          <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                            {ord.paymentMethod}
                          </span>
                        </td>

                        <td className="py-4 px-6">
                          <div className="flex items-start gap-1.5 text-xs text-slate-600 max-w-xs">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                            <span>
                              {ord.deliveryAddress?.street ? `${ord.deliveryAddress.street}, ` : ""}
                              <strong className="text-slate-800">{ord.deliveryAddress?.city}</strong>, {ord.deliveryAddress?.state}
                              {ord.deliveryAddress?.pincode ? ` (${ord.deliveryAddress.pincode})` : ""}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${
                              statusStyles[ord.status] || "bg-slate-100 text-slate-700"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {ord.status}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-2">
                            {ord.status === "Pending" && (
                              <button
                                onClick={() => handleUpdateOrderStatus(ord._id, "Confirmed")}
                                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:scale-105 active:scale-95"
                              >
                                Accept Order
                              </button>
                            )}
                            {ord.status === "Confirmed" && (
                              <button
                                onClick={() => handleUpdateOrderStatus(ord._id, "Dispatched")}
                                className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 hover:scale-105 active:scale-95"
                              >
                                <Truck className="w-3.5 h-3.5" />
                                Dispatch Harvest
                              </button>
                            )}
                            {ord.status === "Dispatched" && (
                              <button
                                onClick={() => handleUpdateOrderStatus(ord._id, "Delivered")}
                                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 hover:scale-105 active:scale-95"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                Mark Delivered
                              </button>
                            )}
                            {ord.status === "Delivered" && (
                              <span className="text-xs text-emerald-700 font-black flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Complete
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 7. TAB 3: MODERN IN-PLACE UPLOAD CROP FORM */}
      {activeTab === "add" && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-10 max-w-4xl mx-auto">
          <div className="border-b border-slate-100 pb-6 mb-8 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold mb-2 border border-emerald-200/60">
                <PlusCircle className="w-3.5 h-3.5" />
                Direct APMC / Marketplace Listing
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Upload New Crop Listing</h2>
              <p className="text-sm text-slate-500 mt-1">
                Provide harvest specifications, price range, and high-resolution photos for instant discovery by verified buyers.
              </p>
            </div>
          </div>

          <form onSubmit={handleQuickAddSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Crop Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharbati Wheat, Fresh Alphonso Mango"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-semibold text-slate-800"
                >
                  <option value="Grains">🌾 Grains & Cereals (Wheat, Rice, Maize)</option>
                  <option value="Vegetables">🥬 Fresh Vegetables (Tomato, Potato, Onion)</option>
                  <option value="Fruits">🍎 Fruits (Mango, Apple, Citrus)</option>
                  <option value="Pulses">🫘 Pulses & Lentils (Chana, Toor, Moong)</option>
                  <option value="Spices">🌶️ Spices & Herbs</option>
                  <option value="Oilseeds">🌻 Oilseeds & Mustard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Minimum Order Quantity <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 50"
                  value={newProduct.minQuantity}
                  onChange={(e) => setNewProduct({ ...newProduct, minQuantity: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Unit of Measure <span className="text-rose-500">*</span>
                </label>
                <select
                  value={newProduct.unit}
                  onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-semibold text-slate-800"
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="quintal">Quintal (100 kg)</option>
                  <option value="ton">Metric Ton</option>
                  <option value="box">Standard Box / Crate</option>
                  <option value="dozen">Dozen</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Minimum Price (₹) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="Min price per unit"
                    value={newProduct.priceMin}
                    onChange={(e) => setNewProduct({ ...newProduct, priceMin: e.target.value })}
                    className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Maximum / Asking Price (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="1"
                    placeholder="Max price per unit"
                    value={newProduct.priceMax}
                    onChange={(e) => setNewProduct({ ...newProduct, priceMax: e.target.value })}
                    className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Quality Certificate No. (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. AGMARK-IND-88219"
                  value={newProduct.qualityCertificateNo}
                  onChange={(e) => setNewProduct({ ...newProduct, qualityCertificateNo: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Quality Parameters (Moisture, Grade)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Moisture < 12%, Organic Grade A"
                  value={newProduct.qualityParameters}
                  onChange={(e) => setNewProduct({ ...newProduct, qualityParameters: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Harvest & Produce Description
              </label>
              <textarea
                rows={3}
                placeholder="Mention variety, harvest date, packaging details, and any organic certification..."
                value={newProduct.extraDetails}
                onChange={(e) => setNewProduct({ ...newProduct, extraDetails: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
              />
            </div>

            {/* Photos upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Crop & Harvest Photos <span className="text-rose-500">*</span>
              </label>

              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-3xl p-6 text-center bg-slate-50/60 transition-colors">
                <input
                  type="file"
                  id="crop-photo-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="crop-photo-upload"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-xs">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">
                    Click to browse or drop harvest photos here
                  </span>
                  <span className="text-xs text-slate-400">
                    PNG, JPG, WEBP up to 10MB (Multiple pictures supported)
                  </span>
                </label>
              </div>

              {imagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4">
                  {imagePreviews.map((preview, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                      <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-1 opacity-90 hover:opacity-100 shadow-md"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-base rounded-2xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? "Uploading Crop to Marketplace..." : "Publish Crop Listing to Marketplace"}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("products")}
                className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
