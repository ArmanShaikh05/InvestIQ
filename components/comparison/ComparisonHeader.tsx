"use client";

import { ArrowLeft, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StockData } from "@/lib/mock-data";

interface ComparisonHeaderProps {
  leftStock: StockData;
  rightStock: StockData;
}

export function ComparisonHeader({ leftStock, rightStock }: ComparisonHeaderProps) {
  const router = useRouter();

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getHealthIcon = (score: number) => {
    if (score >= 80) return "🟢";
    if (score >= 60) return "🟡";
    return "🔴";
  };

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar with actions */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push("/comparison")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <h2 className="font-semibold text-sm sm:text-base">
            {leftStock.name} vs {rightStock.name}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Change</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Stock info cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 sm:p-6">
        {/* Left Stock */}
        <div className="space-y-2">
          <div className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            {leftStock.price ? "Stock 1" : "Sector 1"}
          </div>
          <div>
            <h3 className="font-bold text-xl">{leftStock.name}</h3>
            <p className="text-sm text-muted-foreground">{leftStock.ticker}</p>
          </div>
          {leftStock.price ? (
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold font-mono">
                ₹{leftStock.price?.toLocaleString()}
              </span>
              <span className={`text-sm font-medium ${parseFloat(leftStock.dayChange || "0") >= 0 ? "text-green-500" : "text-red-500"}`}>
                {parseFloat(leftStock.dayChange || "0") >= 0 ? "↗" : "↘"} {leftStock.dayChange}%
              </span>
            </div>
          ) : (
            <div className="flex items-baseline gap-3">
              <span className="text-sm text-muted-foreground">Market Cap:</span>
              <span className="text-xl font-bold font-mono">
                ₹{leftStock.marketCap}
              </span>
              <span className={`text-sm font-medium ${parseFloat(leftStock.dayChange || "0") >= 0 ? "text-green-500" : "text-red-500"}`}>
                {parseFloat(leftStock.dayChange || "0") >= 0 ? "↗" : "↘"} {leftStock.dayChange}%
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Health:</span>
            <span className={`font-semibold ${getHealthColor(leftStock.score)}`}>
              {leftStock.score}
            </span>
            <span>{getHealthIcon(leftStock.score)}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{leftStock.sector}</span>
          </div>
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center">
          <div className="text-4xl font-bold text-muted-foreground/20">VS</div>
        </div>

        {/* Right Stock */}
        <div className="space-y-2">
          <div className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
            {rightStock.price ? "Stock 2" : "Sector 2"}
          </div>
          <div>
            <h3 className="font-bold text-xl">{rightStock.name}</h3>
            <p className="text-sm text-muted-foreground">{rightStock.ticker}</p>
          </div>
          {rightStock.price ? (
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold font-mono">
                ₹{rightStock.price?.toLocaleString()}
              </span>
              <span className={`text-sm font-medium ${parseFloat(rightStock.dayChange || "0") >= 0 ? "text-green-500" : "text-red-500"}`}>
                {parseFloat(rightStock.dayChange || "0") >= 0 ? "↗" : "↘"} {rightStock.dayChange}%
              </span>
            </div>
          ) : (
            <div className="flex items-baseline gap-3">
              <span className="text-sm text-muted-foreground">Market Cap:</span>
              <span className="text-xl font-bold font-mono">
                ₹{rightStock.marketCap}
              </span>
              <span className={`text-sm font-medium ${parseFloat(rightStock.dayChange || "0") >= 0 ? "text-green-500" : "text-red-500"}`}>
                {parseFloat(rightStock.dayChange || "0") >= 0 ? "↗" : "↘"} {rightStock.dayChange}%
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Health:</span>
            <span className={`font-semibold ${getHealthColor(rightStock.score)}`}>
              {rightStock.score}
            </span>
            <span>{getHealthIcon(rightStock.score)}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{rightStock.sector}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
