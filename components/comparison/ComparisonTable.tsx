"use client";

import { useState } from "react";
import { StockData } from "@/lib/mock-data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, ArrowUpDown, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ComparisonTableProps {
  leftStock: StockData;
  rightStock: StockData;
}

interface Metric {
  name: string;
  leftValue: string | number;
  rightValue: string | number;
  leftRaw: number;
  rightRaw: number;
  higherIsBetter: boolean;
  category?: string;
}

export function ComparisonTable({
  leftStock,
  rightStock,
}: ComparisonTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  // Generate comprehensive metrics for each tab
  const allMetrics: Record<string, Metric[]> = {
    overview: [
      {
        name: "Overall Health Score",
        leftValue: leftStock.score,
        rightValue: rightStock.score,
        leftRaw: leftStock.score,
        rightRaw: rightStock.score,
        higherIsBetter: true,
      },
      {
        name: "Profitability Score",
        leftValue: leftStock.profitability,
        rightValue: rightStock.profitability,
        leftRaw: leftStock.profitability,
        rightRaw: rightStock.profitability,
        higherIsBetter: true,
      },
      {
        name: "Growth Score",
        leftValue: leftStock.growth,
        rightValue: rightStock.growth,
        leftRaw: leftStock.growth,
        rightRaw: rightStock.growth,
        higherIsBetter: true,
      },
      {
        name: "Stability Score",
        leftValue: leftStock.stability,
        rightValue: rightStock.stability,
        leftRaw: leftStock.stability,
        rightRaw: rightStock.stability,
        higherIsBetter: true,
      },
      {
        name: "Efficiency Score",
        leftValue: leftStock.efficiency,
        rightValue: rightStock.efficiency,
        leftRaw: leftStock.efficiency,
        rightRaw: rightStock.efficiency,
        higherIsBetter: true,
      },
      {
        name: "Valuation Score",
        leftValue: leftStock.valuation,
        rightValue: rightStock.valuation,
        leftRaw: leftStock.valuation,
        rightRaw: rightStock.valuation,
        higherIsBetter: true,
      },
      {
        name: "Momentum Score",
        leftValue: leftStock.momentum,
        rightValue: rightStock.momentum,
        leftRaw: leftStock.momentum,
        rightRaw: rightStock.momentum,
        higherIsBetter: true,
      },
      {
        name: "Market Cap",
        leftValue: leftStock.marketCap || "N/A",
        rightValue: rightStock.marketCap || "N/A",
        leftRaw: 0,
        rightRaw: 0,
        higherIsBetter: true,
      },
      {
        name: "Current Price",
        leftValue: `₹${leftStock.price}`,
        rightValue: `₹${rightStock.price}`,
        leftRaw: leftStock.price || 0,
        rightRaw: rightStock.price || 0,
        higherIsBetter: false,
      },
      {
        name: "Day Change",
        leftValue: `${leftStock.dayChange}%`,
        rightValue: `${rightStock.dayChange}%`,
        leftRaw: parseFloat(leftStock.dayChange || "0"),
        rightRaw: parseFloat(rightStock.dayChange || "0"),
        higherIsBetter: true,
      },
      {
        name: "Sector",
        leftValue: leftStock.sector,
        rightValue: rightStock.sector,
        leftRaw: 0,
        rightRaw: 0,
        higherIsBetter: true,
      },
    ],
    profitability: [
      {
        name: "Return on Equity (ROE)",
        leftValue: "18.2%",
        rightValue: "16.8%",
        leftRaw: 18.2,
        rightRaw: 16.8,
        higherIsBetter: true,
        category: "Returns",
      },
      {
        name: "Return on Capital (ROCE)",
        leftValue: "19.5%",
        rightValue: "17.2%",
        leftRaw: 19.5,
        rightRaw: 17.2,
        higherIsBetter: true,
        category: "Returns",
      },
      {
        name: "Return on Assets (ROA)",
        leftValue: "1.8%",
        rightValue: "1.6%",
        leftRaw: 1.8,
        rightRaw: 1.6,
        higherIsBetter: true,
        category: "Returns",
      },
      {
        name: "Net Profit Margin",
        leftValue: "16.4%",
        rightValue: "15.1%",
        leftRaw: 16.4,
        rightRaw: 15.1,
        higherIsBetter: true,
        category: "Margins",
      },
      {
        name: "Operating Margin",
        leftValue: "24.2%",
        rightValue: "22.8%",
        leftRaw: 24.2,
        rightRaw: 22.8,
        higherIsBetter: true,
        category: "Margins",
      },
      {
        name: "EBITDA Margin",
        leftValue: "28.5%",
        rightValue: "26.2%",
        leftRaw: 28.5,
        rightRaw: 26.2,
        higherIsBetter: true,
        category: "Margins",
      },
      {
        name: "Gross Profit Margin",
        leftValue: "42.3%",
        rightValue: "40.1%",
        leftRaw: 42.3,
        rightRaw: 40.1,
        higherIsBetter: true,
        category: "Margins",
      },
      {
        name: "Free Cash Flow Margin",
        leftValue: "14.2%",
        rightValue: "12.8%",
        leftRaw: 14.2,
        rightRaw: 12.8,
        higherIsBetter: true,
        category: "Margins",
      },
      {
        name: "Earnings Per Share (EPS)",
        leftValue: "₹82.5",
        rightValue: "₹74.2",
        leftRaw: 82.5,
        rightRaw: 74.2,
        higherIsBetter: true,
        category: "Earnings",
      },
      {
        name: "Profit After Tax",
        leftValue: "₹45,800 Cr",
        rightValue: "₹38,200 Cr",
        leftRaw: 45800,
        rightRaw: 38200,
        higherIsBetter: true,
        category: "Earnings",
      },
    ],
    growth: [
      {
        name: "Revenue Growth (1Y)",
        leftValue: "15.2%",
        rightValue: "12.4%",
        leftRaw: 15.2,
        rightRaw: 12.4,
        higherIsBetter: true,
        category: "Revenue",
      },
      {
        name: "Revenue Growth (3Y CAGR)",
        leftValue: "13.2%",
        rightValue: "11.4%",
        leftRaw: 13.2,
        rightRaw: 11.4,
        higherIsBetter: true,
        category: "Revenue",
      },
      {
        name: "Revenue Growth (5Y CAGR)",
        leftValue: "12.8%",
        rightValue: "11.0%",
        leftRaw: 12.8,
        rightRaw: 11.0,
        higherIsBetter: true,
        category: "Revenue",
      },
      {
        name: "Profit Growth (1Y)",
        leftValue: "16.8%",
        rightValue: "13.2%",
        leftRaw: 16.8,
        rightRaw: 13.2,
        higherIsBetter: true,
        category: "Profit",
      },
      {
        name: "Profit Growth (3Y CAGR)",
        leftValue: "14.8%",
        rightValue: "12.2%",
        leftRaw: 14.8,
        rightRaw: 12.2,
        higherIsBetter: true,
        category: "Profit",
      },
      {
        name: "Profit Growth (5Y CAGR)",
        leftValue: "13.5%",
        rightValue: "11.8%",
        leftRaw: 13.5,
        rightRaw: 11.8,
        higherIsBetter: true,
        category: "Profit",
      },
      {
        name: "EPS Growth (1Y)",
        leftValue: "17.2%",
        rightValue: "13.8%",
        leftRaw: 17.2,
        rightRaw: 13.8,
        higherIsBetter: true,
        category: "Earnings",
      },
      {
        name: "EPS Growth (3Y CAGR)",
        leftValue: "15.2%",
        rightValue: "12.8%",
        leftRaw: 15.2,
        rightRaw: 12.8,
        higherIsBetter: true,
        category: "Earnings",
      },
      {
        name: "EPS Growth (5Y CAGR)",
        leftValue: "14.0%",
        rightValue: "12.0%",
        leftRaw: 14.0,
        rightRaw: 12.0,
        higherIsBetter: true,
        category: "Earnings",
      },
      {
        name: "Book Value Growth (3Y)",
        leftValue: "12.5%",
        rightValue: "11.0%",
        leftRaw: 12.5,
        rightRaw: 11.0,
        higherIsBetter: true,
        category: "Other",
      },
      {
        name: "Asset Growth (3Y)",
        leftValue: "14.2%",
        rightValue: "12.5%",
        leftRaw: 14.2,
        rightRaw: 12.5,
        higherIsBetter: true,
        category: "Other",
      },
      {
        name: "Dividend Growth (3Y)",
        leftValue: "10.5%",
        rightValue: "9.2%",
        leftRaw: 10.5,
        rightRaw: 9.2,
        higherIsBetter: true,
        category: "Other",
      },
    ],
    stability: [
      {
        name: "Debt to Equity",
        leftValue: "0.15",
        rightValue: "0.22",
        leftRaw: 0.15,
        rightRaw: 0.22,
        higherIsBetter: false,
        category: "Leverage",
      },
      {
        name: "Interest Coverage",
        leftValue: "24.5x",
        rightValue: "18.2x",
        leftRaw: 24.5,
        rightRaw: 18.2,
        higherIsBetter: true,
        category: "Leverage",
      },
      {
        name: "Current Ratio",
        leftValue: "1.85",
        rightValue: "1.62",
        leftRaw: 1.85,
        rightRaw: 1.62,
        higherIsBetter: true,
        category: "Liquidity",
      },
      {
        name: "Quick Ratio",
        leftValue: "1.42",
        rightValue: "1.28",
        leftRaw: 1.42,
        rightRaw: 1.28,
        higherIsBetter: true,
        category: "Liquidity",
      },
      {
        name: "Cash & Equivalents",
        leftValue: "₹58,200 Cr",
        rightValue: "₹42,800 Cr",
        leftRaw: 58200,
        rightRaw: 42800,
        higherIsBetter: true,
        category: "Liquidity",
      },
      {
        name: "Earnings Volatility (3Y)",
        leftValue: "8.2%",
        rightValue: "12.5%",
        leftRaw: 8.2,
        rightRaw: 12.5,
        higherIsBetter: false,
        category: "Volatility",
      },
      {
        name: "Revenue Volatility (3Y)",
        leftValue: "6.5%",
        rightValue: "9.8%",
        leftRaw: 6.5,
        rightRaw: 9.8,
        higherIsBetter: false,
        category: "Volatility",
      },
      {
        name: "Beta (Market Risk)",
        leftValue: "0.92",
        rightValue: "1.15",
        leftRaw: 0.92,
        rightRaw: 1.15,
        higherIsBetter: false,
        category: "Risk",
      },
      {
        name: "Credit Rating",
        leftValue: "AAA",
        rightValue: "AA+",
        leftRaw: 10,
        rightRaw: 9,
        higherIsBetter: true,
        category: "Ratings",
      },
      {
        name: "Altman Z-Score",
        leftValue: "8.5",
        rightValue: "7.2",
        leftRaw: 8.5,
        rightRaw: 7.2,
        higherIsBetter: true,
        category: "Health",
      },
    ],
    valuation: [
      {
        name: "P/E Ratio",
        leftValue: "22.4",
        rightValue: "18.2",
        leftRaw: 22.4,
        rightRaw: 18.2,
        higherIsBetter: false,
        category: "Price Ratios",
      },
      {
        name: "P/B Ratio",
        leftValue: "3.8",
        rightValue: "2.9",
        leftRaw: 3.8,
        rightRaw: 2.9,
        higherIsBetter: false,
        category: "Price Ratios",
      },
      {
        name: "P/S Ratio",
        leftValue: "5.2",
        rightValue: "4.1",
        leftRaw: 5.2,
        rightRaw: 4.1,
        higherIsBetter: false,
        category: "Price Ratios",
      },
      {
        name: "EV/EBITDA",
        leftValue: "16.5",
        rightValue: "13.8",
        leftRaw: 16.5,
        rightRaw: 13.8,
        higherIsBetter: false,
        category: "Enterprise Value",
      },
      {
        name: "EV/Sales",
        leftValue: "4.8",
        rightValue: "3.9",
        leftRaw: 4.8,
        rightRaw: 3.9,
        higherIsBetter: false,
        category: "Enterprise Value",
      },
      {
        name: "PEG Ratio",
        leftValue: "1.5",
        rightValue: "1.8",
        leftRaw: 1.5,
        rightRaw: 1.8,
        higherIsBetter: false,
        category: "Growth-Adjusted",
      },
      {
        name: "Dividend Yield",
        leftValue: "1.8%",
        rightValue: "2.2%",
        leftRaw: 1.8,
        rightRaw: 2.2,
        higherIsBetter: true,
        category: "Dividends",
      },
      {
        name: "Dividend Payout Ratio",
        leftValue: "40.2%",
        rightValue: "45.5%",
        leftRaw: 40.2,
        rightRaw: 45.5,
        higherIsBetter: false,
        category: "Dividends",
      },
      {
        name: "Price to Cash Flow",
        leftValue: "18.5",
        rightValue: "15.2",
        leftRaw: 18.5,
        rightRaw: 15.2,
        higherIsBetter: false,
        category: "Cash Flow",
      },
      {
        name: "Price to Free Cash Flow",
        leftValue: "24.2",
        rightValue: "19.8",
        leftRaw: 24.2,
        rightRaw: 19.8,
        higherIsBetter: false,
        category: "Cash Flow",
      },
      {
        name: "Sector Relative P/E",
        leftValue: "+12.5%",
        rightValue: "-8.2%",
        leftRaw: 12.5,
        rightRaw: -8.2,
        higherIsBetter: false,
        category: "Relative",
      },
      {
        name: "Market Relative P/B",
        leftValue: "+18.5%",
        rightValue: "+5.2%",
        leftRaw: 18.5,
        rightRaw: 5.2,
        higherIsBetter: false,
        category: "Relative",
      },
    ],
    efficiency: [
      {
        name: "Asset Turnover",
        leftValue: "0.12",
        rightValue: "0.11",
        leftRaw: 0.12,
        rightRaw: 0.11,
        higherIsBetter: true,
        category: "Asset Utilization",
      },
      {
        name: "Inventory Turnover",
        leftValue: "8.5",
        rightValue: "7.2",
        leftRaw: 8.5,
        rightRaw: 7.2,
        higherIsBetter: true,
        category: "Asset Utilization",
      },
      {
        name: "Receivables Turnover",
        leftValue: "12.8",
        rightValue: "10.5",
        leftRaw: 12.8,
        rightRaw: 10.5,
        higherIsBetter: true,
        category: "Asset Utilization",
      },
      {
        name: "Cash Conversion Cycle",
        leftValue: "28 days",
        rightValue: "35 days",
        leftRaw: 28,
        rightRaw: 35,
        higherIsBetter: false,
        category: "Working Capital",
      },
      {
        name: "Days Sales Outstanding",
        leftValue: "32 days",
        rightValue: "38 days",
        leftRaw: 32,
        rightRaw: 38,
        higherIsBetter: false,
        category: "Working Capital",
      },
      {
        name: "Days Inventory Outstanding",
        leftValue: "45 days",
        rightValue: "52 days",
        leftRaw: 45,
        rightRaw: 52,
        higherIsBetter: false,
        category: "Working Capital",
      },
      {
        name: "Cash Conversion Rate",
        leftValue: "92%",
        rightValue: "88%",
        leftRaw: 92,
        rightRaw: 88,
        higherIsBetter: true,
        category: "Cash Management",
      },
      {
        name: "Cost-to-Income Ratio",
        leftValue: "42.5%",
        rightValue: "45.2%",
        leftRaw: 42.5,
        rightRaw: 45.2,
        higherIsBetter: false,
        category: "Cost Management",
      },
      {
        name: "Operating Expense Ratio",
        leftValue: "38.2%",
        rightValue: "41.5%",
        leftRaw: 38.2,
        rightRaw: 41.5,
        higherIsBetter: false,
        category: "Cost Management",
      },
    ],
    performance: [
      {
        name: "1 Day Return",
        leftValue: `${leftStock.dayChange}%`,
        rightValue: `${rightStock.dayChange}%`,
        leftRaw: parseFloat(leftStock.dayChange || "0"),
        rightRaw: parseFloat(rightStock.dayChange || "0"),
        higherIsBetter: true,
        category: "Recent",
      },
      {
        name: "1 Week Return",
        leftValue: "4.2%",
        rightValue: "3.1%",
        leftRaw: 4.2,
        rightRaw: 3.1,
        higherIsBetter: true,
        category: "Recent",
      },
      {
        name: "1 Month Return",
        leftValue: "8.5%",
        rightValue: "6.2%",
        leftRaw: 8.5,
        rightRaw: 6.2,
        higherIsBetter: true,
        category: "Recent",
      },
      {
        name: "3 Month Return",
        leftValue: "15.2%",
        rightValue: "11.8%",
        leftRaw: 15.2,
        rightRaw: 11.8,
        higherIsBetter: true,
        category: "Medium Term",
      },
      {
        name: "6 Month Return",
        leftValue: "22.8%",
        rightValue: "18.5%",
        leftRaw: 22.8,
        rightRaw: 18.5,
        higherIsBetter: true,
        category: "Medium Term",
      },
      {
        name: "YTD Return",
        leftValue: "18.5%",
        rightValue: "14.2%",
        leftRaw: 18.5,
        rightRaw: 14.2,
        higherIsBetter: true,
        category: "Medium Term",
      },
      {
        name: "1 Year Return",
        leftValue: "35.2%",
        rightValue: "28.4%",
        leftRaw: 35.2,
        rightRaw: 28.4,
        higherIsBetter: true,
        category: "Long Term",
      },
      {
        name: "3 Year Return (CAGR)",
        leftValue: "24.5%",
        rightValue: "19.8%",
        leftRaw: 24.5,
        rightRaw: 19.8,
        higherIsBetter: true,
        category: "Long Term",
      },
      {
        name: "5 Year Return (CAGR)",
        leftValue: "21.8%",
        rightValue: "17.5%",
        leftRaw: 21.8,
        rightRaw: 17.5,
        higherIsBetter: true,
        category: "Long Term",
      },
      {
        name: "Volatility (1Y)",
        leftValue: "18.5%",
        rightValue: "22.8%",
        leftRaw: 18.5,
        rightRaw: 22.8,
        higherIsBetter: false,
        category: "Risk",
      },
      {
        name: "Sharpe Ratio (1Y)",
        leftValue: "1.85",
        rightValue: "1.42",
        leftRaw: 1.85,
        rightRaw: 1.42,
        higherIsBetter: true,
        category: "Risk-Adjusted",
      },
      {
        name: "Sortino Ratio (1Y)",
        leftValue: "2.45",
        rightValue: "1.92",
        leftRaw: 2.45,
        rightRaw: 1.92,
        higherIsBetter: true,
        category: "Risk-Adjusted",
      },
      {
        name: "Max Drawdown (1Y)",
        leftValue: "-12.5%",
        rightValue: "-18.2%",
        leftRaw: -12.5,
        rightRaw: -18.2,
        higherIsBetter: true,
        category: "Risk",
      },
      {
        name: "Alpha (1Y)",
        leftValue: "5.2%",
        rightValue: "2.8%",
        leftRaw: 5.2,
        rightRaw: 2.8,
        higherIsBetter: true,
        category: "Market Comparison",
      },
      {
        name: "Beta (1Y)",
        leftValue: "0.92",
        rightValue: "1.15",
        leftRaw: 0.92,
        rightRaw: 1.15,
        higherIsBetter: false,
        category: "Market Comparison",
      },
    ],
  };

  // Combine all metrics for "All Metrics" tab
  const getAllMetrics = (): Metric[] => {
    const combined: Metric[] = [];
    Object.entries(allMetrics).forEach(([tabName, metrics]) => {
      if (tabName !== "overview") {
        metrics.forEach((metric) => {
          combined.push({
            ...metric,
            category: tabName.charAt(0).toUpperCase() + tabName.slice(1),
          });
        });
      }
    });
    return combined;
  };

  // Get metrics for current tab
  const getCurrentMetrics = (): Metric[] => {
    if (selectedTab === "all") {
      return getAllMetrics();
    }
    return allMetrics[selectedTab] || [];
  };

  // Filter metrics based on search
  const filteredMetrics = getCurrentMetrics().filter((metric) =>
    metric.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Sort metrics if needed
  const sortedMetrics = sortOrder
    ? [...filteredMetrics].sort((a, b) => {
        const diff =
          Math.abs(a.leftRaw - a.rightRaw) - Math.abs(b.leftRaw - b.rightRaw);
        return sortOrder === "desc" ? -diff : diff;
      })
    : filteredMetrics;

  // Group metrics by category
  const groupedMetrics = sortedMetrics.reduce(
    (acc, metric) => {
      const category = metric.category || "";
      if (!acc[category]) acc[category] = [];
      acc[category].push(metric);
      return acc;
    },
    {} as Record<string, Metric[]>,
  );

  const getWinner = (metric: Metric): "left" | "right" | "tie" => {
    if (metric.leftRaw === metric.rightRaw) return "tie";
    if (metric.higherIsBetter) {
      return metric.leftRaw > metric.rightRaw ? "left" : "right";
    } else {
      return metric.leftRaw < metric.rightRaw ? "left" : "right";
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Selector */}
      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
          <TabsTrigger
            value="overview"
            className="text-xs data-[state=active]:bg-primary/40!  "
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="profitability"
            className="text-xs data-[state=active]:bg-primary/40!"
          >
            Profitability
          </TabsTrigger>
          <TabsTrigger
            value="growth"
            className="text-xs data-[state=active]:bg-primary/40!"
          >
            Growth
          </TabsTrigger>
          <TabsTrigger
            value="stability"
            className="text-xs data-[state=active]:bg-primary/40!"
          >
            Stability
          </TabsTrigger>
          <TabsTrigger
            value="valuation"
            className="text-xs data-[state=active]:bg-primary/40!"
          >
            Valuation
          </TabsTrigger>
          <TabsTrigger
            value="efficiency"
            className="text-xs data-[state=active]:bg-primary/40!"
          >
            Efficiency
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="text-xs data-[state=active]:bg-primary/40!"
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="text-xs data-[state=active]:bg-primary/40!"
          >
            All Metrics
          </TabsTrigger>
        </TabsList>

        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search metrics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
          </div>
        </div>

        {/* Table Content */}
        <div className="border rounded-lg mt-4 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Metric</TableHead>
                  <TableHead className="font-semibold text-center">
                    {leftStock.ticker}
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    {rightStock.ticker}
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Winner
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(groupedMetrics).map(([category, metrics]) => (
                  <React.Fragment key={category}>
                    {category && (
                      <TableRow className="bg-muted/30">
                        <TableCell
                          colSpan={4}
                          className="font-semibold uppercase text-xs tracking-wider text-primary"
                        >
                          {category}
                        </TableCell>
                      </TableRow>
                    )}
                    {metrics.map((metric, index) => {
                      const winner = getWinner(metric);
                      return (
                        <TableRow
                          key={`${category}-${index}`}
                          className="hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">
                            {metric.name}
                          </TableCell>
                          <TableCell
                            className={`text-center font-mono ${winner === "left" ? "font-bold text-green-600 dark:text-green-500" : "text-muted-foreground"}`}
                          >
                            {metric.leftValue}
                          </TableCell>
                          <TableCell
                            className={`text-center font-mono ${winner === "right" ? "font-bold text-green-600 dark:text-green-500" : "text-muted-foreground"}`}
                          >
                            {metric.rightValue}
                          </TableCell>
                          <TableCell className="text-center">
                            {winner === "tie" ? (
                              <span className="text-muted-foreground text-xs">
                                —
                              </span>
                            ) : (
                              <Badge
                                className={cn(
                                  "inline-flex items-center gap-1 text-xs font-medium",
                                  winner === "left"
                                    ? " text-blue-200 bg-blue-600/30 border border-blue-600"
                                    : "text-purple-200 bg-purple-600/30 border border-purple-600",
                                )}
                              >
                                {winner === "left"
                                  ? leftStock.ticker
                                  : rightStock.ticker}
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {sortedMetrics.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No metrics found matching "{searchQuery}"
          </div>
        )}
      </Tabs>
    </div>
  );
}

// Add React import at the top
import React from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
