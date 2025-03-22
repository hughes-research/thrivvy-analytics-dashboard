'use client';

import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { TrendingUp, AlertTriangle, Award, LineChart as LineChartIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

interface PredictiveInsightsProps {
  predictedRevenue: number[];
  marketInsights: {
    metric: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
  }[];
  anomalies: {
    type: string;
    description: string;
    impactScore: number;
    date: string;
  }[];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
        <p className="text-gray-600">Day {label + 1}</p>
        <p className="font-bold text-primary-600">
          {formatCurrency(payload[0].value as number)}
        </p>
      </div>
    );
  }

  return null;
};

export const PredictiveInsights: React.FC<PredictiveInsightsProps> = ({
  predictedRevenue,
  marketInsights,
  anomalies
}) => {
  // Format data for the chart
  const chartData = predictedRevenue.map((value, index) => ({
    day: index,
    value
  }));

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-dark-text">
        <LineChartIcon className="mr-2 text-primary-500" size={22} />
        Predictive Analytics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forecast Chart */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-dark-text">7-Day Revenue Forecast</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="day" 
                  tickFormatter={(value) => `Day ${value + 1}`} 
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  tickFormatter={(value) => `$${(value/1000).toFixed(1)}k`} 
                  stroke="#6B7280"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4F46E5" 
                  strokeWidth={3}
                  activeDot={{ r: 8, fill: '#4F46E5', stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm mt-2 text-gray-500 dark:text-dark-muted italic">
            Based on historical data and current market trends
          </p>
        </div>

        {/* Market Insights */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-dark-text">Market Insights</h3>
          <div className="space-y-3">
            {marketInsights.map((insight, index) => (
              <motion.div 
                key={insight.metric}
                className="p-3 border border-gray-100 dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-dark-muted">{insight.metric}</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-dark-text">{insight.value}</p>
                  </div>
                  <div className={`flex items-center ${
                    insight.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {insight.change}
                    <TrendingUp size={16} className="ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Anomaly Detection */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-dark-text flex items-center">
          <AlertTriangle size={18} className="mr-2 text-amber-500" />
          Detected Anomalies
        </h3>
        <div className="space-y-3">
          {anomalies.map((anomaly) => (
            <motion.div 
              key={anomaly.description}
              className="p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 rounded-r-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-dark-text">{anomaly.type} Anomaly</p>
                  <p className="text-gray-600 dark:text-dark-muted">{anomaly.description}</p>
                </div>
                <div className="text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded text-sm font-medium">
                  Impact: {anomaly.impactScore.toFixed(1)}/10
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
