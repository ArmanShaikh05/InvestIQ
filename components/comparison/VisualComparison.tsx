"use client";

import { useState } from "react";
import { StockData } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Radar, ScatterChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VisualComparisonProps {
  leftStock: StockData;
  rightStock: StockData;
}

interface ChartMetric {
  id: string;
  name: string;
  leftValue: number;
  rightValue: number;
}

type ChartType = "bar" | "radar" | "line" | "scatter";

export function VisualComparison({
  leftStock,
  rightStock,
}: VisualComparisonProps) {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "profitability",
    "growth",
    "stability",
    "efficiency",
  ]);
  const [chartType, setChartType] = useState<ChartType>("bar");

  const availableMetrics: ChartMetric[] = [
    {
      id: "profitability",
      name: "Profitability",
      leftValue: leftStock.profitability,
      rightValue: rightStock.profitability,
    },
    {
      id: "growth",
      name: "Growth",
      leftValue: leftStock.growth,
      rightValue: rightStock.growth,
    },
    {
      id: "stability",
      name: "Stability",
      leftValue: leftStock.stability,
      rightValue: rightStock.stability,
    },
    {
      id: "efficiency",
      name: "Efficiency",
      leftValue: leftStock.efficiency,
      rightValue: rightStock.efficiency,
    },
    {
      id: "valuation",
      name: "Valuation",
      leftValue: leftStock.valuation,
      rightValue: rightStock.valuation,
    },
    {
      id: "momentum",
      name: "Momentum",
      leftValue: leftStock.momentum,
      rightValue: rightStock.momentum,
    },
    {
      id: "activity",
      name: "Activity",
      leftValue: leftStock.activity,
      rightValue: rightStock.activity,
    },
    {
      id: "sentiment",
      name: "Sentiment",
      leftValue: leftStock.sentiment,
      rightValue: rightStock.sentiment,
    },
    {
      id: "score",
      name: "Health Score",
      leftValue: leftStock.score,
      rightValue: rightStock.score,
    },
  ];

  const toggleMetric = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      setSelectedMetrics(selectedMetrics.filter((id) => id !== metricId));
    } else {
      if (selectedMetrics.length < 8) {
        setSelectedMetrics([...selectedMetrics, metricId]);
      }
    }
  };

  const selectedMetricsData = availableMetrics.filter((m) =>
    selectedMetrics.includes(m.id),
  );

  const presets = [
    {
      name: "Profitability Profile",
      metrics: ["profitability", "efficiency", "valuation", "stability"],
    },
    {
      name: "Growth Profile",
      metrics: ["growth", "momentum", "activity", "sentiment"],
    },
    {
      name: "Risk-Return",
      metrics: ["stability", "growth", "profitability", "score"],
    },
    {
      name: "Value Score",
      metrics: ["valuation", "profitability", "growth", "efficiency"],
    },
  ];

  const applyPreset = (metrics: string[]) => {
    setSelectedMetrics(metrics);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Visual Comparison</h3>
        <p className="text-sm text-muted-foreground">
          Select metrics to compare graphically
        </p>
      </div>

      {/* Metric Selector */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Select Metrics to Compare</h4>
            <span className="text-xs text-muted-foreground">
              {selectedMetrics.length}/8 selected
            </span>
          </div>

          {/* Metric Checkboxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {availableMetrics.map((metric) => (
              <Badge
                key={metric.id}
                variant={
                  selectedMetrics.includes(metric.id) ? "default" : "outline"
                }
                className={cn(
                  "cursor-pointer justify-center py-2 hover:bg-primary/10 w-full",
                  selectedMetrics.includes(metric.id) &&
                    "bg-primary/30 border-primary/80 hover:bg-primary/40",
                )}
                onClick={() => toggleMetric(metric.id)}
              >
                {selectedMetrics.includes(metric.id) && "✓ "}
                {metric.name}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedMetrics([])}
            >
              Clear All
            </Button>
            {presets.map((preset, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                onClick={() => applyPreset(preset.metrics)}
                className="text-xs hover:bg-primary/10!"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Chart Type Selector */}
      <div className="flex gap-2">
        <Button
          variant={chartType === "bar" ? "default" : "outline"}
          size="sm"
          onClick={() => setChartType("bar")}
          className="gap-2"
        >
          <BarChart3 className="h-4 w-4" />
          Bar Chart
        </Button>
        <Button
          variant={chartType === "radar" ? "default" : "outline"}
          size="sm"
          onClick={() => setChartType("radar")}
          className="gap-2"
        >
          <Radar className="h-4 w-4" />
          Radar Chart
        </Button>
      </div>

      {/* Chart Display */}
      {selectedMetricsData.length > 0 ? (
        <Card className="p-6">
          {chartType === "bar" && (
            <BarChartView
              metrics={selectedMetricsData}
              leftStock={leftStock}
              rightStock={rightStock}
            />
          )}
          {chartType === "radar" && (
            <RadarChartView
              metrics={selectedMetricsData}
              leftStock={leftStock}
              rightStock={rightStock}
            />
          )}
        </Card>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            Select at least one metric to visualize
          </p>
        </Card>
      )}
    </div>
  );
}

