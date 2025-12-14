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
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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

  // Diversification metrics
  const diversificationScore = 7.8; // out of 10
  const riskAllocation = {
    low: 35,
    medium: 45,
    high: 20
  };
  const assetTypes = 4;
  const sectors = 5;
  return (
    <div className="space-y-6">
      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">${portfolioStats.totalValue.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-500 font-medium">
                +${portfolioStats.todayChange.toFixed(2)} ({portfolioStats.todayChangePercent}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Gain/Loss</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-green-600">
              +${portfolioStats.totalGainLoss.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-green-500 font-medium">
                +{portfolioStats.totalGainLossPercent}% overall
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
            <div className="text-2xl font-bold">${portfolioStats.totalInvested.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Across {topHoldings.length} positions
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Performance</CardTitle>
              <Star className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">8.5/10</div>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs text-muted-foreground">
                Strong performance
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Holdings Pie Chart */}
        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Portfolio Allocation
            </CardTitle>
            <CardDescription>Distribution of your top holdings</CardDescription>
          </CardHeader>
          <CardContent>
            <SimplePieChart data={pieChartData} />
          </CardContent>
        </Card>

        {/* Diversification Score */}
        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Diversification Score
            </CardTitle>
            <CardDescription>How well diversified is your portfolio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Overall Score */}
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {diversificationScore}/10
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">Well Diversified</span>
              </div>
            </div>

            {/* Risk Allocation */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Risk Allocation</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Low Risk</span>
                  <span className="font-medium">{riskAllocation.low}%</span>
                </div>
                <Progress value={riskAllocation.low} className="h-2" />
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Medium Risk</span>
                  <span className="font-medium">{riskAllocation.medium}%</span>
                </div>
                <Progress value={riskAllocation.medium} className="h-2" />
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">High Risk</span>
                  <span className="font-medium">{riskAllocation.high}%</span>
                </div>
                <Progress value={riskAllocation.high} className="h-2" />
              </div>
            </div>

            {/* Diversification Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-xl font-bold">{assetTypes}</div>
                <div className="text-xs text-muted-foreground">Asset Types</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-xl font-bold">{sectors}</div>
                <div className="text-xs text-muted-foreground">Sectors</div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="pt-2 space-y-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Target className="w-4 h-4" />
                Recommendations
              </h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  Good sector diversification
                </div>
                <div className="flex items-center gap-2 text-xs text-yellow-600">
                  <AlertTriangle className="w-3 h-3" />
                  Consider adding international exposure
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Allocation by Sector */}
      <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Sector Allocation
          </CardTitle>
          <CardDescription>Distribution across different sectors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Technology</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">47%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Financial</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="w-1/4 h-full bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">18%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Healthcare</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="w-1/5 h-full bg-purple-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">15%</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Consumer</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="w-1/6 h-full bg-orange-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">12%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Energy</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="w-1/12 h-full bg-yellow-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Other</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full">
                    <div className="w-1/12 h-full bg-gray-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium">3%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your latest portfolio transactions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: 'buy', symbol: 'AAPL', shares: 50, price: 150.25, date: '2 hours ago' },
              { type: 'sell', symbol: 'MSFT', shares: 25, price: 340.80, date: '1 day ago' },
              { type: 'dividend', symbol: 'GOOGL', amount: 125.50, date: '3 days ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border/30 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'buy' ? 'bg-green-100 text-green-600' :
                    activity.type === 'sell' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'buy' ? <Plus className="w-4 h-4" /> :
                     activity.type === 'sell' ? <ArrowUpRight className="w-4 h-4" /> :
                     <DollarSign className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium capitalize">
                      {activity.type} {activity.symbol}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.shares ? `${activity.shares} shares at $${activity.price}` : 
                       `Dividend: $${activity.amount}`}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;