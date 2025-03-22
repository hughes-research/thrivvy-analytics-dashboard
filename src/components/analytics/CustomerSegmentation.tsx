'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { customerSegmentation } from '@/lib/mock-data';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';
import { formatCurrency } from '@/lib/utils';

export const CustomerSegmentation = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
    const segment = customerSegmentation.find(s => s.id === payload.id);
    
    return (
      <g>
        <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill="#888" className="text-sm dark:text-dark-muted">
          Selected Segment
        </text>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-xl font-bold dark:text-white">
          {payload.name}
        </text>
        <text x={cx} y={cy + 25} dy={8} textAnchor="middle" fill="#888" className="text-sm dark:text-dark-muted">
          {payload.count.toLocaleString()} customers
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.8}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 16}
          fill={fill}
        />
      </g>
    );
  };

  const totalCustomers = customerSegmentation.reduce((sum, segment) => sum + segment.count, 0);
  
  const pieData = customerSegmentation.map(segment => ({
    id: segment.id,
    name: segment.name,
    value: segment.count,
    count: segment.count,
    color: segment.color
  }));

  return (
    <Card className="h-full dark:bg-dark-background">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-gray-900 dark:text-dark-text">Customer Segmentation</CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-dark-muted">
          ML-driven customer clusters based on behavior patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                dataKey="value"
                onMouseEnter={onPieEnter}
                paddingAngle={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `${value.toLocaleString()} (${((value / totalCustomers) * 100).toFixed(1)}%)`, 
                  name
                ]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  padding: '0.75rem',
                }}
                wrapperStyle={{
                  outline: 'none',
                }}
                itemStyle={{
                  color: '#111827',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text mb-3">
            {customerSegmentation[activeIndex].name} Segment Details
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-3 border border-gray-100 dark:border-dark-border">
              <p className="text-xs text-gray-500 dark:text-dark-muted">Customers</p>
              <p className="text-lg font-bold text-gray-900 dark:text-dark-text">
                {customerSegmentation[activeIndex].count.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-3 border border-gray-100 dark:border-dark-border">
              <p className="text-xs text-gray-500 dark:text-dark-muted">Avg. Spend</p>
              <p className="text-lg font-bold text-gray-900 dark:text-dark-text">
                {formatCurrency(customerSegmentation[activeIndex].avgSpend)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-3 border border-gray-100 dark:border-dark-border">
              <p className="text-xs text-gray-500 dark:text-dark-muted">Order Frequency</p>
              <p className="text-lg font-bold text-gray-900 dark:text-dark-text">
                {customerSegmentation[activeIndex].orderFrequency.toFixed(1)}/month
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-3 border border-gray-100 dark:border-dark-border">
              <p className="text-xs text-gray-500 dark:text-dark-muted">Retention</p>
              <p className="text-lg font-bold text-gray-900 dark:text-dark-text">
                {(customerSegmentation[activeIndex].retentionRate * 100).toFixed(0)}%
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-4 border border-gray-100 dark:border-dark-border">
            <p className="text-sm font-medium text-gray-700 dark:text-dark-text mb-2">Key Characteristics</p>
            <div className="flex flex-wrap gap-2">
              {customerSegmentation[activeIndex].characteristics.map((trait, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-card text-gray-800 dark:text-dark-text"
                  style={{ borderLeft: `3px solid ${customerSegmentation[activeIndex].color}` }}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">AI-Powered Recommendations</h4>
            <p className="text-sm text-blue-700 dark:text-blue-200">
              {activeIndex === 0 && "Focus on premium product upsells and loyalty rewards to maintain high engagement."}
              {activeIndex === 1 && "Target with personalized recommendations based on past purchases to increase frequency."}
              {activeIndex === 2 && "Offer limited-time promotions and entry-level products to encourage more frequent purchases."}
              {activeIndex === 3 && "Re-engage with win-back campaigns and special offers to prevent complete churn."}
              {activeIndex === 4 && "Nurture with welcome series and educational content about your product range."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
