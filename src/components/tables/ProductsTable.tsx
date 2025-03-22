'use client';

import React from 'react';
import { products } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Function to generate a deterministic image URL based on product name and category
const getProductImageUrl = (name: string, category: string) => {
  // Create a hash from the product name to get a deterministic but unique image
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Use different image collections based on category
  const collections: Record<string, string> = {
    'Electronics': 'tech',
    'Clothing': 'fashion',
    'Food': 'food',
    'Home': 'home',
    'Beauty': 'beauty',
    'Sports': 'sports',
    'Books': 'books',
    'Toys': 'toys'
  };
  
  const collection = collections[category] || 'products';
  return `https://source.unsplash.com/collection/${collection}/100x100?sig=${hash}`;
};

// Function to generate a product description based on name and category
const getProductDescription = (name: string, category: string) => {
  const descriptions: Record<string, string[]> = {
    'Electronics': ['High-performance', 'Wireless', 'Smart', 'Ultra HD', 'Portable'],
    'Clothing': ['Premium cotton', 'Slim fit', 'Casual', 'Breathable', 'Sustainable'],
    'Food': ['Organic', 'Gluten-free', 'Low-carb', 'Artisanal', 'Non-GMO'],
    'Home': ['Handcrafted', 'Modern design', 'Eco-friendly', 'Durable', 'Space-saving'],
    'Beauty': ['Vegan', 'Cruelty-free', 'Dermatologist tested', 'Natural ingredients', 'Fragrance-free'],
    'Sports': ['Professional grade', 'Lightweight', 'Water-resistant', 'Ergonomic', 'High-performance'],
    'Books': ['Bestseller', 'Award-winning', 'Illustrated', 'Limited edition', 'Critically acclaimed'],
    'Toys': ['Educational', 'Interactive', 'Age-appropriate', 'Battery-free', 'STEM-focused']
  };
  
  const options = descriptions[category] || ['Premium quality', 'Best seller', 'Customer favorite'];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const description = options[hash % options.length];
  
  return `${description} ${category.toLowerCase()} product`;
};

export function ProductsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-50 dark:bg-dark-background/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-gray-500 dark:text-dark-muted">Product</th>
            <th scope="col" className="px-6 py-3 text-gray-500 dark:text-dark-muted">Category</th>
            <th scope="col" className="px-6 py-3 text-gray-500 dark:text-dark-muted">Price</th>
            <th scope="col" className="px-6 py-3 text-gray-500 dark:text-dark-muted">Sales</th>
            <th scope="col" className="px-6 py-3 text-gray-500 dark:text-dark-muted">Trend</th>
            <th scope="col" className="px-6 py-3 text-gray-500 dark:text-dark-muted">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr 
              key={product.id} 
              className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-background/30"
            >
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                    <Image
                      src={getProductImageUrl(product.name, product.category)}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-dark-text">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {getProductDescription(product.name, product.category)}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20 dark:text-blue-300 border border-blue-100 dark:border-blue-800/30 shadow-sm">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-dark-text">
                {formatCurrency(product.price)}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-dark-text">
                {product.sales.toLocaleString()}
              </td>
              <td className="px-6 py-4">
                {renderTrendBadge(product.trend)}
              </td>
              <td className="px-6 py-4">
                {renderStockStatus(product.stock)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderTrendBadge(trend: number) {
  if (trend > 0) {
    return (
      <div className="flex items-center text-green-600 dark:text-green-400">
        <ArrowUp className="w-4 h-4 mr-1" />
        <span>{trend}%</span>
      </div>
    );
  } else if (trend < 0) {
    return (
      <div className="flex items-center text-red-600 dark:text-red-400">
        <ArrowDown className="w-4 h-4 mr-1" />
        <span>{Math.abs(trend)}%</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center text-gray-500 dark:text-dark-muted">
        <ArrowRight className="w-4 h-4 mr-1" />
        <span>0%</span>
      </div>
    );
  }
}

function renderStockStatus(stock: number) {
  if (stock > 50) {
    return (
      <div className="px-3 py-1.5 text-xs font-medium text-center text-green-800 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-300 rounded-full shadow-sm border border-green-200 dark:border-green-800/30">
        In Stock
      </div>
    );
  } else if (stock > 0) {
    return (
      <div className="px-3 py-1.5 text-xs font-medium text-center text-amber-800 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 dark:text-amber-300 rounded-full shadow-sm border border-amber-200 dark:border-amber-800/30">
        Low Stock
      </div>
    );
  } else {
    return (
      <div className="px-3 py-1.5 text-xs font-medium text-center text-red-800 bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 dark:text-red-300 rounded-full shadow-sm border border-red-200 dark:border-red-800/30">
        Out of Stock
      </div>
    );
  }
}
