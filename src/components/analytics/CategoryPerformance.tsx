'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryPerformanceData } from '@/lib/mock-data';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CategoryPerformance = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const filteredData = selectedCategory === 'all' 
    ? categoryPerformanceData 
    : categoryPerformanceData.filter(item => item.category === selectedCategory);
  
  // Prepare data for radar chart
  const radarData = [
    { subject: 'Revenue', A: 0, B: 0, C: 0, D: 0, E: 0, fullMark: 100 },
    { subject: 'Profit', A: 0, B: 0, C: 0, D: 0, E: 0, fullMark: 100 },
    { subject: 'Growth', A: 0, B: 0, C: 0, D: 0, E: 0, fullMark: 100 },
    { subject: 'Satisfaction', A: 0, B: 0, C: 0, D: 0, E: 0, fullMark: 100 },
    { subject: 'Returns', A: 0, B: 0, C: 0, D: 0, E: 0, fullMark: 100 },
  ];
  
  // Map category data to radar chart format
  filteredData.forEach((category, index) => {
    const key = String.fromCharCode(65 + index); // A, B, C, D, E
    
    radarData[0][key] = category.revenue;
    radarData[1][key] = category.profit;
    radarData[2][key] = category.growth;
    radarData[3][key] = category.satisfaction;
    radarData[4][key] = category.returns;
  });
  
  // Colors for each category
  const categoryColors = {
    'Electronics': '#4F46E5', // indigo
    'Clothing': '#0EA5E9',    // sky
    'Food': '#10B981',        // emerald
    'Home': '#F59E0B',        // amber
    'Beauty': '#EC4899',      // pink
  };
  
  return (
    <Card className="h-full dark:bg-dark-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl text-gray-900 dark:text-dark-text">Category Performance</CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-dark-muted">
            Multi-dimensional analysis of product categories
          </CardDescription>
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categoryPerformanceData.map(category => (
              <SelectItem key={category.category} value={category.category}>
                {category.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid className="dark:stroke-dark-border" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#6B7280' }}
                className="dark:text-dark-muted"
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: '#6B7280' }}
                className="dark:text-dark-muted"
              />
              
              {filteredData.map((category, index) => {
                const key = String.fromCharCode(65 + index); // A, B, C, D, E
                return (
                  <Radar
                    key={category.category}
                    name={category.category}
                    dataKey={key}
                    stroke={categoryColors[category.category] || '#4F46E5'}
                    fill={categoryColors[category.category] || '#4F46E5'}
                    fillOpacity={0.2}
                  />
                );
              })}
              
              <Tooltip 
                formatter={(value: number, name: string, props: any) => [
                  `${value}%`, name
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
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredData.map(category => (
            <div 
              key={category.category}
              className="bg-gray-50 dark:bg-dark-background rounded-lg p-3 border border-gray-100 dark:border-dark-border"
              style={{ borderLeft: `4px solid ${categoryColors[category.category] || '#4F46E5'}` }}
            >
              <p className="text-sm font-medium text-gray-900 dark:text-dark-text">{category.category}</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 dark:text-dark-muted">Revenue:</span>
                  <span className="font-medium text-gray-900 dark:text-dark-text">{category.revenue}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 dark:text-dark-muted">Profit:</span>
                  <span className="font-medium text-gray-900 dark:text-dark-text">{category.profit}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 dark:text-dark-muted">Growth:</span>
                  <span className="font-medium text-gray-900 dark:text-dark-text">{category.growth}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 dark:text-dark-muted">Satisfaction:</span>
                  <span className="font-medium text-gray-900 dark:text-dark-text">{category.satisfaction}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 dark:text-dark-muted">Returns:</span>
                  <span className="font-medium text-gray-900 dark:text-dark-text">{category.returns}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Performance Insights</h3>
          <p className="text-sm text-blue-700 dark:text-blue-200">
            {selectedCategory === 'all' && "Beauty and Clothing categories show the strongest growth potential, while Electronics leads in revenue and profit metrics."}
            {selectedCategory === 'Electronics' && "Electronics shows strong revenue and profit performance, but growth is slowing. Focus on innovation to maintain market position."}
            {selectedCategory === 'Clothing' && "Clothing has exceptional growth metrics and good satisfaction scores. Opportunity to expand product lines."}
            {selectedCategory === 'Food' && "Food category has the highest customer satisfaction but lower profit margins. Consider premium offerings."}
            {selectedCategory === 'Home' && "Home products show balanced performance across metrics but could improve in growth. Consider new product development."}
            {selectedCategory === 'Beauty' && "Beauty category leads in growth with strong profit margins. Invest in marketing to capitalize on momentum."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
