'use client';

import React from 'react';
import { products } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';

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
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-dark-text">
                {product.name}
              </td>
              <td className="px-6 py-4 text-gray-600 dark:text-dark-muted">
                {product.category}
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
      <div className="px-2 py-1 text-xs font-medium text-center text-green-800 bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-full w-20">
        In Stock
      </div>
    );
  } else if (stock > 0) {
    return (
      <div className="px-2 py-1 text-xs font-medium text-center text-amber-800 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 rounded-full w-20">
        Low Stock
      </div>
    );
  } else {
    return (
      <div className="px-2 py-1 text-xs font-medium text-center text-red-800 bg-red-100 dark:bg-red-900/30 dark:text-red-400 rounded-full w-20">
        Out of Stock
      </div>
    );
  }
}
