import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTranslation } from "../../hooks/useTranslation";
import { LanguageSelector } from "../../components/LanguageSelector";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const BuyerAnalytics = () => {
  const { t } = useTranslation();
  
  // Sample data with translation keys
  const cityProductData = [
    { city: t('buyerAnalytics.cities.mumbai'), products: 150, productName: t('buyerAnalytics.products.tomatoes') },
    { city: t('buyerAnalytics.cities.delhi'), products: 120, productName: t('buyerAnalytics.products.potatoes') },
    { city: t('buyerAnalytics.cities.bangalore'), products: 200, productName: t('buyerAnalytics.products.onions') },
    { city: t('buyerAnalytics.cities.chennai'), products: 80, productName: t('buyerAnalytics.products.carrots') },
    { city: t('buyerAnalytics.cities.kolkata'), products: 100, productName: t('buyerAnalytics.products.cucumbers') },
  ];

  const buyerQuantityData = [
    { name: t('buyerAnalytics.buyers.johnDoe'), quantity: 50 },
    { name: t('buyerAnalytics.buyers.janeSmith'), quantity: 75 },
    { name: t('buyerAnalytics.buyers.bobJohnson'), quantity: 45 },
    { name: t('buyerAnalytics.buyers.aliceBrown'), quantity: 90 },
    { name: t('buyerAnalytics.buyers.charlieWilson'), quantity: 60 },
  ];

  const productProfitData = [
    { product: t('buyerAnalytics.products.tomatoes'), profit: 15000, buyerName: t('buyerAnalytics.buyers.johnDoe') },
    { product: t('buyerAnalytics.products.potatoes'), profit: 12000, buyerName: t('buyerAnalytics.buyers.janeSmith') },
    { product: t('buyerAnalytics.products.onions'), profit: 18000, buyerName: t('buyerAnalytics.buyers.bobJohnson') },
    { product: t('buyerAnalytics.products.carrots'), profit: 9000, buyerName: t('buyerAnalytics.buyers.aliceBrown') },
    { product: t('buyerAnalytics.products.cucumbers'), profit: 13500, buyerName: t('buyerAnalytics.buyers.charlieWilson') },
  ];

  const productDiscountData = [
    { name: t('buyerAnalytics.products.tomatoes'), value: 15 },
    { name: t('buyerAnalytics.products.potatoes'), value: 20 },
    { name: t('buyerAnalytics.products.onions'), value: 10 },
    { name: t('buyerAnalytics.products.carrots'), value: 25 },
    { name: t('buyerAnalytics.products.cucumbers'), value: 30 },
  ];

  const COLORS = ['#1E3F2D', '#588157', '#C05621', '#829E85', '#937446'];
  
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-16 font-sans min-w-0">
      <div className="w-full min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A261D] mb-6 tracking-tight">{t('buyerAnalytics.title')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* City vs Products Bought */}
          <Card className="min-w-0 overflow-hidden shadow-soft-sm border-[#E8E4DA] bg-[#FFFFFF] rounded-2xl">
            <CardHeader className="border-b border-[#E8E4DA]/60 pb-3">
              <CardTitle className="text-sm font-bold text-[#1A261D]">{t('buyerAnalytics.cityProducts')}</CardTitle>
            </CardHeader>
            <CardContent className="h-[380px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityProductData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DA" />
                  <XAxis dataKey="city" stroke="#5C6B5F" fontSize={12} />
                  <YAxis stroke="#5C6B5F" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#FAF8F3", borderColor: "#E8E4DA", borderRadius: "12px", color: "#1A261D" }} />
                  <Legend wrapperStyle={{ fontSize: "12px", color: "#5C6B5F" }} />
                  <Bar 
                    dataKey="products" 
                    fill="#1E3F2D"
                    radius={[4, 4, 0, 0]}
                    name={t('buyerAnalytics.productsBought')}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Buyer Name vs Product Quantity */}
          <Card className="min-w-0 overflow-hidden shadow-soft-sm border-[#E8E4DA] bg-[#FFFFFF] rounded-2xl">
            <CardHeader className="border-b border-[#E8E4DA]/60 pb-3">
              <CardTitle className="text-sm font-bold text-[#1A261D]">{t('buyerAnalytics.buyerQuantity')}</CardTitle>
            </CardHeader>
            <CardContent className="h-[380px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={buyerQuantityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DA" />
                  <XAxis dataKey="name" stroke="#5C6B5F" fontSize={12} />
                  <YAxis stroke="#5C6B5F" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#FAF8F3", borderColor: "#E8E4DA", borderRadius: "12px", color: "#1A261D" }} />
                  <Legend wrapperStyle={{ fontSize: "12px", color: "#5C6B5F" }} />
                  <Line 
                    type="monotone" 
                    dataKey="quantity" 
                    stroke="#588157" 
                    strokeWidth={2.5}
                    dot={{ fill: '#1E3F2D', r: 4 }}
                    name={t('buyerAnalytics.quantity')}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Product vs Profit with Buyer Information */}
          <Card className="min-w-0 overflow-hidden shadow-soft-sm border-[#E8E4DA] bg-[#FFFFFF] rounded-2xl">
            <CardHeader className="border-b border-[#E8E4DA]/60 pb-3">
              <CardTitle className="text-sm font-bold text-[#1A261D]">{t('buyerAnalytics.productProfit')}</CardTitle>
            </CardHeader>
            <CardContent className="h-[380px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productProfitData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8E4DA" />
                  <XAxis dataKey="product" stroke="#5C6B5F" fontSize={12} />
                  <YAxis stroke="#5C6B5F" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#FAF8F3", borderColor: "#E8E4DA", borderRadius: "12px", color: "#1A261D" }} />
                  <Legend wrapperStyle={{ fontSize: "12px", color: "#5C6B5F" }} />
                  <Bar 
                    dataKey="profit" 
                    fill="#C05621"
                    radius={[4, 4, 0, 0]}
                    name={t('buyerAnalytics.profit')}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Product vs Discount */}
          <Card className="min-w-0 overflow-hidden shadow-soft-sm border-[#E8E4DA] bg-[#FFFFFF] rounded-2xl">
            <CardHeader className="border-b border-[#E8E4DA]/60 pb-3">
              <CardTitle className="text-sm font-bold text-[#1A261D]">{t('buyerAnalytics.productDiscount')}</CardTitle>
            </CardHeader>
            <CardContent className="h-[380px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productDiscountData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={125}
                    fill="#1E3F2D"
                    dataKey="value"
                  >
                    {productDiscountData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#FAF8F3", borderColor: "#E8E4DA", borderRadius: "12px", color: "#1A261D" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuyerAnalytics;