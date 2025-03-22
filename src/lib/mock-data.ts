// Mock data for the retail analytics dashboard
import { deterministicRandom } from './utils';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  rating: number;
  trend: number;
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

export interface RegionalData {
  region: string;
  revenue: number;
  orders: number;
  percentChange: number;
}

export interface CompetitorPrice {
  productId: string;
  productName: string;
  yourPrice: number;
  competitorPrice: number;
  priceDifference: number;
  lastUpdated: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'expired';
  products: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  orderCount: number;
  lastPurchase: string;
  status: 'active' | 'inactive';
}

// Generate Products
export const products: Product[] = Array.from({ length: 100 }, (_, i) => {
  const categories = ['Electronics', 'Clothing', 'Food', 'Home', 'Beauty', 'Sports', 'Books', 'Toys'];
  const category = categories[Math.floor(deterministicRandom() * categories.length)];
  
  return {
    id: `PROD-${i + 1000}`,
    name: `${category} Item ${i + 1}`,
    category,
    price: Number((deterministicRandom() * 200 + 10).toFixed(2)),
    stock: Math.floor(deterministicRandom() * 100),
    sales: Math.floor(deterministicRandom() * 500),
    rating: Number((deterministicRandom() * 5).toFixed(1)),
    trend: Number((deterministicRandom() * 40 - 20).toFixed(1)),
  };
});

// Generate Sales Data
export const salesData: SalesData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  
  return {
    date: date.toISOString().split('T')[0],
    revenue: Math.floor(deterministicRandom() * 10000 + 5000),
    orders: Math.floor(deterministicRandom() * 100 + 50),
    customers: Math.floor(deterministicRandom() * 80 + 30),
  };
});

// Generate Regional Data
export const regionalData: RegionalData[] = [
  {
    region: 'North America',
    revenue: 125000,
    orders: 1250,
    percentChange: 12.5,
  },
  {
    region: 'Europe',
    revenue: 95000,
    orders: 950,
    percentChange: 8.2,
  },
  {
    region: 'Asia',
    revenue: 85000,
    orders: 850,
    percentChange: -3.5,
  },
  {
    region: 'South America',
    revenue: 45000,
    orders: 450,
    percentChange: 15.7,
  },
  {
    region: 'Africa',
    revenue: 25000,
    orders: 250,
    percentChange: 20.1,
  },
  {
    region: 'Australia',
    revenue: 35000,
    orders: 350,
    percentChange: 5.3,
  },
];

// Generate Competitor Prices
export const competitorPrices: CompetitorPrice[] = products.slice(0, 20).map(product => {
  const competitorPrice = product.price * (1 + (deterministicRandom() * 0.4 - 0.2));
  
  return {
    productId: product.id,
    productName: product.name,
    yourPrice: product.price,
    competitorPrice: Number(competitorPrice.toFixed(2)),
    priceDifference: Number(((competitorPrice - product.price) / product.price * 100).toFixed(2)),
    lastUpdated: new Date().toISOString().split('T')[0],
  };
});

// Generate Promotions
export const promotions: Promotion[] = Array.from({ length: 10 }, (_, i) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - Math.floor(deterministicRandom() * 10));
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + Math.floor(deterministicRandom() * 30 + 5));
  
  const now = new Date();
  let status: 'active' | 'scheduled' | 'expired';
  
  if (startDate > now) {
    status = 'scheduled';
  } else if (endDate < now) {
    status = 'expired';
  } else {
    status = 'active';
  }
  
  return {
    id: `PROMO-${i + 100}`,
    title: `Promotion ${i + 1}`,
    description: `Special discount for selected products. Limited time offer.`,
    discount: Math.floor(deterministicRandom() * 50 + 10),
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    status,
    products: Array.from(
      { length: Math.floor(deterministicRandom() * 5 + 1) },
      () => products[Math.floor(deterministicRandom() * products.length)].id
    ),
  };
});

// Generate Customers
export const customers: Customer[] = Array.from({ length: 50 }, (_, i) => {
  const lastPurchase = new Date();
  lastPurchase.setDate(lastPurchase.getDate() - Math.floor(deterministicRandom() * 60));
  
  const totalSpent = Math.floor(deterministicRandom() * 5000 + 100);
  const orderCount = Math.floor(deterministicRandom() * 20 + 1);
  
  return {
    id: `CUST-${i + 500}`,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    totalSpent,
    orderCount,
    lastPurchase: lastPurchase.toISOString().split('T')[0],
    status: deterministicRandom() > 0.2 ? 'active' : 'inactive',
  };
});

// Dashboard Stats
export const dashboardStats = {
  totalRevenue: salesData.reduce((sum, data) => sum + data.revenue, 0),
  revenue: salesData.reduce((sum, data) => sum + data.revenue, 0),
  revenueGrowth: 12.5,
  totalOrders: salesData.reduce((sum, data) => sum + data.orders, 0),
  ordersGrowth: 8.3,
  totalCustomers: customers.length,
  customers: customers.length,
  customersGrowth: 5.7,
  averageOrderValue: Number((salesData.reduce((sum, data) => sum + data.revenue, 0) / salesData.reduce((sum, data) => sum + data.orders, 0)).toFixed(2)),
  aov: Number((salesData.reduce((sum, data) => sum + data.revenue, 0) / salesData.reduce((sum, data) => sum + data.orders, 0)).toFixed(2)),
  aovGrowth: 3.2,
  trends: {
    revenue: salesData.map(data => data.revenue),
    orders: salesData.map(data => data.orders),
    customers: salesData.map(data => data.customers),
    aov: Array.from({ length: salesData.length }, (_, i) => {
      const data = salesData[i];
      return data.revenue / data.orders;
    }),
  },
  predictedRevenue: Array.from({ length: 7 }, (_, i) => {
    const lastRevenue = salesData[salesData.length - 1].revenue;
    const growthRates = [1.02, 1.025, 1.03, 1.035, 1.025, 1.02, 1.03];
    return Math.floor(lastRevenue * Math.pow(growthRates[i % growthRates.length], i + 1));
  }),
  marketInsights: [
    { metric: 'Market Share', value: '23.5%', change: '+2.1%', trend: 'up' },
    { metric: 'Competitor Activity', value: 'Moderate', change: '+5 products', trend: 'up' },
    { metric: 'Consumer Sentiment', value: '78/100', change: '+3 points', trend: 'up' },
    { metric: 'Price Elasticity', value: '0.82', change: '-0.03', trend: 'down' }
  ],
  anomalies: [
    { 
      type: 'Price', 
      description: 'Unusual price drop detected for Electronics Item 4', 
      impactScore: 8.3,
      date: new Date().toISOString().split('T')[0]
    },
    { 
      type: 'Inventory', 
      description: 'Rapid stock depletion for Beauty Item 12', 
      impactScore: 7.5,
      date: new Date().toISOString().split('T')[0]
    }
  ]
};

// Correlation data for heatmap
export const correlationData = [
  { x: 'Price', y: 'Sales', value: -0.75 },
  { x: 'Price', y: 'Profit', value: 0.65 },
  { x: 'Price', y: 'Stock', value: 0.12 },
  { x: 'Price', y: 'Reorder Rate', value: -0.45 },
  { x: 'Price', y: 'Returns', value: 0.28 },
  
  { x: 'Sales', y: 'Price', value: -0.75 },
  { x: 'Sales', y: 'Profit', value: 0.82 },
  { x: 'Sales', y: 'Stock', value: -0.35 },
  { x: 'Sales', y: 'Reorder Rate', value: 0.63 },
  { x: 'Sales', y: 'Returns', value: -0.12 },
  
  { x: 'Profit', y: 'Price', value: 0.65 },
  { x: 'Profit', y: 'Sales', value: 0.82 },
  { x: 'Profit', y: 'Stock', value: -0.18 },
  { x: 'Profit', y: 'Reorder Rate', value: 0.48 },
  { x: 'Profit', y: 'Returns', value: -0.35 },
  
  { x: 'Stock', y: 'Price', value: 0.12 },
  { x: 'Stock', y: 'Sales', value: -0.35 },
  { x: 'Stock', y: 'Profit', value: -0.18 },
  { x: 'Stock', y: 'Reorder Rate', value: -0.65 },
  { x: 'Stock', y: 'Returns', value: 0.05 },
  
  { x: 'Reorder Rate', y: 'Price', value: -0.45 },
  { x: 'Reorder Rate', y: 'Sales', value: 0.63 },
  { x: 'Reorder Rate', y: 'Profit', value: 0.48 },
  { x: 'Reorder Rate', y: 'Stock', value: -0.65 },
  { x: 'Reorder Rate', y: 'Returns', value: -0.22 },
  
  { x: 'Returns', y: 'Price', value: 0.28 },
  { x: 'Returns', y: 'Sales', value: -0.12 },
  { x: 'Returns', y: 'Profit', value: -0.35 },
  { x: 'Returns', y: 'Stock', value: 0.05 },
  { x: 'Returns', y: 'Reorder Rate', value: -0.22 },
  
  { x: 'Customer Satisfaction', y: 'Price', value: -0.38 },
  { x: 'Customer Satisfaction', y: 'Sales', value: 0.42 },
  { x: 'Customer Satisfaction', y: 'Profit', value: 0.36 },
  { x: 'Customer Satisfaction', y: 'Stock', value: 0.15 },
  { x: 'Customer Satisfaction', y: 'Reorder Rate', value: 0.51 },
  { x: 'Customer Satisfaction', y: 'Returns', value: -0.68 },
  
  { x: 'Marketing Spend', y: 'Price', value: 0.12 },
  { x: 'Marketing Spend', y: 'Sales', value: 0.56 },
  { x: 'Marketing Spend', y: 'Profit', value: 0.38 },
  { x: 'Marketing Spend', y: 'Stock', value: 0.03 },
  { x: 'Marketing Spend', y: 'Reorder Rate', value: 0.29 },
  { x: 'Marketing Spend', y: 'Returns', value: -0.05 },
  
  { x: 'Seasonality', y: 'Price', value: 0.08 },
  { x: 'Seasonality', y: 'Sales', value: 0.72 },
  { x: 'Seasonality', y: 'Profit', value: 0.64 },
  { x: 'Seasonality', y: 'Stock', value: -0.33 },
  { x: 'Seasonality', y: 'Reorder Rate', value: 0.41 },
  { x: 'Seasonality', y: 'Returns', value: 0.06 },
  
  { x: 'Profit Margin', y: 'Price', value: 0.85 },
  { x: 'Profit Margin', y: 'Sales', value: -0.22 },
  { x: 'Profit Margin', y: 'Profit', value: 0.58 },
  { x: 'Profit Margin', y: 'Stock', value: 0.27 },
  { x: 'Profit Margin', y: 'Reorder Rate', value: -0.15 },
  { x: 'Profit Margin', y: 'Returns', value: 0.31 }
];

// Geographic sales data
export const geoSalesData = [
  { id: 'USA', value: 1245000, growth: 12.3, orders: 12450 },
  { id: 'CAN', value: 485000, growth: 8.7, orders: 4850 },
  { id: 'MEX', value: 267000, growth: 15.2, orders: 2670 },
  { id: 'GBR', value: 521000, growth: 7.3, orders: 5210 },
  { id: 'DEU', value: 489000, growth: 4.9, orders: 4890 },
  { id: 'FRA', value: 387000, growth: 5.8, orders: 3870 },
  { id: 'ESP', value: 243000, growth: 9.2, orders: 2430 },
  { id: 'ITA', value: 218000, growth: 3.5, orders: 2180 },
  { id: 'JPN', value: 562000, growth: 6.7, orders: 5620 },
  { id: 'KOR', value: 315000, growth: 11.5, orders: 3150 },
  { id: 'CHN', value: 721000, growth: 18.4, orders: 7210 },
  { id: 'IND', value: 287000, growth: 22.6, orders: 2870 },
  { id: 'AUS', value: 312000, growth: 8.9, orders: 3120 },
  { id: 'BRA', value: 198000, growth: 13.7, orders: 1980 },
  { id: 'ZAF', value: 112000, growth: 14.3, orders: 1120 },
];

// Customer segmentation data (simulated ML clustering)
export const customerSegmentation = [
  { 
    id: 'high-value',
    name: 'High Value', 
    count: 1250, 
    avgSpend: 1850, 
    orderFrequency: 3.2,
    retentionRate: 0.87,
    characteristics: ['Frequent buyers', 'High AOV', 'Low price sensitivity', 'Brand loyal'],
    color: '#4F46E5' // indigo-600
  },
  { 
    id: 'regular',
    name: 'Regular Shoppers', 
    count: 4320, 
    avgSpend: 680, 
    orderFrequency: 1.8,
    retentionRate: 0.72,
    characteristics: ['Consistent buyers', 'Medium AOV', 'Moderate price sensitivity', 'Occasional promotions'],
    color: '#0EA5E9' // sky-500
  },
  { 
    id: 'occasional',
    name: 'Occasional Buyers', 
    count: 6540, 
    avgSpend: 320, 
    orderFrequency: 0.7,
    retentionRate: 0.45,
    characteristics: ['Infrequent buyers', 'Low AOV', 'High price sensitivity', 'Promotion-driven'],
    color: '#10B981' // emerald-500
  },
  { 
    id: 'at-risk',
    name: 'At-Risk', 
    count: 2180, 
    avgSpend: 520, 
    orderFrequency: 0.3,
    retentionRate: 0.23,
    characteristics: ['Previously active', 'Declining engagement', 'Long time since last purchase', 'Price sensitive'],
    color: '#F59E0B' // amber-500
  },
  { 
    id: 'new',
    name: 'New Customers', 
    count: 3120, 
    avgSpend: 450, 
    orderFrequency: 1.1,
    retentionRate: 0.38,
    characteristics: ['Recent first purchase', 'Exploratory behavior', 'Need nurturing', 'Varied price sensitivity'],
    color: '#EC4899' // pink-500
  }
];

// Time series forecasting data with confidence intervals
export const forecastingData = {
  historical: salesData.map(item => ({ date: item.date, value: item.revenue, type: 'historical' })),
  forecast: Array.from({ length: 30 }, (_, i) => {
    const lastDate = new Date(salesData[salesData.length - 1].date);
    lastDate.setDate(lastDate.getDate() + i + 1);
    const dateStr = lastDate.toISOString().split('T')[0];
    
    const baseValue = salesData[salesData.length - 1].revenue;
    const trend = 1.01; // 1% average growth
    const seasonality = 1 + 0.1 * Math.sin((i / 30) * Math.PI * 2); // Seasonal factor
    const randomNoise = 0.95 + deterministicRandom() * 0.1; // Random noise
    
    const forecastedValue = baseValue * Math.pow(trend, i) * seasonality * randomNoise;
    const uncertainty = 0.05 + (i * 0.01); // Increasing uncertainty over time
    
    return {
      date: dateStr,
      value: Math.round(forecastedValue),
      upperBound: Math.round(forecastedValue * (1 + uncertainty)),
      lowerBound: Math.round(forecastedValue * (1 - uncertainty)),
      type: 'forecast'
    };
  })
};

// Product category performance data for radar chart
export const categoryPerformanceData = [
  {
    category: 'Electronics',
    revenue: 85,
    profit: 72,
    growth: 45,
    satisfaction: 80,
    returns: 35
  },
  {
    category: 'Clothing',
    revenue: 65,
    profit: 58,
    growth: 80,
    satisfaction: 70,
    returns: 28
  },
  {
    category: 'Food',
    revenue: 42,
    profit: 32,
    growth: 63,
    satisfaction: 85,
    returns: 15
  },
  {
    category: 'Home',
    revenue: 70,
    profit: 62,
    growth: 38,
    satisfaction: 75,
    returns: 22
  },
  {
    category: 'Beauty',
    revenue: 55,
    profit: 68,
    growth: 90,
    satisfaction: 78,
    returns: 18
  }
];
