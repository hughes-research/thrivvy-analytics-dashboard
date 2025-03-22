'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

interface DataPoint {
  id: string;
  x: number;
  y: number;
  z: number;
  value: number;
  category: string;
  label: string;
}

// Mock data for the 3D visualization
const generateMockData = (): DataPoint[] => {
  const categories = ['Revenue', 'Customers', 'Products', 'Marketing'];
  const data: DataPoint[] = [];
  
  for (let i = 0; i < 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const value = Math.random() * 100;
    
    // Create clusters based on category
    let x, y, z;
    switch (category) {
      case 'Revenue':
        x = 30 + Math.random() * 20;
        y = 30 + Math.random() * 20;
        z = 30 + Math.random() * 20;
        break;
      case 'Customers':
        x = -30 - Math.random() * 20;
        y = 30 + Math.random() * 20;
        z = 30 + Math.random() * 20;
        break;
      case 'Products':
        x = 30 + Math.random() * 20;
        y = -30 - Math.random() * 20;
        z = 30 + Math.random() * 20;
        break;
      case 'Marketing':
        x = 30 + Math.random() * 20;
        y = 30 + Math.random() * 20;
        z = -30 - Math.random() * 20;
        break;
      default:
        x = Math.random() * 50 - 25;
        y = Math.random() * 50 - 25;
        z = Math.random() * 50 - 25;
    }
    
    data.push({
      id: `point-${i}`,
      x,
      y,
      z,
      value,
      category,
      label: `${category} ${i + 1}`
    });
  }
  
  return data;
};

// Predefined insights for the visualization
const insights = [
  {
    title: "Revenue Cluster Analysis",
    description: "High-value customers are concentrated in the revenue cluster, showing strong correlation with marketing spend.",
    action: "Focus marketing efforts on high-value customer segments to maximize ROI."
  },
  {
    title: "Customer Acquisition Patterns",
    description: "New customer acquisition shows cyclical patterns with clear seasonal variations.",
    action: "Adjust marketing budget allocation to capitalize on seasonal trends."
  },
  {
    title: "Product Performance Outliers",
    description: "Several products are significant outliers in terms of profit margin and sales volume.",
    action: "Investigate manufacturing costs for outlier products to optimize pricing strategy."
  },
  {
    title: "Cross-Selling Opportunities",
    description: "Strong correlation between certain product categories suggests cross-selling potential.",
    action: "Implement targeted cross-selling campaigns for identified product pairs."
  }
];

