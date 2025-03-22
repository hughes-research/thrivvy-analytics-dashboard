import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, 
  Flex, 
  Text, 
  Badge,
  Divider
} from "@tremor/react";
import { products } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Zap, Target, ShoppingCart, BarChart3 } from "lucide-react";

// Get top products by sales
const topProducts = [...products]
  .sort((a, b) => b.sales - a.sales)
  .slice(0, 5);

// Get products with highest growth trend
const growthProducts = [...products]
  .sort((a, b) => b.trend - a.trend)
  .filter(p => p.trend > 0)
  .slice(0, 5);

// Get products with best margins (using price as a proxy)
const highMarginProducts = [...products]
  .sort((a, b) => b.price - a.price)
  .slice(0, 5);

// Get products with low stock that need reordering
const reorderProducts = [...products]
  .sort((a, b) => a.stock - b.stock)
  .filter(p => p.stock < 20)
  .slice(0, 5);

// Generate forecast data for a product
const generateForecastData = (product: any) => {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    // Base sales with some growth and randomness
    const baseSales = product.sales / 30; // Daily average
    const growthFactor = 1 + (product.trend / 100); // Growth based on trend
    const randomFactor = 0.9 + Math.random() * 0.2; // Random variation
    
    // Weekend boost
    const dayOfWeek = date.getDay();
    const weekendBoost = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.2 : 1;
    
    const forecasted = Math.round(baseSales * Math.pow(growthFactor, i) * randomFactor * weekendBoost);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      "Forecasted Sales": forecasted,
      "Historical Sales": i < 7 ? Math.round(forecasted * (0.9 + Math.random() * 0.2)) : undefined
    });
  }
  
  return data;
};

