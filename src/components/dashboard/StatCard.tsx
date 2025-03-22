import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change?: number; // Percentage change
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  trend = 'neutral',
  description,
  className,
}) => {
  const trendColor = trend === 'up' 
    ? 'text-success' 
    : trend === 'down' 
      ? 'text-error' 
      : 'text-gray-500';

  return (
    <Card variant="bordered" className={cn('overflow-hidden', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="mt-2 text-2xl font-bold text-gray-900">{value}</h4>
            
            {change !== undefined && (
              <div className={`mt-1 flex items-center ${trendColor}`}>
                {trend === 'up' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                ) : trend === 'down' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                  </svg>
                ) : null}
                <span className="ml-1 text-sm font-medium">
                  {change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`}
                </span>
              </div>
            )}
            
            {description && (
              <p className="mt-1 text-xs text-gray-500">{description}</p>
            )}
          </div>
          
          {icon && (
            <div className="rounded-full bg-primary-50 p-3 text-primary-600">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