const Interactive3DDataViz: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data] = useState<DataPoint[]>(generateMockData());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [rotation, setRotation] = useState<boolean>(true);
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  const [insightIndex, setInsightIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<string>('3d');
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 100;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Grid helper
    const gridHelper = new THREE.GridHelper(100, 10, 0xaaaaaa, 0xaaaaaa);
    scene.add(gridHelper);
    
    // Axes helper
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);
    
    // Create points
    const pointsGroup = new THREE.Group();
    scene.add(pointsGroup);
    
    // Add points to the scene
    const filteredData = selectedCategory === 'All' 
      ? data 
      : data.filter(point => point.category === selectedCategory);
    
    filteredData.forEach(point => {
      const geometry = new THREE.SphereGeometry(2, 16, 16);
      
      // Color based on category
      let color;
      switch (point.category) {
        case 'Revenue':
          color = 0x4f46e5; // indigo
          break;
        case 'Customers':
          color = 0x10b981; // green
          break;
        case 'Products':
          color = 0xf59e0b; // amber
          break;
        case 'Marketing':
          color = 0x0ea5e9; // blue
          break;
        default:
          color = 0xd1d5db; // gray
      }
      
      const material = new THREE.MeshStandardMaterial({ 
        color, 
        metalness: 0.3,
        roughness: 0.4,
        emissive: color,
        emissiveIntensity: 0.2,
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(point.x, point.y, point.z);
      sphere.userData = { id: point.id, data: point };
      pointsGroup.add(sphere);
    });
    
    // Add connections between points of the same category
    const categories = ['Revenue', 'Customers', 'Products', 'Marketing'];
    categories.forEach(category => {
      const categoryPoints = data.filter(point => point.category === category);
      
      if (categoryPoints.length > 1) {
        // Create a centroid for the category
        const centroid = categoryPoints.reduce(
          (acc, point) => ({
            x: acc.x + point.x / categoryPoints.length,
            y: acc.y + point.y / categoryPoints.length,
            z: acc.z + point.z / categoryPoints.length
          }),
          { x: 0, y: 0, z: 0 }
        );
        
        // Connect each point to the centroid
        categoryPoints.forEach(point => {
          const material = new THREE.LineBasicMaterial({ 
            color: 0xaaaaaa, 
            transparent: true, 
            opacity: 0.3 
          });
          
          const points = [];
          points.push(new THREE.Vector3(point.x, point.y, point.z));
          points.push(new THREE.Vector3(centroid.x, centroid.y, centroid.z));
          
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, material);
          pointsGroup.add(line);
        });
      }
    });
    
    // Raycaster for point selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const onMouseMove = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Update the raycaster
      raycaster.setFromCamera(mouse, camera);
      
      // Find intersections
      const intersects = raycaster.intersectObjects(pointsGroup.children, true);
      
      // Reset all points
      pointsGroup.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.scale.set(1, 1, 1);
        }
      });
      
      // Highlight intersected point
      if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object instanceof THREE.Mesh) {
          object.scale.set(1.5, 1.5, 1.5);
        }
      }
    };
    
    const onClick = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Update the raycaster
      raycaster.setFromCamera(mouse, camera);
      
      // Find intersections
      const intersects = raycaster.intersectObjects(pointsGroup.children, true);
      
      if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object instanceof THREE.Mesh && object.userData?.data) {
          setSelectedPoint(object.userData.data);
        }
      } else {
        setSelectedPoint(null);
      }
    };
    
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('click', onClick);
    
    // Animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Rotate the points group if rotation is enabled
      if (rotation) {
        pointsGroup.rotation.y += 0.005; // Increased rotation speed
        pointsGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.2; // Add gentle up/down motion
        
        // Add subtle pulsing effect to points
        pointsGroup.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            const scale = 1 + Math.sin(Date.now() * 0.001 + child.position.x * 0.1) * 0.1;
            child.scale.set(scale, scale, scale);
          }
        });
      }
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('click', onClick);
      cancelAnimationFrame(frameId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [data, selectedCategory, rotation]);
  
  // Auto-cycle through insights
  useEffect(() => {
    const interval = setInterval(() => {
      setInsightIndex((prevIndex) => (prevIndex + 1) % insights.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card className="dark:bg-dark-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Multi-Dimensional Data Explorer</CardTitle>
          <CardDescription>
            Interactive 3D visualization of business metrics and relationships
          </CardDescription>
        </div>
        <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
          AI-Powered
        </Badge>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Revenue">Revenue</SelectItem>
                <SelectItem value="Customers">Customers</SelectItem>
                <SelectItem value="Products">Products</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            
            <Tabs value={viewMode} onValueChange={setViewMode} className="w-[180px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="3d">3D View</TabsTrigger>
                <TabsTrigger value="2d">2D View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant={rotation ? "primary" : "outline"}
              size="sm"
              onClick={() => setRotation(!rotation)}
            >
              {rotation ? "Pause Rotation" : "Start Rotation"}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div 
              ref={containerRef} 
              className="w-full h-[400px] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
            ></div>
          </div>
          
          <div className="flex flex-col gap-4">
            <motion.div
              key={insightIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/30"
            >
              <h3 className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">
                {insights[insightIndex].title}
              </h3>
              <p className="text-sm text-indigo-700 dark:text-indigo-200 mb-3">
                {insights[insightIndex].description}
              </p>
              <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center">
                <span className="mr-1">Recommended Action:</span>
                {insights[insightIndex].action}
              </div>
            </motion.div>
            
            {selectedPoint && (
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {selectedPoint.label}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500 dark:text-gray-400">Category:</div>
                  <div className="text-gray-900 dark:text-gray-100">{selectedPoint.category}</div>
                  
                  <div className="text-gray-500 dark:text-gray-400">Value:</div>
                  <div className="text-gray-900 dark:text-gray-100">${selectedPoint.value.toFixed(2)}k</div>
                  
                  <div className="text-gray-500 dark:text-gray-400">Position:</div>
                  <div className="text-gray-900 dark:text-gray-100">
                    ({selectedPoint.x.toFixed(1)}, {selectedPoint.y.toFixed(1)}, {selectedPoint.z.toFixed(1)})
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-auto">
              <Button variant="outline" className="w-full">
                Export Visualization
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Interactive3DDataViz;
