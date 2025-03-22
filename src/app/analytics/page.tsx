'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, BarChart3, TrendingUp, Calendar, ShoppingCart, DollarSign, Users, Zap } from 'lucide-react';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { CategoryPieChart } from '@/components/charts/CategoryPieChart';
import { products } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

// Prepare data for pie chart
const categoryData = Object.entries(
  products.reduce((acc: { [key: string]: number }, product) => {
    acc[product.category] = (acc[product.category] || 0) + product.sales;
    return acc;
  }, {})
)
  .map(([name, value]) => ({ name, value }))
  .sort((a, b) => b.value - a.value)
  .slice(0, 7);

// Add colors - using higher contrast colors
const pieData = categoryData.map((item, index) => {
  const colors = [
    '#4338CA', // primary (darker)
    '#047857', // secondary (darker)
    '#EA580C', // accent (darker)
    '#7C3AED', // purple (darker)
    '#DB2777', // pink (darker)
    '#2563EB', // blue (darker)
    '#D97706', // amber (darker)
  ];
  return {
    ...item,
    color: colors[index % colors.length],
  };
});

// Sample Sales by Month data
const monthlySales = [
  { month: 'Jan', sales: 65 },
  { month: 'Feb', sales: 59 },
  { month: 'Mar', sales: 80 },
  { month: 'Apr', sales: 81 },
  { month: 'May', sales: 56 },
  { month: 'Jun', sales: 55 },
  { month: 'Jul', sales: 40 },
  { month: 'Aug', sales: 70 },
  { month: 'Sep', sales: 90 },
  { month: 'Oct', sales: 110 },
  { month: 'Nov', sales: 130 },
  { month: 'Dec', sales: 150 },
];

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'revenue' | 'seasonal'>('overview');
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5 mr-2" /> },
    { id: 'products', label: 'Products', icon: <PieChart className="w-5 h-5 mr-2" /> },
    { id: 'revenue', label: 'Revenue', icon: <TrendingUp className="w-5 h-5 mr-2" /> },
    { id: 'seasonal', label: 'Seasonal', icon: <Calendar className="w-5 h-5 mr-2" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - simplified for better readability */}
      <div className="bg-white border-b border-gray-200">
        <header className="px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-2 text-gray-700 text-lg max-w-2xl">
              Gain insights into your retail performance with our comprehensive analytics tools.
            </p>
          </motion.div>
          
          <div className="mt-8 border-b border-gray-200">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center pb-4 px-2 transition-colors text-base ${
                    activeTab === tab.id
                      ? 'border-b-2 border-primary-600 text-primary-700 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>
      </div>
      
      {/* Main content */}
      <main className="p-8">
        {/* Stats Cards Section - Matching the main dashboard style */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <div className="bg-indigo-800 rounded-xl p-6 text-white shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-medium text-base opacity-90">Monthly Revenue</p>
                  <h3 className="text-3xl font-bold mt-2 text-white">{formatCurrency(287500)}</h3>
                  <div className="flex items-center mt-2 text-white opacity-90">
                    <TrendingUp size={16} className="mr-1" />
                    <span className="text-base">+14.2% from last month</span>
                  </div>
                </div>
                <div className="bg-white/30 p-3 rounded-lg">
                  <DollarSign size={24} className="text-white" />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={item}>
            <div className="bg-indigo-800 rounded-xl p-6 text-white shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-medium text-base opacity-90">Orders This Month</p>
                  <h3 className="text-3xl font-bold mt-2 text-white">2,845</h3>
                  <div className="flex items-center mt-2 text-white opacity-90">
                    <TrendingUp size={16} className="mr-1" />
                    <span className="text-base">+7.8% from last month</span>
                  </div>
                </div>
                <div className="bg-white/30 p-3 rounded-lg">
                  <ShoppingCart size={24} className="text-white" />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={item}>
            <div className="bg-indigo-800 rounded-xl p-6 text-white shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-medium text-base opacity-90">New Customers</p>
                  <h3 className="text-3xl font-bold mt-2 text-white">586</h3>
                  <div className="flex items-center mt-2 text-white opacity-90">
                    <TrendingUp size={16} className="mr-1" />
                    <span className="text-base">+4.3% from last month</span>
                  </div>
                </div>
                <div className="bg-white/30 p-3 rounded-lg">
                  <Users size={24} className="text-white" />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={item}>
            <div className="bg-indigo-800 rounded-xl p-6 text-white shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-medium text-base opacity-90">Conversion Rate</p>
                  <h3 className="text-3xl font-bold mt-2 text-white">3.8%</h3>
                  <div className="flex items-center mt-2 text-white opacity-90">
                    <TrendingUp size={16} className="mr-1" />
                    <span className="text-base">+0.5% from last month</span>
                  </div>
                </div>
                <div className="bg-white/30 p-3 rounded-lg">
                  <Zap size={24} className="text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Revenue Over Time</h2>
              <RevenueChart />
            </div>
            <div>
              <CategoryPieChart 
                title="Sales by Category" 
                data={pieData}
              />
            </div>
          </motion.div>
        )}
        
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Top Products by Sales</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Sales</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products
                      .sort((a, b) => b.sales - a.sales)
                      .slice(0, 10)
                      .map((product, index) => (
                        <motion.tr 
                          key={product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900 text-base">{product.name}</div>
                            <div className="text-sm text-gray-600">{product.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-base">
                            {formatCurrency(product.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 text-base">
                            {product.sales}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium text-base">
                            {formatCurrency(product.price * product.sales)}
                          </td>
                        </motion.tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'revenue' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Revenue by Month</h2>
              <div className="h-80">
                <RevenueChart />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Revenue Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Average Daily Revenue', value: formatCurrency(32456), change: '+12.5%', color: 'text-green-600' },
                  { label: 'Monthly Growth Rate', value: '8.2%', change: '+2.1%', color: 'text-green-600' },
                  { label: 'Conversion Rate', value: '3.7%', change: '-0.3%', color: 'text-red-600' },
                  { label: 'Customer Acquisition Cost', value: formatCurrency(42.5), change: '-5.2%', color: 'text-green-600' },
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    className="bg-gray-50 rounded-lg p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (index * 0.1) }}
                  >
                    <h3 className="text-base font-medium text-gray-700">{metric.label}</h3>
                    <p className="mt-2 text-2xl font-bold text-gray-900">{metric.value}</p>
                    <div className={`mt-2 flex items-center text-base ${metric.color} font-medium`}>
                      <span>{metric.change}</span>
                      <span className="ml-1">from last period</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'seasonal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-6"
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Seasonal Trends</h2>
              <p className="text-gray-700 mb-6 text-base">
                Analyze how your sales performance varies throughout the year to identify seasonal patterns and optimize your inventory and marketing strategies.
              </p>
              
              <div className="h-80">
                {/* Placeholder for seasonal chart */}
                <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <Calendar size={56} className="text-primary-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3">Seasonal Analysis</h3>
                    <p className="text-gray-700 max-w-md mx-auto text-base">
                      Interactive seasonal analysis chart coming soon! This feature will help you identify trends across different seasons and plan accordingly.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {['Winter', 'Spring', 'Summer', 'Fall'].map((season, index) => (
                  <motion.div
                    key={season}
                    className="bg-gray-50 rounded-lg p-5 text-center border border-gray-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + (index * 0.1) }}
                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  >
                    <h3 className="font-medium text-gray-900 text-lg mb-2">{season}</h3>
                    <p className="text-3xl font-bold text-primary-700">
                      {monthlySales.slice(index * 3, (index + 1) * 3).reduce((sum, item) => sum + item.sales, 0)}
                    </p>
                    <p className="text-base text-gray-600 mt-1">Sales Volume</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-8 py-4 text-center text-gray-600 text-base">
        &copy; {new Date().getFullYear()} Thrivvy Retail Analytics. All rights reserved.
      </footer>
    </div>
  );
}
