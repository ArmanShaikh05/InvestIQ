"use client";

import { useState } from "react";
import { TrendingUp, Shield, Eye, BarChart3, Zap, Brain, Target, Lightbulb, Clock } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";

// Define insight categories with their themes and data
const insightCategories = {
  all: {
    name: "All Insights",
    icon: Brain,
    color: "bg-gradient-to-r from-purple-500/20 to-blue-500/20",
    borderColor: "border-purple-500/30",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    badgeColor: "bg-purple-500/10 text-purple-400"
  },
  portfolio: {
    name: "Portfolio",
    icon: BarChart3,
    color: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    badgeColor: "bg-blue-500/10 text-blue-400"
  },
  healthscore: {
    name: "Health Score",
    icon: Shield,
    color: "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
    badgeColor: "bg-green-500/10 text-green-400"
  },
  watchlist: {
    name: "Watchlist",
    icon: Eye,
    color: "bg-gradient-to-r from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    badgeColor: "bg-orange-500/10 text-orange-400"
  },
  opportunities: {
    name: "Opportunities",
    icon: Target,
    color: "bg-gradient-to-r from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-400",
    badgeColor: "bg-pink-500/10 text-pink-400"
  }
};

const aiInsightsData = [
  {
    id: 1,
    category: "portfolio",
    title: "Rebalancing Recommended",
    description: "Your portfolio is overweight in tech stocks. Consider diversifying into healthcare and consumer goods for better risk management.",
    priority: "high",
    actionable: true,
    generatedAt: "2 hours ago"
  },
  {
    id: 2,
    category: "healthscore",
    title: "Health Score Improvement",
    description: "Your portfolio health score improved by 8 points this month due to reduced volatility and better sector allocation.",
    priority: "medium",
    actionable: false,
    generatedAt: "5 hours ago"
  },
  {
    id: 3,
    category: "watchlist",
    title: "Entry Opportunity",
    description: "HDFC Bank in your watchlist has reached your target price of ₹1,580. Consider initiating a position now.",
    priority: "high",
    actionable: true,
    generatedAt: "30 minutes ago"
  },
  {
    id: 4,
    category: "opportunities",
    title: "Undervalued Stock Alert",
    description: "Based on our analysis, Infosys appears undervalued with strong fundamentals. P/E ratio is 15% below industry average.",
    priority: "medium",
    actionable: true,
    generatedAt: "1 hour ago"
  },
  {
    id: 5,
    category: "portfolio",
    title: "Performance Analysis",
    description: "Your portfolio outperformed Nifty 50 by 3.2% this quarter, primarily driven by your financial sector holdings.",
    priority: "low",
    actionable: false,
    generatedAt: "1 day ago"
  },
  {
    id: 6,
    category: "healthscore",
    title: "Risk Assessment",
    description: "Current portfolio beta is 1.2, indicating higher volatility than market. Consider adding some defensive stocks.",
    priority: "medium",
    actionable: true,
    generatedAt: "3 hours ago"
  },
  {
    id: 7,
    category: "watchlist",
    title: "Earnings Alert",
    description: "TCS from your watchlist reports earnings tomorrow. Historical data shows 60% chance of positive movement post-earnings.",
    priority: "high",
    actionable: false,
    generatedAt: "15 minutes ago"
  },
  {
    id: 8,
    category: "opportunities",
    title: "Sector Rotation Signal",
    description: "Banking sector showing strong momentum with increasing FII investments. Consider increasing allocation by 5-8%.",
    priority: "medium",
    actionable: true,
    generatedAt: "4 hours ago"
  }
];

const AiInsights = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof insightCategories>("all");

  const filteredInsights = activeTab === "all" 
    ? aiInsightsData 
    : aiInsightsData.filter(insight => insight.category === activeTab);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "medium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "low": return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="w-full border rounded-xl border-border/50 bg-background/50 backdrop-blur-sm pt-6 pb-6 px-6 flex flex-col shadow-lg shadow-ring/10 hover:shadow-lg hover:shadow-ring/20 transition-all duration-200 ease-in-out">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold">AI Insights</h1>
        </div>
        <Badge variant="outline" className="text-xs animate-pulse">
          <Zap className="w-3 h-3 mr-1" />
          Live
        </Badge>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-background/50 rounded-lg border border-border/30 w-max">
        {Object.entries(insightCategories).map(([key, category]) => {
          const IconComponent = category.icon;
          const isActive = activeTab === key;
          
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key as keyof typeof insightCategories)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/20 text-primary border border-primary/30' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/80'
              }`}
            >
              <IconComponent className="w-3 h-3" />
              <span className="hidden sm:inline">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Insights Grid */}
      <div className="w-full grid gap-4 max-h-96 overflow-y-auto custom-scrollbar pr-1 lg:grid-cols-2">
        {filteredInsights.map((insight) => {
          const category = insightCategories[insight.category as keyof typeof insightCategories];
          const IconComponent = category.icon;
          
          return (
            <div
              key={insight.id}
              className={`group relative p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 h-48 flex flex-col ${category.color} ${category.borderColor}`}
            >
              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-background/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${category.iconBg}`}>
                      <IconComponent className={`w-4 h-4 ${category.iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground">
                      {insight.title}
                    </h3>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs px-2 py-0.5 ${getPriorityColor(insight.priority)}`}
                  >
                    {insight.priority}
                  </Badge>
                </div>

                {/* Description - flex-grow to push footer down */}
                <div className="flex-grow">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                </div>

                {/* Footer - always at bottom */}
                <div className="flex items-center justify-between pt-3 border-t border-border/20 mt-auto">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${category.badgeColor}`}>
                      {category.name}
                    </Badge>
                    {insight.actionable && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 border-blue-500/20">
                        <Lightbulb className="w-2.5 h-2.5 mr-1" />
                        Action
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs px-2 py-0.5 bg-gray-500/10 text-gray-400 border-gray-500/20">
                    <Clock className="w-2.5 h-2.5 mr-1" />
                    {insight.generatedAt}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show message if no insights for selected category */}
      {filteredInsights.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Brain className="w-8 h-8 mb-2 opacity-50" />
          <p className="text-sm">No insights available for this category</p>
        </div>
      )}
    </div>
  );
};

export default AiInsights;
