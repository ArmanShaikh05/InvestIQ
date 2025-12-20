"use client";

import {
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  Activity,
  DollarSign,
  X,
  Target,
  Brain,
  ShoppingCart,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  TrendingUpIcon,
  Eye,
  PlusCircle,
  LineChart,
  Calendar,
} from "lucide-react";
import React, { useState, useEffect, useRef, useId } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface TrendingData {
  id: number;
  stockName: string;
  symbol: string;
  sector: string;
  score: number;
  changePercentage: string;
  change: "positive" | "negative";
  price: string;
  volume: string;
  marketCap: string;
  reason: string;
  logo: string;
  // Extended data for modal
  currentPrice: number;
  targetPrice: number;
  analystRating: "Strong Buy" | "Buy" | "Hold" | "Sell";
  peRatio: string;
  fiftyTwoWeekHigh: string;
  fiftyTwoWeekLow: string;
  avgVolume: string;
  marketCapNum: string;
  dividend: string;
  earningsDate: string;
  keyFactors: string[];
  technicalAnalysis: {
    support: string;
    resistance: string;
    rsi: number;
    macd: "Bullish" | "Bearish";
  };
  aiInsights: {
    portfolioAction: string;
    riskAssessment: string;
    timeframe: string;
    confidence: number;
  };
  chartData: {
    labels: string[];
    prices: number[];
    projectedPrices: number[];
  };
}

