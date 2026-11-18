import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, UserRound, ShoppingBag, DollarSign, RefreshCw, Package } from 'lucide-react';
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
  Cell
} from 'recharts';
import { toast } from 'react-toastify';

const COLORS = ['#1E3F2D', '#2C485E'];

const AdminAnalytics = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchAdminAnalytics = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/analytics/admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (err: any) {
      console.error('Fetch admin analytics error:', err);
      toast.error('Failed to load system analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminAnalytics();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-7 pb-16 font-sans min-w-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E8E4DA] pb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1E3F2D] bg-[#EEF4EF] px-3.5 py-1.5 rounded-full border border-[#D5E4D8]">
            Platform Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] mt-2">
            System Operations & Ecosystem Health
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B5F] mt-1">
            Real MongoDB aggregation of platform registrations, marketplace lots, and Gross Merchandise Value (GMV).
          </p>
        </div>

        <button
          onClick={fetchAdminAnalytics}
          className="flex items-center gap-2 px-4 py-2 bg-[#FAF8F3] hover:bg-[#F2EDE2] border border-[#E8E4DA] rounded-xl text-xs font-semibold text-[#1A261D] transition-colors shadow-soft-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#1E3F2D]' : ''}`} />
          Refresh Metrics
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs">
          <div className="flex justify-between items-center text-[#5C6B5F] text-xs font-semibold uppercase">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-[#1E3F2D]" />
          </div>
          <div className="text-3xl font-bold text-[#1A261D] mt-3">
            {data?.totalUsers || 0}
          </div>
          <span className="text-[11px] text-[#5C6B5F] mt-1 block">
            {data?.totalFarmers || 0} Farmers • {data?.totalBuyers || 0} Buyers
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs">
          <div className="flex justify-between items-center text-[#5C6B5F] text-xs font-semibold uppercase">
            <span>Active Marketplace Lots</span>
            <Package className="w-4 h-4 text-[#2C485E]" />
          </div>
          <div className="text-3xl font-bold text-[#1A261D] mt-3">
            {data?.totalProducts || 0}
          </div>
          <span className="text-[11px] text-[#2C485E] mt-1 block font-medium">Verified farm harvests</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs">
          <div className="flex justify-between items-center text-[#5C6B5F] text-xs font-semibold uppercase">
            <span>Dispatched Purchase Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#7E5724]" />
          </div>
          <div className="text-3xl font-bold text-[#1A261D] mt-3">
            {data?.totalOrders || 0}
          </div>
          <span className="text-[11px] text-[#7E5724] mt-1 block font-medium">{data?.completedOrders || 0} Delivered</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] shadow-soft-xs">
          <div className="flex justify-between items-center text-[#5C6B5F] text-xs font-semibold uppercase">
            <span>Total Transacted Value (GMV)</span>
            <DollarSign className="w-4 h-4 text-[#1E3F2D]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1A261D] mt-3 truncate">
            ₹{(data?.totalRevenue || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-[#1E3F2D] mt-1 block font-medium">100% direct settlement</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Orders & Revenue */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs">
          <h2 className="text-base font-bold text-[#1A261D] mb-1">Monthly Platform Transactional Turnover (₹)</h2>
          <p className="text-xs text-[#5C6B5F] mb-6">Aggregated sales volume across all Indian states</p>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.monthlyStats || []} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFECE3" />
                <XAxis dataKey="month" stroke="#7F8B82" fontSize={11} />
                <YAxis stroke="#7F8B82" fontSize={11} tickFormatter={(val) => `₹${val}`} />
                <Tooltip
                  formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Gross Revenue']}
                  contentStyle={{ backgroundColor: '#FAF8F3', borderRadius: '12px', border: '1px solid #E8E4DA', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" fill="#1E3F2D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs">
          <h2 className="text-base font-bold text-[#1A261D] mb-1">User Stakeholder Mix</h2>
          <p className="text-xs text-[#5C6B5F] mb-4">Ratio of registered Farmers vs Buyers</p>
          <div className="h-56 w-full">
            {data?.distribution && data.distribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.distribution}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {data.distribution.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#FAF8F3', borderRadius: '12px', border: '1px solid #E8E4DA', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-[#7F8B82]">
                Awaiting user registrations
              </div>
            )}
          </div>
          <div className="space-y-1.5 mt-2">
            {data?.distribution?.map((item: any, i: number) => (
              <div key={item.name} className="flex justify-between text-xs text-[#5C6B5F]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                  {item.name}
                </span>
                <span className="font-semibold text-[#1A261D]">{item.value} users ({item.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
