import React, { useEffect } from 'react';
import { Users, UserRound, ShoppingBag, TrendingUp } from 'lucide-react';
import StatCard from '../../components/analytics/StatCard';
import MonthlyChart from '../../components/analytics/MonthlyChart';
import YearlyChart from '../../components/analytics/YearlyChart';
import DistributionPieChart from '../../components/analytics/DistributionPieChart';
import { generateMonthlyData, generateYearlyData, getTotalCounts, getUserDistribution } from '../../utils/analyticsData';

const AdminAnalytics = () => {
  const monthlyData = generateMonthlyData();
  const yearlyData = generateYearlyData();
  const { totalFarmers, totalBuyers, total } = getTotalCounts();
  const distributionData = getUserDistribution();

  useEffect(() => {
    // Intersection Observer to handle fade-in effects
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    // Observe all elements with the fade-in-section class
    document.querySelectorAll('.fade-in-section').forEach(el => {
      observer.observe(el);
    });

    return () => {
      // Clean up
      document.querySelectorAll('.fade-in-section').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 fade-in-section">
        <h1 className="text-3xl font-bold mb-2 mt-14 text-center">Analytics Dashboard</h1>
        <p className="text-muted-foreground text-center">
          Comprehensive overview of farmer and buyer registration data
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 fade-in-section">
        <StatCard
          title="Total Users"
          value={total.toLocaleString()}
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          description="All registered users"
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Farmers"
          value={totalFarmers.toLocaleString()}
          icon={<UserRound className="h-5 w-5 text-farmer" />}
          description={`${distributionData[0].percentage}% of total users`}
          trend={{ value: 15, positive: true }}
          className="border-l-4 border-l-farmer"
        />
        <StatCard
          title="Buyers"
          value={totalBuyers.toLocaleString()}
          icon={<ShoppingBag className="h-5 w-5 text-buyer" />}
          description={`${distributionData[1].percentage}% of total users`}
          trend={{ value: 8, positive: true }}
          className="border-l-4 border-l-buyer"
        />
        <StatCard
          title="Growth Rate"
          value="24.8%"
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
          description="User growth this year"
          className="border-l-4 border-l-primary"
        />
      </div>

      {/* Charts - First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="fade-in-section">
          <MonthlyChart data={monthlyData} />
        </div>
        <div className="fade-in-section">
          <YearlyChart data={yearlyData} />
        </div>
      </div>

      {/* Charts - Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="fade-in-section">
          <DistributionPieChart data={distributionData} />
        </div>
        <div className="fade-in-section">
          <ChartContainer title="Key Insights">
            <div className="space-y-4 p-2">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Consistent Growth</h3>
                  <p className="text-muted-foreground text-sm">Both farmer and buyer registrations show consistent growth over the past year, with farmers joining at a slightly higher rate.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-farmer/10 flex items-center justify-center flex-shrink-0">
                  <UserRound className="h-6 w-6 text-farmer" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Farmer Majority</h3>
                  <p className="text-muted-foreground text-sm">Farmers constitute {distributionData[0].percentage}% of the user base, indicating strong adoption among agricultural producers.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-buyer/10 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="h-6 w-6 text-buyer" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Buyer Engagement</h3>
                  <p className="text-muted-foreground text-sm">Buyer registrations have increased by 8% in the last quarter, suggesting growing market interest in farm products.</p>
                </div>
              </div>
            </div>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

// Don't forget to include the ChartContainer component here since we reference it directly
import ChartContainer from '../../components/analytics/ChartContainer';

export { AdminAnalytics };