const TrendingTodayData: TrendingData[] = [
  {
    id: 1,
    stockName: "Apple Inc.",
    symbol: "AAPL",
    sector: "Technology",
    score: 95,
    changePercentage: "+12.4%",
    change: "positive",
    price: "$185.20",
    volume: "45.2M",
    marketCap: "$2.8T",
    reason:
      "Strong iPhone 15 sales and AI integration announcements driving investor confidence and market momentum. Strong iPhone 15 sales and AI integration announcements driving investor confidence and market momentum.",
    logo: "🍎",
    currentPrice: 185.2,
    targetPrice: 210.0,
    analystRating: "Strong Buy",
    peRatio: "29.5",
    fiftyTwoWeekHigh: "$199.62",
    fiftyTwoWeekLow: "$124.17",
    avgVolume: "52.3M",
    marketCapNum: "$2.85T",
    dividend: "0.96%",
    earningsDate: "Nov 15, 2025",
    keyFactors: [
      "AI integration across product ecosystem",
      "Strong Services revenue growth",
      "Vision Pro adoption acceleration",
      "iPhone 15 Pro Max demand surge",
    ],
    technicalAnalysis: {
      support: "$178.50",
      resistance: "$192.00",
      rsi: 72,
      macd: "Bullish",
    },
    aiInsights: {
      portfolioAction:
        "Consider increasing position by 10-15%. Strong fundamentals with AI catalyst ahead.",
      riskAssessment:
        "Low risk with high growth potential. Temporary volatility expected near earnings.",
      timeframe: "3-6 months for target achievement",
      confidence: 88,
    },
    chartData: {
      labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      prices: [165, 175, 185, 195, 205, 210],
      projectedPrices: [185, 192, 198, 205, 210, 215],
    },
  },
  {
    id: 2,
    stockName: "NVIDIA Corp.",
    symbol: "NVDA",
    sector: "Technology",
    score: 92,
    changePercentage: "+8.7%",
    change: "positive",
    price: "$450.85",
    volume: "32.1M",
    marketCap: "$1.1T",
    reason:
      "AI chip demand surge and partnerships with major cloud providers boosting quarterly projections significantly.",
    logo: "🔥",
    currentPrice: 450.85,
    targetPrice: 520.0,
    analystRating: "Buy",
    peRatio: "65.2",
    fiftyTwoWeekHigh: "$495.22",
    fiftyTwoWeekLow: "$198.44",
    avgVolume: "38.7M",
    marketCapNum: "$1.12T",
    dividend: "0.09%",
    earningsDate: "Nov 22, 2025",
    keyFactors: [
      "Data center revenue acceleration",
      "Gaming GPU recovery",
      "Automotive AI partnerships",
      "New Blackwell architecture launch",
    ],
    technicalAnalysis: {
      support: "$420.00",
      resistance: "$480.00",
      rsi: 68,
      macd: "Bullish",
    },
    aiInsights: {
      portfolioAction:
        "Strong buy signal for tech-focused portfolios. Consider 5-8% allocation increase.",
      riskAssessment:
        "Moderate risk due to high valuation. Long-term AI trend remains intact.",
      timeframe: "6-12 months for substantial gains",
      confidence: 85,
    },
    chartData: {
      labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      prices: [380, 420, 451, 480, 500, 520],
      projectedPrices: [451, 465, 485, 500, 515, 525],
    },
  },
  {
    id: 3,
    stockName: "Tesla Inc.",
    symbol: "TSLA",
    sector: "Automotive",
    score: 88,
    changePercentage: "+15.2%",
    change: "positive",
    price: "$248.50",
    volume: "28.7M",
    marketCap: "$780B",
    reason:
      "Breakthrough in autonomous driving technology and expanding Supercharger network accessibility worldwide.",
    logo: "⚡",
    currentPrice: 248.5,
    targetPrice: 285.0,
    analystRating: "Buy",
    peRatio: "75.8",
    fiftyTwoWeekHigh: "$299.29",
    fiftyTwoWeekLow: "$152.37",
    avgVolume: "42.1M",
    marketCapNum: "$785B",
    dividend: "N/A",
    earningsDate: "Jan 24, 2026",
    keyFactors: [
      "FSD Beta widespread deployment",
      "Cybertruck production ramp",
      "Energy storage growth",
      "Robotaxi service expansion",
    ],
    technicalAnalysis: {
      support: "$235.00",
      resistance: "$265.00",
      rsi: 75,
      macd: "Bullish",
    },
    aiInsights: {
      portfolioAction:
        "Volatile but strong upside potential. Consider dollar-cost averaging approach.",
      riskAssessment:
        "High volatility expected. Suitable for growth-oriented investors with risk tolerance.",
      timeframe: "12-18 months for autonomous driving monetization",
      confidence: 82,
    },
    chartData: {
      labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      prices: [210, 230, 249, 265, 275, 285],
      projectedPrices: [249, 258, 268, 275, 282, 290],
    },
  },
  {
    id: 4,
    stockName: "Moderna Inc.",
    symbol: "MRNA",
    sector: "Healthcare",
    score: 85,
    changePercentage: "+6.3%",
    change: "positive",
    price: "$95.40",
    volume: "18.5M",
    marketCap: "$35.8B",
    reason:
      "Promising cancer vaccine trial results and expansion into personalized medicine treatments.",
    logo: "💉",
    currentPrice: 95.4,
    targetPrice: 125.0,
    analystRating: "Buy",
    peRatio: "12.4",
    fiftyTwoWeekHigh: "$134.12",
    fiftyTwoWeekLow: "$62.56",
    avgVolume: "22.3M",
    marketCapNum: "$36.2B",
    dividend: "N/A",
    earningsDate: "Feb 14, 2026",
    keyFactors: [
      "Cancer vaccine Phase 3 results",
      "RSV vaccine approval pending",
      "mRNA platform expansion",
      "Pandemic preparedness contracts",
    ],
    technicalAnalysis: {
      support: "$88.00",
      resistance: "$105.00",
      rsi: 62,
      macd: "Bullish",
    },
    aiInsights: {
      portfolioAction:
        "Healthcare diversification opportunity. Consider 3-5% portfolio allocation.",
      riskAssessment:
        "Medium risk with biotech volatility. Strong pipeline mitigates concerns.",
      timeframe: "18-24 months for cancer vaccine commercialization",
      confidence: 78,
    },
    chartData: {
      labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      prices: [85, 90, 95, 105, 115, 125],
      projectedPrices: [95, 102, 108, 115, 120, 128],
    },
  },
  {
    id: 5,
    stockName: "Advanced Micro Devices",
    symbol: "AMD",
    sector: "Technology",
    score: 82,
    changePercentage: "+9.1%",
    change: "positive",
    price: "$105.75",
    volume: "22.3M",
    marketCap: "$170B",
    reason:
      "Next-gen CPU architecture reveals outperforming Intel benchmarks in enterprise computing solutions.",
    logo: "🔧",
    currentPrice: 105.75,
    targetPrice: 130.0,
    analystRating: "Buy",
    peRatio: "22.1",
    fiftyTwoWeekHigh: "$144.29",
    fiftyTwoWeekLow: "$93.12",
    avgVolume: "28.9M",
    marketCapNum: "$172B",
    dividend: "N/A",
    earningsDate: "Jan 30, 2026",
    keyFactors: [
      "Zen 5 architecture superiority",
      "Data center market share gains",
      "AI accelerator development",
      "Intel competitive advantage",
    ],
    technicalAnalysis: {
      support: "$98.00",
      resistance: "$115.00",
      rsi: 65,
      macd: "Bullish",
    },
    aiInsights: {
      portfolioAction:
        "Semiconductor recovery play. Good entry point for tech exposure diversification.",
      riskAssessment:
        "Moderate risk with cyclical volatility. Strong competitive position emerging.",
      timeframe: "6-9 months for market share expansion benefits",
      confidence: 80,
    },
    chartData: {
      labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      prices: [95, 100, 106, 115, 125, 130],
      projectedPrices: [106, 112, 118, 125, 128, 132],
    },
  },
];

