import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as d3 from 'd3';
import { feature, mesh } from 'topojson-client';
import { Text } from '@tremor/react';

// Sample product distribution data by state
const productDistributionData = [
  { state: "Alabama", code: "AL", value: 4.2 },
  { state: "Alaska", code: "AK", value: 2.8 },
  { state: "Arizona", code: "AZ", value: 6.7 },
  { state: "Arkansas", code: "AR", value: 3.1 },
  { state: "California", code: "CA", value: 9.5 },
  { state: "Colorado", code: "CO", value: 7.3 },
  { state: "Connecticut", code: "CT", value: 5.9 },
  { state: "Delaware", code: "DE", value: 4.3 },
  { state: "Florida", code: "FL", value: 8.1 },
  { state: "Georgia", code: "GA", value: 6.5 },
  { state: "Hawaii", code: "HI", value: 3.2 },
  { state: "Idaho", code: "ID", value: 4.7 },
  { state: "Illinois", code: "IL", value: 7.2 },
  { state: "Indiana", code: "IN", value: 5.1 },
  { state: "Iowa", code: "IA", value: 4.5 },
  { state: "Kansas", code: "KS", value: 3.9 },
  { state: "Kentucky", code: "KY", value: 4.8 },
  { state: "Louisiana", code: "LA", value: 4.2 },
  { state: "Maine", code: "ME", value: 3.5 },
  { state: "Maryland", code: "MD", value: 6.1 },
  { state: "Massachusetts", code: "MA", value: 7.8 },
  { state: "Michigan", code: "MI", value: 6.4 },
  { state: "Minnesota", code: "MN", value: 6.2 },
  { state: "Mississippi", code: "MS", value: 2.9 },
  { state: "Missouri", code: "MO", value: 5.3 },
  { state: "Montana", code: "MT", value: 3.7 },
  { state: "Nebraska", code: "NE", value: 4.1 },
  { state: "Nevada", code: "NV", value: 5.7 },
  { state: "New Hampshire", code: "NH", value: 5.2 },
  { state: "New Jersey", code: "NJ", value: 7.4 },
  { state: "New Mexico", code: "NM", value: 4.6 },
  { state: "New York", code: "NY", value: 8.9 },
  { state: "North Carolina", code: "NC", value: 6.8 },
  { state: "North Dakota", code: "ND", value: 3.4 },
  { state: "Ohio", code: "OH", value: 6.3 },
  { state: "Oklahoma", code: "OK", value: 4.4 },
  { state: "Oregon", code: "OR", value: 6.9 },
  { state: "Pennsylvania", code: "PA", value: 7.1 },
  { state: "Rhode Island", code: "RI", value: 5.4 },
  { state: "South Carolina", code: "SC", value: 5.5 },
  { state: "South Dakota", code: "SD", value: 3.3 },
  { state: "Tennessee", code: "TN", value: 5.8 },
  { state: "Texas", code: "TX", value: 8.5 },
  { state: "Utah", code: "UT", value: 6.0 },
  { state: "Vermont", code: "VT", value: 3.6 },
  { state: "Virginia", code: "VA", value: 7.0 },
  { state: "Washington", code: "WA", value: 7.5 },
  { state: "West Virginia", code: "WV", value: 3.0 },
  { state: "Wisconsin", code: "WI", value: 5.6 },
  { state: "Wyoming", code: "WY", value: 2.7 }
];

