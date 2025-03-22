import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text, AreaChart, BarList, Flex, Grid, Col, Title, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { CreditCard, TrendingUp, Users, Calendar } from "lucide-react";

// Sample customer lifetime value data
const lifetimeValueData = [
  {
    date: "Jan 2024",
    "Average LTV": 580,
    "High Value": 1250,
    "New Customers": 320,
  },
  {
    date: "Feb 2024",
    "Average LTV": 610,
    "High Value": 1320,
    "New Customers": 350,
  },
  {
    date: "Mar 2024",
    "Average LTV": 640,
    "High Value": 1380,
    "New Customers": 380,
  },
  {
    date: "Apr 2024",
    "Average LTV": 670,
    "High Value": 1450,
    "New Customers": 410,
  },
  {
    date: "May 2024",
    "Average LTV": 720,
    "High Value": 1520,
    "New Customers": 430,
  },
  {
    date: "Jun 2024",
    "Average LTV": 750,
    "High Value": 1590,
    "New Customers": 460,
  },
  {
    date: "Jul 2024",
    "Average LTV": 790,
    "High Value": 1650,
    "New Customers": 490,
  },
  {
    date: "Aug 2024",
    "Average LTV": 830,
    "High Value": 1720,
    "New Customers": 510,
  },
  {
    date: "Sep 2024",
    "Average LTV": 870,
    "High Value": 1790,
    "New Customers": 540,
  },
  {
    date: "Oct 2024",
    "Average LTV": 920,
    "High Value": 1860,
    "New Customers": 570,
  },
  {
    date: "Nov 2024",
    "Average LTV": 970,
    "High Value": 1930,
    "New Customers": 590,
  },
  {
    date: "Dec 2024",
    "Average LTV": 1020,
    "High Value": 2100,
    "New Customers": 620,
  },
  // Projected future values
  {
    date: "Jan 2025",
    "Average LTV": 1070,
    "High Value": 2180,
    "New Customers": 650,
    "isProjected": true
  },
  {
    date: "Feb 2025",
    "Average LTV": 1120,
    "High Value": 2260,
    "New Customers": 680,
    "isProjected": true
  },
  {
    date: "Mar 2025",
    "Average LTV": 1170,
    "High Value": 2340,
    "New Customers": 710,
    "isProjected": true
  },
];

// Top spending categories by customer segment
const topSpendingCategories = [
  {
    segment: "High Value",
    categories: [
      { name: "Electronics", value: 42 },
      { name: "Home & Kitchen", value: 28 },
      { name: "Fashion", value: 18 },
      { name: "Sports & Outdoors", value: 12 },
    ]
  },
  {
    segment: "Regular Shoppers",
    categories: [
      { name: "Home & Kitchen", value: 35 },
      { name: "Grocery", value: 25 },
      { name: "Fashion", value: 22 },
      { name: "Beauty", value: 18 },
    ]
  },
  {
    segment: "New Customers",
    categories: [
      { name: "Fashion", value: 38 },
      { name: "Electronics", value: 24 },
      { name: "Beauty", value: 21 },
      { name: "Books", value: 17 },
    ]
  },
  {
    segment: "At-Risk",
    categories: [
      { name: "Grocery", value: 45 },
      { name: "Home & Kitchen", value: 22 },
      { name: "Pet Supplies", value: 18 },
      { name: "Health", value: 15 },
    ]
  },
];

