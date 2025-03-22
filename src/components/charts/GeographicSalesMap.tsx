import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, DonutChart, Flex, Text, Title, Grid, Col } from "@tremor/react";

// Sample geographic sales data
const geographicData = [
  {
    region: "North America",
    sales: 1245000,
    orders: 12450,
    growth: 12.3,
    marketShare: 45
  },
  {
    region: "Europe",
    sales: 856000,
    orders: 8560,
    growth: 7.8,
    marketShare: 31
  },
  {
    region: "Asia Pacific",
    sales: 498000,
    orders: 4980,
    growth: 15.2,
    marketShare: 18
  },
  {
    region: "Latin America",
    sales: 132000,
    orders: 1320,
    growth: 9.5,
    marketShare: 5
  },
  {
    region: "Middle East & Africa",
    sales: 78000,
    orders: 780,
    growth: 18.7,
    marketShare: 3
  }
];

// Color mapping for regions
const getRegionColorClass = (index: number) => {
  const colors = ["bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-indigo-500", "bg-rose-500"];
  return colors[index % colors.length];
};

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function GeographicSalesMap() {
  return (
    <Card className="dark:bg-dark-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium text-black">
          Geographic Sales Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text className="mt-2 mb-6 text-black">
          Analyze sales performance across different regions with detailed metrics and market share.
        </Text>
        
        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
          <Col numColSpan={1} numColSpanLg={2}>
            <div className="h-80">
              <BarChart
                data={geographicData}
                index="region"
                categories={["sales"]}
                colors={["emerald"]}
                valueFormatter={formatCurrency}
                showLegend={false}
                showAnimation={true}
                yAxisWidth={80}
                className="mt-4"
              />
            </div>
          </Col>
          <Col>
            <Title className="text-center mb-4 text-black">Market Share</Title>
            <DonutChart
              data={geographicData}
              category="marketShare"
              index="region"
              valueFormatter={(value) => `${value}%`}
              colors={["emerald", "violet", "amber", "indigo", "rose"]}
              showAnimation={true}
              className="h-60"
            />
          </Col>
        </Grid>
        
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-medium text-black">Region</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-black">Sales</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-black">Orders</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-black">Growth</th>
              </tr>
            </thead>
            <tbody>
              {geographicData.map((region, index) => (
                <tr key={region.region} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm font-medium text-black">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${getRegionColorClass(index)}`}></div>
                      {region.region}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-black">{formatCurrency(region.sales)}</td>
                  <td className="px-4 py-3 text-sm text-right text-black">{region.orders.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      region.growth > 15 
                        ? 'bg-emerald-100 text-black' 
                        : region.growth > 10 
                          ? 'bg-amber-100 text-black' 
                          : 'bg-blue-100 text-black'
                    }`}>
                      +{region.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
