"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Filter,
  Grid3x3,
  List,
  Eye,
  Bell,
  BarChart3,
  DollarSign,
  Calendar,
  Activity,
  Target,
  ChevronDown,
  ChevronUp,
  Heart,
  AlertTriangle,
  CheckCircle,
  Star,
  Download,
  Upload,
  X,
  Clock,
  Zap,
  PieChart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddStockModal from "@/components/portfolio/AddStockModal";
import StockDetailModal from "@/components/portfolio/StockDetailModal";

interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  investedAmount: number;
  gainLoss: number;
  gainLossPercent: number;
  dayChange: number;
  dayChangePercent: number;
  healthScore: number;
  sector: string;
  marketCap: "Large" | "Mid" | "Small";
  weight: number;
}

interface Transaction {
  id: string;
  type: "buy" | "sell";
  symbol: string;
  quantity: number;
  price: number;
  date: string;
  total: number;
}

const HoldingsTab: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [isStockDetailModalOpen, setIsStockDetailModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<
    "symbol" | "value" | "gainLoss" | "healthScore"
  >("value");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterBy, setFilterBy] = useState<
    "all" | "gainers" | "losers" | "high-health" | "low-health"
  >("all");
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false);

  // Mock holdings data
  const holdings: Holding[] = [
    {
      id: "1",
      symbol: "AAPL",
      name: "Apple Inc.",
      quantity: 150,
      avgPrice: 145.5,
      currentPrice: 175.25,
      value: 26287.5,
      investedAmount: 21825,
      gainLoss: 4462.5,
      gainLossPercent: 20.45,
      dayChange: 525.75,
      dayChangePercent: 2.04,
      healthScore: 88,
      sector: "Technology",
      marketCap: "Large",
      weight: 18.5,
    },
    {
      id: "2",
      symbol: "MSFT",
      name: "Microsoft Corporation",
      quantity: 80,
      avgPrice: 320.0,
      currentPrice: 368.5,
      value: 29480,
      investedAmount: 25600,
      gainLoss: 3880,
      gainLossPercent: 15.16,
      dayChange: -147.2,
      dayChangePercent: -0.5,
      healthScore: 85,
      sector: "Technology",
      marketCap: "Large",
      weight: 15.2,
    },
    {
      id: "3",
      symbol: "HDFC",
      name: "HDFC Bank",
      quantity: 500,
      avgPrice: 1450,
      currentPrice: 1625,
      value: 812500,
      investedAmount: 725000,
      gainLoss: 87500,
      gainLossPercent: 12.07,
      dayChange: 8125,
      dayChangePercent: 1.01,
      healthScore: 78,
      sector: "Financials",
      marketCap: "Large",
      weight: 12.8,
    },
    {
      id: "4",
      symbol: "TSLA",
      name: "Tesla Inc.",
      quantity: 100,
      avgPrice: 245.0,
      currentPrice: 215.3,
      value: 21530,
      investedAmount: 24500,
      gainLoss: -2970,
      gainLossPercent: -12.12,
      dayChange: -430.6,
      dayChangePercent: -1.96,
      healthScore: 32,
      sector: "Automotive",
      marketCap: "Large",
      weight: 8.3,
    },
    {
      id: "5",
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      quantity: 120,
      avgPrice: 125.0,
      currentPrice: 142.8,
      value: 17136,
      investedAmount: 15000,
      gainLoss: 2136,
      gainLossPercent: 14.24,
      dayChange: 171.36,
      dayChangePercent: 1.01,
      healthScore: 82,
      sector: "Technology",
      marketCap: "Large",
      weight: 10.5,
    },
    {
      id: "6",
      symbol: "TCS",
      name: "Tata Consultancy Services",
      quantity: 200,
      avgPrice: 3200,
      currentPrice: 3550,
      value: 710000,
      investedAmount: 640000,
      gainLoss: 70000,
      gainLossPercent: 10.94,
      dayChange: 7100,
      dayChangePercent: 1.01,
      healthScore: 80,
      sector: "Technology",
      marketCap: "Large",
      weight: 5.5,
    },
  ];

  // Mock transaction history
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "buy",
      symbol: "AAPL",
      quantity: 50,
      price: 150.25,
      date: "2 hours ago",
      total: 7512.5,
    },
    {
      id: "2",
      type: "sell",
      symbol: "MSFT",
      quantity: 20,
      price: 368.5,
      date: "1 day ago",
      total: 7370,
    },
    {
      id: "3",
      type: "buy",
      symbol: "HDFC",
      quantity: 100,
      price: 1450,
      date: "3 days ago",
      total: 145000,
    },
    {
      id: "4",
      type: "buy",
      symbol: "GOOGL",
      quantity: 30,
      price: 142.8,
      date: "5 days ago",
      total: 4284,
    },
    {
      id: "5",
      type: "sell",
      symbol: "TSLA",
      quantity: 25,
      price: 215.3,
      date: "1 week ago",
      total: 5382.5,
    },
  ];

  // Mock watchlist
  const watchlist = [
    {
      symbol: "NVDA",
      name: "NVIDIA Corp.",
      price: 485.5,
      change: 3.2,
      healthScore: 86,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 152.3,
      change: -0.8,
      healthScore: 79,
    },
    {
      symbol: "RELIANCE",
      name: "Reliance Industries",
      price: 2450,
      change: 1.5,
      healthScore: 72,
    },
  ];

  const sectorConcentration = [
    { sector: "Financials", percentage: 32, color: "#3b82f6", alert: true },
    { sector: "Technology", percentage: 28, color: "#10b981", alert: false },
    { sector: "Healthcare", percentage: 15, color: "#8b5cf6", alert: false },
    { sector: "Consumer", percentage: 12, color: "#f59e0b", alert: false },
    { sector: "Energy", percentage: 8, color: "#eab308", alert: false },
    { sector: "Other", percentage: 5, color: "#6b7280", alert: false },
  ];

  const topHoldings = [
    { symbol: "AAPL", name: "Apple Inc.", weight: 18.5, value: 23200 },
    { symbol: "MSFT", name: "Microsoft", weight: 15.2, value: 19050 },
    { symbol: "HDFC", name: "HDFC Bank", weight: 12.8, value: 16050 },
    { symbol: "GOOGL", name: "Alphabet", weight: 10.5, value: 13150 },
    { symbol: "TSLA", name: "Tesla", weight: 8.3, value: 10400 },
  ];

  const concentrationRatio = 65.3; // Top 5 stocks as % of total

  // Calculate totals
  const totalInvested = holdings.reduce((sum, h) => sum + h.investedAmount, 0);
  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalGainLoss = totalValue - totalInvested;
  const totalGainLossPercent = (totalGainLoss / totalInvested) * 100;

  // Filter and sort holdings
  const getFilteredHoldings = () => {
    let filtered = holdings.filter(
      (h) =>
        h.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply filter
    if (filterBy === "gainers")
      filtered = filtered.filter((h) => h.gainLossPercent > 0);
    if (filterBy === "losers")
      filtered = filtered.filter((h) => h.gainLossPercent < 0);
    if (filterBy === "high-health")
      filtered = filtered.filter((h) => h.healthScore >= 70);
    if (filterBy === "low-health")
      filtered = filtered.filter((h) => h.healthScore < 70);

    // Apply sort
    filtered.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return sortOrder === "asc"
        ? aVal > bVal
          ? 1
          : -1
        : aVal < bVal
        ? 1
        : -1;
    });

    return filtered;
  };

  const filteredHoldings = getFilteredHoldings();

  // Handler for adding new stock
  const handleAddStock = (newStock: any) => {
    console.log("New stock added:", newStock);
    // TODO: Add to holdings state/database
    // This would typically call an API or update state
  };

  // Calculate sector allocation for modal
  const sectorAllocation = [
    { sector: "Technology", percentage: 47 },
    { sector: "Financials", percentage: 18 },
    { sector: "Healthcare", percentage: 15 },
    { sector: "Consumer", percentage: 12 },
    { sector: "Energy", percentage: 5 },
    { sector: "Other", percentage: 3 },
  ];

  // Performance segmentation
  const topPerformers = holdings
    .filter((h) => h.gainLossPercent > 10)
    .sort((a, b) => b.gainLossPercent - a.gainLossPercent);
  const moderate = holdings.filter(
    (h) => h.gainLossPercent >= 0 && h.gainLossPercent <= 10
  );
  const underperformers = holdings
    .filter((h) => h.gainLossPercent < 0)
    .sort((a, b) => a.gainLossPercent - b.gainLossPercent);

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 dark:bg-green-950/20";
    if (score >= 60) return "text-blue-600 bg-blue-50 dark:bg-blue-950/20";
    if (score >= 40)
      return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20";
    return "text-red-600 bg-red-50 dark:bg-red-950/20";
  };

  const selectedHolding = holdings.find((h) => h.id === selectedStock);

  return (
    <div className="space-y-6">
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: HOLDINGS COMMAND CENTER (Control Panel)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Total Holdings
                  </p>
                  <p className="text-2xl font-bold">{holdings.length}</p>
                </div>
                <Briefcase className="w-8 h-8 text-muted-foreground opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Total Invested
                  </p>
                  <p className="text-2xl font-bold">
                    ₹{(totalInvested / 1000).toFixed(0)}K
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-muted-foreground opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Current Value</p>
                  <p className="text-2xl font-bold">
                    ₹{(totalValue / 1000).toFixed(0)}K
                  </p>
                </div>
                <Activity className="w-8 h-8 text-muted-foreground opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total P&L</p>
                  <p
                    className={`text-2xl font-bold ${
                      totalGainLoss >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {totalGainLoss >= 0 ? "+" : ""}₹
                    {(totalGainLoss / 1000).toFixed(0)}K
                  </p>
                  <p
                    className={`text-xs ${
                      totalGainLoss >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {totalGainLoss >= 0 ? "+" : ""}
                    {totalGainLossPercent.toFixed(2)}%
                  </p>
                </div>
                <TrendingUp
                  className={`w-8 h-8 ${
                    totalGainLoss >= 0 ? "text-green-500" : "text-red-500"
                  } opacity-50`}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Row */}
        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardContent className="pt-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter */}
              <div className="flex gap-2">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as any)}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-sm"
                >
                  <option value="all">All Holdings</option>
                  <option value="gainers">Gainers Only</option>
                  <option value="losers">Losers Only</option>
                  <option value="high-health">High Health (&gt;70)</option>
                  <option value="low-health">Low Health (&lt;70)</option>
                </select>

                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split("-");
                    setSortBy(field as any);
                    setSortOrder(order as any);
                  }}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-sm"
                >
                  <option value="value-desc">Value (High to Low)</option>
                  <option value="value-asc">Value (Low to High)</option>
                  <option value="gainLoss-desc">P&L (High to Low)</option>
                  <option value="gainLoss-asc">P&L (Low to High)</option>
                  <option value="healthScore-desc">Health (High to Low)</option>
                  <option value="healthScore-asc">Health (Low to High)</option>
                  <option value="symbol-asc">Symbol (A-Z)</option>
                </select>

                {/* View Toggle */}
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none"
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddStockModalOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stock
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2: HOLDINGS TABLE
        ═══════════════════════════════════════════════════════════════ */}
        <div>
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Holdings ({filteredHoldings.length})
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {viewMode === "list" ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Stock</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Avg Price</TableHead>
                        <TableHead className="text-right">Current</TableHead>
                        <TableHead className="text-right">Value</TableHead>
                        <TableHead className="text-right">P&L</TableHead>
                        <TableHead className="text-right">Day Change</TableHead>
                        <TableHead className="text-center">Health</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHoldings.map((holding) => (
                        <TableRow
                          key={holding.id}
                          className="cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => {
                            setSelectedStock(holding.id);
                            setIsStockDetailModalOpen(true);
                          }}
                        >
                          <TableCell>
                            <div>
                              <p className="font-semibold">{holding.symbol}</p>
                              <p className="text-xs text-muted-foreground">
                                {holding.name}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {holding.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ₹{holding.avgPrice.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ₹{holding.currentPrice.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            ₹{holding.value.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div
                              className={
                                holding.gainLoss >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              <p className="font-semibold">
                                {holding.gainLoss >= 0 ? "+" : ""}₹
                                {holding.gainLoss.toLocaleString()}
                              </p>
                              <p className="text-xs">
                                {holding.gainLoss >= 0 ? "+" : ""}
                                {holding.gainLossPercent.toFixed(2)}%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div
                              className={
                                holding.dayChange >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              <p className="text-sm">
                                {holding.dayChange >= 0 ? "+" : ""}₹
                                {Math.abs(holding.dayChange).toFixed(2)}
                              </p>
                              <p className="text-xs">
                                {holding.dayChange >= 0 ? "+" : ""}
                                {holding.dayChangePercent.toFixed(2)}%
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              className={getHealthColor(holding.healthScore)}
                            >
                              {holding.healthScore}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-1 justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <Bell className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredHoldings.map((holding) => (
                    <Card
                      key={holding.id}
                      className={`cursor-pointer hover:shadow-lg transition-shadow ${
                        selectedStock === holding.id
                          ? "ring-2 ring-primary"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedStock(
                          selectedStock === holding.id ? null : holding.id
                        )
                      }
                    >
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-bold text-lg">
                                {holding.symbol}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {holding.name}
                              </p>
                            </div>
                            <Badge
                              className={getHealthColor(holding.healthScore)}
                            >
                              {holding.healthScore}
                            </Badge>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Value
                              </span>
                              <span className="font-semibold">
                                ₹{holding.value.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">P&L</span>
                              <span
                                className={`font-semibold ${
                                  holding.gainLoss >= 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {holding.gainLoss >= 0 ? "+" : ""}₹
                                {holding.gainLoss.toLocaleString()} (
                                {holding.gainLossPercent.toFixed(2)}%)
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Qty</span>
                              <span>
                                {holding.quantity} @ ₹
                                {holding.avgPrice.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <Bell className="w-3 h-3 mr-1" />
                              Alert
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: CONCENTRATION & DIVERSIFICATION
          "Are you putting all your eggs in one basket?"
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Are you putting all your eggs in one basket?
          </p>
          <h3 className="text-xl font-bold flex items-center gap-2">
            🧩 Allocation Analysis
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sector Concentration */}
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Sector Concentration
              </CardTitle>
              <CardDescription>
                Weight distribution across sectors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Treemap-style visualization */}
              <div className="grid grid-cols-3 gap-2 h-48">
                {sectorConcentration.map((sector, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg p-3 flex flex-col justify-between transition-all hover:scale-105 cursor-pointer ${
                      idx === 0 ? "col-span-2 row-span-2" : ""
                    }`}
                    style={{
                      backgroundColor: sector.color + "20",
                      borderLeft: `4px solid ${sector.color}`,
                    }}
                  >
                    <div>
                      <p className="text-xs font-medium">{sector.sector}</p>
                      {sector.alert && (
                        <AlertTriangle className="w-3 h-3 text-red-500 mt-1" />
                      )}
                    </div>
                    <p className="text-lg font-bold">{sector.percentage}%</p>
                  </div>
                ))}
              </div>

              {/* Critical Alert */}
              {sectorConcentration.some((s) => s.alert) && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-lg mt-14">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                        ⚠️ High Sector Risk
                      </p>
                      <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                        Your 32% exposure to Financials makes you vulnerable to
                        interest rate shifts.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stock Weighting */}
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Top 5 Holdings
              </CardTitle>
              <CardDescription>
                Concentration in your largest positions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {topHoldings.map((holding, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="font-semibold">{holding.symbol}</span>
                        <span className="text-muted-foreground ml-2 text-xs">
                          {holding.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">
                          ${holding.value.toLocaleString()}
                        </span>
                        <span className="font-bold w-12 text-right">
                          {holding.weight}%
                        </span>
                      </div>
                    </div>
                    <Progress value={holding.weight} className="h-2" />
                  </div>
                ))}
              </div>

              {/* Concentration Ratio */}
              <div className="pt-4 border-t border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Concentration Ratio
                  </span>
                  <span className="text-lg font-bold">
                    {concentrationRatio}%
                  </span>
                </div>
                <Progress value={concentrationRatio} className="h-2 mb-2" />
                <div className="flex items-center gap-2">
                  {concentrationRatio > 60 ? (
                    <>
                      <Badge
                        variant="outline"
                        className="bg-yellow-50 text-yellow-700 border-yellow-300 dark:bg-yellow-950/20"
                      >
                        Top Heavy
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        Consider diversifying beyond top 5
                      </p>
                    </>
                  ) : (
                    <>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-300 dark:bg-green-950/20"
                      >
                        Well Diversified
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        Good balance across holdings
                      </p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: PERFORMANCE SEGMENTATION
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold">Performance Segmentation</h3>
          <p className="text-sm text-muted-foreground">
            Who's pulling weight? Who's dragging?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Top Performers */}
          <Card className="border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <TrendingUp className="w-5 h-5" />
                Top Performers
              </CardTitle>
              <CardDescription>
                {topPerformers.length} stocks &gt; 10% gain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {topPerformers.slice(0, 3).map((stock) => (
                <div
                  key={stock.id}
                  className="flex items-center justify-between p-2 bg-background rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-sm">{stock.symbol}</p>
                    <p className="text-xs text-muted-foreground">
                      ₹{stock.value.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 text-sm">
                      +{stock.gainLossPercent.toFixed(2)}%
                    </p>
                    <p className="text-xs text-green-600">
                      +₹{stock.gainLoss.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t text-center">
                <p className="text-xs text-muted-foreground">
                  Contributing{" "}
                  <span className="font-semibold text-green-600">
                    +₹
                    {topPerformers
                      .reduce((sum, s) => sum + s.gainLoss, 0)
                      .toLocaleString()}
                  </span>{" "}
                  to portfolio
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Moderate */}
          <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <Activity className="w-5 h-5" />
                Moderate
              </CardTitle>
              <CardDescription>
                {moderate.length} stocks 0-10% gain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {moderate.slice(0, 3).map((stock) => (
                <div
                  key={stock.id}
                  className="flex items-center justify-between p-2 bg-background rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-sm">{stock.symbol}</p>
                    <p className="text-xs text-muted-foreground">
                      ₹{stock.value.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 text-sm">
                      +{stock.gainLossPercent.toFixed(2)}%
                    </p>
                    <p className="text-xs text-blue-600">
                      +₹{stock.gainLoss.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t text-center">
                <p className="text-xs text-muted-foreground">
                  Contributing{" "}
                  <span className="font-semibold text-blue-600">
                    +₹
                    {moderate
                      .reduce((sum, s) => sum + s.gainLoss, 0)
                      .toLocaleString()}
                  </span>{" "}
                  to portfolio
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Underperformers */}
          <Card className="border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <TrendingDown className="w-5 h-5" />
                Underperformers
              </CardTitle>
              <CardDescription>
                {underperformers.length} stocks with losses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {underperformers.slice(0, 3).map((stock) => (
                <div
                  key={stock.id}
                  className="flex items-center justify-between p-2 bg-background rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-sm">{stock.symbol}</p>
                    <p className="text-xs text-muted-foreground">
                      ₹{stock.value.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600 text-sm">
                      {stock.gainLossPercent.toFixed(2)}%
                    </p>
                    <p className="text-xs text-red-600">
                      ₹{stock.gainLoss.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t text-center">
                <p className="text-xs text-muted-foreground">
                  Dragging{" "}
                  <span className="font-semibold text-red-600">
                    ₹
                    {Math.abs(
                      underperformers.reduce((sum, s) => sum + s.gainLoss, 0)
                    ).toLocaleString()}
                  </span>{" "}
                  from portfolio
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: WATCHLIST INTEGRATION
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold">From Your Watchlist</h3>
          <p className="text-sm text-muted-foreground">
            Stocks you're tracking - ready to add
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {watchlist.map((stock, idx) => (
            <Card
              key={idx}
              className="border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold">{stock.symbol}</h4>
                      <p className="text-xs text-muted-foreground">
                        {stock.name}
                      </p>
                    </div>
                    <Badge className={getHealthColor(stock.healthScore)}>
                      {stock.healthScore}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold">
                        ₹{stock.price.toFixed(2)}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          stock.change >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change}%
                      </span>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Portfolio
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stock Detail Modal */}
      <StockDetailModal
        isOpen={isStockDetailModalOpen}
        onClose={() => {
          setIsStockDetailModalOpen(false);
          setSelectedStock(null);
        }}
        holding={selectedHolding || null}
      />

      {/* Add Stock Modal */}
      <AddStockModal
        isOpen={isAddStockModalOpen}
        onClose={() => setIsAddStockModalOpen(false)}
        onAdd={handleAddStock}
        currentPortfolioValue={totalValue}
        currentSectorAllocation={sectorAllocation}
      />
    </div>
  );
};

export default HoldingsTab;
