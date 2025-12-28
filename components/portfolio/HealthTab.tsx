"use client";

import React from "react";
import {
  Shield,
  TrendingUp,
  DollarSign,
  PieChart,
  AlertTriangle,
  Target,
  Award,
  Activity,
  BarChart3,
  Layers,
  ChevronUp,
  ChevronDown,
  Info,
  TrendingDown,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const HealthTab = () => {
  // Mock data for portfolio health analysis
  const overallHealth = {
    score: 74,
    trend: 3,
    trendDirection: "up" as const,
    rating: "Moderate",
    color: "yellow",
  };

  const subComponentScores = [
    {
      name: "Quality Score",
      score: 82,
      description: "Strong fundamentals in holdings",
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      name: "Growth Score",
      score: 65,
      description: "Moderate earnings momentum",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      name: "Stability Score",
      score: 88,
      description: "Low debt-to-equity across the board",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
    {
      name: "Valuation Score",
      score: 42,
      description: "🔴 Your portfolio is currently expensive",
      icon: DollarSign,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/20",
    },
  ];


  const qualityMatrix = [
    { symbol: "AAPL", healthScore: 88, allocation: 18.5, status: "ideal" },
    { symbol: "MSFT", healthScore: 85, allocation: 15.2, status: "ideal" },
    { symbol: "HDFC", healthScore: 78, allocation: 12.8, status: "good" },
    { symbol: "GOOGL", healthScore: 82, allocation: 10.5, status: "ideal" },
    { symbol: "TSLA", healthScore: 32, allocation: 8.3, status: "danger" },
    { symbol: "RELIANCE", healthScore: 72, allocation: 6.2, status: "good" },
    { symbol: "TCS", healthScore: 80, allocation: 5.5, status: "good" },
    { symbol: "INFY", healthScore: 75, allocation: 4.8, status: "good" },
  ];

  const redFlags = [
    {
      type: "deteriorating",
      severity: "high",
      title: "Deteriorating Health",
      description:
        "Tesla's health score dropped from 70 to 32 after Q3 results.",
      stock: "TSLA",
      icon: TrendingDown,
    },
    {
      type: "valuation",
      severity: "medium",
      title: "Valuation Spike",
      description: "Apple is now trading at 90% of its 5Y historical P/E high.",
      stock: "AAPL",
      icon: AlertTriangle,
    },
    {
      type: "dividend",
      severity: "high",
      title: "Dividend At Risk",
      description: "HDFC's payout ratio has exceeded 100% of free cash flow.",
      stock: "HDFC",
      icon: DollarSign,
    },
  ];

  const investmentStyle = {
    current: "Growth at a Reasonable Price (GARP)",
    position: 65, // 0-100 scale
    marketCapDistribution: {
      largeCap: 80,
      midCap: 15,
      smallCap: 5,
    },
  };

  return (
    <div className="space-y-8">
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: AGGREGATE HEALTH DNA
          "Let's look at the DNA of your combined holdings."
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Let's look at the DNA of your combined holdings.
          </p>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🧬 Portfolio Health Summary
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Central Health Score */}
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm lg:col-span-1">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <svg className="w-40 h-40" viewBox="0 0 160 160">
                    {/* Background circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="12"
                    />
                    {/* Health score circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r="65"
                      fill="none"
                      stroke={
                        overallHealth.color === "yellow" ? "#eab308" : "#10b981"
                      }
                      strokeWidth="12"
                      strokeDasharray={`${overallHealth.score * 4.08} 408`}
                      strokeLinecap="round"
                      transform="rotate(-90 80 80)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-4xl font-bold">
                      {overallHealth.score}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      out of 100
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Badge
                    variant="outline"
                    className={`
                      ${
                        overallHealth.color === "yellow"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-300 dark:bg-yellow-950/20"
                          : "bg-green-50 text-green-700 border-green-300 dark:bg-green-950/20"
                      }
                    `}
                  >
                    🟡 {overallHealth.rating}
                  </Badge>

                  <div className="flex items-center justify-center gap-2 text-sm">
                    {overallHealth.trendDirection === "up" ? (
                      <ChevronUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={
                        overallHealth.trendDirection === "up"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {overallHealth.trend} points from last month
                    </span>
                  </div>
                </div>

                <div className="pt-4 text-left border-t border-border/30">
                  <h4 className="text-sm font-semibold mb-2">
                    Overall Portfolio Health
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Your portfolio shows moderate health with room for
                    improvement in valuation metrics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sub-Component Scores */}
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm lg:col-span-2">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subComponentScores.map((component, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border border-border/30 ${component.bgColor}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${component.bgColor}`}>
                          <component.icon
                            className={`w-5 h-5 ${component.color}`}
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">
                            {component.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {component.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-2xl font-bold ${component.color}`}
                        >
                          {component.score}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          /100
                        </span>
                      </div>
                      <Progress value={component.score} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: THE QUALITY SPECTRUM
          "Let's see where your stocks sit on the Quality vs. Risk scale."
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Let's see where your stocks sit on the Quality vs. Risk scale.
          </p>
          <h3 className="text-xl font-bold flex items-center gap-2">
            📊 Quality Mapping
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            The "InvestIQ Matrix"
          </p>
        </div>

        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Scatter Plot Simulation */}
              <div className="relative h-80 bg-gradient-to-tr from-red-50 via-yellow-50 to-green-50 dark:from-red-950/10 dark:via-yellow-950/10 dark:to-green-950/10 rounded-lg p-6 border border-border/30">
                {/* Axes Labels */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground">
                  Health Score (0-100) →
                </div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium text-muted-foreground">
                  ← Portfolio Allocation (%)
                </div>

                {/* Zone Labels */}
                <div className="absolute top-4 right-4 text-xs font-semibold text-green-600">
                  ✓ Ideal Zone
                </div>
                <div className="absolute top-4 left-4 text-xs font-semibold text-red-600">
                  ⚠ Danger Zone
                </div>

                {/* Plot Points */}
                <div className="relative w-full h-full">
                  {qualityMatrix.map((stock, idx) => (
                    <div
                      key={idx}
                      className="absolute group cursor-pointer"
                      style={{
                        left: `${stock.healthScore}%`,
                        bottom: `${stock.allocation * 4}%`,
                        transform: "translate(-50%, 50%)",
                      }}
                    >
                      <div
                        className={`
                          w-3 h-3 rounded-full transition-all group-hover:scale-150
                          ${
                            stock.status === "ideal"
                              ? "bg-green-500"
                              : stock.status === "good"
                              ? "bg-blue-500"
                              : "bg-red-500"
                          }
                        `}
                      />
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border border-border rounded px-2 py-1 text-xs whitespace-nowrap shadow-lg z-10">
                        <div className="font-semibold">{stock.symbol}</div>
                        <div className="text-muted-foreground">
                          Health: {stock.healthScore}
                        </div>
                        <div className="text-muted-foreground">
                          Allocation: {stock.allocation}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Grid lines */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-border/20" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border/20" />
                </div>
              </div>

              {/* AI Interpretation */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      AI Interpretation
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      You have <span className="font-semibold">8.3%</span> of
                      your capital in{" "}
                      <span className="font-semibold">TSLA</span>, which has a
                      Health Score of only{" "}
                      <span className="font-semibold">32</span>. This is your
                      highest-risk position. Consider if the conviction matches
                      the quality.
                    </p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Ideal Zone</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Good Position</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Danger Zone</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: EARLY WARNING SYSTEM
          "Items requiring your immediate attention."
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Items requiring your immediate attention.
          </p>
          <h3 className="text-xl font-bold flex items-center gap-2">
            🚩 Red Flags & Alerts
          </h3>
        </div>

        <div className="space-y-3">
          {redFlags.map((flag, idx) => (
            <Card
              key={idx}
              className={`
                border-l-4
                ${
                  flag.severity === "high"
                    ? "border-l-red-500 bg-red-50/50 dark:bg-red-950/10"
                    : "border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/10"
                }
              `}
            >
              <CardContent className="pt-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`
                      p-3 rounded-lg shrink-0
                      ${
                        flag.severity === "high"
                          ? "bg-red-100 dark:bg-red-950/20"
                          : "bg-yellow-100 dark:bg-yellow-950/20"
                      }
                    `}
                  >
                    <flag.icon
                      className={`
                        w-5 h-5
                        ${
                          flag.severity === "high"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }
                      `}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="font-semibold">{flag.title}</h4>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {flag.stock}
                        </Badge>
                      </div>
                      <Badge
                        variant={
                          flag.severity === "high" ? "destructive" : "outline"
                        }
                        className={
                          flag.severity === "medium"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                            : ""
                        }
                      >
                        {flag.severity === "high" ? "High Priority" : "Monitor"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {flag.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: INVESTMENT STYLE FIT
          "Does your portfolio match your intended style?"
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Does your portfolio match your intended style?
          </p>
          <h3 className="text-xl font-bold flex items-center gap-2">
            🎯 Style Consistency
          </h3>
        </div>

        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardContent className="pt-6 space-y-6">
            {/* Current Style */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Current Investment Style
              </p>
              <h4 className="text-xl font-bold">{investmentStyle.current}</h4>
            </div>

            {/* Style Meter */}
            <div className="space-y-3">
              <div className="relative">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Deep Value</span>
                  <span>Blended</span>
                  <span>Pure Growth</span>
                </div>
                <div className="relative h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full">
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-background border-4 border-primary rounded-full shadow-lg"
                    style={{
                      left: `${investmentStyle.position}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* Market Cap Bias */}
            <div className="space-y-3 pt-4 border-t border-border/30">
              <h4 className="font-semibold text-sm">Market Cap Bias</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Large Cap</span>
                  <span className="font-bold">
                    {investmentStyle.marketCapDistribution.largeCap}%
                  </span>
                </div>
                <Progress
                  value={investmentStyle.marketCapDistribution.largeCap}
                  className="h-2"
                />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Mid Cap</span>
                  <span className="font-bold">
                    {investmentStyle.marketCapDistribution.midCap}%
                  </span>
                </div>
                <Progress
                  value={investmentStyle.marketCapDistribution.midCap}
                  className="h-2"
                />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Small Cap</span>
                  <span className="font-bold">
                    {investmentStyle.marketCapDistribution.smallCap}%
                  </span>
                </div>
                <Progress
                  value={investmentStyle.marketCapDistribution.smallCap}
                  className="h-2"
                />
              </div>
            </div>

            {/* Summary Insight */}
            <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">
                    Portfolio Assessment
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Your portfolio is high quality with strong fundamentals, but
                    you are too heavily invested in the Financial sector (32%),
                    and you're paying a premium for your growth stocks
                    (Valuation Score: 42/100).
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthTab;
