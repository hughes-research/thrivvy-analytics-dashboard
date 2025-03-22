'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { geoSalesData } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

type MetricType = 'value' | 'growth' | 'orders';

export const GeoSalesMap = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('value');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  // Sort data by the selected metric
  const sortedData = [...geoSalesData].sort((a, b) => {
    if (selectedMetric === 'value') return b.value - a.value;
    if (selectedMetric === 'growth') return b.growth - a.growth;
    return b.orders - a.orders;
  }).slice(0, 10); // Get top 10 countries
  
  // Function to get the color based on the metric value
  const getBarColor = (value: number, metric: MetricType) => {
    if (metric === 'value') {
      // Blue gradient for sales value
      const normalized = Math.min(Math.max(value / 1500000, 0), 1);
      const intensity = 40 + (normalized * 60);
      return `rgba(59, 130, 246, ${intensity}%)`;
    } else if (metric === 'growth') {
      // Green gradient for growth
      const normalized = Math.min(Math.max(value / 25, 0), 1);
      const intensity = 40 + (normalized * 60);
      return `rgba(16, 185, 129, ${intensity}%)`;
    } else {
      // Purple gradient for orders
      const normalized = Math.min(Math.max(value / 15000, 0), 1);
      const intensity = 40 + (normalized * 60);
      return `rgba(139, 92, 246, ${intensity}%)`;
    }
  };
  
  // Function to format the metric value
  const formatMetricValue = (value: number, metric: MetricType) => {
    if (metric === 'value') return formatCurrency(value);
    if (metric === 'growth') return `${value.toFixed(1)}%`;
    return value.toLocaleString();
  };
  
  return (
    <Card className="h-full dark:bg-dark-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl text-gray-900 dark:text-dark-text">Geographic Sales Analysis</CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-dark-muted">
            Regional performance across international markets
          </CardDescription>
        </div>
        <Select
          value={selectedMetric}
          onValueChange={(value) => setSelectedMetric(value as MetricType)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="value">Sales Revenue</SelectItem>
            <SelectItem value="growth">Growth Rate</SelectItem>
            <SelectItem value="orders">Order Volume</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {/* World map visualization would go here in a production app */}
        {/* For now, we'll use a horizontal bar chart to represent geographic performance */}
        <div className="h-[400px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={sortedData}
              margin={{
                top: 5,
                right: 30,
                left: 80,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} className="dark:stroke-dark-border" />
              <XAxis 
                type="number" 
                className="dark:text-dark-muted" 
                tickFormatter={(value) => {
                  if (selectedMetric === 'value') return `$${(value/1000).toFixed(0)}k`;
                  if (selectedMetric === 'growth') return `${value}%`;
                  return value.toLocaleString();
                }}
              />
              <YAxis 
                dataKey="id" 
                type="category" 
                className="dark:text-dark-muted"
                tick={{
                  fill: '#6B7280',
                  fontSize: 14,
                }}
              />
              <Tooltip
                formatter={(value: number) => [formatMetricValue(value, selectedMetric), selectedMetric === 'value' ? 'Revenue' : selectedMetric === 'growth' ? 'Growth' : 'Orders']}
                labelFormatter={(label) => {
                  const country = geoSalesData.find(item => item.id === label);
                  return country ? `${label} (${country.id})` : label;
                }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                }}
                wrapperStyle={{
                  outline: 'none',
                }}
                itemStyle={{
                  color: '#111827',
                }}
              />
              <Bar 
                dataKey={selectedMetric} 
                radius={[0, 4, 4, 0]}
                className="cursor-pointer"
                onClick={(data) => setSelectedRegion(data.id)}
              >
                {sortedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={getBarColor(selectedMetric === 'value' ? entry.value : selectedMetric === 'growth' ? entry.growth : entry.orders, selectedMetric)}
                    stroke={entry.id === selectedRegion ? '#111827' : 'transparent'}
                    strokeWidth={2}
                  />
                ))}
                <LabelList 
                  dataKey={selectedMetric} 
                  position="right" 
                  formatter={(value: number) => formatMetricValue(value, selectedMetric)}
                  className="text-sm font-medium dark:text-dark-text"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Regional insights */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-4 border border-gray-100 dark:border-dark-border">
            <p className="text-gray-500 dark:text-dark-muted text-sm">Top Region</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-dark-text mt-1">
              USA
            </p>
            <p className="text-sm text-gray-500 dark:text-dark-muted mt-1">
              {formatCurrency(1245000)} in sales
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-4 border border-gray-100 dark:border-dark-border">
            <p className="text-gray-500 dark:text-dark-muted text-sm">Fastest Growing</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
              India
            </p>
            <p className="text-sm text-gray-500 dark:text-dark-muted mt-1">
              22.6% growth rate
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-4 border border-gray-100 dark:border-dark-border">
            <p className="text-gray-500 dark:text-dark-muted text-sm">Emerging Markets</p>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
              3
            </p>
            <p className="text-sm text-gray-500 dark:text-dark-muted mt-1">
              Brazil, Mexico, South Africa
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-4 border border-gray-100 dark:border-dark-border">
            <p className="text-gray-500 dark:text-dark-muted text-sm">Market Opportunity</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-dark-text mt-1">
              {formatCurrency(3750000)}
            </p>
            <p className="text-sm text-gray-500 dark:text-dark-muted mt-1">
              Expansion potential
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
