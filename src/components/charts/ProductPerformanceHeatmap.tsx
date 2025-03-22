import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid, Col, Flex, Text, Title, Metric, Legend, BarChart, Color } from "@tremor/react";

// Sample correlation data
const correlationData = [
  {
    metric: "Price",
    "Sales Volume": -0.75,
    "Profit Margin": 0.85,
    "Customer Rating": 0.25,
    "Return Rate": 0.45,
    "Reorder Rate": -0.35,
  },
  {
    metric: "Sales Volume",
    "Price": -0.75,
    "Profit Margin": -0.15,
    "Customer Rating": 0.65,
    "Return Rate": -0.55,
    "Reorder Rate": 0.75,
  },
  {
    metric: "Profit Margin",
    "Price": 0.85,
    "Sales Volume": -0.15,
    "Customer Rating": 0.35,
    "Return Rate": -0.25,
    "Reorder Rate": 0.05,
  },
  {
    metric: "Customer Rating",
    "Price": 0.25,
    "Sales Volume": 0.65,
    "Profit Margin": 0.35,
    "Return Rate": -0.85,
    "Reorder Rate": 0.55,
  },
  {
    metric: "Return Rate",
    "Price": 0.45,
    "Sales Volume": -0.55,
    "Profit Margin": -0.25,
    "Customer Rating": -0.85,
    "Reorder Rate": -0.65,
  },
  {
    metric: "Reorder Rate",
    "Price": -0.35,
    "Sales Volume": 0.75,
    "Profit Margin": 0.05,
    "Customer Rating": 0.55,
    "Return Rate": -0.65,
  },
];

// Custom color function for the correlation values
const getColorForValue = (value: number) => {
  if (value >= 0.7) return "emerald";
  if (value >= 0.3) return "emerald";
  if (value >= 0) return "gray";
  if (value >= -0.3) return "amber";
  if (value >= -0.7) return "amber";
  return "red";
};

export default function ProductPerformanceHeatmap() {
  return (
    <Card className="dark:bg-dark-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium text-black">
          Product Metric Correlations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text className="mt-2 mb-6 text-black">
          Discover how different product metrics influence each other. Stronger colors indicate stronger correlations.
        </Text>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400 text-black">Metric</th>
                {correlationData[0] && Object.keys(correlationData[0]).filter(key => key !== "metric").map((header) => (
                  <th key={header} className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400 text-black">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {correlationData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm font-medium text-black">{row.metric}</td>
                  {Object.entries(row)
                    .filter(([key]) => key !== "metric")
                    .map(([key, value], cellIndex) => {
                      const colorClass = 
                        value >= 0.7 ? "bg-emerald-600 text-black" :
                        value >= 0.3 ? "bg-emerald-400 text-black" :
                        value >= 0 ? "bg-gray-200 text-black" :
                        value >= -0.3 ? "bg-amber-300 text-black" :
                        value >= -0.7 ? "bg-amber-500 text-black" :
                        "bg-red-500 text-black";
                      
                      return (
                        <td key={cellIndex} className="px-4 py-3">
                          <div className={`text-center py-2 px-3 rounded-md ${colorClass}`}>
                            {value.toFixed(2)}
                          </div>
                        </td>
                      );
                    })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
