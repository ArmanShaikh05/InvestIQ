"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  BarChart,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileChartColumn,
  Globe,
  Info,
  Lightbulb,
  LineChart as LineChartIcon,
  Percent,
  PieChart as PieChartIcon,
  Target,
  TrendingDown,
  TrendingUp,
  Users
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis
} from "recharts";

// Mock data for sector analysis
const getSectorData = (sector: string) => {
  const sectorName = sector
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    name: sectorName,
    verdict:
      "The sector is stable, but valuations are higher than long-term averages.",
    snapshot: {
      healthScore: 85,
      avgValuation: "24.5 P/E",
      yearReturn: "+28.4%",
      lastUpdated: "2 hours ago",
      marketCap: "$12.8T",
      volatility: "Medium",
    },
    sectorInfo: {
      description:
        "This sector focuses on technology innovation, software development, and digital transformation solutions that drive modern business operations.",
      overview:
        "Comprised of companies developing cutting-edge technologies, cloud services, artificial intelligence, and consumer electronics that shape the digital economy.",
      objective:
        "To provide investors exposure to high-growth technology companies driving innovation across multiple industries and consumer segments.",
      totalCompanies: 156,
      avgAge: "28 years",
      headquarters: "Global",
    },
    healthMetrics: {
      overall: 85,
      financial: 88,
      growth: 92,
      valuation: 75,
      momentum: 89,
      stability: 78,
    },
    healthHistory: [
      { period: "1M", score: 83 },
      { period: "3M", score: 81 },
      { period: "6M", score: 79 },
      { period: "1Y", score: 75 },
      { period: "2Y", score: 78 },
      { period: "3Y", score: 82 },
    ],
    healthPillars: [
      {
        name: "Profitability",
        rating: "Strong",
        explanation:
          "Companies consistently generate healthy profit margins above industry benchmarks.",
      },
      {
        name: "Growth",
        rating: "Strong",
        explanation:
          "Revenue and earnings are expanding faster than the broader market.",
      },
      {
        name: "Debt & Safety",
        rating: "Average",
        explanation:
          "Debt levels are manageable but slightly elevated compared to historical norms.",
      },
      {
        name: "Valuation",
        rating: "Weak",
        explanation:
          "Stock prices appear expensive relative to current earnings and growth prospects.",
      },
    ],
    topStocks: [
      {
        ticker: "AAPL",
        name: "Apple Inc.",
        marketCap: "$2.8T",
        healthScore: 88,
        change: "+3",
      },
      {
        ticker: "MSFT",
        name: "Microsoft Corp",
        marketCap: "$2.7T",
        healthScore: 92,
        change: "+1",
      },
      {
        ticker: "NVDA",
        name: "NVIDIA Corp",
        marketCap: "$1.1T",
        healthScore: 85,
        change: "+8",
      },
      {
        ticker: "GOOGL",
        name: "Alphabet Inc",
        marketCap: "$1.8T",
        healthScore: 79,
        change: "-2",
      },
      {
        ticker: "TSLA",
        name: "Tesla Inc",
        marketCap: "$793B",
        healthScore: 72,
        change: "+5",
      },
      {
        ticker: "META",
        name: "Meta Platforms",
        marketCap: "$891B",
        healthScore: 81,
        change: "+2",
      },
    ],
    sectorMetrics: [
      {
        name: "Revenue Growth",
        value: "12.4%",
        category: "growth",
        icon: TrendingUp,
        explanation:
          "Year-over-year revenue growth rate showing sector expansion and business momentum.",
        trend: "+3.2%",
      },
      {
        name: "Profit Margin",
        value: "18.6%",
        category: "profitability",
        icon: Target,
        explanation:
          "Net profit margin indicating operational efficiency and pricing power.",
        trend: "+0.9%",
      },
      {
        name: "P/E Ratio",
        value: "24.5x",
        category: "valuation",
        icon: Percent,
        explanation:
          "Price-to-earnings ratio showing how much investors pay for each dollar of earnings.",
        trend: "+2.1%",
      },
      {
        name: "ROE",
        value: "22.1%",
        category: "profitability",
        icon: BarChart,
        explanation:
          "Return on equity measuring how effectively companies generate returns on shareholder investments.",
        trend: "+1.8%",
      },
      {
        name: "Debt-to-Equity",
        value: "0.42",
        category: "risk",
        icon: AlertCircle,
        explanation:
          "Financial leverage ratio indicating the balance between debt and equity financing.",
        trend: "-0.05%",
      },
      {
        name: "Market Cap",
        value: "$2.4T",
        category: "size",
        icon: Building2,
        explanation:
          "Total market capitalization representing sector size and investor interest.",
        trend: "+15.6%",
      },
      {
        name: "Beta",
        value: "1.15",
        category: "risk",
        icon: Activity,
        explanation:
          "Volatility measure relative to market - values above 1 indicate higher volatility than market average.",
        trend: "+0.05%",
      },
      {
        name: "Dividend Yield",
        value: "1.8%",
        category: "income",
        icon: DollarSign,
        explanation:
          "Average dividend yield across sector companies providing income to investors.",
        trend: "+0.2%",
      },
    ],
    upcomingEvents: [
      { date: "Dec 18", event: "Apple Q4 Earnings Release", impact: "High" },
      { date: "Dec 20", event: "Microsoft Q4 Earnings", impact: "High" },
      { date: "Dec 22", event: "NVIDIA Q4 Earnings", impact: "Medium" },
      { date: "Dec 24", event: "Holiday Trading Break", impact: "Low" },
      {
        date: "Dec 31",
        event: "Year-end Portfolio Rebalancing",
        impact: "Medium",
      },
    ],
    recentMovers: [
      {
        ticker: "NVDA",
        change: "+8.2%",
        reason: "Strong AI chip demand exceeded quarterly expectations",
      },
      {
        ticker: "TSLA",
        change: "+5.6%",
        reason: "Electric vehicle delivery numbers beat analyst forecasts",
      },
      {
        ticker: "META",
        change: "+2.1%",
        reason: "Virtual reality segment showed improved user engagement",
      },
      {
        ticker: "GOOGL",
        change: "-1.2%",
        reason: "Regulatory concerns about AI development practices emerged",
      },
    ],
    sectorNews: [
      {
        title: "AI Innovation Drives Record Sector Investment",
        time: "2 hours ago",
      },
      {
        title: "Tech Companies Report Strong Holiday Quarter",
        time: "4 hours ago",
      },
      {
        title: "Supply Chain Improvements Boost Manufacturing",
        time: "6 hours ago",
      },
      {
        title: "Consumer Spending on Technology Remains Robust",
        time: "8 hours ago",
      },
    ],
  };
};

