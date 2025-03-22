'use client';

import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: string | number;
  id?: string;
  showTooltip?: boolean;
  className?: string;
  strokeWidth?: number;
  fillOpacity?: number;
  gradientColor?: string;
  isIncreasing?: boolean;
}

export const SparklineChart: React.FC<SparklineProps> = ({
  data,
  color = '#4338CA',
  height = 50,
  width = '100%',
  id = 'sparkline',
  strokeWidth = 2,
  fillOpacity = 0.2,
  gradientColor,
  isIncreasing,
  className = '',
}) => {
  // Format data for Recharts
  const chartData = data.map((value, index) => ({ value, index }));

  // Determine color based on trend if isIncreasing is provided
  const lineColor = isIncreasing !== undefined 
    ? isIncreasing ? '#047857' : '#BE123C'  // Green for increasing, red for decreasing
    : color;

  // Generate a unique ID for the gradient
  const gradientId = `${id}-gradient`;

  return (
    <div className={`sparkline-container ${className} text-black`} style={{ height, width }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 3, right: 2, bottom: 3, left: 2 }}>
          {gradientColor && (
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={lineColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
              </linearGradient>
            </defs>
          )}
          <YAxis hide domain={['dataMin', 'dataMax']} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={lineColor} 
            strokeWidth={strokeWidth} 
            dot={false} 
            activeDot={false}
            isAnimationActive={true}
            fill={gradientColor ? `url(#${gradientId})` : 'none'} 
            fillOpacity={fillOpacity}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