// State name to code mapping
const stateNameToCode: {[key: string]: string} = {
  "Alabama": "AL",
  "Alaska": "AK",
  "Arizona": "AZ",
  "Arkansas": "AR",
  "California": "CA",
  "Colorado": "CO",
  "Connecticut": "CT",
  "Delaware": "DE",
  "Florida": "FL",
  "Georgia": "GA",
  "Hawaii": "HI",
  "Idaho": "ID",
  "Illinois": "IL",
  "Indiana": "IN",
  "Iowa": "IA",
  "Kansas": "KS",
  "Kentucky": "KY",
  "Louisiana": "LA",
  "Maine": "ME",
  "Maryland": "MD",
  "Massachusetts": "MA",
  "Michigan": "MI",
  "Minnesota": "MN",
  "Mississippi": "MS",
  "Missouri": "MO",
  "Montana": "MT",
  "Nebraska": "NE",
  "Nevada": "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Ohio": "OH",
  "Oklahoma": "OK",
  "Oregon": "OR",
  "Pennsylvania": "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  "Tennessee": "TN",
  "Texas": "TX",
  "Utah": "UT",
  "Vermont": "VT",
  "Virginia": "VA",
  "Washington": "WA",
  "West Virginia": "WV",
  "Wisconsin": "WI",
  "Wyoming": "WY"
};

// Product data for the selected state
const productPerformanceByState: {[key: string]: any[]} = {
  "California": [
    { product: "Premium Wireless Earbuds", sales: 12450, growth: 24.5 },
    { product: "Smart Fitness Tracker", sales: 9870, growth: 18.2 },
    { product: "Ultra HD Streaming Device", sales: 7650, growth: 15.7 },
    { product: "Noise Cancelling Headphones", sales: 6540, growth: 12.3 },
    { product: "Wireless Charging Pad", sales: 5430, growth: 9.8 }
  ],
  "Texas": [
    { product: "Smart Home Security System", sales: 8760, growth: 22.1 },
    { product: "Bluetooth Speaker", sales: 7650, growth: 16.8 },
    { product: "Wireless Gaming Mouse", sales: 6540, growth: 14.5 },
    { product: "Portable Power Bank", sales: 5430, growth: 11.2 },
    { product: "Mechanical Keyboard", sales: 4320, growth: 8.7 }
  ],
  "New York": [
    { product: "Wireless Noise-Cancelling Headphones", sales: 9870, growth: 23.4 },
    { product: "Smart Watch Series 5", sales: 8760, growth: 19.8 },
    { product: "Ultra-Thin Laptop", sales: 7650, growth: 16.5 },
    { product: "Professional Camera Drone", sales: 6540, growth: 13.2 },
    { product: "Virtual Reality Headset", sales: 5430, growth: 10.1 }
  ],
  "Florida": [
    { product: "Waterproof Bluetooth Speaker", sales: 7650, growth: 21.3 },
    { product: "Outdoor Security Camera", sales: 6540, growth: 17.6 },
    { product: "Smart Sunglasses", sales: 5430, growth: 14.9 },
    { product: "Portable Beach Cooler", sales: 4320, growth: 11.5 },
    { product: "Underwater Camera", sales: 3210, growth: 8.2 }
  ]
};

// Default data for states without specific product data
const defaultStateProducts = [
  { product: "Wireless Earbuds", sales: 5430, growth: 15.7 },
  { product: "Smart Watch", sales: 4320, growth: 12.3 },
  { product: "Bluetooth Speaker", sales: 3210, growth: 9.8 },
  { product: "Portable Charger", sales: 2100, growth: 7.5 },
  { product: "Fitness Tracker", sales: 1980, growth: 5.2 }
];

