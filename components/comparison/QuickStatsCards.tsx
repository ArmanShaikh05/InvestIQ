"use client";

import { StockData } from "@/lib/mock-data";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

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

export function QuickStatsCards({ leftStock, rightStock }: QuickStatsCardsProps) {
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
      return stat.leftRaw > stat.rightRaw ? "left" : stat.leftRaw < stat.rightRaw ? "right" : "tie";
    } else {
      return stat.leftRaw < stat.rightRaw ? "left" : stat.leftRaw > stat.rightRaw ? "right" : "tie";
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {stats.map((stat, index) => {
        const winner = getWinner(stat);
        
        return (
          <Card key={index} className="p-4 space-y-3 hover:shadow-md transition-shadow">
            {/* Title */}
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {stat.title}
            </div>

            {/* Values */}
            <div className="space-y-2">
              {/* Left Stock */}
              <div className={`text-sm ${winner === "left" ? "font-bold text-green-600 dark:text-green-500" : "text-muted-foreground"}`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono">{stat.leftValue}{stat.suffix}</span>
                  {winner === "left" && <Check className="h-3 w-3" />}
                </div>
              </div>

              {/* Right Stock */}
              <div className={`text-sm ${winner === "right" ? "font-bold text-green-600 dark:text-green-500" : "text-muted-foreground"}`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono">{stat.rightValue}{stat.suffix}</span>
                  {winner === "right" && <Check className="h-3 w-3" />}
                </div>
              </div>
            </div>

            {/* Winner indicator */}
            <div className="pt-2 border-t border-border/50">
              <div className="text-xs font-medium text-primary">
                {winner === "tie" ? "Tie" : `Winner: ${winner === "left" ? leftStock.ticker : rightStock.ticker}`}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
