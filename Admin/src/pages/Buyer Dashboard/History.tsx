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
  XCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "../../hooks/useTranslation";

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

const historyDict = {
  en: {
    backBtn: "Back to Harvest Marketplace",
    title: "Purchase History & Real-Time Tracking",
    subtitle: "Track farm-gate harvest fulfillment stages directly from verified producers.",
    refreshBtn: "Refresh Pipeline",
    statusAll: "All Orders",
    statusPending: "Pending",
    statusConfirmed: "Confirmed",
    statusDispatched: "Dispatched",
    statusDelivered: "Delivered",
    statusCancelled: "Cancelled",
    cancelOrder: "Cancel Order",
    cannotCancelDispatched: "In Transit (Cannot Cancel)",
    orderCancelledNote: "This procurement order has been cancelled.",
    noOrdersTitle: "No Orders Placed Yet",
    noOrdersDesc: "You haven't placed any crop procurement orders yet. Browse verified producer listings to source fresh harvest with zero middleman deductions.",
    exploreBtn: "Explore Available Crops",
    procuredCrop: "Procured Crop",
    total: "Total",
    producerLabel: "Farmer / Producer",
    directPortal: "Direct via portal",
    destinationLabel: "Delivery Destination",
    pipelineLabel: "Fulfillment Pipeline",
    steps: [
      { title: "Order Placed", desc: "Sent to Producer" },
      { title: "Confirmed", desc: "Farmer accepted lot" },
      { title: "Dispatched", desc: "In cold-chain transit" },
      { title: "Delivered", desc: "Received & inspected" },
    ],
  },
  gu: {
    backBtn: "પાક માર્કેટપ્લેસ પર પાછા જાઓ",
    title: "ખરીદી ઇતિહાસ અને રીયલ-ટાઇમ ટ્રેકિંગ",
    subtitle: "પ્રમાણિત ખેડૂતો પાસેથી સીધા ખેતરમાંથી ઉપજની ડિલિવરી તબક્કા ટ્રેક કરો.",
    refreshBtn: "ઓર્ડર તાજા કરો",
    statusAll: "બધા ઓર્ડર",
    statusPending: "પેન્ડિંગ",
    statusConfirmed: "કન્ફર્મ થયેલ",
    statusDispatched: "રવાના થયેલ",
    statusDelivered: "પહોંચી ગયેલ",
    statusCancelled: "રદ થયેલ",
    cancelOrder: "ઓર્ડર રદ કરો",
    cannotCancelDispatched: "માલ રવાના થઈ ચૂક્યો છે (રદ નહીં થાય)",
    orderCancelledNote: "આ ઓર્ડર રદ કરવામાં આવ્યો છે.",
    noOrdersTitle: "હજુ સુધી કોઈ ઓર્ડર આપ્યો નથી",
    noOrdersDesc: "તમે હજુ સુધી કોઈ પાક ખરીદી ઓર્ડર આપ્યો નથી. ઝીરો દલાલી સાથે તાજો પાક ખરીદવા માટે ઉપલબ્ધ લિસ્ટિંગ જુઓ.",
    exploreBtn: "ઉપલબ્ધ પાક જુઓ",
    procuredCrop: "ખરીદેલ પાક",
    total: "કુલ રકમ",
    producerLabel: "ખેડૂત / ઉત્પાદક",
    directPortal: "પોર્ટલ દ્વારા સંપર્ક",
    destinationLabel: "ડિલિવરી સ્થળ",
    pipelineLabel: "ડિલિવરી પ્રક્રિયા",
    steps: [
      { title: "ઓર્ડર મુકાયો", desc: "ખેડૂતને મોકલાયો" },
      { title: "કન્ફર્મ થયો", desc: "ખેડૂતે સ્વીકાર્યો" },
      { title: "રવાના થયો", desc: "ટ્રાન્સપોર્ટમાં છે" },
      { title: "પહોંચી ગયો", desc: "માલ મળ્યો અને ચકાસ્યો" },
    ],
  },
  hi: {
    backBtn: "फसल मार्केटप्लेस पर वापस जाएं",
    title: "खरीद इतिहास और रियल-टाइम ट्रैकिंग",
    subtitle: "प्रमाणित किसानों से सीधे खेत से फसल के डिलीवरी चरणों को ट्रैक करें।",
    refreshBtn: "ऑर्डर ताज़ा करें",
    statusAll: "सभी ऑर्डर",
    statusPending: "लंबित",
    statusConfirmed: "पुष्टि की गई",
    statusDispatched: "भेज दिया गया",
    statusDelivered: "वितरित",
    statusCancelled: "रद्द",
    cancelOrder: "ऑर्डर रद्द करें",
    cannotCancelDispatched: "माल रवाना हो चुका है (रद्द नहीं होगा)",
    orderCancelledNote: "यह ऑर्डर रद्द कर दिया गया है।",
    noOrdersTitle: "अभी तक कोई ऑर्डर नहीं दिया गया",
    noOrdersDesc: "आपने अभी तक कोई फसल खरीद ऑर्डर नहीं दिया है। बिना दलाली के ताज़ा फसल प्राप्त करने के लिए उपलब्ध लिस्टिंग देखें।",
    exploreBtn: "उपलब्ध फसलें देखें",
    procuredCrop: "खरीदी गई फसल",
    total: "कुल राशि",
    producerLabel: "किसान / उत्पादक",
    directPortal: "पोर्टल द्वारा संपर्क",
    destinationLabel: "डिलीवरी गंतव्य",
    pipelineLabel: "आपूर्ति प्रक्रिया",
    steps: [
      { title: "ऑर्डर दिया गया", desc: "किसान को भेजा गया" },
      { title: "स्वीकृत", desc: "किसान ने स्वीकार किया" },
      { title: "भेज दिया गया", desc: "पारगमन में है" },
      { title: "वितरित", desc: "प्राप्त और निरीक्षण किया" },
    ],
  },
};

