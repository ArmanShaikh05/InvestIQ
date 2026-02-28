"use client";

import { Button } from "@/components/ui/button";
import { StockData } from "@/lib/mock-data";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";

interface ComparisonHeaderProps {
  leftStock: StockData;
  rightStock: StockData;
}

export function ComparisonHeader({
  leftStock,
  rightStock,
}: ComparisonHeaderProps) {
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
    <div className=" ">
      {/* Compact action bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/30">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/comparison")}
            className="h-8 px-2 gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="text-xs">Back</span>
          </Button>
          <div className="h-4 w-px bg-border" />
          <h2 className="font-semibold text-sm">Stock Comparison</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 gap-1.5 text-xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Compact comparison cards */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 p-4 items-center">
        {/* Left Stock Card */}
        <div className="group rounded-xl border border-border/50 bg-gradient-to-br from-card via-card/95 to-card/90 overflow-hidden hover:border-primary/40 hover:shadow-md transition-all">
          {/* Header with label and health */}
          <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-muted/50 to-transparent border-b border-border/30">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              {leftStock.price ? "Stock 1" : "Sector 1"}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs">{getHealthIcon(leftStock.score)}</span>
              <span
                className={`text-xs font-bold ${getHealthColor(leftStock.score)}`}
              >
                {leftStock.score}
              </span>
            </div>
          </div>

          {/* Main content */}
          <div className="p-3 space-y-2">
            {/* Stock name and ticker */}
            <div>
              <h3 className="font-bold text-base leading-tight truncate group-hover:text-primary transition-colors">
                {leftStock.name}
              </h3>
              <p className="text-[11px] text-muted-foreground font-medium tracking-wide">
                {leftStock.ticker}
              </p>
            </div>

            {/* Price and change */}
            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
                  Price
                </span>
                <span className="text-xl font-bold font-mono leading-none">
                  ₹{leftStock.price?.toLocaleString()}
                </span>
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-md font-medium text-xs ${parseFloat(leftStock.dayChange || "0") >= 0 ? "bg-green-500/15 text-green-600 dark:text-green-400" : "bg-red-500/15 text-red-600 dark:text-red-400"}`}
              >
                <span className="text-base leading-none">
                  {parseFloat(leftStock.dayChange || "0") >= 0 ? "↗" : "↘"}
                </span>
                <span>{leftStock.dayChange}%</span>
              </div>
            </div>

            {/* Sector badge */}
            <div className="pt-1">
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/5 border border-primary/10 text-[10px] font-semibold text-foreground/80">
                {leftStock.sector}
              </span>
            </div>
          </div>
        </div>

        {/* VS Badge - Centered */}
        <div className="flex items-center justify-center lg:px-2">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 shadow-lg">
            <span className="text-xs font-bold text-primary">VS</span>
          </div>
        </div>

        {/* Right Stock Card */}
        <div className="group rounded-xl border border-border/50 bg-gradient-to-br from-card via-card/95 to-card/90 overflow-hidden hover:border-primary/40 hover:shadow-md transition-all">
          {/* Header with label and health */}
          <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-muted/50 to-transparent border-b border-border/30">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              {rightStock.price ? "Stock 2" : "Sector 2"}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs">{getHealthIcon(rightStock.score)}</span>
              <span
                className={`text-xs font-bold ${getHealthColor(rightStock.score)}`}
              >
                {rightStock.score}
              </span>
            </div>
          </div>

          {/* Main content */}
          <div className="p-3 space-y-2">
            {/* Stock name and ticker */}
            <div>
              <h3 className="font-bold text-base leading-tight truncate group-hover:text-primary transition-colors">
                {rightStock.name}
              </h3>
              <p className="text-[11px] text-muted-foreground font-medium tracking-wide">
                {rightStock.ticker}
              </p>
            </div>

            {/* Price and change */}
            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">
                  Price
                </span>
                <span className="text-xl font-bold font-mono leading-none">
                  ₹{rightStock.price?.toLocaleString()}
                </span>
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-md font-medium text-xs ${parseFloat(rightStock.dayChange || "0") >= 0 ? "bg-green-500/15 text-green-600 dark:text-green-400" : "bg-red-500/15 text-red-600 dark:text-red-400"}`}
              >
                <span className="text-base leading-none">
                  {parseFloat(rightStock.dayChange || "0") >= 0 ? "↗" : "↘"}
                </span>
                <span>{rightStock.dayChange}%</span>
              </div>
            </div>

            {/* Sector badge */}
            <div className="pt-1">
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/5 border border-primary/10 text-[10px] font-semibold text-foreground/80">
                {rightStock.sector}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
