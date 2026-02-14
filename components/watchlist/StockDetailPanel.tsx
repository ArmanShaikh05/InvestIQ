"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WatchlistStock } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bell,
  Calendar,
  Edit,
  Plus,
  Target,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface StockDetailPanelProps {
  stock: WatchlistStock;
  onClose: () => void;
}

export default function StockDetailPanel({ stock }: StockDetailPanelProps) {
  const [chartPeriod, setChartPeriod] = useState<
    "1D" | "1W" | "1M" | "3M" | "6M" | "1Y"
  >("1D");
  const [chartType, setChartType] = useState<"candlestick" | "line" | "area">(
    "candlestick",
  );

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
  const targetReached =
    stock.targetPrice && stock.currentPrice >= stock.targetPrice;

  // Days since added
  const daysSinceAdded = Math.floor(
    (new Date().getTime() - new Date(stock.dateAdded).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  // Quick metrics data
  const quickMetrics = [
    {
      label: "P/E Ratio",
      value: stock.pe.toFixed(1),
      comparison: "vs sector avg",
      isGood: true,
    },
    {
      label: "ROE",
      value: `${stock.roe.toFixed(1)}%`,
      comparison: "Return on Equity",
      isGood: stock.roe > 15,
    },
    {
      label: "Revenue Growth",
      value: `${stock.revenueGrowth}% YoY`,
      comparison: "Year over Year",
      isGood: stock.revenueGrowth > 10,
    },
    {
      label: "Debt/Equity",
      value: stock.debtToEquity.toFixed(2),
      comparison: "Lower is better",
      isGood: stock.debtToEquity < 0.5,
    },
    {
      label: "Market Cap",
      value: stock.marketCap,
      comparison: "Total value",
      isGood: true,
    },
    {
      label: "Dividend Yield",
      value: `${stock.dividendYield}%`,
      comparison: "Annual return",
      isGood: stock.dividendYield > 2,
    },
    {
      label: "52W Range",
      value: `₹${stock.week52Low} - ₹${stock.week52High}`,
      comparison: "Price range",
      isGood: true,
    },
    {
      label: "Analyst Rating",
      value: stock.analystRating,
      comparison: `${stock.analystCount} analysts`,
      isGood: stock.analystRating === "Buy",
    },
  ];

  // Mock news data
  const recentNews = [
    {
      title: `${stock.name} Q2 results beat estimates`,
      time: "2h ago",
    },
    {
      title: "Banking sector rally continues on strong earnings",
      time: "1d ago",
    },
    {
      title: `${stock.sector} stocks gain on positive outlook`,
      time: "3d ago",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Modern Compact Header */}
      <div className="border-b px-6 py-4 shrink-0">
        <div className="flex items-center justify-between gap-4">
          {/* Stock Info */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-lg font-bold text-primary">
                {stock.ticker.substring(0, 2)}
              </span>
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold truncate">{stock.name}</h2>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-2xl font-bold">
                  ₹{stock.currentPrice.toLocaleString()}
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold px-2 py-0.5 rounded-md",
                    stock.dayChange >= 0
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400",
                  )}
                >
                  {stock.dayChange > 0 ? "+" : ""}
                  {stock.dayChange.toFixed(2)}%
                </span>
                <span className="text-xs text-muted-foreground">
                  {stock.ticker}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button size="sm" className="h-8">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Add to Portfolio
            </Button>
            <Button size="sm" variant="outline" className="h-8">
              <Bell className="h-3.5 w-3.5 mr-1.5" />
              Alert
            </Button>
            <Button size="sm" variant="outline" className="h-8">
              <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
              Analysis
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-5">
          {/* Live Chart */}
          <div>
            <h3 className="text-base font-semibold mb-2">Price Chart</h3>
            <Card className="p-3">
              {/* Chart Controls */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1">
                  {(["1D", "1W", "1M", "3M", "6M", "1Y"] as const).map(
                    (period) => (
                      <button
                        key={period}
                        onClick={() => setChartPeriod(period)}
                        className={cn(
                          "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                          chartPeriod === period
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted",
                        )}
                      >
                        {period}
                      </button>
                    ),
                  )}
                </div>
                <div className="flex gap-1">
                  {(["candlestick", "line", "area"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setChartType(type)}
                      className={cn(
                        "px-2.5 py-1 rounded text-xs font-medium capitalize transition-colors",
                        chartType === type
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted",
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Placeholder Chart */}
              <div className="bg-muted/20 rounded-lg h-[250px] flex items-center justify-center border-2 border-dashed">
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

          {/* Quick Metrics */}
          <div>
            <h3 className="text-base font-semibold mb-2">Quick Metrics</h3>
            <div className="grid grid-cols-4 gap-2">
              {quickMetrics.map((metric, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-start justify-between mb-0.5">
                    <span className="text-xs text-muted-foreground">
                      {metric.label}
                    </span>
                    {metric.isGood && (
                      <span className="text-[10px] text-green-600 dark:text-green-400">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="text-lg font-bold mb-0.5">{metric.value}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {metric.comparison}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Watchlist Context */}
          <div>
            <h3 className="text-base font-semibold mb-2">Your Tracking Info</h3>
            <div className="grid grid-cols-2 gap-2">
              {/* Added Date Card */}
              <Card className="p-3">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Tracking Since
                    </p>
                    <p className="font-semibold text-base">
                      {daysSinceAdded} day{daysSinceAdded !== 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(stock.dateAdded).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Target Price Card */}
              {stock.targetPrice && (
                <Card
                  className={cn(
                    "p-3",
                    targetReached && "bg-green-500/5 border-green-500/20",
                  )}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                        targetReached ? "bg-green-500/20" : "bg-orange-500/10",
                      )}
                    >
                      <Target
                        className={cn(
                          "h-4 w-4",
                          targetReached ? "text-green-500" : "text-orange-500",
                        )}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-xs text-muted-foreground">
                          Target Price
                        </p>
                        {targetReached && (
                          <Badge
                            variant="default"
                            className="h-4 text-[10px] bg-green-500"
                          >
                            ✓ Reached
                          </Badge>
                        )}
                      </div>
                      <p className="font-semibold text-base">
                        ₹{stock.targetPrice.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {targetReached
                          ? `+₹${(stock.currentPrice - stock.targetPrice).toFixed(2)} above target`
                          : `₹${(stock.targetPrice - stock.currentPrice).toFixed(2)} to go`}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Active Alerts */}
              {stock.alerts.length > 0 && (
                <Card className="p-3 col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="h-3.5 w-3.5 text-muted-foreground" />
                    <h4 className="text-sm font-semibold">Active Alerts</h4>
                    <Badge variant="secondary" className="ml-auto">
                      {stock.alerts.length}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {stock.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center justify-between p-2.5 rounded-lg border",
                          alert.triggered
                            ? "bg-orange-500/5 border-orange-500/20"
                            : "bg-muted/30",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-7 h-7 rounded-full flex items-center justify-center",
                              alert.triggered ? "bg-orange-500/20" : "bg-muted",
                            )}
                          >
                            <Bell
                              className={cn(
                                "h-3.5 w-3.5",
                                alert.triggered
                                  ? "text-orange-500"
                                  : "text-muted-foreground",
                              )}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {alert.type === "price"
                                ? `Price Alert: ₹${alert.value}`
                                : alert.type === "health"
                                  ? `Health Score: ${alert.value}`
                                  : `Event: ${alert.value}`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {alert.type === "price" &&
                                `Notify when price reaches ₹${alert.value}`}
                              {alert.type === "health" &&
                                `Notify when health improves to ${alert.value}`}
                              {alert.type === "event" &&
                                "Event-based notification"}
                            </p>
                          </div>
                        </div>
                        {alert.triggered && (
                          <Badge
                            variant="outline"
                            className="text-orange-600 border-orange-600"
                          >
                            Triggered
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Notes and Lists */}
            <Card className="p-3 mt-2">
              {stock.userNote && (
                <div className="mb-2 pb-2 border-b">
                  <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                    <Edit className="h-3 w-3" />
                    Your Notes
                  </p>
                  <p className="text-sm text-foreground">"{stock.userNote}"</p>
                </div>
              )}

              {stock.lists.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Watchlists
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {stock.lists.map((list) => (
                      <Badge
                        key={list}
                        variant="secondary"
                        className="font-normal"
                      >
                        {list}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Button size="sm" variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit Note
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                <Target className="h-4 w-4 mr-2" />
                Set Target
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                <Bell className="h-4 w-4 mr-2" />
                Add Alert
              </Button>
            </div>
          </div>

          {/* Recent News */}
          <div>
            <h3 className="text-base font-semibold mb-2">Recent News & Events</h3>
            <Card className="p-3 space-y-2">
              {recentNews.map((news, index) => (
                <div
                  key={index}
                  className="pb-2 last:pb-0 last:border-0 border-b"
                >
                  <p className="text-sm font-medium mb-1">{news.title}</p>
                  <p className="text-xs text-muted-foreground">{news.time}</p>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
