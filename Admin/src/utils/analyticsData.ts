// Mock data for the analytics dashboard
// In a real application, this would come from an API

export interface UserData {
    month: string;
    year: number;
    farmers: number;
    buyers: number;
  }
  
  export interface YearlyData {
    year: number;
    farmers: number;
    buyers: number;
  }
  
  // Generate monthly data for the last 12 months
  export const generateMonthlyData = (): UserData[] => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const data: UserData[] = [];
    
    for (let i = 11; i >= 0; i--) {
      let monthIndex = (currentMonth - i + 12) % 12;
      let year = currentYear - Math.floor((i - currentMonth) / 12);
      
      // Generate random but reasonable numbers with trends
      const farmers = Math.floor(Math.random() * 50) + 20 + (i * 2); // Increasing trend
      const buyers = Math.floor(Math.random() * 40) + 15 + (i * 1.5); // Slower increasing trend
      
      data.push({
        month: months[monthIndex],
        year,
        farmers,
        buyers
      });
    }
    
    return data;
  };
  
  // Generate yearly data for the last 5 years
  export const generateYearlyData = (): YearlyData[] => {
    const currentYear = new Date().getFullYear();
    
    const data: YearlyData[] = [];
    
    for (let i = 4; i >= 0; i--) {
      const year = currentYear - i;
      
      // Each year should have more users as the service grows
      const baseFarmers = 120 + (i * 80);
      const baseBuyers = 90 + (i * 70);
      
      data.push({
        year,
        farmers: baseFarmers + Math.floor(Math.random() * 50),
        buyers: baseBuyers + Math.floor(Math.random() * 40)
      });
    }
    
    return data;
  };
  
  // Get total counts
  export const getTotalCounts = () => {
    const yearlyData = generateYearlyData();
    
    const totalFarmers = yearlyData.reduce((sum, year) => sum + year.farmers, 0);
    const totalBuyers = yearlyData.reduce((sum, year) => sum + year.buyers, 0);
    
    return {
      totalFarmers,
      totalBuyers,
      total: totalFarmers + totalBuyers
    };
  };
  
  // Get percentage distribution for pie chart
  export const getUserDistribution = () => {
    const { totalFarmers, totalBuyers, total } = getTotalCounts();
    
    return [
      { name: 'Farmers', value: totalFarmers, percentage: Math.round((totalFarmers / total) * 100) },
      { name: 'Buyers', value: totalBuyers, percentage: Math.round((totalBuyers / total) * 100) }
    ];
  };