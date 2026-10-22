import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingBag,
  MapPin,
  RefreshCw,
  Phone,
  Calendar,
  Check,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

interface Order {
  _id: string;
  productName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Dispatched" | "Delivered" | "Cancelled";
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  farmer?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
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

const History: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const token = localStorage.getItem("token");

  const fetchMyOrders = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      toast.error(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const getStepIndex = (status: string) => {
    switch (status) {
      case "Pending":
        return 0;
      case "Confirmed":
        return 1;
      case "Dispatched":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 0;
    }
  };

  const steps = [
    { title: "Order Placed", desc: "Sent to Producer" },
    { title: "Confirmed", desc: "Farmer accepted lot" },
    { title: "Dispatched", desc: "In cold-chain transit" },
    { title: "Delivered", desc: "Received & inspected" },
  ];

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === "all") return true;
    return o.status === statusFilter;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-7 pb-16 font-sans min-w-0">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E8E4DA] pb-5">
        <div>
          <button
            onClick={() => navigate("/buyer-products")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#5C6B5F] hover:text-[#18392B] transition-colors mb-2 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Harvest Marketplace
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] tracking-tight">
            Purchase History & Real-Time Tracking
          </h1>
          <p className="text-sm text-[#5C6B5F] mt-1 font-normal">
            Track farm-gate harvest fulfillment stages directly from verified producers.
          </p>
        </div>

