'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AreaChart, BarChart } from "@tremor/react";
import { MessageSquare, Send, Sparkles, ChevronDown, ChevronUp, Download, BarChart2, PieChart, TrendingUp, X, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data for visualizations
const revenueData = [
  { date: "Jan 2024", revenue: 250000 },
  { date: "Feb 2024", revenue: 280000 },
  { date: "Mar 2024", revenue: 310000 },
  { date: "Apr 2024", revenue: 290000 },
  { date: "May 2024", revenue: 320000 },
  { date: "Jun 2024", revenue: 350000 },
];

const customerData = [
  { segment: "High Value", count: 1250 },
  { segment: "Regular", count: 4320 },
  { segment: "Occasional", count: 2840 },
  { segment: "At-Risk", count: 980 },
  { segment: "New", count: 1560 },
];

const conversionData = [
  { channel: "Organic Search", rate: 3.2 },
  { channel: "Paid Search", rate: 4.8 },
  { channel: "Social Media", rate: 2.7 },
  { channel: "Email", rate: 6.5 },
  { channel: "Direct", rate: 5.1 },
  { channel: "Referral", rate: 4.2 },
];

// Sample suggested questions
const suggestedQuestions = [
  "What's our revenue trend for the past 6 months?",
  "Show me customer distribution by segment",
  "What's our best performing marketing channel?",
  "Compare conversion rates across channels",
  "Identify top growth opportunities",
  "Analyze customer churn factors",
  "Forecast revenue for next quarter",
  "Which product has the highest profit margin?"
];

// Message types
type MessageType = 'text' | 'chart-revenue' | 'chart-customer' | 'chart-conversion' | 'loading';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  type: MessageType;
  timestamp: Date;
}

export default function DataChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Hi there! I'm your AI data assistant. Ask me anything about your business metrics, and I'll provide insights and visualizations to help you understand your data better.",
      sender: 'assistant',
      type: 'text',
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Simulate AI typing
  const simulateTyping = (duration: number) => {
    setIsTyping(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, duration);
    });
  };
  
  // Handle user message submission
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      type: 'text',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Add loading message
    const loadingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: loadingId,
      content: "Analyzing data...",
      sender: 'assistant',
      type: 'loading',
      timestamp: new Date()
    }]);
    
    // Simulate AI thinking time
    await simulateTyping(Math.random() * 1000 + 1000);
    
    // Remove loading message and add response
    setMessages(prev => {
      const filtered = prev.filter(msg => msg.id !== loadingId);
      
      let responseMessage: Message;
      
      // Generate different responses based on the query
      if (input.toLowerCase().includes('revenue') || input.toLowerCase().includes('trend')) {
        responseMessage = {
          id: (Date.now() + 2).toString(),
          content: "Here's the revenue trend for the past 6 months. We're seeing steady growth with a slight dip in April, but overall the trend is positive with a 40% increase from January to June.",
          sender: 'assistant',
          type: 'chart-revenue',
          timestamp: new Date()
        };
      } else if (input.toLowerCase().includes('customer') || input.toLowerCase().includes('segment')) {
        responseMessage = {
          id: (Date.now() + 2).toString(),
          content: "Here's the breakdown of customers by segment. Regular customers make up the largest segment at 39%, followed by Occasional buyers at 26%. High Value customers represent 11% of the total but contribute 35% of revenue.",
          sender: 'assistant',
          type: 'chart-customer',
          timestamp: new Date()
        };
      } else if (input.toLowerCase().includes('conversion') || input.toLowerCase().includes('channel') || input.toLowerCase().includes('marketing')) {
        responseMessage = {
          id: (Date.now() + 2).toString(),
          content: "Email campaigns have the highest conversion rate at 6.5%, followed by Direct traffic at 5.1%. Social Media has the lowest conversion rate at 2.7%, suggesting we might need to optimize our social strategy.",
          sender: 'assistant',
          type: 'chart-conversion',
          timestamp: new Date()
        };
      } else {
        responseMessage = {
          id: (Date.now() + 2).toString(),
          content: "Based on your question, I'd recommend looking at our customer retention metrics and conversion funnels. Our data shows that improving the checkout flow could increase conversions by 15%, and targeted email campaigns to at-risk customers could reduce churn by 22%.",
          sender: 'assistant',
          type: 'text',
          timestamp: new Date()
        };
      }
      
      return [...filtered, responseMessage];
    });
  };
  
  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };
  
  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <Card className={`dark:bg-dark-card transition-all duration-300 ${isExpanded ? 'fixed inset-4 z-50' : 'relative'}`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <CardTitle>Data Chat Assistant</CardTitle>
          <Badge variant="outline" className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
            Beta
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className={`p-0 ${isExpanded ? 'h-[calc(100vh-12rem)]' : 'h-[400px]'}`}>
        <div className="flex flex-col h-full">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {message.type === 'loading' ? (
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                          />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{message.content}</span>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm">{message.content}</p>
                        
                        {/* Chart visualizations */}
                        {message.type === 'chart-revenue' && (
                          <div className="mt-3 bg-white dark:bg-gray-900 p-2 rounded-lg">
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Revenue (2024)</p>
                            <AreaChart
                              className="h-40"
                              data={revenueData}
                              index="date"
                              categories={["revenue"]}
                              colors={["indigo"]}
                              valueFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                              showLegend={false}
                              showAnimation={true}
                              curveType="monotone"
                            />
                          </div>
                        )}
                        
                        {message.type === 'chart-customer' && (
                          <div className="mt-3 bg-white dark:bg-gray-900 p-2 rounded-lg">
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Customer Segments</p>
                            <BarChart
                              className="h-40"
                              data={customerData}
                              index="segment"
                              categories={["count"]}
                              colors={["indigo"]}
                              valueFormatter={(value) => value.toLocaleString()}
                              showLegend={false}
                              showAnimation={true}
                            />
                          </div>
                        )}
                        
                        {message.type === 'chart-conversion' && (
                          <div className="mt-3 bg-white dark:bg-gray-900 p-2 rounded-lg">
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Conversion Rate by Channel (%)</p>
                            <BarChart
                              className="h-40"
                              data={conversionData}
                              index="channel"
                              categories={["rate"]}
                              colors={["indigo"]}
                              valueFormatter={(value) => `${value.toFixed(1)}%`}
                              showLegend={false}
                              showAnimation={true}
                            />
                          </div>
                        )}
                        
                        <div className="mt-1 text-right">
                          <span className="text-xs opacity-70">
                            {new Intl.DateTimeFormat('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            }).format(message.timestamp)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>
          
          {/* Suggested questions */}
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Suggested questions</p>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.slice(0, 4).map((question, index) => (
                <Badge 
                  key={index}
                  className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 border-0"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Input area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Ask about your data..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                {input && (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={() => setInput('')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={handleSendMessage}
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
