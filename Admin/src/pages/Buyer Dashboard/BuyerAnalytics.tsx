import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useTranslation } from '../../hooks/useTranslation';
import { ShoppingBag, CreditCard, MapPin, RefreshCw, Layers } from 'lucide-react';
import { toast } from 'react-toastify';

const COLORS = ['#2C485E', '#1E3F2D', '#7E5724', '#842A2A', '#5C3C75', '#3A7D64'];

const BuyerAnalytics = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchBuyerAnalytics = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/analytics/buyer', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (err: any) {
      console.error('Fetch buyer analytics error:', err);
      toast.error('Failed to load buyer analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyerAnalytics();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-7 pb-16 font-sans min-w-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E8E4DA] pb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2C485E] bg-[#EEF2F6] px-3.5 py-1.5 rounded-full border border-[#DCE4EC]">
            Buyer Procurement Analytics
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] mt-2">
            Order Spending & Regional Sourcing
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B5F] mt-1">
            Real purchasing trends and volume distribution based on your actual order history.
          </p>
        </div>

        <button
          onClick={fetchBuyerAnalytics}
          className="flex items-center gap-2 px-4 py-2 bg-[#FAF8F3] hover:bg-[#F2EDE2] border border-[#E8E4DA] rounded-xl text-xs font-semibold text-[#1A261D] transition-colors shadow-soft-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#1E3F2D]' : ''}`} />
          Refresh Stats
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs">
          <div className="flex justify-between items-center text-[#5C6B5F] text-xs font-semibold uppercase">
            <span>Total Wholesale Purchase Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#2C485E]" />
          </div>
          <div className="text-3xl font-bold text-[#1A261D] mt-3">
            {data?.totalOrders || 0} Orders
          </div>
          <span className="text-xs text-[#2C485E] mt-1 block font-medium">Verified farm-gate dispatches</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs">
          <div className="flex justify-between items-center text-[#5C6B5F] text-xs font-semibold uppercase">
            <span>Cumulative Procurement Spend</span>
            <CreditCard className="w-4 h-4 text-[#1E3F2D]" />
          </div>
          <div className="text-3xl font-bold text-[#1A261D] mt-3">
            ₹{(data?.totalSpent || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-[#1E3F2D] mt-1 block font-medium">Bypassed middleman commissions</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Spending by City */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs">
          <h2 className="text-base font-bold text-[#1A261D] mb-1">Procurement Spend by Destination City</h2>
          <p className="text-xs text-[#5C6B5F] mb-6">Where your bulk crop deliveries were received</p>
          <div className="h-72 w-full">
            {data?.spendingByCity && data.spendingByCity.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.spendingByCity} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFECE3" />
                  <XAxis dataKey="city" stroke="#7F8B82" fontSize={11} />
                  <YAxis stroke="#7F8B82" fontSize={11} tickFormatter={(val) => `₹${val}`} />
                  <Tooltip
                    formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Amount Spent']}
                    contentStyle={{ backgroundColor: '#FAF8F3', borderRadius: '12px', border: '1px solid #E8E4DA', fontSize: '12px' }}
                  />
                  <Bar dataKey="spent" fill="#2C485E" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-[#7F8B82]">
                Place orders to visualize regional procurement spending
              </div>
            )}
          </div>
        </div>

        {/* Crops Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs">
          <h2 className="text-base font-bold text-[#1A261D] mb-1">Crops Purchased (Volume)</h2>
          <p className="text-xs text-[#5C6B5F] mb-4">Quantity breakdown per crop variety</p>
          <div className="h-56 w-full">
            {data?.cropBreakdown && data.cropBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.cropBreakdown}
                    dataKey="quantity"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {data.cropBreakdown.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#FAF8F3', borderRadius: '12px', border: '1px solid #E8E4DA', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-[#7F8B82]">
                No crop orders logged yet
              </div>
            )}
          </div>
          <div className="space-y-1.5 mt-2">
            {data?.cropBreakdown?.map((cr: any, i: number) => (
              <div key={cr.name} className="flex justify-between text-xs text-[#5C6B5F]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  {cr.name}
                </span>
                <span className="font-semibold text-[#1A261D]">{cr.quantity} units</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerAnalytics;
