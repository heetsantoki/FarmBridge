import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';
import { useTranslation } from '../hooks/useTranslation';
import { TrendingUp, Package, ShoppingCart, DollarSign, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

const COLORS = ['#1E3F2D', '#2C5E43', '#4E8A66', '#7FB894', '#BCE3C7', '#E5A93B'];

const Analytics = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchFarmerAnalytics = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/analytics/farmer', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (err: any) {
      console.error('Fetch farmer analytics error:', err);
      toast.error('Failed to load live analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmerAnalytics();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-7 pb-16 font-sans min-w-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E8E4DA] pb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-full border border-[#D5E4D8]">
            Real-Time Farm Metrics
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] mt-2">
            Producer Sales & Harvest Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B5F] mt-1">
            Aggregated metrics calculated dynamically from your listed produce inventory and real buyer purchase orders.
          </p>
        </div>

        <button
          onClick={fetchFarmerAnalytics}
          className="flex items-center gap-2 px-4 py-2 bg-[#FAF8F3] hover:bg-[#F2EDE2] border border-[#E8E4DA] rounded-xl text-xs font-semibold text-[#1A261D] transition-colors shadow-soft-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#1E3F2D]' : ''}`} />
          Refresh Stats
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs">
          <div className="flex justify-between items-center text-[#5C6B5F] text-xs font-semibold uppercase">
            <span>Harvest Volume Listed</span>
            <Package className="w-4 h-4 text-[#1E3F2D]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1A261D] mt-3">
            {data?.totalProducts || 0} Crops
          </div>
          <span className="text-[11px] text-[#245437] mt-1 block font-medium">● Available in live marketplace</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs">
          <div className="flex justify-between items-center text-[#5C6B5F] text-xs font-semibold uppercase">
            <span>Orders Dispatched</span>
            <ShoppingCart className="w-4 h-4 text-[#2C485E]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1A261D] mt-3">
            {data?.totalOrders || 0} Orders
          </div>
          <span className="text-[11px] text-[#2C485E] mt-1 block font-medium">● Directly connected with buyers</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs">
          <div className="flex justify-between items-center text-[#5C6B5F] text-xs font-semibold uppercase">
            <span>Total Realized Revenue</span>
            <DollarSign className="w-4 h-4 text-[#7E5724]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1A261D] mt-3">
            ₹{(data?.totalSales || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-[#7E5724] mt-1 block font-medium">● 0% middleman deduction</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Sales Revenue */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs">
          <h2 className="text-base font-bold text-[#1A261D] mb-1">Monthly Harvest Sales Revenue (₹)</h2>
          <p className="text-xs text-[#5C6B5F] mb-6">Real transactional turnover per calendar month</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.monthlySales || []} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFECE3" />
                <XAxis dataKey="month" stroke="#7F8B82" fontSize={11} />
                <YAxis stroke="#7F8B82" fontSize={11} tickFormatter={(val) => `₹${val}`} />
                <Tooltip
                  formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Sales Revenue']}
                  contentStyle={{ backgroundColor: '#FAF8F3', borderRadius: '12px', border: '1px solid #E8E4DA', fontSize: '12px' }}
                />
                <Bar dataKey="sales" fill="#1E3F2D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs">
          <h2 className="text-base font-bold text-[#1A261D] mb-1">Crop Variety Mix</h2>
          <p className="text-xs text-[#5C6B5F] mb-4">Distribution by listed crop categories</p>
          <div className="h-56 w-full">
            {data?.categoryDistribution && data.categoryDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.categoryDistribution}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {data.categoryDistribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#FAF8F3', borderRadius: '12px', border: '1px solid #E8E4DA', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-[#7F8B82]">
                Upload crops to generate category chart
              </div>
            )}
          </div>
          <div className="space-y-1.5 mt-2">
            {data?.categoryDistribution?.map((cat: any, i: number) => (
              <div key={cat.name} className="flex justify-between text-xs text-[#5C6B5F]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  {cat.name}
                </span>
                <span className="font-semibold text-[#1A261D]">{cat.count} listings</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