// Performance comparison chart data
const performanceData = [
  { month: "Jan", sector: 100, nifty: 90, sensex: 80 },
  { month: "Feb", sector: 110, nifty: 95, sensex: 85 },
  { month: "Mar", sector: 120, nifty: 100, sensex: 90 },
  { month: "Apr", sector: 130, nifty: 105, sensex: 95 },
  { month: "May", sector: 140, nifty: 110, sensex: 100 },
  { month: "Jun", sector: 150, nifty: 115, sensex: 105 },
  { month: "Jul", sector: 160, nifty: 120, sensex: 110 },
  { month: "Aug", sector: 170, nifty: 125, sensex: 115 },
  { month: "Sep", sector: 180, nifty: 130, sensex: 120 },
  { month: "Oct", sector: 190, nifty: 135, sensex: 125 },
  { month: "Nov", sector: 200, nifty: 140, sensex: 130 },
  { month: "Dec", sector: 190, nifty: 138, sensex: 128 },
];

const chartConfig = {
  sector: {
    label: "Technology Sector",
    color: "hsl(45, 90%, 60%)",
  },
  nifty: {
    label: "Nifty 50",
    color: "hsl(40, 70%, 50%)",
  },
  sensex: {
    label: "Sensex",
    color: "hsl(35, 60%, 42%)",
  },
} satisfies ChartConfig;

