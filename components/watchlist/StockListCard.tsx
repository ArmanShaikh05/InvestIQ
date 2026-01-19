"use client";

import { WatchlistStock } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Bell,
  Target,
  Plus,
  BarChart3
} from "lucide-react";

interface StockListCardProps {
  stock: WatchlistStock;
  viewMode: 'compact' | 'detailed' | 'health-focus';
  isSelected: boolean;
  onClick: () => void;
}

export default function StockListCard({ 
  stock, 
  viewMode, 
  isSelected, 
  onClick 
}: StockListCardProps) {
  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getHealthBadgeVariant = (score: number): "default" | "secondary" | "destructive" => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return "text-green-600 dark:text-green-400";
    if (change < 0) return "text-red-600 dark:text-red-400";
    return "text-muted-foreground";
  };

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3" />;
    if (change < 0) return <TrendingDown className="h-3 w-3" />;
    return <Minus className="h-3 w-3" />;
  };

  const hasTriggeredAlerts = stock.alerts.some(alert => alert.triggered);
  const targetReached = stock.targetPrice && stock.currentPrice >= stock.targetPrice;

  // Days since added
  const daysSinceAdded = Math.floor(
    (new Date().getTime() - new Date(stock.dateAdded).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (viewMode === 'compact') {
    return (
      <button
        onClick={onClick}
        className={cn(
          "w-full text-left p-3 rounded-lg border transition-all hover:shadow-md",
          isSelected 
            ? "border-primary bg-primary/5 shadow-sm" 
            : "border-border bg-card hover:border-primary/50"
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm truncate">{stock.name}</h3>
              <Badge 
                variant={getHealthBadgeVariant(stock.healthScore)}
                className="text-xs shrink-0"
              >
                {stock.healthScore}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{stock.sector}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-semibold text-sm">₹{stock.currentPrice.toLocaleString()}</p>
            <div className={cn("flex items-center gap-1 text-xs font-medium justify-end", getPriceChangeColor(stock.dayChange))}>
              {getPriceChangeIcon(stock.dayChange)}
              {stock.dayChange > 0 ? '+' : ''}{stock.dayChange.toFixed(2)}%
            </div>
          </div>
        </div>
      </button>
    );
  }

  if (viewMode === 'health-focus') {
    return (
      <button
        onClick={onClick}
        className={cn(
          "w-full text-left p-4 rounded-lg border transition-all hover:shadow-md",
          isSelected 
            ? "border-primary bg-primary/5 shadow-sm" 
            : "border-border bg-card hover:border-primary/50"
        )}
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{stock.name}</h3>
              {hasTriggeredAlerts && <Bell className="h-4 w-4 text-orange-500" />}
            </div>
            <p className="text-sm text-muted-foreground">{stock.sector} • BSE: ₹{stock.currentPrice.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <div className={cn("text-3xl font-bold", getHealthColor(stock.healthScore))}>
              {stock.healthScore}
            </div>
            <Badge variant={getHealthBadgeVariant(stock.healthScore)} className="text-xs">
              {stock.healthScore >= 80 ? '🟢 Strong' : stock.healthScore >= 60 ? '🟡 Moderate' : '🔴 Weak'}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-muted-foreground">Health Trend:</span>
          <Badge variant="outline" className="text-xs">
            {stock.healthTrend === 'up' ? '📈 Improving' : stock.healthTrend === 'down' ? '📉 Declining' : '➡️ Stable'}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className={getPriceChangeColor(stock.dayChange)}>
            Day: {stock.dayChange > 0 ? '+' : ''}{stock.dayChange}%
          </span>
          <span className="text-muted-foreground">•</span>
          <span className={getPriceChangeColor(stock.weekChange)}>
            Week: {stock.weekChange > 0 ? '+' : ''}{stock.weekChange}%
          </span>
        </div>
      </button>
    );
  }

  // Detailed view (default)
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-lg border transition-all hover:shadow-md",
        isSelected 
          ? "border-primary bg-primary/5 shadow-sm" 
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{stock.name}</h3>
            <Badge variant={getHealthBadgeVariant(stock.healthScore)} className="text-xs">
              {stock.healthScore} {stock.healthScore >= 80 ? '🟢' : stock.healthScore >= 60 ? '🟡' : '🔴'}
            </Badge>
            {hasTriggeredAlerts && (
              <Badge variant="outline" className="text-xs text-orange-600 border-orange-600">
                <Bell className="h-3 w-3 mr-1" />
                Alert
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{stock.sector} • BSE: ₹{stock.currentPrice.toLocaleString()}</p>
        </div>
      </div>

      {/* Performance Chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-medium border",
          getPriceChangeColor(stock.dayChange),
          "border-current/20 bg-current/5"
        )}>
          Day: {stock.dayChange > 0 ? '+' : ''}{stock.dayChange}%
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-medium border",
          getPriceChangeColor(stock.weekChange),
          "border-current/20 bg-current/5"
        )}>
          Week: {stock.weekChange > 0 ? '+' : ''}{stock.weekChange}%
        </div>
        <div className={cn(
          "px-3 py-1 rounded-full text-xs font-medium border",
          getPriceChangeColor(stock.monthChange),
          "border-current/20 bg-current/5"
        )}>
          Month: {stock.monthChange > 0 ? '+' : ''}{stock.monthChange}%
        </div>
      </div>

      {/* User Context */}
      <div className="space-y-2 mb-3 pb-3 border-b">
        {stock.targetPrice && (
          <div className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Target: ₹{stock.targetPrice.toLocaleString()}</span>
            {targetReached && <Badge variant="default" className="text-xs">✅ Reached</Badge>}
          </div>
        )}
        {hasTriggeredAlerts && (
          <div className="flex items-center gap-2 text-sm">
            <Bell className="h-4 w-4 text-orange-500" />
            <span className="text-orange-600 dark:text-orange-400 font-medium">
              Alert triggered: {stock.alerts.find(a => a.triggered)?.type === 'price' 
                ? `Price reached ₹${stock.alerts.find(a => a.triggered)?.value}`
                : 'Health improved'}
            </span>
          </div>
        )}
      </div>

      {/* User Note */}
      {stock.userNote && (
        <div className="mb-3">
          <p className="text-sm text-muted-foreground italic line-clamp-2">
            "{stock.userNote}"
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Added {daysSinceAdded} day{daysSinceAdded !== 1 ? 's' : ''} ago</span>
        <div className="flex gap-1">
          {stock.lists.slice(0, 3).map(list => (
            <Badge key={list} variant="outline" className="text-xs">
              {list}
            </Badge>
          ))}
        </div>
      </div>

      {/* Quick Actions (visible on hover in detailed view when not selected) */}
      {!isSelected && (
        <div className="mt-3 pt-3 border-t opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 text-xs h-8">
              <BarChart3 className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button size="sm" variant="outline" className="flex-1 text-xs h-8">
              <Plus className="h-3 w-3 mr-1" />
              Buy
            </Button>
          </div>
        </div>
      )}
    </button>
  );
}
