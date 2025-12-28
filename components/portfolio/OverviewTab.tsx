"use client";

import React from 'react';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Activity,
  Target,
  Plus,
  ArrowUpRight,
  Star,
  Shield,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Award,
  TrendingDown as ChartDown,
  BarChart3,
  Building2,
  FileText,
  Search,
  Upload,
  Zap,
  Clock,
  Bell,
  Heart,
  Layers,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface OverviewTabProps {
  portfolioStats: {
    totalValue: number;
    todayChange: number;
    todayChangePercent: number;
    totalGainLoss: number;
    totalGainLossPercent: number;
    totalInvested: number;
  };
  topHoldings: Array<{
    symbol: string;
    name: string;
    value: number;
    percentage: number;
    change: number;
  }>;
}

// Simple SVG Pie Chart Component
const SimplePieChart: React.FC<{ data: Array<{label: string, value: number, percentage: number, color: string}> }> = ({ data }) => {
  let cumulativePercentage = 0;

  const createArcPath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <svg width="200" height="200" className="transform -rotate-90">
          {data.map((item, index) => {
            const startAngle = cumulativePercentage * 3.6;
            const endAngle = (cumulativePercentage + item.percentage) * 3.6;
            cumulativePercentage += item.percentage;
            
            return (
              <path
                key={index}
                d={createArcPath(100, 100, 80, startAngle, endAngle)}
                fill={item.color}
                className="hover:opacity-80 transition-opacity"
              />
            );
          })}
          {/* Center circle for donut effect */}
          <circle cx="100" cy="100" r="40" fill="hsl(var(--background))" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-bold">5</span>
          <span className="text-xs text-muted-foreground">Holdings</span>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.percentage.toFixed(1)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OverviewTab: React.FC<OverviewTabProps> = ({ portfolioStats, topHoldings }) => {
  // Prepare pie chart data with colors
  const pieChartData = topHoldings.map((holding, index) => ({
    label: holding.symbol,
    value: holding.value,
    percentage: holding.percentage,
    color: [
      '#3b82f6', // blue
      '#10b981', // emerald
      '#8b5cf6', // violet
      '#f59e0b', // amber
      '#ef4444'  // red
    ][index] || '#6b7280'
  }));

  // Mock data for new sections
  const todayGainers = [
    { symbol: 'AAPL', name: 'Apple Inc.', change: 5.2, value: 12500 },
    { symbol: 'MSFT', name: 'Microsoft', change: 3.8, value: 8900 },
    { symbol: 'GOOGL', name: 'Alphabet', change: 2.1, value: 6700 },
  ];

  const todayLosers = [
    { symbol: 'TSLA', name: 'Tesla', change: -2.3, value: 5200 },
    { symbol: 'NVDA', name: 'NVIDIA', change: -1.5, value: 4800 },
  ];

  const healthScore = {
    overall: 7.8,
    categories: [
      { name: 'Financial Health', score: 8.2, icon: DollarSign },
      { name: 'Growth Potential', score: 7.5, icon: TrendingUp },
      { name: 'Risk Management', score: 7.8, icon: Shield },
      { name: 'Diversification', score: 8.0, icon: PieChart },
    ],
    distribution: {
      excellent: 40,
      good: 35,
      average: 20,
      poor: 5,
    }
  };

  const sectorDistribution = [
    { sector: 'Technology', percentage: 47, amount: 18800, color: '#3b82f6' },
    { sector: 'Financial', percentage: 18, amount: 7200, color: '#10b981' },
    { sector: 'Healthcare', percentage: 15, amount: 6000, color: '#8b5cf6' },
    { sector: 'Consumer', percentage: 12, amount: 4800, color: '#f59e0b' },
    { sector: 'Energy', percentage: 5, amount: 2000, color: '#eab308' },
    { sector: 'Other', percentage: 3, amount: 1200, color: '#6b7280' },
  ];

  const marketCapDistribution = [
    { type: 'Large Cap', percentage: 65, amount: 26000 },
    { type: 'Mid Cap', percentage: 25, amount: 10000 },
    { type: 'Small Cap', percentage: 10, amount: 4000 },
  ];

  const recentActivity = [
    { type: 'buy', title: 'Purchased AAPL', description: '50 shares at $150.25', time: '2 hours ago', icon: Plus },
    { type: 'alert', title: 'Price Alert Triggered', description: 'MSFT reached target price', time: '5 hours ago', icon: Bell },
    { type: 'sell', title: 'Sold GOOGL', description: '25 shares at $140.80', time: '1 day ago', icon: TrendingUp },
    { type: 'dividend', title: 'Dividend Received', description: 'AAPL paid $125.50', time: '2 days ago', icon: DollarSign },
    { type: 'update', title: 'Portfolio Rebalanced', description: 'Adjusted sector allocation', time: '3 days ago', icon: Activity },
  ];

  const aiInsights = [
    {
      type: 'opportunity',
      title: 'Strong Tech Momentum',
      description: 'Your tech stocks are outperforming the market by 12%. Consider taking partial profits.',
      icon: Sparkles,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      type: 'risk',
      title: 'High Concentration Alert',
      description: 'Technology sector represents 47% of portfolio. Consider diversifying.',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50 dark:bg-yellow-950/20',
    },
    {
      type: 'achievement',
      title: 'Portfolio Milestone',
      description: 'You\'ve achieved a new all-time high portfolio value!',
      icon: Award,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-950/20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: HERO STATS (The Big Picture)
          "Here's your portfolio right now"
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Overview</h2>
          <p className="text-sm text-muted-foreground">Your complete portfolio at a glance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold">${portfolioStats.totalValue.toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500 font-medium">
                  +${portfolioStats.todayChange.toFixed(2)} ({portfolioStats.todayChangePercent}%) today
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Returns</CardTitle>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-green-600">
                +${portfolioStats.totalGainLoss.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-green-500 font-medium">
                  +{portfolioStats.totalGainLossPercent}% overall return
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
                <Target className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold">${portfolioStats.totalInvested.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-2">
                Across {topHoldings.length} positions
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Health Score</CardTitle>
                <Heart className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold">{healthScore.overall}/10</div>
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500 font-medium">
                  Healthy portfolio
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: TODAY'S MARKET IMPACT (What Moved)
          "Here's what moved today"
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold">Today's Market Impact</h3>
          <p className="text-sm text-muted-foreground">What moved in your portfolio today</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Gainers */}
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <TrendingUp className="w-5 h-5" />
                Top Gainers Today
              </CardTitle>
              <CardDescription>Your best performers today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayGainers.map((stock, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div>
                      <p className="font-semibold">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">+{stock.change}%</p>
                      <p className="text-xs text-muted-foreground">${stock.value.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Losers */}
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <ChartDown className="w-5 h-5" />
                Top Decliners Today
              </CardTitle>
              <CardDescription>Stocks that declined today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayLosers.map((stock, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <div>
                      <p className="font-semibold">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">{stock.change}%</p>
                      <p className="text-xs text-muted-foreground">${stock.value.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Market Context */}
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Market (NIFTY 50)</span>
                  <span className="font-medium text-green-600">+0.8%</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Your Portfolio</span>
                  <span className="font-medium text-green-600">+{portfolioStats.todayChangePercent}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: PORTFOLIO HEALTH SNAPSHOT (How Healthy)
          "Here's how healthy it is"
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold">Portfolio Health Snapshot</h3>
          <p className="text-sm text-muted-foreground">Comprehensive health analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Overall Health Score */}
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Overall Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <svg className="w-32 h-32" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="hsl(142, 76%, 36%)"
                      strokeWidth="10"
                      strokeDasharray={`${healthScore.overall * 31.4} 314`}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold">{healthScore.overall}</span>
                    <span className="text-xs text-muted-foreground">out of 10</span>
                  </div>
                </div>
                <div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 dark:bg-green-950/20">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Healthy Portfolio
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Health Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthScore.categories.map((category, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <category.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm font-bold">{category.score}/10</span>
                    </div>
                    <Progress value={category.score * 10} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Distribution */}
        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Holdings by Health Tier
            </CardTitle>
            <CardDescription>Distribution of your stocks by health rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{healthScore.distribution.excellent}%</div>
                <div className="text-xs text-muted-foreground mt-1">Excellent</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{healthScore.distribution.good}%</div>
                <div className="text-xs text-muted-foreground mt-1">Good</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{healthScore.distribution.average}%</div>
                <div className="text-xs text-muted-foreground mt-1">Average</div>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{healthScore.distribution.poor}%</div>
                <div className="text-xs text-muted-foreground mt-1">Needs Attention</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: HOLDINGS DISTRIBUTION (How Diversified)
          "Here's how it's distributed"
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold">Holdings Distribution</h3>
          <p className="text-sm text-muted-foreground">Portfolio diversification analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Sector Distribution */}
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                By Sector
              </CardTitle>
              <CardDescription>Distribution across different sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sectorDistribution.map((sector, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: sector.color }}
                        />
                        <span>{sector.sector}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">${sector.amount.toLocaleString()}</span>
                        <span className="font-semibold w-12 text-right">{sector.percentage}%</span>
                      </div>
                    </div>
                    <Progress value={sector.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Cap & Concentration */}
          <div className="space-y-4">
            {/* Market Cap Distribution */}
            <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  By Market Cap
                </CardTitle>
                <CardDescription>Large, mid, and small cap allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {marketCapDistribution.map((cap, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{cap.type}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground">${cap.amount.toLocaleString()}</span>
                          <span className="font-semibold w-12 text-right">{cap.percentage}%</span>
                        </div>
                      </div>
                      <Progress value={cap.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Holdings Concentration */}
            <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Concentration
                </CardTitle>
                <CardDescription>Your top holdings percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <SimplePieChart data={pieChartData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: RECENT ACTIVITY FEED (What Happened)
          "Here's what happened recently"
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Timeline of recent portfolio events</p>
        </div>

        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-4 border-b border-border/30 last:border-b-0 last:pb-0">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center shrink-0
                    ${activity.type === 'buy' ? 'bg-green-100 text-green-600 dark:bg-green-950/20' :
                      activity.type === 'sell' ? 'bg-blue-100 text-blue-600 dark:bg-blue-950/20' :
                      activity.type === 'alert' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-950/20' :
                      activity.type === 'dividend' ? 'bg-purple-100 text-purple-600 dark:bg-purple-950/20' :
                      'bg-gray-100 text-gray-600 dark:bg-gray-950/20'}
                  `}>
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: AI INSIGHTS & ALERTS (What to Notice)
          "Here's what to pay attention to"
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold">AI Insights & Alerts</h3>
          <p className="text-sm text-muted-foreground">Opportunities, risks, and achievements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight, idx) => (
            <Card key={idx} className={`border-border/50 ${insight.bg}`}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full ${insight.bg} flex items-center justify-center shrink-0`}>
                      <insight.icon className={`w-5 h-5 ${insight.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {insight.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7: QUICK ACTIONS BAR (What to Do)
          "Here's what you can do"
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">Manage your portfolio efficiently</p>
        </div>

        <Card className="border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                <Plus className="w-5 h-5" />
                <div className="text-center">
                  <div className="font-semibold">Add Stock</div>
                  <div className="text-xs text-muted-foreground">Buy new position</div>
                </div>
              </Button>

              <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                <Search className="w-5 h-5" />
                <div className="text-center">
                  <div className="font-semibold">Analyze</div>
                  <div className="text-xs text-muted-foreground">Deep dive stocks</div>
                </div>
              </Button>

              <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                <BarChart3 className="w-5 h-5" />
                <div className="text-center">
                  <div className="font-semibold">Compare</div>
                  <div className="text-xs text-muted-foreground">vs Benchmarks</div>
                </div>
              </Button>

              <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                <Upload className="w-5 h-5" />
                <div className="text-center">
                  <div className="font-semibold">Import</div>
                  <div className="text-xs text-muted-foreground">Upload trades</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;