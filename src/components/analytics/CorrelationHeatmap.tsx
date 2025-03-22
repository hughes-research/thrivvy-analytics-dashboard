'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { correlationData } from '@/lib/mock-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ColorScale = 'diverging' | 'sequential';

export const CorrelationHeatmap = () => {
  const [colorScale, setColorScale] = useState<ColorScale>('diverging');
  
  // Get unique dimensions for X and Y axes
  const dimensions = Array.from(new Set(correlationData.map(d => d.x)));

  // Function to determine cell color based on correlation value
  const getCellColor = (value: number) => {
    if (colorScale === 'diverging') {
      // Diverging color scale (negative correlations are red, positive are blue)
      if (value < 0) {
        // Red scale for negative correlations
        const intensity = Math.min(Math.abs(value), 1) * 100;
        return `rgba(239, 68, 68, ${intensity}%)`;
      } else {
        // Blue scale for positive correlations
        const intensity = Math.min(value, 1) * 100;
        return `rgba(59, 130, 246, ${intensity}%)`;
      }
    } else {
      // Sequential color scale (all values are blue with varying intensity)
      const intensity = Math.min(Math.abs(value), 1) * 100;
      return `rgba(59, 130, 246, ${intensity}%)`;
    }
  };

  // Function to get text color that contrasts with cell background
  const getTextColor = (value: number) => {
    const absValue = Math.abs(value);
    // Use white text for darker cells (stronger correlations)
    return absValue > 0.6 ? 'text-white' : 'text-gray-900 dark:text-dark-text';
  };

  // Function to format correlation value
  const formatCorrelation = (value: number) => {
    return value.toFixed(2);
  };

  // Function to get cell explanation text
  const getCorrelationDescription = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue >= 0.7) return 'Strong';
    if (absValue >= 0.5) return 'Moderate';
    if (absValue >= 0.3) return 'Weak';
    return 'Very weak';
  };

  return (
    <Card className="h-full dark:bg-dark-background">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl text-gray-900 dark:text-dark-text">Product Metric Correlations</CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-dark-muted">
            Relationship strength between different product metrics
          </CardDescription>
        </div>
        <Select
          value={colorScale}
          onValueChange={(value) => setColorScale(value as ColorScale)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Color scale" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="diverging">Diverging (Red-Blue)</SelectItem>
            <SelectItem value="sequential">Sequential (Blue)</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-max">
            {/* Column headers */}
            <div className="flex">
              <div className="w-32 p-2"></div> {/* Empty corner cell */}
              {dimensions.map((dimension) => (
                <div 
                  key={`col-${dimension}`} 
                  className="w-24 p-2 font-medium text-gray-700 dark:text-dark-text text-center"
                >
                  {dimension}
                </div>
              ))}
            </div>
            
            {/* Rows */}
            {dimensions.map((rowDimension) => (
              <div key={`row-${rowDimension}`} className="flex">
                <div className="w-32 p-2 font-medium text-gray-700 dark:text-dark-text flex items-center">
                  {rowDimension}
                </div>
                {dimensions.map((colDimension) => {
                  // Find correlation value between rowDimension and colDimension
                  const correlationItem = correlationData.find(
                    item => item.x === rowDimension && item.y === colDimension
                  );
                  
                  const value = correlationItem ? correlationItem.value : 0;
                  const cellColor = getCellColor(value);
                  const textColor = getTextColor(value);
                  const correlationStrength = getCorrelationDescription(value);
                  
                  return (
                    <div 
                      key={`${rowDimension}-${colDimension}`} 
                      className={`w-24 h-24 flex flex-col items-center justify-center text-sm font-medium rounded-md m-1 ${textColor} transition-all duration-300 group relative`}
                      style={{ backgroundColor: cellColor }}
                    >
                      <span className="text-lg font-bold">{formatCorrelation(value)}</span>
                      <span className="text-xs">{correlationStrength}</span>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-dark-card dark:border-dark-border border border-gray-200 p-3 rounded-lg shadow-lg text-sm text-gray-700 dark:text-dark-text w-48 z-10 transition-opacity">
                        <p className="font-bold mb-1">{rowDimension} × {colDimension}</p>
                        <p className="mb-1">Correlation: {formatCorrelation(value)}</p>
                        <p className="mb-1">Strength: {correlationStrength}</p>
                        <p className="text-xs text-gray-500 dark:text-dark-muted mt-1">
                          {value > 0 
                            ? 'These metrics tend to increase together' 
                            : value < 0
                              ? 'As one metric increases, the other tends to decrease'
                              : 'No relationship between these metrics'}
                        </p>
                        <div className="absolute w-3 h-3 bg-white dark:bg-dark-card transform rotate-45 left-1/2 -ml-1.5 -bottom-1.5 border-b border-r border-gray-200 dark:border-dark-border"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-dark-border">
          <div className="text-sm text-gray-600 dark:text-dark-muted">
            <p className="mb-2"><span className="font-medium">Interpretation:</span> Correlation values range from -1 to 1</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: 'rgba(239, 68, 68, 80%)' }}></div>
                <span>Strong negative (-1)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: 'rgba(209, 213, 219, 40%)' }}></div>
                <span>No correlation (0)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: 'rgba(59, 130, 246, 80%)' }}></div>
                <span>Strong positive (+1)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
