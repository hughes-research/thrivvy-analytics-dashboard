import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flex, Text } from "@tremor/react";

// Sample funnel data
const funnelData = [
  {
    name: "Website Visits",
    value: 12500,
    color: "indigo",
  },
  {
    name: "Product Views",
    value: 8750,
    color: "blue",
  },
  {
    name: "Add to Cart",
    value: 4320,
    color: "cyan",
  },
  {
    name: "Checkout Started",
    value: 2800,
    color: "teal",
  },
  {
    name: "Purchases Completed",
    value: 1750,
    color: "green",
  },
];

// Calculate conversion rates
const getConversionRate = (current: number, previous: number) => {
  return ((current / previous) * 100).toFixed(1);
};

export default function SalesFunnel() {
  return (
    <Card className="dark:bg-dark-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium text-black">
          Sales Funnel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text className="mt-2 mb-6 text-black">
          Track customer journey from initial visit to purchase. Each step shows total volume and conversion rate.
        </Text>
        
        <div className="space-y-6">
          {funnelData.map((step, index) => (
            <div key={step.name} className="relative">
              {/* Bar with label */}
              <div className="flex items-center justify-between mb-2">
                <Text className="font-medium text-black">{step.name}</Text>
                <Text className="font-medium text-black">{step.value.toLocaleString()}</Text>
              </div>
              
              {/* Progress bar */}
              <div className="h-8 w-full bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                <div 
                  className={`h-full bg-${step.color}-500 flex items-center pl-3`} 
                  style={{ 
                    width: `${(step.value / funnelData[0].value) * 100}%`,
                    backgroundColor: index === 0 ? "#6366f1" : 
                                    index === 1 ? "#3b82f6" : 
                                    index === 2 ? "#06b6d4" : 
                                    index === 3 ? "#14b8a6" : 
                                    "#10b981"
                  }}
                >
                  {(step.value / funnelData[0].value) * 100 > 15 && (
                    <Text className="text-white text-xs font-medium">
                      {((step.value / funnelData[0].value) * 100).toFixed(1)}%
                    </Text>
                  )}
                </div>
              </div>
              
              {/* Conversion rate from previous step */}
              {index > 0 && (
                <div className="mt-1 flex justify-end">
                  <Text className="text-xs text-gray-500 dark:text-gray-400 text-black">
                    {getConversionRate(step.value, funnelData[index - 1].value)}% conversion from previous step
                  </Text>
                </div>
              )}
              
              {/* Connector line */}
              {index < funnelData.length - 1 && (
                <div className="absolute left-1/2 -ml-0.5 w-0.5 h-4 bg-gray-200 dark:bg-gray-700 mt-1"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Flex>
            <div>
              <Text className="text-black">Overall Conversion Rate</Text>
              <Text className="text-2xl font-bold text-black">
                {((funnelData[funnelData.length - 1].value / funnelData[0].value) * 100).toFixed(1)}%
              </Text>
            </div>
            <div className="text-right">
              <Text className="text-black">Opportunity Size</Text>
              <Text className="text-2xl font-bold text-black">
                {(funnelData[0].value - funnelData[funnelData.length - 1].value).toLocaleString()}
              </Text>
            </div>
          </Flex>
        </div>
      </CardContent>
    </Card>
  );
}
