"use client";

import { Badge } from "@/components/ui/badge";
import { StockData } from "@/lib/mock-data";
import {
  BarChart3,
  Bot,
  Lightbulb,
  Shield
} from "lucide-react";
import { useState } from "react";

interface AIOverviewProps {
  leftStock: StockData;
  rightStock: StockData;
}

export function AIOverview({ leftStock, rightStock }: AIOverviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine winner
  const winsLeft = [
    leftStock.profitability > rightStock.profitability,
    leftStock.growth > rightStock.growth,
    leftStock.stability > rightStock.stability,
    leftStock.efficiency > rightStock.efficiency,
    leftStock.score > rightStock.score,
  ].filter(Boolean).length;

  const winsRight = 5 - winsLeft;
  const leader = winsLeft > winsRight ? leftStock : rightStock;
  const follower = winsLeft > winsRight ? rightStock : leftStock;
  const totalMetrics = 18;
  const leaderWins = Math.max(winsLeft, winsRight) * 3 + 6; // Scale to 18 metrics

  // Generate strengths
  const getStrongerAreas = (stock: StockData, other: StockData) => {
    const strengths = [];
    if (stock.profitability > other.profitability)
      strengths.push(
        `Profitability (${stock.profitability} vs ${other.profitability})`,
      );
    if (stock.growth > other.growth)
      strengths.push(`Growth (${stock.growth}% vs ${other.growth}%)`);
    if (stock.efficiency > other.efficiency)
      strengths.push(
        `Efficiency (${stock.efficiency}% vs ${other.efficiency}%)`,
      );
    return strengths.slice(0, 3).join(", ");
  };

  const getAdvantages = (stock: StockData, other: StockData) => {
    const advantages = [];
    if (stock.valuation > other.valuation)
      advantages.push(
        `Better valuation (Score: ${stock.valuation} vs ${other.valuation})`,
      );
    if (stock.stability > other.stability)
      advantages.push(
        `Higher stability (${stock.stability}% vs ${other.stability}%)`,
      );
    return advantages.slice(0, 2).join(", ");
  };

  return (
    <div className="border border-border rounded-xl  p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">AI Comparison Summary</h3>
      </div>

      {/* Summary Content */}
      <div className="space-y-2.5">
        <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
          {/* Score Breakdown */}
          <div className="bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent p-4 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <Badge className="bg-blue-500/20 border border-blue-500 text-white text-xs px-2 py-0.5">
                Score Breakdown
              </Badge>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {leader.name} has an overall health score of{" "}
              <span className="font-bold text-blue-500">{leader.score}</span>{" "}
              compared to {follower.name}'s{" "}
              <span className="font-semibold">{follower.score}</span>,
              reflecting stronger fundamentals across most categories.
            </p>
          </div>

          {/* Risk Profile */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-4 rounded-lg border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-emerald-500" />
              <Badge className="bg-emerald-500/20 border border-emerald-500 text-white text-xs px-2 py-0.5">
                Risk Profile
              </Badge>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {leftStock.stability > rightStock.stability
                ? leftStock.name
                : rightStock.name}{" "}
              shows better stability metrics (
              <span className="font-bold text-emerald-500">
                {Math.max(leftStock.stability, rightStock.stability)}%
              </span>
              ), suggesting lower volatility and more consistent performance.
            </p>
          </div>

          {/* Recommendation */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 rounded-lg border border-amber-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <Badge className="bg-amber-500/20 border border-amber-500 text-white text-xs px-2 py-0.5">
                Recommendation
              </Badge>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Consider{" "}
              <span className="font-bold text-primary">{leader.name}</span> for
              long-term growth portfolios. {follower.name} may be suitable for
              value-seeking investors looking for entry opportunities.
            </p>
          </div>
        </div>

        {/* Expandable detailed analysis */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
            {/* Score Breakdown */}
            <div className="bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent p-4 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-blue-500" />
                <Badge className="bg-blue-500/20 border border-blue-500 text-white text-xs px-2 py-0.5">
                  Score Breakdown
                </Badge>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {leader.name} has an overall health score of{" "}
                <span className="font-bold text-blue-500">{leader.score}</span>{" "}
                compared to {follower.name}'s{" "}
                <span className="font-semibold">{follower.score}</span>,
                reflecting stronger fundamentals across most categories.
              </p>
            </div>

            {/* Risk Profile */}
            <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-4 rounded-lg border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-emerald-500" />
                <Badge className="bg-emerald-500/20 border border-emerald-500 text-white text-xs px-2 py-0.5">
                  Risk Profile
                </Badge>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {leftStock.stability > rightStock.stability
                  ? leftStock.name
                  : rightStock.name}{" "}
                shows better stability metrics (
                <span className="font-bold text-emerald-500">
                  {Math.max(leftStock.stability, rightStock.stability)}%
                </span>
                ), suggesting lower volatility and more consistent performance.
              </p>
            </div>

            {/* Recommendation */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-4 rounded-lg border border-amber-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <Badge className="bg-amber-500/20 border border-amber-500 text-white text-xs px-2 py-0.5">
                  Recommendation
                </Badge>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Consider{" "}
                <span className="font-bold text-primary">{leader.name}</span>{" "}
                for long-term growth portfolios. {follower.name} may be suitable
                for value-seeking investors looking for entry opportunities.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