const TrendingToday = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [activeStock, setActiveStock] = useState<TrendingData | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Modal functionality
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveStock(null);
      }
    }

    if (activeStock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeStock]);

  useOutsideClick(modalRef, () => setActiveStock(null));

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPlaying || isHovering) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === TrendingTodayData.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, isHovering]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const currentItem = TrendingTodayData[currentIndex];

  return (
    <>
      {/* Modal Overlay */}
      <AnimatePresence>
        {activeStock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 border-border/50 bg-background/50 backdrop-blur-sm h-full w-full z-50 flex items-center justify-center p-4"
          />
        )}
      </AnimatePresence>

      {/* Modal Content */}
      <AnimatePresence>
        {activeStock && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4 ">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.7, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 50 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.8,
                duration: 0.2,
              }}
              className="w-full max-w-4xl max-h-[95vh] bg-background/95 backdrop-blur-md rounded-2xl border border-border/50 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="relative p-4 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
                <button
                  onClick={() => setActiveStock(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background border border-border/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-start justify-between pr-12">
                  {/* Left side - Logo, name, badges */}
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{activeStock.logo}</div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2">
                        {activeStock.stockName}
                      </h2>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="px-1.5 py-0.5 text-xs h-5"
                        >
                          {activeStock.symbol}
                        </Badge>
                        <Badge className="px-1.5 py-0.5 text-xs h-5">
                          {activeStock.sector}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Price and change */}
                  <div className="text-right">
                    <div className="text-2xl font-bold mb-1">
                      {activeStock.price}
                    </div>
                    <Badge variant="success" className="px-2 py-1 text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {activeStock.changePercentage}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto space-y-6 custom-scrollbar">
                {/* Why It's Trending */}
                <div className="bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl border border-blue-500/20 p-4">
                  <h3 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                    <TrendingUpIcon className="w-4 h-4" />
                    Why It's Trending Today
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeStock.reason}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "P/E Ratio", value: activeStock.peRatio },
                    { label: "52W High", value: activeStock.fiftyTwoWeekHigh },
                    { label: "52W Low", value: activeStock.fiftyTwoWeekLow },
                    { label: "Avg Volume", value: activeStock.avgVolume },
                    { label: "Market Cap", value: activeStock.marketCapNum },
                    { label: "Dividend", value: activeStock.dividend },
                    { label: "Earnings", value: activeStock.earningsDate },
                    { label: "Volume", value: activeStock.volume },
                  ].map((metric, index) => (
                    <div
                      key={index}
                      className="bg-background/50 rounded-lg p-3 border border-border/30"
                    >
                      <div className="text-xs text-muted-foreground mb-1">
                        {metric.label}
                      </div>
                      <div className="font-semibold text-sm">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Health Score Breakdown */}
                <div className="bg-gradient-to-br from-green-500/5 to-transparent rounded-xl border border-green-500/20 p-4">
                  <h3 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Health Score Breakdown ({activeStock.score}/100)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Financial Strength</span>
                        <span className="font-medium">92/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Growth Potential</span>
                        <span className="font-medium">88/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "88%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Market Sentiment</span>
                        <span className="font-medium">85/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl border border-purple-500/20 p-4">
                  <h3 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    AI Investment Insights
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Target className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm mb-1 pb-1 border-b border-purple-400/30">
                          Portfolio Action
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activeStock.aiInsights.portfolioAction}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm mb-1 pb-1 border-b border-yellow-400/30">
                          Risk Assessment
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activeStock.aiInsights.riskAssessment}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm mb-1 pb-1 border-b border-blue-400/30">
                          Investment Timeframe
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activeStock.aiInsights.timeframe}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="text-sm font-medium">AI Confidence:</div>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                          style={{
                            width: `${activeStock.aiInsights.confidence}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-sm font-semibold">
                        {activeStock.aiInsights.confidence}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Growth Factors */}
                <div className="bg-gradient-to-br from-orange-500/5 to-transparent rounded-xl border border-orange-500/20 p-4">
                  <h3 className="font-semibold text-orange-400 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Key Growth Catalysts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {activeStock.keyFactors.map((factor, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                        <span>{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-background/50 rounded-xl border border-border/30 p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Technical Analysis
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Support Level:
                        </span>
                        <span className="font-medium">
                          {activeStock.technicalAnalysis.support}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Resistance Level:
                        </span>
                        <span className="font-medium">
                          {activeStock.technicalAnalysis.resistance}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">RSI (14):</span>
                        <span
                          className={`font-medium ${
                            activeStock.technicalAnalysis.rsi > 70
                              ? "text-red-400"
                              : activeStock.technicalAnalysis.rsi < 30
                              ? "text-green-400"
                              : "text-yellow-400"
                          }`}
                        >
                          {activeStock.technicalAnalysis.rsi}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          MACD Signal:
                        </span>
                        <Badge
                          variant={
                            activeStock.technicalAnalysis.macd === "Bullish"
                              ? "success"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {activeStock.technicalAnalysis.macd}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-background/50 rounded-xl border border-border/30 p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <Button
                        className="w-full justify-start text-sm bg-gradient-to-r from-green-500/30 to-emerald-600/10 hover:from-green-600/90 hover:to-emerald-700/90 text-white border border-green-500/30 backdrop-blur-sm shadow-lg"
                        size="sm"
                      >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add to Portfolio
                      </Button>
                      <Button
                        className="w-full justify-start text-sm bg-gradient-to-r from-blue-500/30 to-cyan-600/10 hover:from-blue-600/90 hover:to-cyan-700/90 text-white border border-blue-500/30 backdrop-blur-sm shadow-lg"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Add to Watchlist
                      </Button>
                      <Button
                        className="w-full justify-start text-sm bg-gradient-to-r from-purple-500/30 to-violet-600/10 hover:from-purple-600/90 hover:to-violet-700/90 text-white border border-purple-500/30 backdrop-blur-sm shadow-lg"
                        size="sm"
                      >
                        <LineChart className="w-4 h-4 mr-2" />
                        View Full Analysis
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Trending Today Component */}
      <div
        className="w-full h-[450px] border rounded-xl border-border/50 bg-background/50 backdrop-blur-sm pt-4 sm:pt-6 pb-6 sm:pb-8 px-4 sm:px-6 md:px-8 flex flex-col shadow-lg shadow-ring/10 hover:shadow-lg hover:shadow-ring/20 transition-all duration-200 ease-in-out relative overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-xl -z-10" />

        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Trending Today
          </h1>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={togglePlayPause}
              className="bg-primary/20 size-6 sm:size-8 p-1 sm:p-1.5 rounded-lg backdrop-blur-sm border border-primary/30 hover:bg-primary/30 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <Play className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </motion.button>
            <TrendingUp className="bg-primary/20 size-6 sm:size-8 p-1 sm:p-1.5 rounded-lg backdrop-blur-sm border border-primary/30" />
          </div>
        </div>

        {/* Carousel Card */}
        <div className="relative h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -300, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div
                className="h-full bg-gradient-to-br from-background/80 via-background/60 to-background/40 backdrop-blur-md rounded-2xl border border-border/50 p-3 sm:p-4 shadow-xl relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                onClick={() => setActiveStock(currentItem)}
              >
                {/* Card background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header Section - Redesigned */}
                  <div className="mb-3 sm:mb-4">
                    {/* Logo and Company Name */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-xl sm:text-2xl">
                        {currentItem.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold truncate">
                          {currentItem.stockName}
                        </h3>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <Badge
                        variant="outline"
                        className="text-xs px-1.5 py-0.5 h-5 rounded-md"
                      >
                        {currentItem.symbol}
                      </Badge>
                      <Badge className="text-xs px-1.5 py-0.5 h-5 rounded-md">
                        {currentItem.sector}
                      </Badge>
                    </div>

                    {/* Price, Change & Health Score Row */}
                    <div className="flex items-start justify-between">
                      {/* Price and Change */}
                      <div className="flex flex-col gap-1">
                        <div className="text-lg sm:text-xl font-bold">
                          {currentItem.price}
                        </div>
                        <Badge
                          variant={
                            currentItem.change === "positive"
                              ? "success"
                              : "destructive"
                          }
                          className="text-xs w-fit px-1.5 py-0.5 h-5"
                        >
                          {currentItem.change === "positive" ? (
                            <TrendingUp className="w-2.5 h-2.5 mr-1" />
                          ) : (
                            <TrendingDown className="w-2.5 h-2.5 mr-1" />
                          )}
                          {currentItem.changePercentage}
                        </Badge>
                      </div>

                      {/* Circular Health Score */}
                      <div className="relative flex items-center justify-center">
                        <div
                          className="rounded-full"
                          style={{
                            boxShadow: `0 0 20px ${
                              currentItem.score >= 80
                                ? "rgba(16, 185, 129, 0.3)"
                                : currentItem.score >= 60
                                ? "rgba(245, 158, 11, 0.3)"
                                : "rgba(239, 68, 68, 0.3)"
                            }`,
                            filter: `drop-shadow(0 0 8px ${
                              currentItem.score >= 80
                                ? "rgba(16, 185, 129, 0.4)"
                                : currentItem.score >= 60
                                ? "rgba(245, 158, 11, 0.4)"
                                : "rgba(239, 68, 68, 0.4)"
                            })`,
                          }}
                        >
                          <svg
                            className="w-12 h-12 sm:w-14 sm:h-14 transform -rotate-90"
                            viewBox="0 0 100 100"
                          >
                            {/* Background circle */}
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="6"
                              fill="transparent"
                              className="text-muted/30"
                            />
                            {/* Progress circle */}
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke={
                                currentItem.score >= 80
                                  ? "#10B981"
                                  : currentItem.score >= 60
                                  ? "#F59E0B"
                                  : "#EF4444"
                              }
                              strokeWidth="6"
                              fill="transparent"
                              strokeDasharray={`${2 * Math.PI * 40}`}
                              initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                              animate={{
                                strokeDashoffset:
                                  2 *
                                  Math.PI *
                                  40 *
                                  (1 - currentItem.score / 100),
                              }}
                              transition={{ duration: 1.5, delay: 0.3 }}
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-sm font-bold">
                            {currentItem.score}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trending Reason - Glassmorphism Card */}
                  <motion.div
                    className="flex-1  bg-gradient-to-br from-background/60 via-background/40 to-background/20 backdrop-blur-md rounded-xl border border-border/30 p-3 sm:p-4 shadow-inner relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {/* Card background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent rounded-xl" />

                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-center gap-1.5 mb-2 animate-pulse">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full " />
                        <h4 className="text-xs sm:text-sm font-semibold text-primary">
                          Why it's trending
                        </h4>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {currentItem.reason}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {TrendingTodayData.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TrendingToday;
