import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Stock } from "@/lib/indian-stocks-data";

interface HealthScoreProps {
  stock: Stock;
}

const HealthScore = ({ stock }: HealthScoreProps) => {
  // Mock data for demonstration
  const mockData = {
    currentPrice: 1820.5,
    change: 58.4,
    changePercent: 3.32,
    previousClose: 1762.1,
    open: 1765.0,
    dayHigh: 1835.2,
    dayLow: 1760.5,
    marketCap: 1250000, // in Crores
    pe: 18.5,
    pb: 2.3,
    dividendYield: 1.2,
    high52Week: 1950.0,
    low52Week: 1420.0,
    volume: 2500000,
    avgVolume: 2200000,
    healthScore: 85,
    healthTrend: "up",
    healthPrevious: 82,
    roe: 17.2,
    netMargin: 24.5,
    roce: 16.8,
    operatingMargin: 28.2,
    revenueGrowth: 14.2,
    profitGrowth: 18.5,
    debtEquity: 0.35,
    interestCoverage: 9.2,
    beta: 0.92,
    avgDailyMove: 1.2,
    eps: 98.5,
    bookValue: 791.3,
    listedYear: 1995,
    sector: stock.sector,
    industry: stock.sector === "Banking" ? "Private Sector Bank" : stock.sector,
  };

  const chartConfig = {
    price: {
      label: "Price",
      color: "#c8a224",
    },
  } satisfies ChartConfig;

  return (
    <div className="mt-8 space-y-12">
      {/* SECTION 1: HEALTH SCORE DEEP-DIVE */}
      <section>
        <p className="text-muted-foreground mb-6 text-lg">
          Let's break down what makes this company fundamentally strong (or
          weak)
        </p>

        {/* Health Summary Card */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              🎯 Complete Health Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Large Score Display */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-40 h-40 mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted/20"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 70 * (1 - mockData.healthScore / 100)
                      }`}
                      className="text-green-500 transition-all duration-1000"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold">
                      {mockData.healthScore}
                    </div>
                    <div className="text-sm text-muted-foreground">/100</div>
                  </div>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-base px-4 py-1 mb-2">
                  Strong 🟢
                </Badge>
                <div className="text-sm text-center space-y-1">
                  <p className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    +3 points from last quarter
                  </p>
                  <p className="text-muted-foreground">
                    Top 15% of all stocks we track
                  </p>
                </div>
              </div>

              {/* Trend Chart */}
              <div className="lg:col-span-2">
                <h4 className="font-semibold mb-4">
                  Health Score Trend (Last 8 Quarters)
                </h4>
                <ChartContainer config={chartConfig} className="h-48 w-full">
                  <LineChart
                    data={[
                      { quarter: "Q1'23", score: 76 },
                      { quarter: "Q2'23", score: 78 },
                      { quarter: "Q3'23", score: 79 },
                      { quarter: "Q4'23", score: 80 },
                      { quarter: "Q1'24", score: 81 },
                      { quarter: "Q2'24", score: 82 },
                      { quarter: "Q3'24", score: 82 },
                      { quarter: "Q4'24", score: 85 },
                    ]}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="quarter"
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      domain={[70, 90]}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(142, 76%, 36%)"
                      strokeWidth={3}
                      dot={{ fill: "hsl(142, 76%, 36%)", r: 4 }}
                    />
                  </LineChart>
                </ChartContainer>

                <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm italic">
                    <span className="font-semibold">AI Summary:</span>{" "}
                    Exceptional across most dimensions, slight valuation
                    concern. The company demonstrates strong fundamentals with
                    consistent improvement in operational metrics.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CATEGORY 1: PROFITABILITY */}
        <Card className="mb-6 border-l-4 border-l-green-500">
          <CardHeader className="bg-green-500/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-xl flex items-center gap-2">
                💰 Profitability
              </CardTitle>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  88/100 🟢
                </Badge>
                <span className="text-sm text-green-500 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +2 points QoQ
                </span>
                <span className="text-sm text-muted-foreground">
                  Top 10% in sector
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Left Column (70%) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold">What We Measure:</span> ROE,
                  ROCE, Net Margin, Operating Margin, Asset Turnover
                </div>

                {/* Metrics Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-semibold text-sm">
                          Metric
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Current
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Sector Avg
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Status
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Trend
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 text-sm">Return on Equity</td>
                        <td className="text-right font-mono font-bold">
                          17.2%
                        </td>
                        <td className="text-right font-mono">15.8%</td>
                        <td className="text-right text-green-500 text-sm">
                          🟢 +1.4
                        </td>
                        <td className="text-right text-green-500">↗ +0.5</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-sm">Net Margin</td>
                        <td className="text-right font-mono font-bold">
                          24.5%
                        </td>
                        <td className="text-right font-mono">21.8%</td>
                        <td className="text-right text-green-500 text-sm">
                          🟢 +2.7
                        </td>
                        <td className="text-right text-green-500">↗ +1.2</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-sm">ROCE</td>
                        <td className="text-right font-mono font-bold">
                          16.8%
                        </td>
                        <td className="text-right font-mono">17.2%</td>
                        <td className="text-right text-yellow-500 text-sm">
                          🟡 -0.4
                        </td>
                        <td className="text-right">→ 0.0</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm">Operating Margin</td>
                        <td className="text-right font-mono font-bold">
                          28.2%
                        </td>
                        <td className="text-right font-mono">28.5%</td>
                        <td className="text-right text-yellow-500 text-sm">
                          🟡 -0.3
                        </td>
                        <td className="text-right text-green-500">↗ +0.8</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* AI Interpretation */}
                <div className="p-4 bg-muted/50 rounded-lg border italic">
                  <p className="text-sm mb-2">
                    <span className="font-semibold not-italic">
                      AI Interpretation:
                    </span>
                  </p>
                  <p className="text-sm leading-relaxed">
                    Profitability is exceptional and improving. ROE of 17.2%
                    means for every ₹100 of shareholder money, the company
                    generates ₹17.2 in profit - better than 85% of peers. Net
                    margins have expanded by 1.2% points, showing pricing power
                    and operational efficiency. ROCE slightly below sector but
                    stable.
                  </p>
                </div>

                {/* Why It Matters */}
                <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">Why It Matters:</span> High
                    profitability = efficient business model. Consistent margins
                    = pricing power and competitive moat.
                  </p>
                </div>
              </div>

              {/* Right Column (30%) */}
              <div className="lg:col-span-3 space-y-4">
                {/* Circular Progress */}
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 56 * (1 - 88 / 100)
                        }`}
                        className="text-green-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold">88</div>
                      <div className="text-xs text-muted-foreground">/100</div>
                    </div>
                  </div>
                </div>

                {/* Mini Trend Chart */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    ROE Trend (8Q)
                  </p>
                  <div className="h-20 flex items-end justify-around gap-1">
                    {[16.2, 16.5, 16.7, 16.9, 17.0, 17.1, 17.0, 17.2].map(
                      (val, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-green-500/30 rounded-t"
                          style={{ height: `${(val / 17.2) * 100}%` }}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 space-y-2">
                  <p className="text-xs font-semibold">Quick Stats</p>
                  <div className="space-y-1 text-xs">
                    <p>
                      <span className="font-semibold">Best in Class:</span> ROE
                    </p>
                    <p>
                      <span className="font-semibold">Improving:</span> Net
                      Margin
                    </p>
                    <p>
                      <span className="font-semibold">Watch:</span> ROCE
                      relative to sector
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CATEGORY 2: GROWTH */}
        <Card className="mb-6 border-l-4 border-l-blue-500">
          <CardHeader className="bg-blue-500/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-xl flex items-center gap-2">
                📈 Growth
              </CardTitle>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  82/100 🟢
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  → Stable
                </span>
                <span className="text-sm text-muted-foreground">
                  Above average in sector
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold">What We Measure:</span>{" "}
                  Revenue CAGR, Profit CAGR, EPS Growth, Book Value Growth
                </div>

                {/* Metrics Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-semibold text-sm">
                          Metric
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          3Y CAGR
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          5Y CAGR
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Last Yr
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 text-sm">Revenue Growth</td>
                        <td className="text-right font-mono font-bold">
                          14.2%
                        </td>
                        <td className="text-right font-mono">13.8%</td>
                        <td className="text-right font-mono">14.5%</td>
                        <td className="text-right text-green-500 text-sm">
                          🟢 Steady
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-sm">Profit Growth</td>
                        <td className="text-right font-mono font-bold">
                          18.5%
                        </td>
                        <td className="text-right font-mono">16.2%</td>
                        <td className="text-right font-mono">19.2%</td>
                        <td className="text-right text-green-500 text-sm">
                          🟢 Strong
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-sm">EPS Growth</td>
                        <td className="text-right font-mono font-bold">
                          17.8%
                        </td>
                        <td className="text-right font-mono">15.5%</td>
                        <td className="text-right font-mono">18.8%</td>
                        <td className="text-right text-green-500 text-sm">
                          🟢 Good
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm">Book Value Growth</td>
                        <td className="text-right font-mono font-bold">
                          16.2%
                        </td>
                        <td className="text-right font-mono">14.8%</td>
                        <td className="text-right font-mono">15.5%</td>
                        <td className="text-right text-green-500 text-sm">
                          🟢 Solid
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* QoQ Growth */}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-semibold mb-2">
                    Quarter-over-Quarter Growth (Last 4 quarters):
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-2 py-1 bg-green-500/10 rounded">
                      Q4 FY24: +15.2%
                    </span>
                    <span className="px-2 py-1 bg-green-500/10 rounded">
                      Q3 FY24: +12.8%
                    </span>
                    <span className="px-2 py-1 bg-green-500/10 rounded">
                      Q2 FY24: +16.5%
                    </span>
                    <span className="px-2 py-1 bg-green-500/10 rounded">
                      Q1 FY24: +13.2%
                    </span>
                  </div>
                </div>

                {/* AI Interpretation */}
                <div className="p-4 bg-muted/50 rounded-lg border italic">
                  <p className="text-sm mb-2">
                    <span className="font-semibold not-italic">
                      AI Interpretation:
                    </span>
                  </p>
                  <p className="text-sm leading-relaxed">
                    Consistent double-digit growth across all parameters. Profit
                    growing faster than revenue (18.5% vs 14.2%) indicates
                    margin expansion - a sign of operating leverage. Growth has
                    been steady rather than erratic, suggesting sustainable
                    business momentum. Recent quarters show slight acceleration.
                  </p>
                </div>

                {/* Why It Matters */}
                <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">Why It Matters:</span>{" "}
                    Growth shows if the business is expanding. Profit growing
                    faster than revenue is particularly good - means efficiency
                    improving.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-3 space-y-4">
                {/* Score Circle */}
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 56 * (1 - 82 / 100)
                        }`}
                        className="text-blue-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold">82</div>
                      <div className="text-xs text-muted-foreground">/100</div>
                    </div>
                  </div>
                </div>

                {/* Growth Consistency */}
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-sm font-semibold mb-2">
                    Growth Consistency
                  </p>
                  <p className="text-2xl font-bold text-blue-500 mb-1">8/10</p>
                  <p className="text-xs text-muted-foreground">
                    quarters showed double-digit growth
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 space-y-2">
                  <p className="text-xs font-semibold">Quick Stats</p>
                  <div className="space-y-1 text-xs">
                    <p>
                      <span className="font-semibold">Strength:</span>{" "}
                      Consistent momentum
                    </p>
                    <p>
                      <span className="font-semibold">Pattern:</span>{" "}
                      Accelerating recently
                    </p>
                    <p>
                      <span className="font-semibold">Type:</span> Balanced (not
                      volatile)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CATEGORY 3: STABILITY */}
        <Card className="mb-6 border-l-4 border-l-purple-500">
          <CardHeader className="bg-purple-500/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-xl flex items-center gap-2">
                🛡️ Stability
              </CardTitle>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  90/100 🟢
                </Badge>
                <span className="text-sm text-green-500 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Improving
                </span>
                <span className="text-sm text-muted-foreground">
                  Top 8% - Very Stable
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold">What We Measure:</span>{" "}
                  Debt/Equity, Interest Coverage, Current Ratio, Earnings
                  Consistency
                </div>

                {/* Metrics Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-semibold text-sm">
                          Metric
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Current
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Safe Level
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Status
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Trend
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 text-sm">Debt-to-Equity</td>
                        <td className="text-right font-mono font-bold">0.35</td>
                        <td className="text-right font-mono">{"< 0.5"}</td>
                        <td className="text-right text-green-500 text-sm">
                          🟢 Safe
                        </td>
                        <td className="text-right text-green-500">↘ -0.05</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-sm">Interest Coverage</td>
                        <td className="text-right font-mono font-bold">9.2x</td>
                        <td className="text-right font-mono">{"> 3.0x"}</td>
                        <td className="text-right text-green-500 text-sm">
                          🟢 Strong
                        </td>
                        <td className="text-right text-green-500">↗ +0.8</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-sm">Current Ratio</td>
                        <td className="text-right font-mono font-bold">1.85</td>
                        <td className="text-right font-mono">{"> 1.5"}</td>
                        <td className="text-right text-green-500 text-sm">
                          🟢 Healthy
                        </td>
                        <td className="text-right">→ 0.0</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm">Quick Ratio</td>
                        <td className="text-right font-mono font-bold">1.42</td>
                        <td className="text-right font-mono">{"> 1.0"}</td>
                        <td className="text-right text-green-500 text-sm">
                          🟢 Good
                        </td>
                        <td className="text-right text-green-500">↗ +0.1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Earnings Consistency */}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-semibold mb-2">
                    Earnings Consistency:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>
                      • Positive profit:{" "}
                      <span className="font-semibold">
                        20 consecutive quarters
                      </span>
                    </li>
                    <li>
                      • Margin stability:{" "}
                      <span className="font-semibold">
                        ±2% range over 5 years
                      </span>
                    </li>
                    <li>
                      • No major one-time charges in{" "}
                      <span className="font-semibold">3 years</span>
                    </li>
                  </ul>
                </div>

                {/* AI Interpretation */}
                <div className="p-4 bg-muted/50 rounded-lg border italic">
                  <p className="text-sm mb-2">
                    <span className="font-semibold not-italic">
                      AI Interpretation:
                    </span>
                  </p>
                  <p className="text-sm leading-relaxed">
                    Exceptional stability profile. Low debt (D/E of 0.35) means
                    company isn't overleveraged - can handle downturns. Interest
                    coverage of 9.2x means even if profits halve, company can
                    still pay debt obligations comfortably. Liquidity is strong
                    with current ratio of 1.85. Earnings have been remarkably
                    consistent with no nasty surprises.
                  </p>
                </div>

                {/* Why It Matters */}
                <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">Why It Matters:</span>{" "}
                    Stability = sleep-well factor. Low debt + consistent
                    earnings = company can weather storms.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-3 space-y-4">
                {/* Score Circle */}
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 56 * (1 - 90 / 100)
                        }`}
                        className="text-purple-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold">90</div>
                      <div className="text-xs text-muted-foreground">/100</div>
                    </div>
                  </div>
                </div>

                {/* Debt Trend */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    D/E Trend (8Q) - Declining ✓
                  </p>
                  <div className="h-20 flex items-end justify-around gap-1">
                    {[0.45, 0.43, 0.41, 0.4, 0.38, 0.37, 0.36, 0.35].map(
                      (val, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-purple-500/30 rounded-t"
                          style={{
                            height: `${((0.5 - val) / 0.15) * 100}%`,
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Risk Indicator */}
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                  <p className="text-sm font-semibold">Low Financial Risk 🟢</p>
                </div>

                {/* Quick Stats */}
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 space-y-2">
                  <p className="text-xs font-semibold">Quick Stats</p>
                  <div className="space-y-1 text-xs">
                    <p>
                      <span className="font-semibold">Debt Level:</span> Very
                      Safe
                    </p>
                    <p>
                      <span className="font-semibold">Liquidity:</span> Strong
                    </p>
                    <p>
                      <span className="font-semibold">Track Record:</span>{" "}
                      Consistent
                    </p>
                    <p>
                      <span className="font-semibold">Red Flags:</span> None
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CATEGORY 4: EFFICIENCY */}
        <Card className="mb-6 border-l-4 border-l-cyan-500">
          <CardHeader className="bg-cyan-500/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-xl flex items-center gap-2">
                ⚡ Efficiency
              </CardTitle>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  85/100 🟢
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  → Stable
                </span>
                <span className="text-sm text-muted-foreground">
                  Top 20% in sector
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold">What We Measure:</span> Asset
                  Turnover, Working Capital Days, Cash Conversion,
                  Receivables/Inventory Days
                </div>

                {/* Metrics Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-semibold text-sm">
                          Metric
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Current
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Sector Avg
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Status
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Trend
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 text-sm">Asset Turnover</td>
                        <td className="text-right font-mono font-bold">
                          0.82x
                        </td>
                        <td className="text-right font-mono">0.82x</td>
                        <td className="text-right text-yellow-500 text-sm">
                          🟡 Avg
                        </td>
                        <td className="text-right">→ 0.0</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-sm">Cash Conversion Ratio</td>
                        <td className="text-right font-mono font-bold">1.15</td>
                        <td className="text-right font-mono">1.05</td>
                        <td className="text-right text-green-500 text-sm">
                          🟢 Good
                        </td>
                        <td className="text-right text-green-500">↗ +0.05</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-sm">Working Capital Days</td>
                        <td className="text-right font-mono font-bold">45</td>
                        <td className="text-right font-mono">52</td>
                        <td className="text-right text-green-500 text-sm">
                          🟢 Better
                        </td>
                        <td className="text-right text-green-500">↘ -3</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm">Receivables Days</td>
                        <td className="text-right font-mono font-bold">28</td>
                        <td className="text-right font-mono">32</td>
                        <td className="text-right text-green-500 text-sm">
                          🟢 Better
                        </td>
                        <td className="text-right">→ 0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Operating Efficiency */}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-semibold mb-2">
                    Operating Efficiency:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>
                      • Operating Cash Flow:{" "}
                      <span className="font-mono font-semibold">
                        ₹12,500 Cr
                      </span>{" "}
                      (vs Profit: ₹10,850 Cr)
                    </li>
                    <li>
                      • Free Cash Flow:{" "}
                      <span className="font-mono font-semibold">₹8,200 Cr</span>
                    </li>
                    <li>
                      • FCF/Profit:{" "}
                      <span className="font-semibold text-green-500">
                        75.6%
                      </span>{" "}
                      (Good conversion)
                    </li>
                  </ul>
                </div>

                {/* AI Interpretation */}
                <div className="p-4 bg-muted/50 rounded-lg border italic">
                  <p className="text-sm mb-2">
                    <span className="font-semibold not-italic">
                      AI Interpretation:
                    </span>
                  </p>
                  <p className="text-sm leading-relaxed">
                    Company converts profits to cash efficiently - OCF is 115%
                    of reported profit, meaning earnings are real and not just
                    accounting entries. Working capital management is better
                    than peers (45 days vs 52). While asset turnover is average,
                    the quality of earnings is high with strong free cash flow
                    generation.
                  </p>
                </div>

                {/* Why It Matters */}
                <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">Why It Matters:</span>{" "}
                    Efficiency shows how well management uses resources. Cash{" "}
                    {">"} Profit on paper is crucial - many companies show
                    profits but no cash.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-3 space-y-4">
                {/* Score Circle */}
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 56 * (1 - 85 / 100)
                        }`}
                        className="text-cyan-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold">85</div>
                      <div className="text-xs text-muted-foreground">/100</div>
                    </div>
                  </div>
                </div>

                {/* Cash Conversion */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    OCF vs Net Profit
                  </p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>OCF</span>
                        <span className="font-mono">₹12,500 Cr</span>
                      </div>
                      <div
                        className="h-3 bg-green-500/30 rounded"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Profit</span>
                        <span className="font-mono">₹10,850 Cr</span>
                      </div>
                      <div
                        className="h-3 bg-blue-500/30 rounded"
                        style={{ width: "87%" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Efficiency Badge */}
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
                  <p className="text-sm font-semibold">
                    High Quality Earnings ✓
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20 space-y-2">
                  <p className="text-xs font-semibold">Quick Stats</p>
                  <div className="space-y-1 text-xs">
                    <p>
                      <span className="font-semibold">Cash Generation:</span>{" "}
                      Excellent
                    </p>
                    <p>
                      <span className="font-semibold">Working Capital:</span>{" "}
                      Efficient
                    </p>
                    <p>
                      <span className="font-semibold">Asset Use:</span> Moderate
                    </p>
                    <p>
                      <span className="font-semibold">Earnings Quality:</span>{" "}
                      High
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CATEGORY 5: VALUATION */}
        <Card className="mb-6 border-l-4 border-l-amber-500">
          <CardHeader className="bg-amber-500/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-xl flex items-center gap-2">
                💎 Valuation
              </CardTitle>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                  70/100 🟡
                </Badge>
                <span className="text-sm text-red-500 flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  -2 points (more expensive)
                </span>
                <span className="text-sm text-muted-foreground">
                  Premium pricing
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold">What We Measure:</span> P/E vs
                  Sector, P/E vs History, P/B Ratio, PEG Ratio, EV/EBITDA
                </div>

                {/* Metrics Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-semibold text-sm">
                          Metric
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Current
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Sector
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Historical Avg
                        </th>
                        <th className="text-right py-2 font-semibold text-sm">
                          Assessment
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 text-sm">P/E Ratio</td>
                        <td className="text-right font-mono font-bold">18.5</td>
                        <td className="text-right font-mono">14.2</td>
                        <td className="text-right font-mono text-xs">
                          16.2 (5Y avg)
                        </td>
                        <td className="text-right text-yellow-600 text-xs">
                          🟡 Premium +30%
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-sm">P/B Ratio</td>
                        <td className="text-right font-mono font-bold">2.3</td>
                        <td className="text-right font-mono">1.8</td>
                        <td className="text-right font-mono text-xs">
                          2.0 (5Y avg)
                        </td>
                        <td className="text-right text-yellow-600 text-xs">
                          🟡 Premium +28%
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-sm">EV/EBITDA</td>
                        <td className="text-right font-mono font-bold">12.5</td>
                        <td className="text-right font-mono">10.8</td>
                        <td className="text-right font-mono text-xs">
                          11.2 (5Y avg)
                        </td>
                        <td className="text-right text-yellow-600 text-xs">
                          🟡 Premium +16%
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 text-sm">PEG Ratio</td>
                        <td className="text-right font-mono font-bold">1.04</td>
                        <td className="text-right font-mono">-</td>
                        <td className="text-right font-mono text-xs">
                          {"< 1.5 is good"}
                        </td>
                        <td className="text-right text-green-500 text-xs">
                          🟢 Reasonable
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-sm">Div Yield</td>
                        <td className="text-right font-mono font-bold">1.2%</td>
                        <td className="text-right font-mono">2.8%</td>
                        <td className="text-right font-mono text-xs">
                          1.5% (5Y avg)
                        </td>
                        <td className="text-right text-red-500 text-xs">
                          🔴 Lower
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Valuation Context */}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm font-semibold mb-2">
                    Valuation Context:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>
                      • Current P/E percentile:{" "}
                      <span className="font-semibold">72nd percentile</span> (5Y
                      range)
                    </li>
                    <li>
                      • Distance from 5Y high P/E:{" "}
                      <span className="font-semibold">-8%</span> (was higher)
                    </li>
                    <li>
                      • Distance from 5Y low P/E:{" "}
                      <span className="font-semibold">+45%</span> (well above
                      bottom)
                    </li>
                  </ul>
                </div>

                {/* AI Interpretation */}
                <div className="p-4 bg-muted/50 rounded-lg border italic">
                  <p className="text-sm mb-2">
                    <span className="font-semibold not-italic">
                      AI Interpretation:
                    </span>
                  </p>
                  <p className="text-sm leading-relaxed">
                    Stock trades at premium to both sector (P/E 18.5 vs 14.2)
                    and its own historical average. The premium is justified by
                    superior ROE and consistency, but leaves little margin of
                    safety. At current price, you're paying ₹18.5 for every ₹1
                    of annual earnings - 30% more than sector average. However,
                    PEG ratio of 1.04 suggests growth isn't overpriced. Not a
                    value buy, but not egregiously expensive either.
                  </p>
                </div>

                {/* Why It Matters */}
                <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">Why It Matters:</span>{" "}
                    Valuation determines if current price makes sense. Premium
                    valuations mean high expectations - company must deliver
                    consistent performance to justify price.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-3 space-y-4">
                {/* Score Circle */}
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        className="text-muted/20"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 56 * (1 - 70 / 100)
                        }`}
                        className="text-amber-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold">70</div>
                      <div className="text-xs text-muted-foreground">/100</div>
                    </div>
                  </div>
                </div>

                {/* P/E Band */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    5Y P/E Range
                  </p>
                  <div className="relative h-8 bg-gradient-to-r from-green-500/20 via-yellow-500/20 to-red-500/20 rounded">
                    <div className="absolute top-0 left-[72%] w-1 h-full bg-foreground">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold">
                        18.5
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>Low: 12.8</span>
                    <span>High: 19.8</span>
                  </div>
                </div>

                {/* Value Assessment */}
                <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-center">
                  <p className="text-sm font-semibold">
                    Fair to Slightly Expensive
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 space-y-2">
                  <p className="text-xs font-semibold">Quick Stats</p>
                  <div className="space-y-1 text-xs">
                    <p>
                      <span className="font-semibold">vs Sector:</span> Premium
                      +30%
                    </p>
                    <p>
                      <span className="font-semibold">vs History:</span> Above
                      average
                    </p>
                    <p>
                      <span className="font-semibold">Growth Adjusted:</span>{" "}
                      Reasonable
                    </p>
                    <p>
                      <span className="font-semibold">Verdict:</span> Quality
                      premium
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HealthScore;
