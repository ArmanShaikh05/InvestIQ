"use client";

import { useState } from "react";
import { Bot, ChevronDown, ChevronUp } from "lucide-react";
import { StockData } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

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
    if (stock.profitability > other.profitability) strengths.push(`Profitability (${stock.profitability} vs ${other.profitability})`);
    if (stock.growth > other.growth) strengths.push(`Growth (${stock.growth}% vs ${other.growth}%)`);
    if (stock.efficiency > other.efficiency) strengths.push(`Efficiency (${stock.efficiency}% vs ${other.efficiency}%)`);
    return strengths.slice(0, 3).join(", ");
  };

  const getAdvantages = (stock: StockData, other: StockData) => {
    const advantages = [];
    if (stock.valuation > other.valuation) advantages.push(`Better valuation (Score: ${stock.valuation} vs ${other.valuation})`);
    if (stock.stability > other.stability) advantages.push(`Higher stability (${stock.stability}% vs ${other.stability}%)`);
    return advantages.slice(0, 2).join(", ");
  };

  return (
    <div className="border border-border rounded-xl bg-gradient-to-br from-primary/5 via-background to-background p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">AI Comparison Summary</h3>
      </div>

      {/* Summary Content */}
      <div className="space-y-3 text-sm leading-relaxed">
        <p className="font-medium text-base">
          <span className="font-bold text-primary">{leader.name}</span> leads in{" "}
          <span className="font-bold">{leaderWins} out of {totalMetrics}</span> key metrics.
        </p>

        <p>
          <span className="font-semibold">Stronger in:</span>{" "}
          {getStrongerAreas(leader, follower)}
        </p>

        <p>
          <span className="font-semibold">{follower.name} advantages:</span>{" "}
          {getAdvantages(follower, leader) || "Limited advantages in current market conditions"}
        </p>

        <p className="pt-2 border-t border-border/50">
          <span className="font-semibold text-primary">Verdict:</span>{" "}
          {leader.name} for quality & growth, {follower.name} for {follower.valuation > leader.valuation ? "value" : "stability"}
        </p>

        {/* Expandable detailed analysis */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border/50 space-y-2 text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Score Breakdown:</span> {leader.name} has an overall health score of {leader.score} compared to {follower.name}'s {follower.score}, reflecting stronger fundamentals across most categories.
            </p>
            <p>
              <span className="font-semibold text-foreground">Risk Profile:</span> {leftStock.stability > rightStock.stability ? leftStock.name : rightStock.name} shows better stability metrics ({Math.max(leftStock.stability, rightStock.stability)}), suggesting lower volatility and more consistent performance.
            </p>
            <p>
              <span className="font-semibold text-foreground">Recommendation:</span> Consider {leader.name} for long-term growth portfolios. {follower.name} may be suitable for value-seeking investors looking for entry opportunities.
            </p>
          </div>
        )}
      </div>

      {/* Expand button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 w-full gap-2 text-primary"
      >
        {isExpanded ? (
          <>
            Show Less <ChevronUp className="h-4 w-4" />
          </>
        ) : (
          <>
            View Detailed Analysis <ChevronDown className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
