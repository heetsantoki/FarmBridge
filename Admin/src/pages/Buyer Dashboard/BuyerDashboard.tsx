import React, { useState } from 'react';
import BuyerProducts from './BuyerProducts';
import History from './History';
import BuyerAnalytics from './BuyerAnalytics';
import { ShoppingCart, Clock, BarChart3 } from 'lucide-react';

const BuyerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'orders' | 'analytics'>('marketplace');

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-sans min-w-0">
      {/* Segmented Pill Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFECE3] border border-[#E5E0D5] rounded-xl max-w-full shadow-soft-xs">
        <button
          onClick={() => setActiveTab('marketplace')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs transition-all ${
            activeTab === 'marketplace'
              ? 'bg-[#1E3F2D] text-[#FAF8F3] shadow-soft-sm'
              : 'text-[#5C6B5F] hover:text-[#1A261D] hover:bg-[#FAF8F3]/70'
          }`}
        >
          <ShoppingCart className="w-4 h-4" /> Available Marketplace
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs transition-all ${
            activeTab === 'orders'
              ? 'bg-[#1E3F2D] text-[#FAF8F3] shadow-soft-sm'
              : 'text-[#5C6B5F] hover:text-[#1A261D] hover:bg-[#FAF8F3]/70'
          }`}
        >
          <Clock className="w-4 h-4" /> Live Tracking & History
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-xs transition-all ${
            activeTab === 'analytics'
              ? 'bg-[#1E3F2D] text-[#FAF8F3] shadow-soft-sm'
              : 'text-[#5C6B5F] hover:text-[#1A261D] hover:bg-[#FAF8F3]/70'
          }`}
        >
          <BarChart3 className="w-4 h-4" /> Procurement Analytics
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'marketplace' && <BuyerProducts />}
        {activeTab === 'orders' && <History />}
        {activeTab === 'analytics' && <BuyerAnalytics />}
      </div>
    </div>
  );
};

export default BuyerDashboard;