// Customer retention metrics
const retentionMetrics = [
  { metric: "1-Month Retention", value: "78%" },
  { metric: "3-Month Retention", value: "65%" },
  { metric: "6-Month Retention", value: "52%" },
  { metric: "12-Month Retention", value: "38%" },
];

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function CustomerLifetimeValue() {
  const [selectedSegment, setSelectedSegment] = useState("High Value");

  // Get categories for selected segment
  const selectedCategories = topSpendingCategories.find(
    segment => segment.segment === selectedSegment
  )?.categories || [];

  // Calculate key metrics
  const currentAvgLTV = lifetimeValueData[11]["Average LTV"]; // Dec 2024
  const projectedAvgLTV = lifetimeValueData[14]["Average LTV"]; // Mar 2025
  const growthRate = ((projectedAvgLTV - currentAvgLTV) / currentAvgLTV * 100).toFixed(1);
  
  return (
    <Card className="dark:bg-dark-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium text-black">
          Customer Lifetime Value
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text className="mt-2 mb-4 text-black">
          Track customer value over time with projected growth and segment analysis
        </Text>
        
        <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4 mb-6">
          <Card className="dark:bg-dark-card">
            <CardContent className="p-4">
              <Flex>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <Text className="text-sm text-gray-500">Current Avg. LTV</Text>
                  <Title className="text-xl">{formatCurrency(currentAvgLTV)}</Title>
                </div>
              </Flex>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-dark-card">
            <CardContent className="p-4">
              <Flex>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <Text className="text-sm text-gray-500">Projected Growth</Text>
                  <Title className="text-xl">+{growthRate}%</Title>
                </div>
              </Flex>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-dark-card">
            <CardContent className="p-4">
              <Flex>
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <Text className="text-sm text-gray-500">High Value Customers</Text>
                  <Title className="text-xl">1,250</Title>
                </div>
              </Flex>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-dark-card">
            <CardContent className="p-4">
              <Flex>
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <Text className="text-sm text-gray-500">Avg. Customer Age</Text>
                  <Title className="text-xl">18 months</Title>
                </div>
              </Flex>
            </CardContent>
          </Card>
        </Grid>
        
        <TabGroup>
          <TabList className="mb-4">
            <Tab>LTV Trends</Tab>
            <Tab>Spending Categories</Tab>
            <Tab>Retention</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <div className="h-80">
                <AreaChart
                  data={lifetimeValueData}
                  index="date"
                  categories={["Average LTV", "High Value", "New Customers"]}
                  colors={["blue", "emerald", "violet"]}
                  valueFormatter={formatCurrency}
                  showLegend={true}
                  showAnimation={true}
                  showGridLines={false}
                  curveType="monotone"
                  connectNulls={true}
                  customTooltip={(props) => {
                    const { payload, active } = props;
                    if (!active || !payload) return null;
                    
                    const isProjected = payload[0]?.payload?.isProjected;
                    
                    return (
                      <div className="p-2 border border-gray-200 rounded-md bg-white shadow-md">
                        <div className="text-sm font-medium text-gray-900">
                          {payload[0]?.payload?.date}
                          {isProjected && <span className="ml-2 text-xs text-blue-500">(Projected)</span>}
                        </div>
                        {payload.map((item: any, index: number) => (
                          <div key={index} className="flex items-center mt-1">
                            <div 
                              className="w-3 h-3 rounded-full mr-1" 
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-xs text-gray-600">{item.name}: </span>
                            <span className="text-xs font-medium ml-1">
                              {formatCurrency(item.value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-500 italic">
                * Values after Dec 2024 are projections based on current growth trends
              </div>
            </TabPanel>
            
            <TabPanel>
              <div className="mb-4">
                <Text className="text-sm text-gray-500 mb-2">Select Customer Segment</Text>
                <div className="flex flex-wrap gap-2">
                  {topSpendingCategories.map((segment) => (
                    <button
                      key={segment.segment}
                      className={`px-3 py-1 text-sm rounded-full ${
                        selectedSegment === segment.segment
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      onClick={() => setSelectedSegment(segment.segment)}
                    >
                      {segment.segment}
                    </button>
                  ))}
                </div>
              </div>
              
              <Title className="text-base mb-2">Top Spending Categories: {selectedSegment}</Title>
              <BarList
                data={selectedCategories}
                valueFormatter={(value) => `${value}%`}
                color="blue"
                showAnimation={true}
              />
            </TabPanel>
            
            <TabPanel>
              <Title className="text-base mb-4">Customer Retention Metrics</Title>
              <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4">
                {retentionMetrics.map((item) => (
                  <Card key={item.metric} className="dark:bg-dark-card">
                    <CardContent className="p-4">
                      <Text className="text-sm text-gray-500">{item.metric}</Text>
                      <Title className="text-2xl mt-2">{item.value}</Title>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ 
                            width: item.value.replace('%', '') + '%',
                            background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)'
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
              
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <Flex>
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="ml-3">
                    <Text className="text-sm font-medium text-amber-800">Retention Opportunity</Text>
                    <Text className="text-sm text-amber-700 mt-1">
                      Increasing 6-month retention by just 5% could add an estimated $245,000 in annual revenue.
                      Focus on re-engagement campaigns for customers in months 4-6.
                    </Text>
                  </div>
                </Flex>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </CardContent>
    </Card>
  );
}