// Market concentration pie chart data
const concentrationData = [
  { name: "Top 3 Companies", value: 42, fill: "hsl(217, 91%, 60%)" },
  { name: "Next 7 Companies", value: 26, fill: "hsl(142, 76%, 36%)" },
  { name: "Other Companies", value: 32, fill: "hsl(45, 93%, 47%)" },
];

const concentrationConfig = {
  top3: {
    label: "Top 3 Companies",
    color: "hsl(217, 91%, 60%)",
  },
  next7: {
    label: "Next 7 Companies",
    color: "hsl(142, 76%, 36%)",
  },
  others: {
    label: "Other Companies",
    color: "hsl(45, 93%, 47%)",
  },
} satisfies ChartConfig;

function ChartLegendCustom() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4 ">
      {Object.entries(chartConfig).map(([key, config]) => (
        <div
          key={key}
          className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm shadow-sm bg-background"
        >
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: config.color }}
          />
          <span className="font-medium text-xs text-muted-foreground">
            {config.label}
          </span>
        </div>
      ))}
    </div>
  );
}

const getMetricColor = (category: string) => {
  switch (category) {
    case "profitability":
      return "bg-emerald-900/15 text-emerald-200 border border-emerald-700/20 hover:bg-emerald-900/25";
    case "growth":
      return "bg-blue-900/15 text-blue-200 border border-blue-700/20 hover:bg-blue-900/25";
    case "valuation":
      return "bg-purple-900/15 text-purple-200 border border-purple-700/20 hover:bg-purple-900/25";
    case "risk":
      return "bg-amber-900/15 text-amber-200 border border-amber-700/20 hover:bg-amber-900/25";
    case "size":
      return "bg-slate-800/15 text-slate-200 border border-slate-600/20 hover:bg-slate-800/25";
    case "income":
      return "bg-teal-900/15 text-teal-200 border border-teal-700/20 hover:bg-teal-900/25";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getSnapshotBadgeColor = (type: string) => {
  switch (type) {
    case "health":
      return "bg-emerald-900/20 text-emerald-300 border border-emerald-700/30";
    case "valuation":
      return "bg-blue-900/20 text-blue-300 border border-blue-700/30";
    case "return":
      return "bg-green-900/20 text-green-300 border border-green-700/30";
    case "cap":
      return "bg-purple-900/20 text-purple-300 border border-purple-700/30";
    case "volatility":
      return "bg-amber-900/20 text-amber-300 border border-amber-700/30";
    case "updated":
      return "bg-slate-800/20 text-slate-300 border border-slate-600/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getRatingColor = (rating: string) => {
  switch (rating) {
    case "Strong":
      return "bg-emerald-100 text-emerald-700";
    case "Average":
      return "bg-amber-100 text-amber-700";
    case "Weak":
      return "bg-red-100 text-red-700";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getHealthColor = (score: number) => {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
};

const getChangeColor = (change: string) => {
  return change.startsWith("+") ? "text-emerald-600" : "text-red-600";
};

export default function SectorDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("summary");
  const sectorSlug = params.sector as string;
  const sectorData = getSectorData(sectorSlug);

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <div className=" bg-background border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="space-y-4">
            {/* Title */}
            <h1 className="text-2xl font-bold">
              {sectorData.name} Sector Health
            </h1>

            {/* Verdict */}
            {/* <p className="text-muted-foreground">{sectorData.verdict}</p> */}

            {/* Snapshot Metrics - Badge Style */}
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${getSnapshotBadgeColor(
                  "health"
                )}`}
              >
                Health: {sectorData.snapshot.healthScore}
              </div>
              <div
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${getSnapshotBadgeColor(
                  "valuation"
                )}`}
              >
                P/E: {sectorData.snapshot.avgValuation}
              </div>
              <div
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${getSnapshotBadgeColor(
                  "return"
                )}`}
              >
                1Y: {sectorData.snapshot.yearReturn}
              </div>
              <div
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${getSnapshotBadgeColor(
                  "cap"
                )}`}
              >
                Cap: {sectorData.snapshot.marketCap}
              </div>
              <div
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${getSnapshotBadgeColor(
                  "volatility"
                )}`}
              >
                Vol: {sectorData.snapshot.volatility}
              </div>
              <div
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${getSnapshotBadgeColor(
                  "updated"
                )}`}
              >
                <Clock className="w-3 h-3 inline mr-1" />
                {sectorData.snapshot.lastUpdated}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="container mx-auto px-6">
          <div className="flex border-b">
            {["summary", "health", "activity", "financial"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium capitalize transition-colors relative ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Summary Tab */}
        {activeTab === "summary" && (
          <div className="space-y-8">
            {/* Key Financial Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Key Financial Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center space-y-2">
                    <DollarSign className="w-8 h-8 mx-auto text-green-500" />
                    <div className="text-2xl font-bold">$2.4T</div>
                    <div className="text-sm text-muted-foreground">
                      Total Market Cap
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <Percent className="w-8 h-8 mx-auto text-blue-500" />
                    <div className="text-2xl font-bold">18.5%</div>
                    <div className="text-sm text-muted-foreground">
                      Avg P/E Ratio
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <TrendingUp className="w-8 h-8 mx-auto text-emerald-500" />
                    <div className="text-2xl font-bold">12.3%</div>
                    <div className="text-sm text-muted-foreground">
                      Revenue Growth
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <FileChartColumn className="w-8 h-8 mx-auto text-purple-500" />
                    <div className="text-2xl font-bold">8.7%</div>
                    <div className="text-sm text-muted-foreground">
                      Profit Margin
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sector Overview Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Sector Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {sectorData.sectorInfo.description}
                    </p>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center space-y-2">
                      <Users className="w-8 h-8 mx-auto text-blue-500" />
                      <div className="text-2xl font-bold">
                        {sectorData.sectorInfo.totalCompanies}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Companies
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <Calendar className="w-8 h-8 mx-auto text-green-500" />
                      <div className="text-2xl font-bold">
                        {sectorData.sectorInfo.avgAge} yrs
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Average Age
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <Globe className="w-8 h-8 mx-auto text-purple-500" />
                      <div className="text-2xl font-bold">Global</div>
                      <div className="text-sm text-muted-foreground">
                        Market Reach
                      </div>
                    </div>
                  </div>

                  {/* Investment Objective */}
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Investment Objective</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {sectorData.sectorInfo.objective}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Pillars */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  How healthy is this sector and why?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sectorData.healthPillars.map((pillar, index) => (
                    <motion.div
                      key={pillar.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-3"
                    >
                      <div className="space-y-2">
                        <h4 className="font-medium">{pillar.name}</h4>
                        <Badge className={getRatingColor(pillar.rating)}>
                          {pillar.rating}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {pillar.explanation}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Concentration & Risk Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Market Concentration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5" />
                    Market Concentration
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Pie Chart */}
                    <div className="h-64">
                      <ChartContainer config={concentrationConfig}>
                        <PieChart>
                          <Pie
                            data={concentrationData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {concentrationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                nameKey="name"
                                hideLabel
                                formatter={(value) => [`${value}%`, "Share"]}
                                className="bg-gray-900/95 border border-amber-500/20 text-amber-100 text-xs backdrop-blur-sm"
                              />
                            }
                          />
                          <ChartLegend
                            content={<ChartLegendContent />}
                            wrapperStyle={{ paddingTop: "20px" }}
                          />
                        </PieChart>
                      </ChartContainer>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Top 3 Holdings</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Top 10 Holdings</span>
                        <span className="text-sm font-medium">68%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Diversification Score</span>
                        <span className="text-sm font-medium">Medium</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="w-5 h-5" />
                    Performance vs Market Benchmarks
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Actual Line Chart */}
                    <div className="h-80">
                      <ChartContainer config={chartConfig}>
                        <LineChart
                          accessibilityLayer
                          data={performanceData}
                          margin={{
                            left: 12,
                            right: 12,
                          }}
                        >
                          <CartesianGrid vertical={false} />
                          <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                          />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                          />
                          <Line
                            dataKey="sector"
                            type="monotone"
                            stroke="hsl(45, 85%, 55%)"
                            strokeWidth={2}
                            dot={false}
                          />
                          <Line
                            dataKey="nifty"
                            type="monotone"
                            stroke="hsl(38, 55%, 45%)"
                            strokeWidth={2}
                            dot={false}
                          />
                          <Line
                            dataKey="sensex"
                            type="monotone"
                            stroke="hsl(32, 40%, 35%)"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ChartContainer>
                      <ChartLegendCustom />
                    </div>

                    {/* Additional Metrics */}
                    {/* <div className="pt-4 border-t space-y-3 mt-12">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Outperformance vs Nifty</span>
                        <span className="text-sm font-medium text-blue-300">
                          +10.2%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Outperformance vs Sensex
                        </span>
                        <span className="text-sm font-medium text-blue-300">
                          +11.6%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Relative Strength</span>
                        <span className="text-sm font-medium text-emerald-300">
                          Strong
                        </span>
                      </div>
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top Performing Stocks
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Market Cap</TableHead>
                      <TableHead>Health Score</TableHead>
                      <TableHead>Quarterly Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sectorData.topStocks.map((stock) => (
                      <TableRow
                        key={stock.ticker}
                        className="cursor-pointer hover:bg-muted/50"
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium">{stock.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {stock.ticker}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {stock.marketCap}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-semibold ${getHealthColor(
                              stock.healthScore
                            )}`}
                          >
                            {stock.healthScore}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`font-medium ${getChangeColor(
                              stock.change
                            )}`}
                          >
                            {stock.change}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Health Tab */}
        {activeTab === "health" && (
          <div className="space-y-8">
            {/* Overall Health Strength Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  Sector Health Score Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Current Health Score */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">
                      {sectorData.healthMetrics.overall}
                    </div>
                    <div className="text-muted-foreground">
                      Current Health Score
                    </div>
                  </div>

                  {/* Historical Health Data */}
                  <div className="space-y-4">
                    <div className="text-center py-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                      <LineChart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        12-month health score timeline showing sector strength
                        evolution
                      </p>
                      <div className="grid grid-cols-3 gap-4 mt-6 max-w-md mx-auto">
                        <div className="text-center">
                          <div className="text-lg font-semibold">3M</div>
                          <div className="text-sm text-muted-foreground">
                            +2.3%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold">6M</div>
                          <div className="text-sm text-muted-foreground">
                            +5.7%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold">12M</div>
                          <div className="text-sm text-muted-foreground">
                            +8.2%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Health History Points */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {sectorData.healthHistory.map((point, index) => (
                        <div key={index} className="text-center space-y-2">
                          <div className="text-sm text-muted-foreground">
                            {point.period}
                          </div>
                          <div
                            className={`text-lg font-semibold ${getHealthColor(
                              point.score
                            )}`}
                          >
                            {point.score}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Metrics Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="w-5 h-5" />
                  Health Metrics Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Metric Bars */}
                  <div className="space-y-4">
                    {Object.entries(sectorData.healthMetrics).map(
                      ([key, value]) => {
                        if (key === "overall") return null;
                        const label =
                          key.charAt(0).toUpperCase() + key.slice(1);
                        const percentage = value;
                        return (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                {label}
                              </span>
                              <span
                                className={`text-sm font-semibold ${getHealthColor(
                                  value
                                )}`}
                              >
                                {value}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  value >= 80
                                    ? "bg-emerald-500"
                                    : value >= 60
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${value}%` }}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* Strength vs Weakness Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
                    <div className="space-y-3">
                      <h4 className="font-medium text-emerald-700 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Strengths
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Growth</span>
                          <span className="text-sm font-medium text-emerald-600">
                            {sectorData.healthMetrics.growth}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Momentum</span>
                          <span className="text-sm font-medium text-emerald-600">
                            {sectorData.healthMetrics.momentum}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-amber-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Areas for Attention
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Valuation</span>
                          <span className="text-sm font-medium text-amber-600">
                            {sectorData.healthMetrics.valuation}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Stability</span>
                          <span className="text-sm font-medium text-amber-600">
                            {sectorData.healthMetrics.stability}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Gainers & Losers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Gainers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    Top Health Gainers
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-center py-6">
                      <PieChart className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Companies with strongest health improvements this
                        quarter
                      </p>
                    </div>

                    <div className="space-y-3">
                      {sectorData.topStocks.slice(0, 4).map((stock, index) => (
                        <div
                          key={stock.ticker}
                          className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200"
                        >
                          <div>
                            <div className="font-medium text-sm">
                              {stock.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {stock.ticker}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-emerald-600 font-medium text-sm">
                              +{5 + index * 2}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Health Score
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Watchlist */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    Health Watchlist
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-center py-6">
                      <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Companies requiring closer monitoring due to declining
                        health metrics
                      </p>
                    </div>

                    <div className="space-y-3">
                      {sectorData.topStocks.slice(4, 8).map((stock, index) => (
                        <div
                          key={stock.ticker}
                          className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200"
                        >
                          <div>
                            <div className="font-medium text-sm">
                              {stock.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {stock.ticker}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-amber-600 font-medium text-sm">
                              -{2 + index}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Health Change
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Health Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  AI Health Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Key Insight */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Key Insight
                    </h4>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      The {sectorData.name.toLowerCase()} sector shows strong
                      momentum and growth metrics but faces valuation concerns.
                      Current health score of {sectorData.healthMetrics.overall}
                      % indicates robust fundamentals, with growth outpacing the
                      broader market by 15%.
                    </p>
                  </div>

                  {/* Actionable Recommendations */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Actionable Recommendations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                        <h5 className="font-medium text-emerald-800 mb-2">
                          Investment Strategy
                        </h5>
                        <p className="text-sm text-emerald-700">
                          Consider gradual position building in top-tier
                          companies with strong health scores above 85.
                        </p>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h5 className="font-medium text-amber-800 mb-2">
                          Risk Management
                        </h5>
                        <p className="text-sm text-amber-700">
                          Monitor valuation metrics closely and maintain
                          diversification across sub-sectors.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Next Update */}
                  <div className="text-center pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Next health assessment update:{" "}
                      <span className="font-medium">Next Monday</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <div className="space-y-8">
            {/* Upcoming Events */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Upcoming Events</h3>
                <div className="space-y-3">
                  {sectorData.upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg border-l-4 border-l-primary/30 bg-muted/30"
                    >
                      <div className="text-sm font-medium text-muted-foreground w-16">
                        {event.date}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{event.event}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {event.impact} Impact
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Movers */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">
                  Recent Sector Movers
                </h3>
                <div className="space-y-4">
                  {sectorData.recentMovers.map((mover, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-primary text-sm">
                          {mover.ticker}
                        </span>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{mover.ticker}</span>
                          <span
                            className={`font-semibold ${getChangeColor(
                              mover.change
                            )}`}
                          >
                            {mover.change}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {mover.reason}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sector News */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Sector Headlines</h3>
                <div className="space-y-4">
                  {sectorData.sectorNews.map((news, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <Globe className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 space-y-1">
                        <div className="font-medium">{news.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {news.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Financial Tab */}
        {activeTab === "financial" && (
          <div className="space-y-8">
            {/* Key Sector Metrics Grid */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Key Sector Metrics
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4 text-muted-foreground hover:text-amber-400 transition-colors cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="max-w-sm p-2 bg-gray-900/95 border border-amber-500/20 text-amber-100 text-xs backdrop-blur-sm"
                      >
                        <p className="text-gray-300">
                          Essential financial and operational metrics that
                          define sector health and investment attractiveness.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {sectorData.sectorMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl ${getMetricColor(
                        metric.category
                      )} space-y-3 text-left transition-all duration-200 shadow-sm`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {metric.icon && <metric.icon className="w-4 h-4" />}
                          <div className="text-xs font-medium uppercase tracking-wider">
                            {metric.name}
                          </div>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-3 h-3 opacity-60 hover:opacity-100 cursor-help transition-opacity" />
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="max-w-xs p-2 bg-gray-900/95 border border-amber-500/20 text-amber-100 text-xs backdrop-blur-sm"
                            >
                              <div className="space-y-1">
                                <div className="font-medium text-amber-200">
                                  {metric.name}
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                  {metric.explanation}
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      {metric.trend && (
                        <div className="flex items-center gap-1 text-xs">
                          {metric.trend.startsWith("+") ? (
                            <TrendingUp className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-400" />
                          )}
                          <span
                            className={
                              metric.trend.startsWith("+")
                                ? "text-emerald-300"
                                : "text-red-300"
                            }
                          >
                            {metric.trend}
                          </span>
                          <span className="text-muted-foreground ml-1">
                            vs last quarter
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Financial Health Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="w-5 h-5" />
                    Revenue & Profitability Trends
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-center py-8 border-2 border-dashed border-muted-foreground/20 rounded-lg">
                      <BarChart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        5-year revenue and profit margin evolution
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-emerald-600">
                          +15.3%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Revenue Growth (YoY)
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">
                          +2.1%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Margin Improvement
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Valuation Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Valuation Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Forward P/E</span>
                        <span className="font-medium">16.8x</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Price-to-Book</span>
                        <span className="font-medium">2.4x</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Price-to-Sales</span>
                        <span className="font-medium">1.9x</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">EV/EBITDA</span>
                        <span className="font-medium">12.1x</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-center">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getSnapshotBadgeColor(
                            "valuation"
                          )}`}
                        >
                          <Target className="w-3 h-3" />
                          Moderately Valued
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dividend & Returns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="w-5 h-5" />
                  Dividend & Return Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="text-3xl font-bold text-blue-600">3.2%</div>
                    <div className="text-sm text-muted-foreground">
                      Average Dividend Yield
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Above sector median
                    </div>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="text-3xl font-bold text-emerald-600">
                      14.8%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average ROE
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Strong profitability
                    </div>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="text-3xl font-bold text-purple-600">
                      11.2%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average ROA
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Efficient asset use
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Financial Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Risk Indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Debt & Liquidity</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Avg Debt-to-Equity</span>
                          <span className="font-medium">0.42</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Current Ratio</span>
                          <span className="font-medium">1.8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Quick Ratio</span>
                          <span className="font-medium">1.3</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Profitability Stability</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Earnings Volatility</span>
                          <span className="font-medium text-emerald-600">
                            Low
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">
                            Revenue Predictability
                          </span>
                          <span className="font-medium text-emerald-600">
                            High
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Cash Flow Stability</span>
                          <span className="font-medium text-emerald-600">
                            Strong
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Overall Financial Health */}
                  <div className="pt-6 border-t">
                    <div className="text-center space-y-3">
                      <div className="text-2xl font-bold text-emerald-600">
                        {sectorData.healthMetrics.financial}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Overall Financial Health Score
                      </div>
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${getSnapshotBadgeColor(
                          "health"
                        )}`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Strong Financial Position
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
