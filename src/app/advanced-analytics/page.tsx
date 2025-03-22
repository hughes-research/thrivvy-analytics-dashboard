import React from "react";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/dashboard/Header";
import ProductPerformanceHeatmap from "@/components/charts/ProductPerformanceHeatmap";
import SalesFunnel from "@/components/charts/SalesFunnel";
import GeographicSalesMap from "@/components/charts/GeographicSalesMap";
import CustomerCohortAnalysis from "@/components/charts/CustomerCohortAnalysis";
import ProductRecommendationEngine from "@/components/charts/ProductRecommendationEngine";

export const metadata: Metadata = {
  title: "Advanced Analytics | Thrivvy Retail Analytics Dashboard",
  description: "Advanced analytics and visualizations for retail performance",
};

export default function AdvancedAnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header title="Advanced Analytics" subtitle="Powerful visualizations and AI-driven insights" />
      
      <main className="flex-1 p-6 lg:p-8">
        <Tabs defaultValue="visualizations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="visualizations">Advanced Visualizations</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
            <TabsTrigger value="cohort">Customer Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visualizations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProductPerformanceHeatmap />
              <SalesFunnel />
            </div>
            <GeographicSalesMap />
          </TabsContent>
          
          <TabsContent value="ai-insights" className="space-y-6">
            <ProductRecommendationEngine />
          </TabsContent>
          
          <TabsContent value="cohort" className="space-y-6">
            <CustomerCohortAnalysis />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
