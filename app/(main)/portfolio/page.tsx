"use client";

import React, { useState } from 'react';
import {
  Eye,
  Briefcase,
  TrendingUp,
  BarChart3,
  Clock,
  Plus,
  Settings,
  Heart,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import OverviewTab from "@/components/portfolio/OverviewTab";
import HoldingsTab from "@/components/portfolio/HoldingsTab";
import HealthTab from "@/components/portfolio/HealthTab";
import PerformanceTab from "@/components/portfolio/PerformanceTab";
import AnalyticsTab from "@/components/portfolio/AnalyticsTab";
import HistoryTab from "@/components/portfolio/HistoryTab";

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for portfolio
  const portfolioStats = {
    totalValue: 125430.50,
    todayChange: 2450.30,
    todayChangePercent: 1.98,
    totalGainLoss: 15230.50,
    totalGainLossPercent: 13.78,
    totalInvested: 110200.00,
  };

  const topHoldings = [
    { symbol: 'AAPL', name: 'Apple Inc.', value: 25430, percentage: 20.3, change: 2.4 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', value: 18650, percentage: 14.9, change: -1.2 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', value: 15280, percentage: 12.2, change: 3.1 },
    { symbol: 'TSLA', name: 'Tesla Inc.', value: 12940, percentage: 10.3, change: 5.6 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', value: 11230, percentage: 9.0, change: 1.8 },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'health', label: 'Health', icon: Heart },
    { id: 'holdings', label: 'Holdings', icon: Briefcase },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'history', label: 'History', icon: Clock },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab portfolioStats={portfolioStats} topHoldings={topHoldings} />;
      case 'health':
        return <HealthTab />;
      case 'holdings':
        return <HoldingsTab />;
      case 'performance':
        return <PerformanceTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'history':
        return <HistoryTab />;
      default:
        return <OverviewTab portfolioStats={portfolioStats} topHoldings={topHoldings} />;
    }
  };

  return (
    <div className="space-y-6 p-6 pt-2">
    

      {/* Modern Tab Navigation */}
      <div className="relative">
        <div className="flex items-center gap-8 border-b border-border/30">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative pb-4 px-1 text-sm font-medium transition-all duration-300 ease-in-out
                  flex items-center gap-2 hover:text-foreground
                  ${activeTab === tab.id 
                    ? 'text-foreground' 
                    : 'text-muted-foreground hover:text-muted-foreground/80'
                  }
                `}
              >
                <IconComponent className="w-4 h-4" />
                {tab.label}
                
                {/* Animated bottom border */}
                <div 
                  className={`
                    absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out
                    ${activeTab === tab.id ? 'w-full opacity-100' : 'w-0 opacity-0'}
                  `} 
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PortfolioPage;

