import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartContainer from './ChartContainer';
import CustomTooltip from './CustomTooltip';
import { YearlyData } from '../../utils/analyticsData';

interface YearlyChartProps {
  data: YearlyData[];
}

const YearlyChart: React.FC<YearlyChartProps> = ({ data }) => {
  const [animationActive, setAnimationActive] = useState(false);

  useEffect(() => {
    // Delay animation start for a smoother page load
    const timer = setTimeout(() => {
      setAnimationActive(true);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  const formatYAxis = (value: number) => {
    if (value === 0) return '0';
    if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
    return `${value}`;
  };

  return (
    <ChartContainer title="Yearly Registrations">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={formatYAxis}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              iconSize={8}
            />
            <Bar 
              name="Farmers" 
              dataKey="farmers" 
              fill="#4CAF50"
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
              animationBegin={animationActive ? 0 : 30000}
            />
            <Bar 
              name="Buyers" 
              dataKey="buyers" 
              fill="#FF5722" 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
              animationBegin={animationActive ? 300 : 30000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
};

export default YearlyChart;