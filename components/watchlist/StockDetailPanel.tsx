"use client";

import { WatchlistStock } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  X, 
  TrendingUp, 
  TrendingDown,
  Plus,
  BarChart3,
  Bell,
  Trash2,
  Edit,
  Target,
  Calendar
} from "lucide-react";
import { useState } from "react";

interface StockDetailPanelProps {
  stock: WatchlistStock;
  onClose: () => void;
}

export default function StockDetailPanel({ stock, onClose }: StockDetailPanelProps) {
  const [chartPeriod, setChartPeriod] = useState<'1D' | '1W' | '1M' | '3M' | '6M' | '1Y'>('1D');
  const [chartType, setChartType] = useState<'candlestick' | 'line' | 'area'>('candlestick');

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getHealthBadge = (score: number) => {
    if (score >= 80) return { label: "Strong", color: "bg-green-500" };
    if (score >= 60) return { label: "Moderate", color: "bg-yellow-500" };
    return { label: "Weak", color: "bg-red-500" };
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return "text-green-600 dark:text-green-400";
    if (change < 0) return "text-red-600 dark:text-red-400";
    return "text-muted-foreground";
  };

  const healthBadge = getHealthBadge(stock.healthScore);
  const priceChange = stock.currentPrice * (stock.dayChange / 100);
  const targetReached = stock.targetPrice && stock.currentPrice >= stock.targetPrice;

  // Days since added
  const daysSinceAdded = Math.floor(
    (new Date().getTime() - new Date(stock.dateAdded).getTime()) / (1000 * 60 * 60 * 24)
  );

  // Quick metrics data
  const quickMetrics = [
    { 
      label: "P/E Ratio", 
      value: stock.pe.toFixed(1), 
      comparison: "vs sector avg",
      isGood: true 
    },
    { 
      label: "ROE", 
      value: `${stock.roe.toFixed(1)}%`,
      comparison: "Return on Equity",
      isGood: stock.roe > 15
    },
    { 
      label: "Revenue Growth", 
      value: `${stock.revenueGrowth}% YoY`,
      comparison: "Year over Year",
      isGood: stock.revenueGrowth > 10
    },
    { 
      label: "Debt/Equity", 
      value: stock.debtToEquity.toFixed(2),
      comparison: "Lower is better",
      isGood: stock.debtToEquity < 0.5
    },
    { 
      label: "Market Cap", 
      value: stock.marketCap,
      comparison: "Total value",
      isGood: true
    },
    { 
      label: "Dividend Yield", 
      value: `${stock.dividendYield}%`,
      comparison: "Annual return",
      isGood: stock.dividendYield > 2
    },
    { 
      label: "52W Range", 
      value: `₹${stock.week52Low} - ₹${stock.week52High}`,
      comparison: "Price range",
      isGood: true
    },
    { 
      label: "Analyst Rating", 
      value: stock.analystRating,
      comparison: `${stock.analystCount} analysts`,
      isGood: stock.analystRating === "Buy"
    },
  ];

  // Mock news data
  const recentNews = [
    {
      title: `${stock.name} Q2 results beat estimates`,
      time: "2h ago"
    },
    {
      title: "Banking sector rally continues on strong earnings",
      time: "1d ago"
    },
    {
      title: `${stock.sector} stocks gain on positive outlook`,
      time: "3d ago"
    }
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card px-6 py-4 shrink-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">{stock.name}</h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onClose}
                className="ml-auto"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">₹{stock.currentPrice.toLocaleString()}</span>
              <div className={cn("flex items-center gap-1 text-lg font-semibold", getPriceChangeColor(stock.dayChange))}>
                {stock.dayChange > 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                {stock.dayChange > 0 ? '+' : ''}₹{priceChange.toFixed(2)} ({stock.dayChange > 0 ? '+' : ''}{stock.dayChange}%)
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Health:</span>
            <Badge className={healthBadge.color}>
              {stock.healthScore}/100
            </Badge>
            <span className={cn("font-medium", getHealthColor(stock.healthScore))}>
              {healthBadge.label}
            </span>
          </div>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">Sector: {stock.sector}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">52W: ₹{stock.week52Low} - ₹{stock.week52High}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{stock.marketCap}</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-6">
          {/* Quick Metrics */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Metrics</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickMetrics.map((metric, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    {metric.isGood && (
                      <span className="text-xs text-green-600 dark:text-green-400">✓</span>
                    )}
                  </div>
                  <div className="text-xl font-bold mb-1">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.comparison}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Live Chart */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Price Chart</h3>
            <Card className="p-4">
              {/* Chart Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {(['1D', '1W', '1M', '3M', '6M', '1Y'] as const).map(period => (
                    <button
                      key={period}
                      onClick={() => setChartPeriod(period)}
                      className={cn(
                        "px-3 py-1 rounded text-xs font-medium transition-colors",
                        chartPeriod === period
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      {period}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1">
                  {(['candlestick', 'line', 'area'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setChartType(type)}
                      className={cn(
                        "px-3 py-1 rounded text-xs font-medium capitalize transition-colors",
                        chartType === type
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Placeholder Chart */}
              <div className="bg-muted/20 rounded-lg h-[300px] flex items-center justify-center border-2 border-dashed">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Chart Placeholder - {chartType} view • {chartPeriod}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    TradingView widget integration coming soon
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Watchlist Context */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Your Tracking Info</h3>
            <Card className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Added to watchlist:</span>
                <span className="font-medium">{daysSinceAdded} day{daysSinceAdded !== 1 ? 's' : ''} ago</span>
              </div>

              {stock.targetPrice && (
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Your target price:</span>
                  <span className="font-medium">₹{stock.targetPrice.toLocaleString()}</span>
                  {targetReached && (
                    <Badge variant="default" className="ml-2">
                      ✅ Reached today!
                    </Badge>
                  )}
                </div>
              )}

              {stock.alerts.length > 0 && (
                <div className="space-y-2">
                  {stock.alerts.map((alert, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Bell className={cn(
                        "h-4 w-4",
                        alert.triggered ? "text-orange-500" : "text-muted-foreground"
                      )} />
                      <span className="text-muted-foreground">
                        {alert.type === 'price' ? 'Price alert set:' : 
                         alert.type === 'health' ? 'Health alert set:' : 'Event alert:'}
                      </span>
                      <span className="font-medium">
                        {alert.type === 'price' ? `₹${alert.value}` : alert.value}
                      </span>
                      {alert.triggered && (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          ⚠️ Triggered
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {stock.userNote && (
                <div className="pt-3 border-t">
                  <p className="text-sm font-medium mb-2">Your notes:</p>
                  <p className="text-sm text-muted-foreground italic">
                    "{stock.userNote}"
                  </p>
                </div>
              )}

              {stock.lists.length > 0 && (
                <div className="pt-3 border-t">
                  <p className="text-sm font-medium mb-2">Lists:</p>
                  <div className="flex flex-wrap gap-2">
                    {stock.lists.map(list => (
                      <Badge key={list} variant="outline">
                        {list}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-3 border-t flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Note
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Target className="h-4 w-4 mr-2" />
                  Update Target
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Bell className="h-4 w-4 mr-2" />
                  Manage Alerts
                </Button>
              </div>
            </Card>
          </div>

          {/* Recent News */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Recent News & Events</h3>
            <Card className="p-4 space-y-3">
              {recentNews.map((news, index) => (
                <div 
                  key={index}
                  className="pb-3 last:pb-0 last:border-0 border-b"
                >
                  <p className="text-sm font-medium mb-1">{news.title}</p>
                  <p className="text-xs text-muted-foreground">{news.time}</p>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="border-t bg-card px-6 py-4 shrink-0">
        <div className="grid grid-cols-4 gap-3">
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add to Portfolio
          </Button>
          <Button variant="outline" className="w-full">
            <BarChart3 className="h-4 w-4 mr-2" />
            Deep Analysis
          </Button>
          <Button variant="outline" className="w-full">
            <Bell className="h-4 w-4 mr-2" />
            Set Alert
          </Button>
          <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
