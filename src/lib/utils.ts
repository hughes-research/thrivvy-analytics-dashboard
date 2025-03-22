import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as currency
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

/**
 * Formats a number as percentage
 */
export function formatPercent(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

/**
 * Formats a date according to the specified format
 */
export function formatDate(date: Date | string, format: string = 'MMM dd, yyyy'): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  // Simple formatter - for more complex use cases, import date-fns
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Truncates a string to the specified length
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

/**
 * Calculates the percentage change between two values
 */
export function calculatePercentChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

// Deterministic random number generator to prevent hydration errors
// This is a simple implementation of a seeded random number generator
export function seededRandom(seed: number): () => number {
  let value = seed;
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

// Create a global random generator with a fixed seed
const randomGenerator = seededRandom(42);

// Use this instead of Math.random() for consistent values between server and client
export function deterministicRandom(): number {
  return randomGenerator();
}

/**
 * Generates a random color in hex format
 */
export function getRandomColor(): string {
  return `#${Math.floor(deterministicRandom() * 16777215).toString(16)}`;
}
