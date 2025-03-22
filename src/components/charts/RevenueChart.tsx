'use client';

import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Sample data
const data = [
  { name: 'Jan', revenue: 4000, profit: 2400, expenses: 1600 },
  { name: 'Feb', revenue: 3000, profit: 1398, expenses: 1602 },
  { name: 'Mar', revenue: 5000, profit: 3000, expenses: 2000 },
  { name: 'Apr', revenue: 2780, profit: 1908, expenses: 872 },
  { name: 'May', revenue: 1890, profit: 1800, expenses: 90 },
  { name: 'Jun', revenue: 2390, profit: 2000, expenses: 390 },
  { name: 'Jul', revenue: 3490, profit: 2300, expenses: 1190 },
  { name: 'Aug', revenue: 4000, profit: 2400, expenses: 1600 },
  { name: 'Sep', revenue: 4500, profit: 3000, expenses: 1500 },
  { name: 'Oct', revenue: 5000, profit: 3500, expenses: 1500 },
  { name: 'Nov', revenue: 4700, profit: 3200, expenses: 1500 },
  { name: 'Dec', revenue: 6000, profit: 4000, expenses: 2000 },
];

type TimeRange = '7d' | '30d' | '90d' | '1y' | 'all';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-dark-card p-4 border border-gray-200 dark:border-dark-border shadow-lg rounded-md">
        <p className="text-black font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-base mb-1 font-medium" style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export const RevenueChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1y');

  // Function to filter data based on time range
  const getFilteredData = () => {
    if (timeRange === 'all') return data;
    
    const ranges = {
      '7d': 1,
      '30d': 1,
      '90d': 3,
      '1y': 12,
    };
    
    const numberOfMonths = ranges[timeRange];
    return data.slice(-numberOfMonths);
  };

  const filteredData = getFilteredData();

  return (
    <Card variant="bordered" className="h-full dark:bg-dark-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-black">Revenue Overview</CardTitle>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={timeRange === '7d' ? 'primary' : 'outline'}
            onClick={() => setTimeRange('7d')}
            className="text-base"
          >
            7D
          </Button>
          <Button
            size="sm"
            variant={timeRange === '30d' ? 'primary' : 'outline'}
            onClick={() => setTimeRange('30d')}
            className="text-base"
          >
            30D
          </Button>
          <Button
            size="sm"
            variant={timeRange === '90d' ? 'primary' : 'outline'}
            onClick={() => setTimeRange('90d')}
            className="text-base"
          >
            90D
          </Button>
          <Button
            size="sm"
            variant={timeRange === '1y' ? 'primary' : 'outline'}
            onClick={() => setTimeRange('1y')}
            className="text-base"
          >
            1Y
          </Button>
          <Button
            size="sm"
            variant={timeRange === 'all' ? 'primary' : 'outline'}
            onClick={() => setTimeRange('all')}
            className="text-base"
          >
            ALL
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4338CA" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4338CA" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#047857" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#047857" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EA580C" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#EA580C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-dark-border" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#000000', fontSize: 14 }}
                className="dark:text-black"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#000000', fontSize: 14 }}
                tickFormatter={(value) => `$${value}`}
                width={80}
                className="dark:text-black"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                iconType="circle" 
                wrapperStyle={{ 
                  paddingTop: '15px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#4338CA"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="profit"
                name="Profit"
                stroke="#047857"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorProfit)"
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                name="Expenses"
                stroke="#EA580C"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorExpenses)"
                activeDot={{ r: 8, strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