// Bar Chart View Component
function BarChartView({
  metrics,
  leftStock,
  rightStock,
}: {
  metrics: ChartMetric[];
  leftStock: StockData;
  rightStock: StockData;
}) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium mb-4">Side-by-Side Comparison</h4>
      {metrics.map((metric) => {
        const maxValue = Math.max(metric.leftValue, metric.rightValue, 100);
        const leftWidth = (metric.leftValue / maxValue) * 100;
        const rightWidth = (metric.rightValue / maxValue) * 100;

        return (
          <div key={metric.id} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{metric.name}</span>
              <span className="text-muted-foreground text-xs">
                Max: {maxValue}
              </span>
            </div>

            {/* Left Stock Bar */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs w-20 text-muted-foreground">
                  {leftStock.ticker}
                </span>
                <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end pr-2 transition-all duration-500"
                    style={{ width: `${leftWidth}%` }}
                  >
                    <span className="text-xs font-medium text-white">
                      {metric.leftValue}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Stock Bar */}
              <div className="flex items-center gap-2">
                <span className="text-xs w-20 text-muted-foreground">
                  {rightStock.ticker}
                </span>
                <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-end pr-2 transition-all duration-500"
                    style={{ width: `${rightWidth}%` }}
                  >
                    <span className="text-xs font-medium text-white">
                      {metric.rightValue}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="flex gap-4 pt-4 border-t border-border justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-blue-600" />
          <span className="text-sm">{leftStock.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-purple-500 to-purple-600" />
          <span className="text-sm">{rightStock.name}</span>
        </div>
      </div>
    </div>
  );
}

// Radar Chart View Component (simplified visual representation)
function RadarChartView({
  metrics,
  leftStock,
  rightStock,
}: {
  metrics: ChartMetric[];
  leftStock: StockData;
  rightStock: StockData;
}) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium mb-4">Overall Profile Comparison</h4>

      <div className="relative aspect-square max-w-lg mx-auto">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Background grid */}
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.1"
          />
          <circle
            cx="200"
            cy="200"
            r="100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.1"
          />
          <circle
            cx="200"
            cy="200"
            r="50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.1"
          />

          {/* Axis lines and labels */}
          {metrics.map((metric, index) => {
            const angle = (index / metrics.length) * 2 * Math.PI - Math.PI / 2;
            const x = 200 + Math.cos(angle) * 170;
            const y = 200 + Math.sin(angle) * 170;

            return (
              <g key={metric.id}>
                <line
                  x1="200"
                  y1="200"
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.2"
                />
                <text
                  x={200 + Math.cos(angle) * 190}
                  y={200 + Math.sin(angle) * 190}
                  textAnchor="middle"
                  className="fill-current text-xs font-medium"
                >
                  {metric.name}
                </text>
              </g>
            );
          })}

          {/* Data polygons */}
          {[
            {
              data: metrics.map((m) => m.leftValue),
              color: "rgb(59, 130, 246)",
              opacity: 0.3,
              name: leftStock.ticker,
            },
            {
              data: metrics.map((m) => m.rightValue),
              color: "rgb(168, 85, 247)",
              opacity: 0.3,
              name: rightStock.ticker,
            },
          ].map((series, seriesIndex) => {
            const points = series.data
              .map((value, index) => {
                const angle =
                  (index / metrics.length) * 2 * Math.PI - Math.PI / 2;
                const normalizedValue = (value / 100) * 150;
                const x = 200 + Math.cos(angle) * normalizedValue;
                const y = 200 + Math.sin(angle) * normalizedValue;
                return `${x},${y}`;
              })
              .join(" ");

            return (
              <g key={seriesIndex}>
                <polygon
                  points={points}
                  fill={series.color}
                  fillOpacity={series.opacity}
                  stroke={series.color}
                  strokeWidth="2"
                />
                {series.data.map((value, index) => {
                  const angle =
                    (index / metrics.length) * 2 * Math.PI - Math.PI / 2;
                  const normalizedValue = (value / 100) * 150;
                  const x = 200 + Math.cos(angle) * normalizedValue;
                  const y = 200 + Math.sin(angle) * normalizedValue;
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      fill={series.color}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500" />
          <span className="text-sm">{leftStock.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-500" />
          <span className="text-sm">{rightStock.name}</span>
        </div>
      </div>
    </div>
  );
}