const ProductGeographicDistribution = () => {
  const mapRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [stateProducts, setStateProducts] = useState<any[]>([]);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (mapRef.current) {
      createChoroplethMap();
    }

    // Add window resize listener
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (selectedState) {
      // Get products for the selected state or use default
      const stateData = productPerformanceByState[selectedState] || defaultStateProducts;
      setStateProducts(stateData);
    }
  }, [selectedState]);

  const handleResize = () => {
    if (mapRef.current && mapLoaded) {
      createChoroplethMap();
    }
  };

  const createChoroplethMap = async () => {
    // Clear any existing SVG content
    d3.select(mapRef.current).selectAll("*").remove();

    try {
      // Load US TopoJSON data
      const us = await d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json");
      if (!us) throw new Error("Failed to load US map data");

      // Extract the GeoJSON features
      const states = feature(us, us.objects.states);
      const statesMesh = mesh(us, us.objects.states);

      // Set up dimensions
      const width = mapRef.current?.clientWidth || 800;
      const height = 500;
      
      // Create color scale
      const colorScale = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, 10]); // Assuming values range from 0 to 10

      // Create projection and path generator
      const projection = d3.geoAlbersUsa()
        .fitSize([width, height], states);
      
      const path = d3.geoPath()
        .projection(projection);

      // Create SVG
      const svg = d3.select(mapRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

      // Create tooltip
      const tooltip = d3.select(tooltipRef.current)
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "1px solid #ddd")
        .style("border-radius", "4px")
        .style("padding", "8px")
        .style("font-size", "12px")
        .style("pointer-events", "none")
        .style("z-index", "10");

      // Draw states
      svg.append("g")
        .selectAll("path")
        .data(states.features)
        .join("path")
        .attr("fill", d => {
          const stateName = d.properties.name;
          const stateData = productDistributionData.find(s => s.code === stateNameToCode[stateName]);
          return stateData ? colorScale(stateData.value) : "#ccc";
        })
        .attr("d", path)
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .attr("cursor", "pointer")
        .on("mouseover", (event, d) => {
          const stateName = d.properties.name;
          const stateCode = stateNameToCode[stateName];
          const stateData = productDistributionData.find(s => s.code === stateCode);
          
          tooltip
            .style("visibility", "visible")
            .html(`
              <strong>${stateName}</strong><br/>
              Product Popularity: ${stateData ? stateData.value.toFixed(1) : 'N/A'}
            `);
            
          d3.select(event.currentTarget)
            .attr("stroke", "#000")
            .attr("stroke-width", 1.5);
        })
        .on("mousemove", (event) => {
          tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", (event) => {
          tooltip.style("visibility", "hidden");
          d3.select(event.currentTarget)
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5);
        })
        .on("click", (event, d) => {
          const stateName = d.properties.name;
          setSelectedState(stateName);
        });

      // Draw state borders
      svg.append("path")
        .datum(statesMesh)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path);

      // Add legend
      const legendWidth = 200;
      const legendHeight = 15;
      const legendX = width - legendWidth - 10;
      const legendY = height - 40;

      const legendScale = d3.scaleLinear()
        .domain([0, 10])
        .range([0, legendWidth]);

      const legendAxis = d3.axisBottom(legendScale)
        .tickSize(legendHeight)
        .ticks(5);

      const defs = svg.append("defs");
      const linearGradient = defs.append("linearGradient")
        .attr("id", "legend-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");

      linearGradient.selectAll("stop")
        .data(d3.range(0, 1.01, 0.1))
        .enter()
        .append("stop")
        .attr("offset", d => d * 100 + "%")
        .attr("stop-color", d => colorScale(d * 10));

      svg.append("g")
        .attr("transform", `translate(${legendX}, ${legendY})`)
        .append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#legend-gradient)");

      svg.append("g")
        .attr("transform", `translate(${legendX}, ${legendY + legendHeight})`)
        .call(legendAxis)
        .select(".domain")
        .remove();

      svg.append("text")
        .attr("x", legendX)
        .attr("y", legendY - 5)
        .attr("fill", "black")
        .attr("text-anchor", "start")
        .attr("font-size", "10px")
        .text("Product Popularity Index");

      setMapLoaded(true);
    } catch (error) {
      console.error("Error creating choropleth map:", error);
    }
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="dark:bg-dark-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium text-gray-900 dark:text-gray-100">
          Product Geographic Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Text className="mt-2 mb-6 text-gray-700 dark:text-gray-300">
          Visualize product popularity and sales performance across different states. Click on a state to see detailed product data.
        </Text>
        
        <div className="relative" style={{ height: "500px" }}>
          <svg ref={mapRef} className="w-full h-full"></svg>
          <div ref={tooltipRef}></div>
        </div>
        
        {selectedState && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Top Products in {selectedState}</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Product</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">Sales</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {stateProducts.map((product, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-200">{product.product}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-200">{formatCurrency(product.sales)}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.growth > 15 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' 
                            : product.growth > 10 
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' 
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          +{product.growth}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductGeographicDistribution;
