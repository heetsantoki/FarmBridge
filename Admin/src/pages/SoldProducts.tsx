import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShoppingCart, CheckCircle, Truck, Phone, MapPin, RefreshCw, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  buyer?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    state?: string;
    city?: string;
  };
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    pincode?: string;
    phone: string;
  };
}

const SoldProducts: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/orders/farmer-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err: any) {
      console.error("Error fetching farmer orders:", err);
      toast.error(err.response?.data?.message || "Failed to load sold products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
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
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to reject this order?")) {
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: "Cancelled" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.info("Order has been rejected");
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "Cancelled" as any } : o))
      );
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to reject order");
    }
  };

  const statusStyles: Record<string, string> = {
    Pending: "bg-[#F7F2E9] text-[#7A5B22] border-[#EBDDC7]",
    Confirmed: "bg-[#EBF2F6] text-[#224A67] border-[#D0DFE8]",
    Dispatched: "bg-[#F3EFE6] text-[#634827] border-[#E3D9C7]",
    Delivered: "bg-[#EEF4EF] text-[#1E3F2D] border-[#CDE0D1]",
    Cancelled: "bg-[#FBF1F1] text-[#842A2A] border-[#EED7D7]",
  };

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === "all") return true;
    return o.status === filterStatus;
  });

  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-7 pb-16 font-sans min-w-0">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E8E4DA] pb-5">
        <div>
          <button
            onClick={() => navigate("/home")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#5C6B5F] hover:text-[#18392B] transition-colors mb-2 uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Producer Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] tracking-tight">
            Buyer Sales & Fulfillment Log
          </h1>
          <p className="text-sm text-[#5C6B5F] mt-1 font-normal">
            Real-time procurement logs of buyers purchasing your crops directly with designated delivery hubs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#FAF8F3] border border-[#E8E4DA] px-4 py-2.5 rounded-xl shadow-soft-xs">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7F8B82] block">Total Harvest Realized</span>
            <span className="text-lg font-bold text-[#18392B]">₹{totalRevenue.toLocaleString("en-IN")}</span>
          </div>

          <button
            onClick={fetchOrders}
            className="p-2.5 bg-[#FAF8F3] border border-[#E8E4DA] hover:bg-[#F2EDE2] rounded-xl text-[#5C6B5F] hover:text-[#1A261D] transition-all shadow-soft-xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#1E3F2D]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {["all", "Pending", "Confirmed", "Dispatched", "Delivered", "Cancelled"].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === st
                ? "bg-[#1E3F2D] text-[#FAF8F3] shadow-soft-xs"
                : "bg-[#FAF8F3] text-[#5C6B5F] hover:text-[#1A261D] hover:bg-[#F2EDE2] border border-[#E8E4DA]"
            }`}
          >
            {st === "all"
              ? `All Orders (${orders.length})`
              : st === "Cancelled"
              ? `Rejected (${orders.filter((o) => o.status === "Cancelled").length})`
              : `${st} (${orders.filter((o) => o.status === st).length})`}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1E3F2D]"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-[#FAF8F3] rounded-2xl p-14 text-center border border-[#E8E4DA] max-w-lg mx-auto shadow-soft-sm">
          <div className="w-14 h-14 bg-[#EEF4EF] text-[#1E3F2D] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#D5E4D8]">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#1A261D]">No Orders in this Status</h3>
          <p className="text-[#5C6B5F] text-sm mt-2 leading-relaxed">
            When verified buyers purchase your listed crops, their orders and shipping locations will automatically show up here.
          </p>
        </div>
      ) : (
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E4DA] shadow-soft-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#FAF8F3] text-[#5C6B5F] border-b border-[#E8E4DA] text-[11px] font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-6">Buyer Details</th>
                  <th className="py-3.5 px-6">Crop & Quantity</th>
                  <th className="py-3.5 px-6">Total Amount</th>
                  <th className="py-3.5 px-6">Delivery Address</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Fulfillment Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E4DA]/70">
                {filteredOrders.map((ord) => {
                  const buyerName = ord.buyer
                    ? `${ord.buyer.firstName || ""} ${ord.buyer.lastName || ""}`.trim() || "Verified Buyer"
                    : "Verified Buyer";

                  return (
                    <tr key={ord._id} className="hover:bg-[#FAF8F3]/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#1E3F2D] text-[#FAF8F3] font-bold flex items-center justify-center text-xs shadow-soft-xs">
                            {buyerName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-[#1A261D] text-sm">{buyerName}</div>
                            <a
                              href={`tel:${ord.deliveryAddress?.phone || ord.buyer?.phone || ""}`}
                              className="text-xs text-[#5C6B5F] hover:text-[#18392B] flex items-center gap-1 mt-0.5"
                            >
                              <Phone className="w-3 h-3 text-[#1E3F2D]" />
                              {ord.deliveryAddress?.phone || ord.buyer?.phone || "Direct via portal"}
                            </a>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-[#1A261D]">{ord.productName}</div>
                        <div className="text-xs font-mono font-medium text-[#5C6B5F]">
                          {ord.quantity} {ord.unit} • ₹{ord.pricePerUnit}/{ord.unit}
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-[#18392B] text-base">
                          ₹{ord.totalAmount?.toLocaleString("en-IN")}
                        </div>
                        <span className="text-[10px] font-medium text-[#7F8B82] bg-[#FAF8F3] px-2 py-0.5 rounded-md border border-[#E8E4DA]">
                          {ord.paymentMethod}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-start gap-1.5 text-xs text-[#5C6B5F] max-w-xs leading-relaxed">
                          <MapPin className="w-3.5 h-3.5 text-[#7F8B82] flex-shrink-0 mt-0.5" />
                          <span>
                            {ord.deliveryAddress?.street ? `${ord.deliveryAddress.street}, ` : ""}
                            <strong className="text-[#1A261D]">{ord.deliveryAddress?.city}</strong>, {ord.deliveryAddress?.state}
                            {ord.deliveryAddress?.pincode ? ` (${ord.deliveryAddress.pincode})` : ""}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                            statusStyles[ord.status] || "bg-[#FAF8F3] text-[#5C6B5F] border-[#E8E4DA]"
                          }`}
                        >
                          ● {ord.status}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2 items-center">
                          {ord.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(ord._id, "Confirmed")}
                                className="px-3.5 py-2 bg-[#1E3F2D] hover:bg-[#152F21] text-[#FAF8F3] rounded-xl text-xs font-semibold transition-all shadow-soft-xs"
                              >
                                Accept Order
                              </button>
                              <button
                                onClick={() => handleRejectOrder(ord._id)}
                                className="px-3 py-2 bg-[#FBF1F1] hover:bg-[#F7E1E1] text-[#842A2A] border border-[#EED7D7] rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                                title="Reject order"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                Reject
                              </button>
                            </>
                          )}
                          {ord.status === "Confirmed" && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(ord._id, "Dispatched")}
                                className="px-3.5 py-2 bg-[#2E614B] hover:bg-[#1E3F2D] text-[#FAF8F3] rounded-xl text-xs font-semibold transition-all shadow-soft-xs flex items-center gap-1.5"
                              >
                                <Truck className="w-3.5 h-3.5" />
                                Dispatch Lot
                              </button>
                              <button
                                onClick={() => handleRejectOrder(ord._id)}
                                className="px-3 py-2 bg-[#FBF1F1] hover:bg-[#F7E1E1] text-[#842A2A] border border-[#EED7D7] rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                                title="Cancel order"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                Cancel
                              </button>
                            </>
                          )}
                          {ord.status === "Dispatched" && (
                            <button
                              onClick={() => handleUpdateStatus(ord._id, "Delivered")}
                              className="px-3.5 py-2 bg-[#18392B] hover:bg-[#11271D] text-[#FAF8F3] rounded-xl text-xs font-semibold transition-all shadow-soft-xs flex items-center gap-1.5"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Confirm Delivery
                            </button>
                          )}
                          {ord.status === "Delivered" && (
                            <span className="text-xs text-[#1E3F2D] font-semibold flex items-center gap-1 bg-[#EEF4EF] px-3 py-1.5 rounded-xl border border-[#D5E4D8]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3F2D]" /> Completed
                            </span>
                          )}
                          {ord.status === "Cancelled" && (
                            <span className="text-xs text-[#842A2A] font-semibold flex items-center gap-1 bg-[#FBF1F1] px-3 py-1.5 rounded-xl border border-[#EED7D7]">
                              <XCircle className="w-3.5 h-3.5 text-[#842A2A]" /> Rejected
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
        </div>
      )}
    </div>
  );
};

export default SoldProducts;