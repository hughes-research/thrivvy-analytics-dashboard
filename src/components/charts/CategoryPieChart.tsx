'use client';

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface DataItem {
  name: string;
  value: number;
  color: string;
}

// Brighter, more distinct colors with higher contrast
const COLORS = ['#4338CA', '#047857', '#EA580C', '#7C3AED', '#DB2777', '#2563EB', '#334155', '#D97706'];

interface CategoryPieChartProps {
  title: string;
  data: DataItem[];
}

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ title, data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-md border border-gray-200">
          <p className="font-medium text-gray-900 text-base">{payload[0].name}</p>
          <p className="text-gray-700 text-base font-medium">{`Value: ${payload[0].value}`}</p>
          <p className="text-gray-700 text-base">{`Percentage: ${((payload[0].value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  const renderLegendText = (value: string, entry: any) => {
    const { color } = entry;
    return <span className="text-base font-medium" style={{ color: '#000' }}>{value}</span>;
  };

  return (
    <Card variant="bordered" className="h-full">
      <CardHeader>
        <CardTitle className="text-xl text-black">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                stroke="#fff"
                strokeWidth={3}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color || COLORS[index % COLORS.length]} 
                    // Animate the active slice
                    {...(activeIndex === index && { 
                      outerRadius: 90,
                      className: "filter drop-shadow-xl", 
                    })}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right" 
                iconType="circle"
                iconSize={10}
                formatter={renderLegendText}
                wrapperStyle={{ paddingLeft: '15px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend below for small screens */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:hidden">
          {data.map((item, index) => (
            <motion.div 
              key={`legend-${index}`}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: item.color || COLORS[index % COLORS.length] }} 
              />
              <div className="text-base font-medium text-black truncate">{item.name}</div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