        <button
          onClick={fetchMyOrders}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#FAF8F3] hover:bg-[#F2EDE2] border border-[#E8E4DA] rounded-xl text-xs font-semibold text-[#1A261D] transition-all shadow-soft-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#1E3F2D]" : "text-[#5C6B5F]"}`} />
          Refresh Pipeline
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {["all", "Pending", "Confirmed", "Dispatched", "Delivered"].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === st
                ? "bg-[#1E3F2D] text-[#FAF8F3] shadow-soft-sm"
                : "bg-[#FAF8F3] text-[#5C6B5F] hover:text-[#1A261D] hover:bg-[#F2EDE2] border border-[#E8E4DA]"
            }`}
          >
            {st === "all" ? `All Orders (${orders.length})` : `${st} (${orders.filter((o) => o.status === st).length})`}
          </button>
        ))}
      </div>

      {/* Main Order Content */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-9 w-9 border-t-2 border-b-2 border-[#1E3F2D]"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-[#FAF8F3] rounded-2xl p-12 text-center border border-[#E8E4DA] max-w-lg mx-auto shadow-soft-sm">
          <div className="w-14 h-14 bg-[#EEF4EF] text-[#1E3F2D] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#D5E4D8]">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#1A261D]">No Orders Placed Yet</h3>
          <p className="text-[#5C6B5F] text-sm mt-2 leading-relaxed">
            You haven't placed any crop procurement orders yet. Browse verified producer listings to source fresh harvest with zero middleman deductions.
          </p>
          <button
            onClick={() => navigate("/buyer-products")}
            className="mt-6 px-6 py-3 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] rounded-xl font-semibold text-xs tracking-wide shadow-soft-sm transition-all inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Explore Available Crops
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((ord) => {
            const stepIdx = getStepIndex(ord.status);
            const farmerName = ord.farmer
              ? `${ord.farmer.firstName || ""} ${ord.farmer.lastName || ""}`.trim() || "Verified Producer"
              : "Verified Producer";

            return (
              <motion.div
                key={ord._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E8E4DA] shadow-soft-sm hover:shadow-soft transition-all p-6 md:p-7 space-y-6"
              >
                {/* Header row: Order ID, Date, Status */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-[#E8E4DA]/70">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-semibold text-[#1E3F2D] bg-[#EEF4EF] border border-[#D5E4D8] px-2.5 py-1 rounded-lg">
                      ORD #{ord._id.slice(-6).toUpperCase()}
                    </span>
                    <span className="text-xs text-[#5C6B5F] flex items-center gap-1 font-normal">
                      <Calendar className="w-3.5 h-3.5 text-[#7F8B82]" />
                      {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : "Recent"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#5C6B5F] bg-[#FAF8F3] px-3 py-1 rounded-lg border border-[#E8E4DA]">
                      {ord.paymentMethod}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        ord.status === "Delivered"
                          ? "bg-[#EEF4EF] text-[#1E3F2D] border-[#CDE0D1]"
                          : ord.status === "Dispatched"
                          ? "bg-[#F3EFE6] text-[#634827] border-[#E3D9C7]"
                          : ord.status === "Confirmed"
                          ? "bg-[#EBF2F6] text-[#224A67] border-[#D0DFE8]"
                          : "bg-[#F7F2E9] text-[#7A5B22] border-[#EBDDC7]"
                      }`}
                    >
                      ● {ord.status}
                    </span>
                  </div>
                </div>

                {/* Middle Row: Crop info + Producer + Destination */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Crop details */}
                  <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E8E4DA] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3F2D]">
                        Procured Crop
                      </span>
                      <h4 className="text-base font-bold text-[#1A261D] leading-snug mt-0.5">{ord.productName}</h4>
                      <div className="text-xs font-medium text-[#5C6B5F] mt-1 font-mono">
                        {ord.quantity} {ord.unit} × ₹{ord.pricePerUnit}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7F8B82]">Total</span>
                      <div className="text-lg font-bold text-[#18392B]">
                        ₹{ord.totalAmount?.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

                  {/* Producer Info */}
                  <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E8E4DA] space-y-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7F8B82]">
                      Farmer / Producer
                    </span>
                    <div className="font-bold text-[#1A261D] text-sm">{farmerName}</div>
                    <div className="text-xs text-[#5C6B5F] flex items-center gap-1.5 pt-1">
                      <Phone className="w-3.5 h-3.5 text-[#1E3F2D]" />
                      <a href={`tel:${ord.farmer?.phone}`} className="hover:text-[#18392B] font-medium">
                        {ord.farmer?.phone || "Direct via portal"}
                      </a>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E8E4DA] space-y-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7F8B82]">
                      Delivery Destination
                    </span>
                    <div className="text-xs text-[#1A261D] flex items-start gap-1.5 pt-0.5 leading-relaxed">
                      <MapPin className="w-3.5 h-3.5 text-[#5C6B5F] flex-shrink-0 mt-0.5" />
                      <span>
                        {ord.deliveryAddress?.street ? `${ord.deliveryAddress.street}, ` : ""}
                        <strong>{ord.deliveryAddress?.city}</strong>, {ord.deliveryAddress?.state}
                        {ord.deliveryAddress?.pincode ? ` - ${ord.deliveryAddress.pincode}` : ""}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4-Step Progress Stepper */}
                <div className="pt-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#7F8B82] mb-3">
                    Fulfillment Pipeline
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative">
                    {steps.map((st, idx) => {
                      const isCompleted = idx <= stepIdx;
                      const isCurrent = idx === stepIdx;

                      return (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-xl border transition-all ${
                            isCurrent
                              ? "bg-[#EEF4EF] border-[#A8CCA7] shadow-soft-xs"
                              : isCompleted
                              ? "bg-[#FAF8F3] border-[#E8E4DA] text-[#1A261D]"
                              : "bg-[#FFFFFF] border-[#E8E4DA]/60 text-[#7F8B82] opacity-60"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                isCompleted
                                  ? "bg-[#1E3F2D] text-[#FAF8F3]"
                                  : "bg-[#E8E4DA] text-[#5C6B5F]"
                              }`}
                            >
                              {isCompleted ? <Check className="w-3 h-3 stroke-[2.5]" /> : idx + 1}
                            </div>
                            <span className="font-bold text-xs text-[#1A261D]">{st.title}</span>
                          </div>
                          <p className="text-[11px] text-[#5C6B5F] pl-7 font-normal">{st.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;