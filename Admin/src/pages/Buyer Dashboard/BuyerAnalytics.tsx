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

const analyticsDict = {
  en: {
    badge: "Buyer Procurement Analytics",
    title: "Order Spending & Regional Sourcing",
    subtitle: "Real purchasing trends and volume distribution based on your actual order history.",
    refreshBtn: "Refresh Stats",
    kpiOrdersLabel: "Total Wholesale Purchase Orders",
    ordersSuffix: "Orders",
    kpiOrdersSub: "Verified farm-gate dispatches",
    kpiSpendLabel: "Cumulative Procurement Spend",
    kpiSpendSub: "Bypassed middleman commissions",
    spendByCityTitle: "Procurement Spend by Destination City",
    spendByCitySub: "Where your bulk crop deliveries were received",
    amountSpentTooltip: "Amount Spent",
    noCityData: "Place orders to visualize regional procurement spending",
    cropsVolumeTitle: "Crops Purchased (Volume)",
    cropsVolumeSub: "Quantity breakdown per crop variety",
    noCropData: "No crop orders logged yet",
    unitsSuffix: "units",
  },
  gu: {
    badge: "ખરીદદાર પ્રાપ્તિ વિશ્લેષણ",
    title: "ઓર્ડર ખર્ચ અને પ્રાદેશિક પ્રાપ્તિ",
    subtitle: "તમારા વાસ્તવિક ઓર્ડર ઇતિહાસ પર આધારિત ખરીદી વલણો અને જથ્થા વિતરણ.",
    refreshBtn: "આંકડા તાજા કરો",
    kpiOrdersLabel: "કુલ જથ્થાબંધ ખરીદ ઓર્ડર",
    ordersSuffix: "ઓર્ડર",
    kpiOrdersSub: "ખેતરમાંથી સીધા પ્રમાણિત રવાના થયેલા માલ",
    kpiSpendLabel: "કુલ ખરીદી ખર્ચ",
    kpiSpendSub: "ઝીરો દલાલી બચત સાથે",
    spendByCityTitle: "ગંતવ્ય શહેર મુજબ પ્રાપ્તિ ખર્ચ",
    spendByCitySub: "તમારી જથ્થાબંધ ઉપજ ડિલિવરી કયા શહેરમાં પહોંચી",
    amountSpentTooltip: "ખર્ચાયેલી રકમ",
    noCityData: "પ્રાદેશિક પ્રાપ્તિ ખર્ચ જોવા માટે ઓર્ડર આપો",
    cropsVolumeTitle: "ખરીદેલ પાક (જથ્થો)",
    cropsVolumeSub: "પાકની જાત મુજબ જથ્થાનું વિતરણ",
    noCropData: "હજુ સુધી કોઈ પાક ઓર્ડર નોંધાયેલ નથી",
    unitsSuffix: "એકમ",
  },
  hi: {
    badge: "खरीदार अधिप्राप्ति विश्लेषण",
    title: "ऑर्डर खर्च और क्षेत्रीय स्रोत",
    subtitle: "आपके वास्तविक ऑर्डर इतिहास पर आधारित खरीद रुझान और मात्रा वितरण।",
    refreshBtn: "आंकड़े ताज़ा करें",
    kpiOrdersLabel: "कुल थोक खरीद आदेश",
    ordersSuffix: "ऑर्डर",
    kpiOrdersSub: "सत्यापित खेत से भेजे गए लॉट",
    kpiSpendLabel: "कुल खरीद व्यय",
    kpiSpendSub: "बिचौलियों की दलाली बचाई गई",
    spendByCityTitle: "गंतव्य शहर अनुसार अधिप्राप्ति व्यय",
    spendByCitySub: "आपकी थोक फसल डिलीवरी कहाँ प्राप्त हुई",
    amountSpentTooltip: "व्यय राशि",
    noCityData: "क्षेत्रीय खरीद व्यय देखने के लिए ऑर्डर दें",
    cropsVolumeTitle: "खरीदी गई फसलें (मात्रा)",
    cropsVolumeSub: "फसल किस्म अनुसार मात्रा का विवरण",
    noCropData: "अभी तक कोई फसल ऑर्डर दर्ज नहीं हुआ",
    unitsSuffix: "इकाई",
  },
};

const BuyerAnalytics = () => {
  const { language } = useTranslation();
  const langKey = language === "gu" || language === "hi" ? language : "en";
  const tTxt = analyticsDict[langKey];

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
            {tTxt.badge}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] mt-2">
            {tTxt.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#5C6B5F] mt-1">
            {tTxt.subtitle}
          </p>
        </div>

        <button
          onClick={fetchBuyerAnalytics}
          className="flex items-center gap-2 px-4 py-2 bg-[#FAF8F3] hover:bg-[#F2EDE2] border border-[#E8E4DA] rounded-xl text-xs font-semibold text-[#1A261D] transition-colors shadow-soft-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#1E3F2D]' : ''}`} />
          {tTxt.refreshBtn}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs">
          <div className="flex justify-between items-center text-[#5C6B5F] text-xs font-semibold uppercase">
            <span>{tTxt.kpiOrdersLabel}</span>
            <ShoppingBag className="w-4 h-4 text-[#2C485E]" />
          </div>
          <div className="text-3xl font-bold text-[#1A261D] mt-3">
            {data?.totalOrders || 0} {tTxt.ordersSuffix}
          </div>
          <span className="text-xs text-[#2C485E] mt-1 block font-medium">{tTxt.kpiOrdersSub}</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs">
          <div className="flex justify-between items-center text-[#5C6B5F] text-xs font-semibold uppercase">
            <span>{tTxt.kpiSpendLabel}</span>
            <CreditCard className="w-4 h-4 text-[#1E3F2D]" />
          </div>
          <div className="text-3xl font-bold text-[#1A261D] mt-3">
            ₹{(data?.totalSpent || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-[#1E3F2D] mt-1 block font-medium">{tTxt.kpiSpendSub}</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Spending by City */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs">
          <h2 className="text-base font-bold text-[#1A261D] mb-1">{tTxt.spendByCityTitle}</h2>
          <p className="text-xs text-[#5C6B5F] mb-6">{tTxt.spendByCitySub}</p>
          <div className="h-72 w-full">
            {data?.spendingByCity && data.spendingByCity.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.spendingByCity} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFECE3" />
                  <XAxis dataKey="city" stroke="#7F8B82" fontSize={11} />
                  <YAxis stroke="#7F8B82" fontSize={11} tickFormatter={(val) => `₹${val}`} />
                  <Tooltip
                    formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, tTxt.amountSpentTooltip]}
                    contentStyle={{ backgroundColor: '#FAF8F3', borderRadius: '12px', border: '1px solid #E8E4DA', fontSize: '12px' }}
                  />
                  <Bar dataKey="spent" fill="#2C485E" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-[#7F8B82]">
                {tTxt.noCityData}
              </div>
            )}
          </div>
        </div>

        {/* Crops Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E8E4DA] shadow-soft-xs">
          <h2 className="text-base font-bold text-[#1A261D] mb-1">{tTxt.cropsVolumeTitle}</h2>
          <p className="text-xs text-[#5C6B5F] mb-4">{tTxt.cropsVolumeSub}</p>
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
                {tTxt.noCropData}
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
                <span className="font-semibold text-[#1A261D]">{cr.quantity} {tTxt.unitsSuffix}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerAnalytics;