const History: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useTranslation();
  const langKey = language === "gu" || language === "hi" ? language : "en";
  const tTxt = historyDict[langKey];

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

  const steps = tTxt.steps;

  const statusTabLabels: Record<string, string> = {
    all: tTxt.statusAll,
    Pending: tTxt.statusPending,
    Confirmed: tTxt.statusConfirmed,
    Dispatched: tTxt.statusDispatched,
    Delivered: tTxt.statusDelivered,
    Cancelled: tTxt.statusCancelled,
  };

  const handleCancelOrder = async (orderId: string, currentStatus: string) => {
    // Condition: Dispatched orders cannot be cancelled
    if (currentStatus === "Dispatched" || currentStatus === "Delivered") {
      toast.error(tTxt.cannotCancelDispatched || "Dispatched lot cannot be cancelled.");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: "Cancelled" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.info("Order has been cancelled.");
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "Cancelled" } : o))
      );
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
    }
  };

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
            <ArrowLeft className="w-3.5 h-3.5" /> {tTxt.backBtn}
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] tracking-tight">
            {tTxt.title}
          </h1>
          <p className="text-sm text-[#5C6B5F] mt-1 font-normal">
            {tTxt.subtitle}
          </p>
        </div>

        <button
          onClick={fetchMyOrders}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#FAF8F3] hover:bg-[#F2EDE2] border border-[#E8E4DA] rounded-xl text-xs font-semibold text-[#1A261D] transition-all shadow-soft-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#1E3F2D]" : "text-[#5C6B5F]"}`} />
          {tTxt.refreshBtn}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {["all", "Pending", "Confirmed", "Dispatched", "Delivered", "Cancelled"].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === st
                ? "bg-[#1E3F2D] text-[#FAF8F3] shadow-soft-sm"
                : "bg-[#FAF8F3] text-[#5C6B5F] hover:text-[#1A261D] hover:bg-[#F2EDE2] border border-[#E8E4DA]"
            }`}
          >
            {st === "all"
              ? `${statusTabLabels[st]} (${orders.length})`
              : `${statusTabLabels[st] || st} (${orders.filter((o) => o.status === st).length})`}
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
          <h3 className="text-xl font-bold text-[#1A261D]">{tTxt.noOrdersTitle}</h3>
          <p className="text-[#5C6B5F] text-sm mt-2 leading-relaxed">
            {tTxt.noOrdersDesc}
          </p>
          <button
            onClick={() => navigate("/buyer-products")}
            className="mt-6 px-6 py-3 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] rounded-xl font-semibold text-xs tracking-wide shadow-soft-sm transition-all inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            {tTxt.exploreBtn}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((ord) => {
            const stepIdx = getStepIndex(ord.status);
            const farmerName = ord.farmer
              ? `${ord.farmer.firstName || ""} ${ord.farmer.lastName || ""}`.trim() || tTxt.producerLabel
              : tTxt.producerLabel;

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

                  <div className="flex flex-wrap items-center gap-2">
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
                          : ord.status === "Cancelled"
                          ? "bg-[#FBF1F1] text-[#842A2A] border-[#EED7D7]"
                          : "bg-[#F7F2E9] text-[#7A5B22] border-[#EBDDC7]"
                      }`}
                    >
                      ● {statusTabLabels[ord.status] || ord.status}
                    </span>

                    {/* Condition: Buyer can cancel ONLY if order is NOT Dispatched, Delivered, or already Cancelled */}
                    {(ord.status === "Pending" || ord.status === "Confirmed") && (
                      <button
                        onClick={() => handleCancelOrder(ord._id, ord.status)}
                        className="px-3 py-1 bg-[#FBF1F1] hover:bg-[#F7E1E1] text-[#842A2A] border border-[#EED7D7] rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shadow-soft-xs"
                        title={tTxt.cancelOrder}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        {tTxt.cancelOrder}
                      </button>
                    )}

                    {ord.status === "Dispatched" && (
                      <span
                        className="text-[11px] font-medium text-[#8C7A58] bg-[#F7F3EA] px-2.5 py-1 rounded-lg border border-[#EADBBD] italic flex items-center gap-1"
                        title={tTxt.cannotCancelDispatched}
                      >
                        {tTxt.cannotCancelDispatched}
                      </span>
                    )}
                  </div>
                </div>

                {/* Middle Row: Crop info + Producer + Destination */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Crop details */}
                  <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E8E4DA] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3F2D]">
                        {tTxt.procuredCrop}
                      </span>
                      <h4 className="text-base font-bold text-[#1A261D] leading-snug mt-0.5">{ord.productName}</h4>
                      <div className="text-xs font-medium text-[#5C6B5F] mt-1 font-mono">
                        {ord.quantity} {ord.unit} × ₹{ord.pricePerUnit}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7F8B82]">{tTxt.total}</span>
                      <div className="text-lg font-bold text-[#18392B]">
                        ₹{ord.totalAmount?.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

                  {/* Producer Info */}
                  <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E8E4DA] space-y-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7F8B82]">
                      {tTxt.producerLabel}
                    </span>
                    <div className="font-bold text-[#1A261D] text-sm">{farmerName}</div>
                    <div className="text-xs text-[#5C6B5F] flex items-center gap-1.5 pt-1">
                      <Phone className="w-3.5 h-3.5 text-[#1E3F2D]" />
                      <a href={`tel:${ord.farmer?.phone}`} className="hover:text-[#18392B] font-medium">
                        {ord.farmer?.phone || tTxt.directPortal}
                      </a>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E8E4DA] space-y-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7F8B82]">
                      {tTxt.destinationLabel}
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

                {/* 4-Step Progress Stepper OR Cancelled Notice */}
                <div className="pt-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#7F8B82] mb-3">
                    {tTxt.pipelineLabel}
                  </div>

                  {ord.status === "Cancelled" ? (
                    <div className="p-4 rounded-xl bg-[#FBF1F1] border border-[#EED7D7] text-[#842A2A] flex items-center gap-2.5 text-xs font-semibold">
                      <XCircle className="w-4 h-4 text-[#842A2A] flex-shrink-0" />
                      <span>{tTxt.orderCancelledNote}</span>
                    </div>
                  ) : (
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
                  )}
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
