import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flex, Text, Select, SelectItem } from "@tremor/react";

// Generate cohort data
const generateCohortData = () => {
  // Months for cohorts
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  
  // Generate retention data for each cohort
  return months.map((month, i) => {
    // Base size for the cohort (number of customers)
    const baseSize = Math.floor(Math.random() * 500) + 500;
    
    // Generate retention percentages for subsequent months
    // First month is always 100%
    const retentionData = [100];
    
    // Generate retention for subsequent months (declining over time)
    for (let j = 1; j < 6; j++) {
      // If we don't have data for this month yet (future months for recent cohorts)
      if (i + j >= months.length) {
        retentionData.push(null);
        continue;
      }
      
      // Calculate retention with some randomness, but generally declining
      const retention = Math.max(
        20, // Minimum retention
        Math.floor(retentionData[j - 1] * (0.7 + Math.random() * 0.2))
      );
      retentionData.push(retention);
    }
    
    return {
      month,
      size: baseSize,
      retention: retentionData
    };
  });
};

const cohortData = generateCohortData();

// Color scale for the heatmap
const getColorForValue = (value: number | null) => {
  if (value === null) return "bg-gray-100 dark:bg-gray-800 text-black";
  
  if (value >= 90) return "bg-emerald-600 text-black";
  if (value >= 80) return "bg-emerald-500 text-black";
  if (value >= 70) return "bg-emerald-400 text-black";
  if (value >= 60) return "bg-emerald-300 text-black";
  if (value >= 50) return "bg-emerald-200 text-black";
  if (value >= 40) return "bg-yellow-300 text-black";
  if (value >= 30) return "bg-yellow-400 text-black";
  if (value >= 20) return "bg-orange-400 text-black";
  return "bg-red-500 text-black";
};

export default function CustomerCohortAnalysis() {
  const [selectedView, setSelectedView] = useState("percentage");
  
  return (
    <Card className="dark:bg-dark-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium text-black">
          Customer Cohort Analysis
        </CardTitle>
        <div className="w-40">
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 text-black"
          >
            <option value="percentage">Percentage</option>
            <option value="absolute">Absolute</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <Text className="mt-2 mb-6 text-black">
          Track customer retention over time. Each row represents a cohort of customers who started in a given month.
        </Text>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-black">Cohort</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-black">Size</th>
                {[0, 1, 2, 3, 4, 5].map((month) => (
                  <th key={month} className="px-4 py-2 text-left text-sm font-medium text-black">
                    Month {month}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohortData.map((cohort, index) => (
                <tr key={cohort.month} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm font-medium text-black">{cohort.month}</td>
                  <td className="px-4 py-3 text-sm text-black">{cohort.size}</td>
                  {cohort.retention.map((value, monthIndex) => (
                    <td key={monthIndex} className="px-4 py-3">
                      {value !== null && (
                        <div className={`text-center py-2 px-3 rounded-md ${getColorForValue(value)}`}>
                          {selectedView === "percentage" 
                            ? `${value}%` 
                            : Math.round(cohort.size * value / 100)}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
