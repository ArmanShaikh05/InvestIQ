"use client";

import { StockData } from "@/lib/mock-data";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface QuickStatsCardsProps {
  leftStock: StockData;
  rightStock: StockData;
}

interface StatCardData {
  title: string;
  leftValue: string | number;
  rightValue: string | number;
  leftRaw: number;
  rightRaw: number;
  higherIsBetter: boolean;
  suffix?: string;
}

export function QuickStatsCards({
  leftStock,
  rightStock,
}: QuickStatsCardsProps) {
  const stats: StatCardData[] = [
    {
      title: "Health Score",
      leftValue: leftStock.score,
      rightValue: rightStock.score,
      leftRaw: leftStock.score,
      rightRaw: rightStock.score,
      higherIsBetter: true,
    },
    {
      title: "Profitability",
      leftValue: leftStock.profitability,
      rightValue: rightStock.profitability,
      leftRaw: leftStock.profitability,
      rightRaw: rightStock.profitability,
      higherIsBetter: true,
      suffix: "%",
    },
    {
      title: "Growth",
      leftValue: leftStock.growth,
      rightValue: rightStock.growth,
      leftRaw: leftStock.growth,
      rightRaw: rightStock.growth,
      higherIsBetter: true,
      suffix: "%",
    },
    {
      title: "Stability",
      leftValue: leftStock.stability,
      rightValue: rightStock.stability,
      leftRaw: leftStock.stability,
      rightRaw: rightStock.stability,
      higherIsBetter: true,
      suffix: "%",
    },
    {
      title: "Efficiency",
      leftValue: leftStock.efficiency,
      rightValue: rightStock.efficiency,
      leftRaw: leftStock.efficiency,
      rightRaw: rightStock.efficiency,
      higherIsBetter: true,
      suffix: "%",
    },
    {
      title: "Valuation",
      leftValue: leftStock.valuation,
      rightValue: rightStock.valuation,
      leftRaw: leftStock.valuation,
      rightRaw: rightStock.valuation,
      higherIsBetter: true,
      suffix: "/100",
    },
  ];

  const getWinner = (stat: StatCardData) => {
    if (stat.higherIsBetter) {
      return stat.leftRaw > stat.rightRaw
        ? "left"
        : stat.leftRaw < stat.rightRaw
          ? "right"
          : "tie";
    } else {
      return stat.leftRaw < stat.rightRaw
        ? "left"
        : stat.leftRaw > stat.rightRaw
          ? "right"
          : "tie";
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((stat, index) => {
        const winner = getWinner(stat);

        return (
          <Card
            key={index}
            className="p-4 space-y-3 hover:shadow-md transition-shadow"
          >
            {/* Title */}
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {stat.title}
            </div>

            {/* Values */}
            <div className="space-y-2">
              {/* Left Stock */}
              <div
                className={`text-sm ${winner === "left" ? "font-bold text-green-600 dark:text-green-500" : "text-muted-foreground"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Badge className="text-xs p-0.5 px-1 text-blue-200 bg-blue-600/30 border border-blue-600  max-w-[100px]">
                      {leftStock.ticker}
                    </Badge>
                    <span className="font-mono">
                      {stat.leftValue}
                      {stat.suffix}
                    </span>
                  </div>
                  {winner === "left" && <Check className="h-3 w-3" />}
                </div>
              </div>

              {/* Right Stock */}
              <div
                className={`text-sm ${winner === "right" ? "font-bold text-green-600 dark:text-green-500" : "text-muted-foreground"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Badge className="text-xs p-0.5 px-1 text-purple-200 bg-purple-600/30 border border-purple-600  max-w-[100px]">
                      {rightStock.ticker}
                    </Badge>
                    <span className="font-mono">
                      {stat.rightValue}
                      {stat.suffix}
                    </span>
                  </div>
                  {winner === "right" && <Check className="h-3 w-3" />}
                </div>
              </div>
            </div>

            {/* Winner indicator */}
            <div className="pt-2 border-t border-border/50 text-xs flex items-center gap-1">
              Winner :
              <Badge
                className={cn(
                  "text-xs font-medium ",
                  winner === "left"
                    ? " text-blue-200 bg-blue-600/30 border border-blue-600"
                    : winner === "right"
                      ? "text-purple-200 bg-purple-600/30 border border-purple-600"
                      : "text-gray-200 bg-gray-600/30 border border-gray-600",
                )}
              >
                {winner === "tie"
                  ? "Tie"
                  : `${winner === "left" ? leftStock.ticker : rightStock.ticker}`}
              </Badge>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
