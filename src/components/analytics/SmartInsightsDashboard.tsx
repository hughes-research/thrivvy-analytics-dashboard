'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AreaChart, BarChart, DonutChart } from "@tremor/react";
import { Brain, TrendingUp, Zap, ArrowUpRight, BarChart3, PieChart, Target, Users, Calendar, Filter, Download, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for the dashboard
const anomalyData = [
  { date: "2024-01", value: 2100, expected: 2000, anomaly: false },
  { date: "2024-02", value: 2200, expected: 2100, anomaly: false },
  { date: "2024-03", value: 2300, expected: 2200, anomaly: false },
  { date: "2024-04", value: 2800, expected: 2300, anomaly: true },
  { date: "2024-05", value: 2400, expected: 2400, anomaly: false },
  { date: "2024-06", value: 2500, expected: 2500, anomaly: false },
  { date: "2024-07", value: 2000, expected: 2600, anomaly: true },
  { date: "2024-08", value: 2700, expected: 2700, anomaly: false },
  { date: "2024-09", value: 2800, expected: 2800, anomaly: false },
  { date: "2024-10", value: 3200, expected: 2900, anomaly: true },
  { date: "2024-11", value: 3000, expected: 3000, anomaly: false },
  { date: "2024-12", value: 3100, expected: 3100, anomaly: false },
];

const opportunityData = [
  { name: "Cross-sell Premium Subscription", value: 32500, potential: "High", effort: "Low", category: "Subscription" },
  { name: "Reactivate Dormant Customers", value: 28400, potential: "Medium", effort: "Medium", category: "Retention" },
  { name: "Optimize Mobile Checkout", value: 21200, potential: "High", effort: "Medium", category: "Conversion" },
  { name: "Launch Loyalty Program", value: 18900, potential: "High", effort: "High", category: "Loyalty" },
  { name: "Personalized Email Campaign", value: 15600, potential: "Medium", effort: "Low", category: "Marketing" },
];

const forecastData = [
  { date: "Jan 2025", revenue: 320000, forecast: 320000, lower: 320000, upper: 320000 },
  { date: "Feb 2025", revenue: 340000, forecast: 340000, lower: 340000, upper: 340000 },
  { date: "Mar 2025", revenue: 360000, forecast: 360000, lower: 340000, upper: 380000 },
  { date: "Apr 2025", revenue: null, forecast: 385000, lower: 355000, upper: 415000 },
  { date: "May 2025", revenue: null, forecast: 410000, lower: 370000, upper: 450000 },
  { date: "Jun 2025", revenue: null, forecast: 435000, lower: 385000, upper: 485000 },
];

const segmentOpportunities = [
  { segment: "High Value", opportunity: "Premium features", impact: 85, value: 42500 },
  { segment: "Regular Shoppers", opportunity: "Subscription discount", impact: 72, value: 31200 },
  { segment: "Occasional Buyers", opportunity: "Engagement campaign", impact: 65, value: 24800 },
  { segment: "At-Risk", opportunity: "Retention offers", impact: 58, value: 18900 },
  { segment: "New Customers", opportunity: "Onboarding flow", impact: 78, value: 27300 },
];

const insightMessages = [
  "Revenue anomaly detected in October 2024 (+10.3% above forecast)",
  "High-value customer segment grew by 14.7% in the last quarter",
  "Mobile conversion rate dropped 5.2% after the latest app update",
  "Cross-sell opportunity identified for 32% of regular shoppers",
  "Seasonal pattern detected in new customer acquisition",
  "Product category 'Smart Home' shows 23% higher retention rate",
  "Geographic expansion opportunity identified in Pacific Northwest",
  "Price sensitivity increased in the 'Occasional Buyers' segment"
];

export default function SmartInsightsDashboard() {
  const [activeInsight, setActiveInsight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("anomalies");
  const [filterValue, setFilterValue] = useState("all");
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Rotate through insights
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInsight((prev) => (prev + 1) % insightMessages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Filter opportunities based on selected filter
  const filteredOpportunities = filterValue === "all" 
    ? opportunityData 
    : opportunityData.filter(item => item.category === filterValue);
  
  return (
    <Card className="dark:bg-dark-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <CardTitle>AI-Powered Insights Dashboard</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>
        <CardDescription>
          Automatically generated insights and predictions based on your data
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-0">
        {isLoading ? (
          <div className="h-[500px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-16 w-16">
                <motion.div
                  className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <Brain className="absolute inset-0 m-auto h-8 w-8 text-indigo-600" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Analyzing your data and generating insights...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Insight Ticker */}
            <motion.div 
              className="mb-6 p-3 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <div className="relative h-6 overflow-hidden flex-grow">
                  {insightMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: activeInsight === index ? 1 : 0,
                        y: activeInsight === index ? 0 : 20
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                        {message}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <Badge variant="outline" className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                  {activeInsight + 1}/{insightMessages.length}
                </Badge>
              </div>
            </motion.div>
            
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="anomalies" onClick={() => setSelectedTab("anomalies")} className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>Anomalies</span>
                </TabsTrigger>
                <TabsTrigger value="opportunities" onClick={() => setSelectedTab("opportunities")} className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span>Opportunities</span>
                </TabsTrigger>
                <TabsTrigger value="forecasts" onClick={() => setSelectedTab("forecasts")} className="flex items-center gap-1">
                  <BarChart3 className="h-4 w-4" />
                  <span>Forecasts</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="anomalies" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 dark:bg-dark-card border-gray-200 dark:border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Revenue Anomaly Detection</CardTitle>
                      <CardDescription>
                        Automatic detection of unexpected patterns in your revenue data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AreaChart
                        className="h-72"
                        data={anomalyData}
                        index="date"
                        categories={["value", "expected"]}
                        colors={["indigo", "gray"]}
                        valueFormatter={(value) => `$${(value).toLocaleString()}`}
                        showLegend={true}
                        showAnimation={true}
                        curveType="monotone"
                        customTooltip={({ payload }) => {
                          if (!payload?.[0]?.payload) return null;
                          const data = payload[0].payload;
                          const isAnomaly = data.anomaly;
                          
                          return (
                            <div className="p-2 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
                              <p className="text-sm font-medium">{data.date}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Actual: ${data.value.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Expected: ${data.expected.toLocaleString()}
                              </p>
                              {isAnomaly && (
                                <p className="text-xs mt-1 font-medium text-amber-600 dark:text-amber-400">
                                  Anomaly Detected
                                </p>
                              )}
                            </div>
                          );
                        }}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card className="dark:bg-dark-card border-gray-200 dark:border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Detected Anomalies</CardTitle>
                      <CardDescription>
                        Significant deviations from expected patterns
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {anomalyData
                          .filter(item => item.anomaly)
                          .map((item, index) => {
                            const diff = item.value - item.expected;
                            const percentDiff = (diff / item.expected) * 100;
                            const isPositive = diff > 0;
                            
                            return (
                              <div 
                                key={index}
                                className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium">{item.date}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      Expected: ${item.expected.toLocaleString()}
                                    </p>
                                    <p className="text-sm font-medium">
                                      Actual: ${item.value.toLocaleString()}
                                    </p>
                                  </div>
                                  <Badge className={`${isPositive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                    {isPositive ? '+' : ''}{percentDiff.toFixed(1)}%
                                  </Badge>
                                </div>
                                <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                                  {isPositive 
                                    ? `Revenue was ${percentDiff.toFixed(1)}% higher than expected. Potential factors: marketing campaign, seasonal effect.`
                                    : `Revenue was ${Math.abs(percentDiff).toFixed(1)}% lower than expected. Potential factors: competitor promotion, supply issues.`
                                  }
                                </p>
                              </div>
                            );
                          })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="opportunities" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Revenue Opportunities</h3>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <select 
                      className="text-sm border rounded-md px-2 py-1 bg-white dark:bg-gray-800 dark:border-gray-700"
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="Subscription">Subscription</option>
                      <option value="Retention">Retention</option>
                      <option value="Conversion">Conversion</option>
                      <option value="Loyalty">Loyalty</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 dark:bg-dark-card border-gray-200 dark:border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Opportunity Value Analysis</CardTitle>
                      <CardDescription>
                        AI-identified revenue opportunities ranked by potential value
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <BarChart
                        className="h-72"
                        data={filteredOpportunities}
                        index="name"
                        categories={["value"]}
                        colors={["indigo"]}
                        valueFormatter={(value) => `$${(value).toLocaleString()}`}
                        showLegend={false}
                        showAnimation={true}
                        customTooltip={({ payload }) => {
                          if (!payload?.[0]?.payload) return null;
                          const data = payload[0].payload;
                          
                          return (
                            <div className="p-2 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
                              <p className="text-sm font-medium">{data.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                Potential Value: ${data.value.toLocaleString()}
                              </p>
                              <div className="mt-1 flex items-center gap-2">
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                  {data.category}
                                </Badge>
                                <Badge className={`${
                                  data.potential === 'High' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                    : data.potential === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                }`}>
                                  {data.potential} Potential
                                </Badge>
                                <Badge className={`${
                                  data.effort === 'Low' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                    : data.effort === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                }`}>
                                  {data.effort} Effort
                                </Badge>
                              </div>
                            </div>
                          );
                        }}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card className="dark:bg-dark-card border-gray-200 dark:border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Customer Segment Opportunities</CardTitle>
                      <CardDescription>
                        Targeted opportunities by customer segment
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DonutChart
                        className="h-40 mt-2"
                        data={segmentOpportunities}
                        index="segment"
                        category="value"
                        valueFormatter={(value) => `$${(value).toLocaleString()}`}
                        colors={["indigo", "cyan", "emerald", "amber", "rose"]}
                        showAnimation={true}
                      />
                      
                      <div className="mt-4 space-y-3">
                        {segmentOpportunities.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${
                                index === 0 ? 'bg-indigo-500' :
                                index === 1 ? 'bg-cyan-500' :
                                index === 2 ? 'bg-emerald-500' :
                                index === 3 ? 'bg-amber-500' :
                                'bg-rose-500'
                              }`} />
                              <span className="text-sm">{item.segment}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                {item.impact}% Impact
                              </Badge>
                              <span className="text-sm font-medium">${item.value.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="forecasts" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2 dark:bg-dark-card border-gray-200 dark:border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Revenue Forecast (Next 6 Months)</CardTitle>
                      <CardDescription>
                        Predictive model with confidence intervals
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AreaChart
                        className="h-72"
                        data={forecastData}
                        index="date"
                        categories={["revenue", "forecast"]}
                        colors={["indigo", "cyan"]}
                        valueFormatter={(value) => `$${(value).toLocaleString()}`}
                        showLegend={true}
                        showAnimation={true}
                        curveType="monotone"
                        areaStyle={{
                          fillOpacity: 0.2
                        }}
                        customTooltip={({ payload }) => {
                          if (!payload?.[0]?.payload) return null;
                          const data = payload[0].payload;
                          const isForecast = !data.revenue;
                          
                          return (
                            <div className="p-2 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
                              <p className="text-sm font-medium">{data.date}</p>
                              {isForecast ? (
                                <>
                                  <p className="text-sm text-cyan-600 dark:text-cyan-400">
                                    Forecast: ${data.forecast.toLocaleString()}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Range: ${data.lower.toLocaleString()} - ${data.upper.toLocaleString()}
                                  </p>
                                </>
                              ) : (
                                <p className="text-sm text-indigo-600 dark:text-indigo-400">
                                  Actual: ${data.revenue.toLocaleString()}
                                </p>
                              )}
                            </div>
                          );
                        }}
                      />
                    </CardContent>
                  </Card>
                  
                  <div className="space-y-6">
                    <Card className="dark:bg-dark-card border-gray-200 dark:border-gray-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Key Forecast Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">6-Month Growth</p>
                              <p className="text-xl font-semibold">+35.9%</p>
                            </div>
                            <ArrowUpRight className="h-5 w-5 text-green-500" />
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Forecast Accuracy</p>
                              <p className="text-xl font-semibold">92.4%</p>
                            </div>
                            <Target className="h-5 w-5 text-indigo-500" />
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Confidence Level</p>
                              <p className="text-xl font-semibold">85%</p>
                            </div>
                            <div className="h-5 w-5 flex items-center justify-center text-amber-500">
                              <span className="text-lg font-bold">σ</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="dark:bg-dark-card border-gray-200 dark:border-gray-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Forecast Factors</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-indigo-500" />
                            <p className="text-sm">Customer Growth: <span className="font-medium">+12.5%</span></p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <p className="text-sm">AOV Increase: <span className="font-medium">+8.2%</span></p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-amber-500" />
                            <p className="text-sm">Seasonal Factors: <span className="font-medium">+5.8%</span></p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <PieChart className="h-4 w-4 text-cyan-500" />
                            <p className="text-sm">Product Mix: <span className="font-medium">+9.4%</span></p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
      
      <CardFooter className="pt-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Insights are generated using machine learning models trained on your historical data. 
          Forecasts and anomaly detection are updated daily.
        </p>
      </CardFooter>
    </Card>
  );
}