export default function ProductRecommendationEngine() {
  const [selectedProduct, setSelectedProduct] = useState(topProducts[0]);
  const [forecastData, setForecastData] = useState(generateForecastData(topProducts[0]));
  const [activeTab, setActiveTab] = useState("top");
  
  const handleProductChange = (product: any) => {
    setSelectedProduct(product);
    setForecastData(generateForecastData(product));
  };
  
  return (
    <Card className="dark:bg-dark-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium text-black">
          Product Recommendation Engine
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text className="mt-2 mb-6 text-black">
          AI-powered recommendations to optimize your product strategy and inventory management.
        </Text>
        
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("top")}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "top" 
                  ? "border-indigo-500 text-black" 
                  : "border-transparent text-black hover:text-black"
              }`}
            >
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Top Performers
              </div>
            </button>
            <button
              onClick={() => setActiveTab("growth")}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "growth" 
                  ? "border-emerald-500 text-black" 
                  : "border-transparent text-black hover:text-black"
              }`}
            >
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2" />
                Growth Opportunities
              </div>
            </button>
            <button
              onClick={() => setActiveTab("margin")}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "margin" 
                  ? "border-blue-500 text-black" 
                  : "border-transparent text-black hover:text-black"
              }`}
            >
              <div className="flex items-center">
                <Target className="h-4 w-4 mr-2" />
                High Margin
              </div>
            </button>
            <button
              onClick={() => setActiveTab("reorder")}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "reorder" 
                  ? "border-amber-500 text-black" 
                  : "border-transparent text-black hover:text-black"
              }`}
            >
              <div className="flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Reorder Soon
              </div>
            </button>
          </div>
        </div>
        
        <div className="mt-4">
          <Flex className="mt-4">
            <Text className="text-black">Select a product to see detailed forecast</Text>
          </Flex>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {/* Top Performers Tab */}
            {activeTab === "top" && topProducts.map((product) => (
              <div 
                key={product.id} 
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedProduct.id === product.id 
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                }`}
                onClick={() => handleProductChange(product)}
              >
                <Flex>
                  <div>
                    <Text className="text-black">{product.name}</Text>
                    <Text className="text-black">ID: {product.id}</Text>
                  </div>
                  <div className="text-right">
                    <Text className="font-medium text-black">{product.sales} units sold</Text>
                    <Text className="text-black">{formatCurrency(product.price)}</Text>
                  </div>
                </Flex>
                <div className="mt-2">
                  <Flex className="mt-2">
                    <Text className="text-sm text-black">Sales Trend</Text>
                    <div className={`text-xs px-2 py-1 rounded-full flex items-center ${product.trend > 0 ? 'bg-emerald-100 text-black' : 'bg-red-100 text-black'}`}>
                      {product.trend > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {product.trend}%
                    </div>
                  </Flex>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${product.stock}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Growth Opportunities Tab */}
            {activeTab === "growth" && growthProducts.map((product) => (
              <div 
                key={product.id} 
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedProduct.id === product.id 
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                }`}
                onClick={() => handleProductChange(product)}
              >
                <Flex>
                  <div>
                    <Text className="text-black">{product.name}</Text>
                    <Text className="text-black">ID: {product.id}</Text>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs px-2 py-1 rounded-full flex items-center bg-emerald-100 text-black`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {product.trend}%
                    </div>
                  </div>
                </Flex>
                <div className="mt-2">
                  <Flex className="mt-2 justify-between">
                    <Text className="text-sm text-black">Current Sales: {product.sales} units</Text>
                    <Text className="text-sm text-black">Price: {formatCurrency(product.price)}</Text>
                  </Flex>
                  <Divider className="my-2" />
                  <Text className="text-sm text-black">
                    Recommendation: Increase marketing budget for this product
                  </Text>
                </div>
              </div>
            ))}
            
            {/* High Margin Tab */}
            {activeTab === "margin" && highMarginProducts.map((product) => (
              <div 
                key={product.id} 
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedProduct.id === product.id 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
                onClick={() => handleProductChange(product)}
              >
                <Flex>
                  <div>
                    <Text className="text-black">{product.name}</Text>
                    <Text className="text-black">ID: {product.id}</Text>
                  </div>
                  <div className="text-right">
                    <Text className="font-medium text-black">{formatCurrency(product.price)}</Text>
                    <Text className="text-black">Est. Margin: 45%</Text>
                  </div>
                </Flex>
                <div className="mt-2">
                  <Flex className="mt-2 justify-between">
                    <Text className="text-sm text-black">Sales: {product.sales} units</Text>
                    <div className={`text-xs px-2 py-1 rounded-full flex items-center ${product.trend > 0 ? 'bg-emerald-100 text-black' : 'bg-red-100 text-black'}`}>
                      {product.trend > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {product.trend}%
                    </div>
                  </Flex>
                  <Divider className="my-2" />
                  <Text className="text-sm text-black">
                    Recommendation: Bundle with complementary products
                  </Text>
                </div>
              </div>
            ))}
            
            {/* Reorder Soon Tab */}
            {activeTab === "reorder" && reorderProducts.map((product) => (
              <div 
                key={product.id} 
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedProduct.id === product.id 
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-amber-300'
                }`}
                onClick={() => handleProductChange(product)}
              >
                <Flex>
                  <div>
                    <Text className="text-black">{product.name}</Text>
                    <Text className="text-black">ID: {product.id}</Text>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs px-2 py-1 rounded-full ${product.stock < 10 ? 'bg-red-100 text-black' : 'bg-amber-100 text-black'}`}>
                      {product.stock} in stock
                    </div>
                  </div>
                </Flex>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${product.stock < 10 ? 'bg-red-600' : 'bg-amber-500'}`} style={{ width: `${product.stock}%` }}></div>
                  </div>
                  <Flex className="mt-2 justify-between">
                    <Text className="text-sm text-black">Monthly Sales: {Math.round(product.sales / 3)} units</Text>
                    <Text className="text-sm text-black">Reorder Point: 15 units</Text>
                  </Flex>
                  <Divider className="my-2" />
                  <Text className="text-sm text-black">
                    Recommendation: Order {Math.max(50, Math.round(product.sales / 2))} units within {product.stock < 10 ? "3" : "7"} days
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Forecast Chart */}
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Flex>
            <div>
              <Text className="text-black">Sales Forecast</Text>
              <Text className="text-2xl font-bold text-black">{selectedProduct.name}</Text>
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-black flex items-center">
              <BarChart3 className="h-3 w-3 mr-1" />
              14-Day Projection
            </div>
          </Flex>
          
          <div className="mt-4 h-72">
            <AreaChart
              data={forecastData}
              index="date"
              categories={["Historical Sales", "Forecasted Sales"]}
              colors={["indigo", "cyan"]}
              showLegend={true}
              showGridLines={false}
              showAnimation={true}
              curveType="natural"
            />
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-t-4 border-indigo-500 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Text className="text-black">Projected Sales (14 days)</Text>
              <Text className="text-2xl font-bold mt-1 text-black">
                {forecastData.reduce((sum, item) => sum + (item["Forecasted Sales"] || 0), 0)} units
              </Text>
            </div>
            <div className="p-4 border-t-4 border-cyan-500 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <Text className="text-black">Projected Revenue</Text>
              <Text className="text-2xl font-bold mt-1 text-black">
                {formatCurrency(forecastData.reduce((sum, item) => sum + (item["Forecasted Sales"] || 0), 0) * selectedProduct.price)}
              </Text>
            </div>
            <div className={`p-4 border-t-4 ${selectedProduct.stock < forecastData.reduce((sum, item) => sum + (item["Forecasted Sales"] || 0), 0) ? 'border-red-500' : 'border-emerald-500'} bg-white dark:bg-gray-800 rounded-lg shadow-sm`}>
              <Text className="text-black">Inventory Status</Text>
              <Text className="text-2xl font-bold mt-1 text-black">
                {selectedProduct.stock < forecastData.reduce((sum, item) => sum + (item["Forecasted Sales"] || 0), 0) 
                  ? "Insufficient" 
                  : "Sufficient"}
              </Text>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
