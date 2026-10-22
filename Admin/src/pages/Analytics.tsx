import React from 'react';
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
} from 'recharts';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Analytics = () => {
  const { t } = useTranslation();

  // Sales Data
  const fruitsSalesData = [
    { month: t('months.Jan'), sales: 5000 },
    { month: t('months.Feb'), sales: 4200 },
    { month: t('months.Mar'), sales: 3800 },
    { month: t('months.Apr'), sales: 4500 },
    { month: t('months.May'), sales: 3900 },
  ];

  const grainsSalesData = [
    { month: t('months.Jan'), sales: 6200 },
    { month: t('months.Feb'), sales: 5400 },
    { month: t('months.Mar'), sales: 4900 },
    { month: t('months.Apr'), sales: 5300 },
    { month: t('months.May'), sales: 4700 },
  ];

  // Profit Data
  const fruitProfitData = [
    { product: t('Analytics.products.apples'), profit: 3200 },
    { product: t('Analytics.products.bananas'), profit: 2700 },
    { product: t('Analytics.products.oranges'), profit: 2500 },
    { product: t('Analytics.products.grapes'), profit: 3000 },
  ];

  const grainsProfitData = [
    { product: t('Analytics.products.rice'), profit: 4000 },
    { product: t('Analytics.products.wheat'), profit: 3500 },
    { product: t('Analytics.products.oats'), profit: 2800 },
    { product: t('Analytics.products.corn'), profit: 3100 },
  ];

  // Discount Data
  const fruitDiscountData = [
    { product: t('Analytics.products.apples'), discount: 8 },
    { product: t('Analytics.products.bananas'), discount: 12 },
    { product: t('Analytics.products.oranges'), discount: 6 },
    { product: t('Analytics.products.grapes'), discount: 10 },
  ];

  const grainsDiscountData = [
    { product: t('Analytics.products.rice'), discount: 15 },
    { product: t('Analytics.products.wheat'), discount: 10 },
    { product: t('Analytics.products.oats'), discount: 7 },
    { product: t('Analytics.products.corn'), discount: 9 },
  ];

  // Rating Data
  const fruitRatingData = [
    { product: t('Analytics.products.apples'), rating: 4.5 },
    { product: t('Analytics.products.bananas'), rating: 4.2 },
    { product: t('Analytics.products.oranges'), rating: 4.0 },
    { product: t('Analytics.products.grapes'), rating: 4.3 },
  ];

  const grainsRatingData = [
    { product: t('Analytics.products.rice'), rating: 4.7 },
    { product: t('Analytics.products.wheat'), rating: 4.4 },
    { product: t('Analytics.products.oats'), rating: 4.1 },
    { product: t('Analytics.products.corn'), rating: 4.5 },
  ];

  // City Sales Data
  const citySalesData = [
    { city: 'City A', product: t('Analytics.products.apples'), sales: 3000 },
    { city: 'City A', product: t('Analytics.products.bananas'), sales: 2500 },
    { city: 'City A', product: t('Analytics.products.oranges'), sales: 2000 },
    { city: 'City A', product: t('Analytics.products.grapes'), sales: 2800 },
    { city: 'City B', product: t('Analytics.products.rice'), sales: 4000 },
    { city: 'City B', product: t('Analytics.products.wheat'), sales: 3500 },
    { city: 'City B', product: t('Analytics.products.oats'), sales: 3000 },
    { city: 'City B', product: t('Analytics.products.corn'), sales: 3200 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-16 font-sans min-w-0">
      <div className="w-full min-w-0">
        <div className="flex justify-between items-center mb-8 border-b border-slate-200/80 pb-5">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t('Analytics.title')}</h1>
            <p className="text-sm text-slate-500 mt-1">Farm yield, revenue trends, and commodity sales performance</p>
          </div>
        </div>

        {/* Sales vs Month */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs min-w-0 overflow-hidden">
            <h2 className="text-lg font-semibold mb-4">{t('Analytics.sales.fruits')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fruitsSalesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#ff6384" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t('Analytics.sales.grains')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={grainsSalesData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#36a2eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profit vs Product */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t('Analytics.sales.Profit Fruits')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fruitProfitData}>
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="profit" fill="#ff9f40" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t('Analytics.sales.Profit Grains')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={grainsProfitData}>
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="profit" fill="#4bc0c0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Discounts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t('Analytics.sales.discountsFruits')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fruitDiscountData}>
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="discount" fill="#ff6384" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t('Analytics.sales.discountsGrains')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={grainsDiscountData}>
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="discount" fill="#36a2eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ratings Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t('Analytics.sales.ratingsFruits')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fruitRatingData}>
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rating" fill="#ff9f40" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t('Analytics.sales.ratingsGrains')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={grainsRatingData}>
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rating" fill="#4bc0c0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* City Sales Section */}
        <div className="grid grid-cols-1 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">{t('Analytics.sales.citySales')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={citySalesData} dataKey="sales" nameKey="city" cx="50%" cy="50%" outerRadius={80} fill="#ff6384">
                  {citySalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#ff6384' : '#36a2eb'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;