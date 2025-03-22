'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface RegionalSalesChartProps {
  data: {
    region: string;
    revenue: number;
    orders: number;
    percentChange: number;
  }[];
}

export function RegionalSalesChart({ data }: RegionalSalesChartProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-dark-border" />
          <XAxis 
            dataKey="region" 
            className="text-xs text-black"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            className="text-xs text-black"
            tickFormatter={(value) => formatCurrency(value, 'USD').split('.')[0]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value, 'USD'), 'Revenue']}
            contentStyle={{ 
              backgroundColor: 'var(--card-background, #fff)', 
              borderColor: 'var(--border-color, #e5e7eb)',
              borderRadius: '0.375rem',
              color: 'var(--text-color, #000)'
            }}
          />
          <Bar 
            dataKey="revenue" 
            fill="var(--primary-color, #4F46E5)" 
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
