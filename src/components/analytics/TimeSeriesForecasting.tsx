'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { forecastingData } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TimeSeriesForecasting = () => {
  const [forecastPeriod, setForecastPeriod] = useState<'7days' | '14days' | '30days'>('14days');
  
  // Combine historical and forecast data
  const combinedData = [
    ...forecastingData.historical,
    ...forecastingData.forecast.slice(0, forecastPeriod === '7days' ? 7 : forecastPeriod === '14days' ? 14 : 30)
  ];
  
  // Find the index where forecast starts
  const forecastStartIndex = forecastingData.historical.length;
  
  // Calculate average values for historical and forecast
  const historicalAvg = Math.round(
    forecastingData.historical.reduce((sum, item) => sum + item.value, 0) / forecastingData.historical.length
  );
  
  const forecastAvg = Math.round(
    forecastingData.forecast.slice(0, forecastPeriod === '7days' ? 7 : forecastPeriod === '14days' ? 14 : 30)
      .reduce((sum, item) => sum + item.value, 0) / 
      (forecastPeriod === '7days' ? 7 : forecastPeriod === '14days' ? 14 : 30)
  );
  
  const forecastGrowth = ((forecastAvg - historicalAvg) / historicalAvg) * 100;
  
  // Calculate confidence interval width
  const lastForecastItem = combinedData[combinedData.length - 1];
  const confidenceRange = lastForecastItem.upperBound - lastForecastItem.lowerBound;
  const confidencePercentage = (confidenceRange / lastForecastItem.value) * 100;
  
  return (
    <Card className="h-full dark:bg-dark-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl text-gray-900 dark:text-dark-text">Revenue Forecast</CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-dark-muted">
            ML-powered time series prediction with confidence intervals
          </CardDescription>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => setForecastPeriod('7days')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              forecastPeriod === '7days'
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                : 'bg-gray-100 dark:bg-dark-background text-gray-600 dark:text-dark-muted hover:bg-gray-200 dark:hover:bg-dark-border'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setForecastPeriod('14days')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              forecastPeriod === '14days'
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                : 'bg-gray-100 dark:bg-dark-background text-gray-600 dark:text-dark-muted hover:bg-gray-200 dark:hover:bg-dark-border'
            }`}
          >
            14 Days
          </button>
          <button
            onClick={() => setForecastPeriod('30days')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
              forecastPeriod === '30days'
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                : 'bg-gray-100 dark:bg-dark-background text-gray-600 dark:text-dark-muted hover:bg-gray-200 dark:hover:bg-dark-border'
            }`}
          >
            30 Days
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="chart">Forecast Chart</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart" className="mt-0">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={combinedData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="dark:stroke-dark-border" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                    className="dark:text-dark-muted"
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                    className="dark:text-dark-muted"
                  />
                  <Tooltip 
                    formatter={(value: any) => [formatCurrency(value), 'Revenue']}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      });
                    }}
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
                  
                  {/* Historical data line */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Historical Revenue"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 8 }}
                    connectNulls
                  />
                  
                  {/* Forecast data line */}
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Forecasted Revenue"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={{ r: 8 }}
                    connectNulls
                  />
                  
                  {/* Confidence interval area */}
                  <Area
                    type="monotone"
                    dataKey="upperBound"
                    stroke="transparent"
                    fill="#10B981"
                    fillOpacity={0.1}
                    name="Upper Bound"
                  />
                  <Area
                    type="monotone"
                    dataKey="lowerBound"
                    stroke="transparent"
                    fill="#10B981"
                    fillOpacity={0.1}
                    name="Lower Bound"
                  />
                  
                  {/* Reference line for where forecast begins */}
                  <ReferenceLine
                    x={combinedData[forecastStartIndex - 1]?.date}
                    stroke="#F59E0B"
                    strokeDasharray="3 3"
                    label={{
                      value: 'Forecast Start',
                      position: 'insideTopRight',
                      fill: '#F59E0B',
                      fontSize: 12,
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-4 border border-gray-100 dark:border-dark-border">
                <p className="text-gray-500 dark:text-dark-muted text-sm">Forecasted Avg. Daily Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text mt-1">
                  {formatCurrency(forecastAvg)}
                </p>
                <div className={`flex items-center mt-1 ${forecastGrowth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  <span className="text-sm font-medium">
                    {forecastGrowth >= 0 ? '+' : ''}{forecastGrowth.toFixed(1)}%
                  </span>
                  <span className="text-xs ml-1">vs. historical</span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-4 border border-gray-100 dark:border-dark-border">
                <p className="text-gray-500 dark:text-dark-muted text-sm">Confidence Interval</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text mt-1">
                  ±{confidencePercentage.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500 dark:text-dark-muted mt-1">
                  Widens with forecast distance
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-4 border border-gray-100 dark:border-dark-border">
                <p className="text-gray-500 dark:text-dark-muted text-sm">Model Accuracy</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-dark-text mt-1">
                  92.4%
                </p>
                <p className="text-xs text-gray-500 dark:text-dark-muted mt-1">
                  Based on historical backtesting
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis" className="mt-0">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-4 border border-gray-100 dark:border-dark-border">
                <h3 className="text-md font-medium text-gray-900 dark:text-dark-text mb-2">Forecast Methodology</h3>
                <p className="text-sm text-gray-600 dark:text-dark-muted">
                  This forecast uses an ensemble of ARIMA, Prophet, and LSTM neural network models to predict future revenue 
                  based on historical patterns. The model accounts for:
                </p>
                <ul className="mt-2 text-sm text-gray-600 dark:text-dark-muted list-disc list-inside space-y-1">
                  <li>Seasonal patterns (weekly, monthly)</li>
                  <li>Long-term growth trends</li>
                  <li>Special events and holidays</li>
                  <li>Recent momentum shifts</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-dark-background rounded-lg p-4 border border-gray-100 dark:border-dark-border">
                <h3 className="text-md font-medium text-gray-900 dark:text-dark-text mb-2">Key Insights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm mr-2 mt-0.5">↗</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-dark-text">Positive Growth Trend</p>
                      <p className="text-xs text-gray-600 dark:text-dark-muted">Revenue is projected to grow by {forecastGrowth.toFixed(1)}% over the forecast period.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm mr-2 mt-0.5">↔</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-dark-text">Weekly Seasonality</p>
                      <p className="text-xs text-gray-600 dark:text-dark-muted">Strong weekend performance with mid-week dips is expected to continue.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-sm mr-2 mt-0.5">!</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-dark-text">Upcoming Volatility</p>
                      <p className="text-xs text-gray-600 dark:text-dark-muted">Increased uncertainty in the latter part of the forecast period suggests potential market shifts.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-900/30">
                <h3 className="text-md font-medium text-blue-800 dark:text-blue-300 mb-2">AI Recommendations</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-blue-700 dark:text-blue-200">
                    <span className="font-medium">Inventory Planning:</span> Increase stock levels by 15% for top-selling products to meet projected demand growth.
                  </li>
                  <li className="text-sm text-blue-700 dark:text-blue-200">
                    <span className="font-medium">Marketing Budget:</span> Allocate additional marketing resources to capitalize on the projected upward trend.
                  </li>
                  <li className="text-sm text-blue-700 dark:text-blue-200">
                    <span className="font-medium">Risk Mitigation:</span> Develop contingency plans for the latter weeks where confidence intervals widen.
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
