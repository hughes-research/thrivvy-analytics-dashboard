'use client';

import React, { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { ProductsTable } from '@/components/tables/ProductsTable';
import { RegionalSalesChart } from '@/components/charts/RegionalSalesChart';
import { SparklineChart } from '@/components/charts/SparklineChart';
import { PredictiveInsights } from '@/components/insights/PredictiveInsights';
import { dashboardStats, regionalData } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CorrelationHeatmap } from '@/components/analytics/CorrelationHeatmap';
import { GeoSalesMap } from '@/components/analytics/GeoSalesMap';
import { CustomerSegmentation } from '@/components/analytics/CustomerSegmentation';
import CustomerLifetimeValue from '@/components/analytics/CustomerLifetimeValue';
import { TimeSeriesForecasting } from '@/components/analytics/TimeSeriesForecasting';
import { CategoryPerformance } from '@/components/analytics/CategoryPerformance';
import SmartInsightsDashboard from '@/components/analytics/SmartInsightsDashboard';
import DataChatAssistant from '@/components/analytics/DataChatAssistant';
import { Bell, BarChart2, Users, ShoppingCart, TrendingUp, Activity, PieChart, Map, BrainCircuit, LineChart, Search, Settings, ChevronDown, MessageSquare } from 'lucide-react';
import ProductPerformanceHeatmap from '@/components/charts/ProductPerformanceHeatmap';
import SalesFunnel from '@/components/charts/SalesFunnel';
import GeographicSalesMap from '@/components/charts/GeographicSalesMap';
import CustomerCohortAnalysis from '@/components/charts/CustomerCohortAnalysis';
import ProductRecommendationEngine from '@/components/charts/ProductRecommendationEngine';
import ProductGeographicDistribution from '@/components/charts/ProductGeographicDistribution';
import Interactive3DDataViz from '@/components/charts/Interactive3DDataViz';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showChatAssistant, setShowChatAssistant] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-dark-background">
      <header className="sticky top-0 z-10 border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">Thrivvy Analytics</h1>
              </div>
            </div>
            
            {/* Search Box */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search dashboards, reports, metrics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-dark-muted dark:hover:text-dark-text"
                onClick={() => setShowChatAssistant(!showChatAssistant)}
                title="AI Data Assistant"
              >
                <MessageSquare className="h-5 w-5" />
              </button>
              
              <div className="relative">
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-dark-muted dark:hover:text-dark-text">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
              </div>
              
              {/* Settings Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="p-2 text-gray-500 hover:text-gray-700 dark:text-dark-muted dark:hover:text-dark-text focus:outline-none">
                  <Settings className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center justify-between cursor-pointer">
                    <span>Theme</span>
                    <ThemeToggle />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Help & Documentation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                DH
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6">
        {/* Chat Assistant */}
        {showChatAssistant && (
          <div className="fixed bottom-8 right-8 z-50 w-96">
            <DataChatAssistant />
          </div>
        )}
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <div className="mb-6 border-b border-gray-200 dark:border-dark-border">
              <TabsList className="h-14 w-full justify-start bg-transparent p-0 rounded-none">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary-600 data-[state=active]:shadow-none rounded-none px-6 h-14 text-base font-medium"
                >
                  <BarChart2 className="h-5 w-5 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="advanced-analytics" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary-600 data-[state=active]:shadow-none rounded-none px-6 h-14 text-base font-medium"
                >
                  <BrainCircuit className="h-5 w-5 mr-2" />
                  Advanced Analytics
                </TabsTrigger>
                <TabsTrigger 
                  value="products" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary-600 data-[state=active]:shadow-none rounded-none px-6 h-14 text-base font-medium"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Products
                </TabsTrigger>
                <TabsTrigger 
                  value="customers" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary-600 data-[state=active]:shadow-none rounded-none px-6 h-14 text-base font-medium"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Customers
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="dark:bg-dark-card overflow-hidden border-l-4 border-indigo-500 dark:border-indigo-400">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Revenue</CardTitle>
                      <CardDescription className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(dashboardStats.revenue)}
                      </CardDescription>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 dark:from-indigo-500 dark:to-indigo-700 flex items-center justify-center text-white shadow-md">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs font-medium text-green-600 dark:text-green-400">
                      +{dashboardStats.revenueGrowth}% from last month
                    </div>
                    <div className="h-10 mt-2">
                      <SparklineChart data={dashboardStats.trends.revenue} color="#4F46E5" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="dark:bg-dark-card overflow-hidden border-l-4 border-green-500 dark:border-green-400">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Orders</CardTitle>
                      <CardDescription className="text-2xl font-bold text-gray-900 dark:text-white">
                        {dashboardStats.totalOrders.toLocaleString()}
                      </CardDescription>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 flex items-center justify-center text-white shadow-md">
                      <ShoppingCart className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs font-medium text-green-600 dark:text-green-400">
                      +{dashboardStats.ordersGrowth}% from last month
                    </div>
                    <div className="h-10 mt-2">
                      <SparklineChart data={dashboardStats.trends.orders} color="#10B981" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="dark:bg-dark-card overflow-hidden border-l-4 border-blue-500 dark:border-blue-400">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Customers</CardTitle>
                      <CardDescription className="text-2xl font-bold text-gray-900 dark:text-white">
                        {dashboardStats.customers.toLocaleString()}
                      </CardDescription>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 flex items-center justify-center text-white shadow-md">
                      <Users className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs font-medium text-green-600 dark:text-green-400">
                      +{dashboardStats.customersGrowth}% from last month
                    </div>
                    <div className="h-10 mt-2">
                      <SparklineChart data={dashboardStats.trends.customers} color="#0EA5E9" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="dark:bg-dark-card overflow-hidden border-l-4 border-amber-500 dark:border-amber-400">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg. Order Value</CardTitle>
                      <CardDescription className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(dashboardStats.aov)}
                      </CardDescription>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 flex items-center justify-center text-white shadow-md">
                      <Activity className="h-6 w-6" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs font-medium text-green-600 dark:text-green-400">
                      +{dashboardStats.aovGrowth}% from last month
                    </div>
                    <div className="h-10 mt-2">
                      <SparklineChart data={dashboardStats.trends.aov} color="#F59E0B" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="dark:bg-dark-card">
                  <CardHeader>
                    <CardTitle>Revenue Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RevenueChart />
                  </CardContent>
                </Card>
                <Card className="dark:bg-dark-card">
                  <CardHeader>
                    <CardTitle>Regional Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RegionalSalesChart data={regionalData} />
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card className="dark:bg-dark-card">
                  <CardHeader>
                    <CardTitle>Predictive Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PredictiveInsights 
                      predictedRevenue={dashboardStats.predictedRevenue}
                      marketInsights={dashboardStats.marketInsights}
                      anomalies={dashboardStats.anomalies}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Advanced Analytics Tab Content */}
            <TabsContent value="advanced-analytics" className="mt-0">
              <div className="mb-8">
                <SmartInsightsDashboard />
              </div>
              
              {/* Multi-Dimensional Data Explorer temporarily removed
              <div className="mb-6">
                <Interactive3DDataViz />
              </div>
              */}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <CorrelationHeatmap />
                <SalesFunnel />
              </div>
              
              <div className="grid grid-cols-1 gap-6 mb-6">
                <GeographicSalesMap />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <CustomerCohortAnalysis />
                <TimeSeriesForecasting />
              </div>
              
              <div className="mb-6">
                <ProductRecommendationEngine />
              </div>
              
              <Card className="dark:bg-dark-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">AI-Powered Recommendations</CardTitle>
                    <CardDescription>Strategic insights based on data analysis</CardDescription>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                      <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Revenue Optimization
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-200">
                        Increase Beauty category pricing by 5-7% based on price elasticity analysis. Expected revenue impact: +$42,500/month.
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-900/30">
                      <h3 className="font-medium text-green-800 dark:text-green-300 mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Customer Retention
                      </h3>
                      <p className="text-sm text-green-700 dark:text-green-200">
                        Target 2,180 at-risk customers with personalized win-back campaigns. Projected retention lift: 35%.
                      </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30">
                      <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2 flex items-center">
                        <Map className="h-4 w-4 mr-1" />
                        Market Expansion
                      </h3>
                      <p className="text-sm text-amber-700 dark:text-amber-200">
                        Prioritize expansion in India and Brazil markets based on growth trajectory and CAC efficiency metrics.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab Content */}
            <TabsContent value="products" className="mt-0">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text">Product Analytics</h2>
                <p className="text-gray-500 dark:text-dark-muted mt-1">
                  Track performance metrics across your product catalog
                </p>
              </div>
              
              <div className="mb-6">
                <ProductGeographicDistribution />
              </div>
              
              <Card className="dark:bg-dark-card">
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProductsTable />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customers Tab Content */}
            <TabsContent value="customers" className="mt-0">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text">Customer Analytics</h2>
                <p className="text-gray-500 dark:text-dark-muted mt-1">
                  Understand customer behavior and demographics
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomerSegmentation />
                <CustomerLifetimeValue />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-dark-border py-6 bg-white dark:bg-dark-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 dark:text-dark-muted text-sm">
              &copy; 2025 Thrivvy Analytics. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-500 dark:text-dark-muted hover:text-gray-700 dark:hover:text-dark-text text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 dark:text-dark-muted hover:text-gray-700 dark:hover:text-dark-text text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 dark:text-dark-muted hover:text-gray-700 dark:hover:text-dark-text text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
