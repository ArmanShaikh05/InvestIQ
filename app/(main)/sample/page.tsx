"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bell,
  Plus,
  TrendingUp,
  TrendingDown,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function StockOverviewPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [chartPeriod, setChartPeriod] = useState("1Y");

  const tabs = [
    "Overview",
    "Fundamentals",
    "Valuation",
    "Technical",
    "Activity",
    "News",
  ];
  const chartPeriods = ["1M", "3M", "6M", "1Y", "3Y", "5Y"];

  return (
    <div className="min-h-screen bg-background">
      {/* FIXED STOCK HEADER */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1800px] px-6 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* LEFT SECTION */}
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-2xl font-bold text-white shadow-lg">
                H
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">HDFC Bank</h1>
                <p className="font-mono text-[13px] text-muted-foreground">
                  NSE: HDFCBANK • BSE: 500180
                </p>
              </div>
            </div>

            {/* MIDDLE SECTION */}
            <div className="text-center">
              <div className="font-mono text-4xl font-bold">₹1,820</div>
              <div className="mt-1 flex items-center justify-center gap-1 text-lg font-semibold text-green-600">
                <TrendingUp className="size-5" />
                +₹58 (+3.29%)
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end gap-2">
                <Badge className="px-5 py-2.5 text-base font-bold" variant="success">
                  85/100 • STRONG 🟢
                </Badge>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Plus className="size-3" />
                    Portfolio
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Plus className="size-3" />
                    Watchlist
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Bell className="size-3" />
                    Alert
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TAB NAVIGATION */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-[1800px] px-6">
          <div className="flex gap-1 py-1.5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={cn(
                  "rounded-md px-6 py-3.5 text-[13px] font-medium transition-all",
                  activeTab === tab.toLowerCase()
                    ? "bg-background font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DASHBOARD GRID */}
      <div className="mx-auto max-w-[1800px] px-6 py-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 lg:grid-rows-[auto_auto_auto_auto_auto]">
          {/* CARD 1: COMPANY IDENTITY (tall left column, row span 2) */}
          <Card className="row-span-2 flex flex-col p-6 lg:col-span-1">
            <p className="mb-5 text-sm italic text-muted-foreground">
              Understanding the company
            </p>
            <div className="border-b pb-5">
              <h3 className="mb-4 border-b pb-3 text-xs font-bold uppercase tracking-wider">
                Company Identity
              </h3>

              {/* Sector Tags */}
              <div className="mb-5 flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs font-semibold">
                  Banking
                </Badge>
                <Badge variant="outline" className="text-xs font-semibold">
                  Large Cap
                </Badge>
              </div>

              {/* Key Stats Grid */}
              <div className="space-y-0">
                {[
                  { label: "Market Cap", value: "₹12.5L Cr" },
                  { label: "Sector Rank", value: "#3" },
                  { label: "52W High", value: "₹1,950" },
                  { label: "52W Low", value: "₹1,420" },
                  { label: "Avg Volume", value: "25L shares" },
                  { label: "Listed Since", value: "1995" },
                  { label: "P/E Ratio", value: "18.5" },
                  { label: "P/B Ratio", value: "2.3" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b py-3 last:border-0"
                  >
                    <span className="text-[13px] text-muted-foreground">
                      {stat.label}
                    </span>
                    <span className="font-mono text-sm font-semibold">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Description */}
            <div className="mt-5 rounded-lg bg-muted/30 p-4">
              <p className="mb-2 text-xs font-semibold text-muted-foreground">
                What they do:
              </p>
              <p className="text-[13px] leading-relaxed text-foreground/90">
                India's largest private sector bank. Provides retail, wholesale,
                and treasury services. Strong digital presence with market-leading
                asset quality.
              </p>
              <button className="mt-3 flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                Learn about business model
                <ChevronRight className="size-3" />
              </button>
            </div>
          </Card>

          {/* CARD 2: HEALTH SCORE HERO */}
          <Card className="p-6 lg:col-span-1">
            <p className="mb-5 text-sm italic text-muted-foreground">
              Our assessment of this company's fundamental health
            </p>
            <h3 className="mb-6 border-b pb-3 text-xs font-bold uppercase tracking-wider">
              Overall Health Score
            </h3>

            {/* Overall Score Display */}
            <div className="mb-6 flex flex-col items-center">
              <div className="relative mb-4 flex size-32 items-center justify-center">
                {/* Circular progress */}
                <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.85)}`}
                    className="text-green-500 transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-5xl font-extrabold">85</span>
                </div>
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Overall Health
              </p>
              <Badge className="px-4 py-1.5 text-[13px] font-bold" variant="success">
                STRONG 🟢
              </Badge>
            </div>

            {/* Category Breakdown */}
            <div className="mb-4 grid grid-cols-2 gap-3">
              {[
                { label: "Profitability", score: 88, status: "strong" },
                { label: "Growth", score: 82, status: "strong" },
                { label: "Stability", score: 90, status: "strong" },
                { label: "Valuation", score: 70, status: "moderate" },
              ].map((cat, i) => (
                <div
                  key={i}
                  className="group cursor-pointer rounded-lg border bg-card/50 p-4 text-center transition-all hover:scale-105 hover:shadow-md"
                >
                  <div className="mb-1 font-mono text-2xl font-bold">
                    {cat.score}
                  </div>
                  <div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    {cat.label}
                  </div>
                  <div className="text-lg">
                    {cat.status === "strong" ? "🟢" : "🟡"}
                  </div>
                </div>
              ))}
            </div>

            {/* Trend Indicator */}
            <div className="rounded-lg bg-muted/30 p-3 text-center">
              <p className="text-xs text-muted-foreground">
                ↗ Improved from 82 last quarter
              </p>
              <button className="mt-2 text-xs font-medium text-primary hover:underline">
                Want detailed breakdown? → Go to Fundamentals Tab
              </button>
            </div>
          </Card>

          {/* CARD 3: VALUATION METRICS */}
          <Card className="p-6 lg:col-span-1">
            <p className="mb-5 text-sm italic text-muted-foreground">
              Key valuation numbers
            </p>
            <h3 className="mb-6 border-b pb-3 text-xs font-bold uppercase tracking-wider">
              Valuation Metrics
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "P/E Ratio",
                  value: "18.5",
                  context: "Sector: 14.2 (Premium)",
                  status: "premium",
                },
                {
                  name: "P/B Ratio",
                  value: "2.3",
                  context: "Sector: 1.8 (Premium)",
                  status: "premium",
                },
                {
                  name: "ROE",
                  value: "17.2%",
                  context: "Sector: 15.8% (Better)",
                  status: "better",
                },
                {
                  name: "Net Margin",
                  value: "24.5%",
                  context: "Sector: 21.8% (Better)",
                  status: "better",
                },
              ].map((metric, i) => (
                <div
                  key={i}
                  className={cn(
                    "group cursor-pointer rounded-lg border-l-4 bg-card/50 p-4 transition-all hover:scale-105 hover:shadow-md",
                    metric.status === "better" && "border-l-green-500",
                    metric.status === "premium" && "border-l-yellow-500"
                  )}
                >
                  <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    {metric.name}
                  </div>
                  <div className="mb-2 font-mono text-2xl font-bold">
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {metric.context}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* CARD 4: RETURNS SNAPSHOT */}
          <Card className="p-6 lg:col-span-1">
            <p className="mb-5 text-sm italic text-muted-foreground">
              Performance at a glance
            </p>
            <h3 className="mb-6 border-b pb-3 text-xs font-bold uppercase tracking-wider">
              Returns Snapshot
            </h3>

            {/* Absolute Returns */}
            <div className="mb-4 space-y-0">
              {[
                { period: "1 Month", return: "+8.5%" },
                { period: "6 Months", return: "+18.2%" },
                { period: "1 Year", return: "+24.5%" },
                { period: "3 Years", return: "+65.8%" },
              ].map((ret, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b py-3.5 last:border-0"
                >
                  <span className="text-[13px] text-muted-foreground">
                    {ret.period}
                  </span>
                  <span className="font-mono text-sm font-semibold text-green-600">
                    {ret.return}
                  </span>
                </div>
              ))}
            </div>

            <div className="my-4 h-px bg-border" />

            {/* Relative Returns */}
            <div className="mb-4 space-y-0">
              {[
                { benchmark: "vs Nifty 50", return: "+12.2%" },
                { benchmark: "vs Bank Nifty", return: "+8.5%" },
              ].map((rel, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b py-3.5 last:border-0"
                >
                  <span className="text-[13px] text-muted-foreground">
                    {rel.benchmark}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-sm font-semibold text-green-600">
                    {rel.return} 🟢
                  </span>
                </div>
              ))}
            </div>

            {/* Insight Box */}
            <div className="rounded-lg bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">
                Consistent outperformer against benchmarks
              </p>
            </div>
          </Card>

          {/* CARD 5: PRICE CHART (spans 2 columns) */}
          <Card className="p-6 lg:col-span-2">
            <p className="mb-5 text-sm italic text-muted-foreground">
              Price movement over time
            </p>

            {/* Title bar with controls */}
            <div className="mb-6 flex items-center justify-between border-b pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Price Performance
              </h3>
              <div className="flex gap-1 rounded-lg bg-muted/50 p-1">
                {chartPeriods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    className={cn(
                      "rounded px-3 py-1.5 text-[11px] font-medium transition-all",
                      chartPeriod === period
                        ? "bg-background font-semibold shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Area */}
            <div className="mb-6 flex h-60 items-center justify-center rounded-lg border-2 border-dashed bg-muted/20">
              <div className="text-center">
                <div className="mb-2 text-4xl">📈</div>
                <p className="text-sm font-medium text-muted-foreground">
                  [Price Chart - {chartPeriod} View]
                </p>
                <p className="text-xs text-muted-foreground">
                  Interactive chart placeholder
                </p>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-4 gap-4 border-t pt-5">
              {[
                { label: "Beta", value: "0.92" },
                { label: "Avg Daily Move", value: "±1.2%" },
                { label: "From 52W High", value: "-6.7%", negative: true },
                { label: "From 52W Low", value: "+28.2%", positive: true },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </div>
                  <div
                    className={cn(
                      "font-mono text-lg font-bold",
                      stat.negative && "text-red-600",
                      stat.positive && "text-green-600"
                    )}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* CARD 6: GROWTH METRICS */}
          <Card className="p-6 lg:col-span-1">
            <p className="mb-5 text-sm italic text-muted-foreground">
              Growth trajectory
            </p>
            <h3 className="mb-6 border-b pb-3 text-xs font-bold uppercase tracking-wider">
              Growth Metrics
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "Revenue Growth",
                  value: "14.2%",
                  context: "YoY • Sector: 14.2%",
                },
                {
                  name: "Profit Growth",
                  value: "18.5%",
                  context: "YoY • Sector: 18.5%",
                },
                {
                  name: "Debt/Equity",
                  value: "0.35",
                  context: "Sector: 0.42 (Lower)",
                },
                {
                  name: "Interest Coverage",
                  value: "9.2x",
                  context: "Safe: >3x 🟢",
                },
              ].map((metric, i) => (
                <div
                  key={i}
                  className="group cursor-pointer rounded-lg border-l-4 border-l-green-500 bg-card/50 p-4 transition-all hover:scale-105 hover:shadow-md"
                >
                  <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                    {metric.name}
                  </div>
                  <div className="mb-2 font-mono text-2xl font-bold">
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {metric.context}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* CARD 7: PEER COMPARISON (spans 2 columns) */}
          <Card className="p-6 lg:col-span-2">
            <p className="mb-5 text-sm italic text-muted-foreground">
              How it compares to competitors
            </p>
            <h3 className="mb-6 flex items-center gap-2 border-b pb-3 text-xs font-bold uppercase tracking-wider">
              ⚖️ Peer Comparison
            </h3>

            {/* Data Table */}
            <div className="mb-4 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    {[
                      "Company",
                      "Price",
                      "Health",
                      "P/E",
                      "ROE",
                      "Growth",
                      "Market Cap",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-3 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-muted-foreground"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "HDFC Bank",
                      price: "₹1,820",
                      health: "85 🟢",
                      pe: "18.5",
                      roe: "17.2%",
                      growth: "14.2%",
                      mcap: "₹12.5L Cr",
                      current: true,
                    },
                    {
                      name: "ICICI Bank",
                      price: "₹1,180",
                      health: "82 🟢",
                      pe: "16.2",
                      roe: "16.8%",
                      growth: "16.5%",
                      mcap: "₹8.2L Cr",
                    },
                    {
                      name: "Kotak Bank",
                      price: "₹1,950",
                      health: "83 🟢",
                      pe: "20.5",
                      roe: "16.2%",
                      growth: "12.8%",
                      mcap: "₹3.8L Cr",
                    },
                    {
                      name: "Axis Bank",
                      price: "₹1,120",
                      health: "78 🟢",
                      pe: "14.8",
                      roe: "14.5%",
                      growth: "15.2%",
                      mcap: "₹3.4L Cr",
                    },
                  ].map((company, i) => (
                    <tr
                      key={i}
                      className={cn(
                        "border-b transition-colors hover:bg-muted/30",
                        company.current &&
                          "border-l-4 border-l-primary bg-primary/5 font-semibold"
                      )}
                    >
                      <td className="px-3 py-4 text-[13px]">{company.name}</td>
                      <td className="px-3 py-4 font-mono text-[13px]">
                        {company.price}
                      </td>
                      <td className="px-3 py-4 text-[13px]">{company.health}</td>
                      <td className="px-3 py-4 font-mono text-[13px]">
                        {company.pe}
                      </td>
                      <td className="px-3 py-4 font-mono text-[13px]">
                        {company.roe}
                      </td>
                      <td className="px-3 py-4 font-mono text-[13px]">
                        {company.growth}
                      </td>
                      <td className="px-3 py-4 font-mono text-[13px]">
                        {company.mcap}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Key Insights Box */}
            <div className="rounded-lg bg-muted/30 p-4">
              <h4 className="mb-3 text-[13px] font-bold">Comparative Insights</h4>
              <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                <li>
                  • HDFC has highest health score and ROE in peer group
                </li>
                <li>
                  • Trading at premium valuation (P/E 18.5 vs peer avg 17.1)
                </li>
                <li>
                  • Second largest by market cap, industry leader
                </li>
                <li>
                  • Most consistent growth profile among peers
                </li>
              </ul>
              <Button size="sm" variant="outline" className="mt-4 text-xs">
                Detailed Peer Comparison
                <ChevronRight className="size-3" />
              </Button>
            </div>
          </Card>

          {/* CARD 8: AI SUMMARY (PROMINENT, spans 2 columns) */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 shadow-lg lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="size-5 text-primary" />
              <h3 className="text-base font-bold">AI Investment Summary</h3>
            </div>

            <h4 className="mb-4 text-lg font-bold leading-snug">
              Strong fundamentals with premium valuation — suitable for
              quality-focused long-term investors
            </h4>

            <div className="mb-4 space-y-4 text-sm leading-relaxed text-foreground/90">
              <p>
                HDFC Bank is a high-quality business with consistent
                profitability, strong market position, and excellent operational
                metrics. ROE of 17.2% and net margin of 24.5% place it among the
                best-run banks in India.
              </p>
              <p>
                The stock trades at a premium (P/E: 18.5 vs sector: 14.2),
                reflecting its quality and track record. This leaves limited
                margin of safety—the price already factors in continued
                excellence.
              </p>
              <p>
                Best suited for investors who prioritize quality and stability
                over value hunting. Growth is steady rather than explosive. Fits
                well in long-term portfolios for those comfortable with premium
                pricing for dependable compounders.
              </p>
            </div>

            <div className="my-5 h-px bg-border" />

            {/* Risk-Reward Indicators */}
            <div className="mb-5 flex flex-wrap gap-8">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  Risk Level
                </p>
                <div className="mb-2 flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                      key={dot}
                      className={cn(
                        "h-2 w-6 rounded-full",
                        dot <= 2 ? "bg-primary" : "bg-muted"
                      )}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Moderate (2/5)</p>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  Return Potential
                </p>
                <div className="mb-2 flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                      key={dot}
                      className={cn(
                        "h-2 w-6 rounded-full",
                        dot <= 3 ? "bg-primary" : "bg-muted"
                      )}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Good (3/5)</p>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  Time Horizon
                </p>
                <p className="mb-1 text-base font-bold">3-5+ years</p>
                <p className="text-xs text-muted-foreground">Long-term hold</p>
              </div>
            </div>

            {/* Suitability Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="px-3 py-1.5 text-xs font-semibold">
                Quality Investor
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5 text-xs font-semibold">
                Long-term Holder
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5 text-xs font-semibold">
                Blue-chip Seeker
              </Badge>
            </div>
          </Card>

          {/* CARD 9: STRENGTHS & CONCERNS (spans 2 columns) */}
          <Card className="p-6 lg:col-span-2">
            <p className="mb-5 text-sm italic text-muted-foreground">
              Every stock has strengths and areas to watch
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {/* LEFT: Key Strengths */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-green-600">
                  ✅ KEY STRENGTHS
                </h3>
                <ul className="space-y-0">
                  {[
                    "Market leader with 15% market share",
                    "Consistently high ROE (17%+) for 5 years",
                    "Strong asset quality (GNPA below 1%)",
                    "Excellent brand and customer loyalty",
                    "Digital transformation ahead of peers",
                  ].map((strength, i) => (
                    <li
                      key={i}
                      className="relative border-b py-3.5 pl-8 text-[13px] leading-relaxed last:border-0"
                    >
                      <span className="absolute left-0 top-3 text-lg font-bold text-green-600">
                        ✓
                      </span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT: Things to Watch */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-yellow-600">
                  ⚠️ THINGS TO WATCH
                </h3>
                <ul className="space-y-0">
                  {[
                    "Premium valuation (P/E 18.5 vs sector 14.2)",
                    "Growth slowing slightly (14% vs 16% last year)",
                    "Increasing competition from fintech players",
                    "Interest rate sensitivity affects margins",
                    "Lower dividend yield (1.2%) compared to peers",
                  ].map((concern, i) => (
                    <li
                      key={i}
                      className="relative border-b py-3.5 pl-8 text-[13px] leading-relaxed last:border-0"
                    >
                      <span className="absolute left-0 top-3 text-lg font-bold text-yellow-600">
                        ⚠
                      </span>
                      {concern}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
