"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle,
  Calendar,
  Target,
  Sparkles,
  Filter,
  BarChart3,
  Table2,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Trophy,
  Flag,
  Play,
  Brain,
  TrendingDownIcon,
  AlertCircle,
  Heart,
  Zap,
  ChevronDown,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

// Types
type TransactionType = "buy" | "sell" | "dividend";
type ViewMode = "timeline" | "table" | "calendar";
type FilterType = "all" | "buys" | "sells" | "dividends";
type EvolutionView = "stock" | "sector" | "health";

interface Milestone {
  id: number;
  label: string;
  amount: string;
  date: string;
  position: number; // percentage position on timeline
}

interface Transaction {
  id: number;
  date: string;
  month: string;
  type: TransactionType;
  stock: string;
  quantity?: number;
  price?: number;
  total: number;
  fees: number;
  reason?: string;
  portfolioImpact?: number;
  currentStatus?: string;
  currentGain?: number;
  currentGainPercent?: number;
  healthScore?: number;
  boughtAt?: number;
  boughtDate?: string;
  holdingPeriod?: string;
  realizedGain?: number;
  realizedGainPercent?: number;
  taxLiability?: number;
  decisionReview?: string;
  stockNowAt?: number;
  netAmount?: number;
  taxDeducted?: number;
  note?: string;
}

interface PortfolioSnapshot {
  period: string;
  date: string;
  value: number;
  stocks: number;
  sectors: number;
  topHolding: string;
  topHoldingPercent: number;
}

interface MonthlyInvestment {
  month: string;
  amount: number;
}

interface EvolutionData {
  month: string;
  HDFC: number;
  TCS: number;
  Reliance: number;
  Others: number;
  total: number;
}

interface StockJourney {
  id: number;
  stock: string;
  icon: string;
  tagline: string;
  journeyDuration: string;
  status: "holding" | "sold";
  totalReturn: number;
  totalReturnPercent: number;
  transactions: StockTransaction[];
  dividends: DividendPayment[];
  currentPosition?: {
    shares: number;
    avgPrice: number;
    invested: number;
    currentValue: number;
    unrealizedGain: number;
    unrealizedGainPercent: number;
  };
  performance: {
    bestMoment: string;
    toughMoment: string;
    yourResponse: string;
  };
  healthEvolution: {
    initial: number;
    current: number;
    trend: string;
  };
  decisionReview: {
    entryTiming: string;
    positionSizing: string;
    holdingDiscipline: string;
    consideration?: string;
  };
  sellInfo?: {
    reason: string;
    outcome: string;
    lessonsLearned: string;
  };
}

interface StockTransaction {
  date: string;
  type: "Initial Buy" | "Added More" | "Partial Sell" | "Full Exit";
  shares: number;
  price: number;
  total: number;
  note: string;
}

interface DividendPayment {
  date: string;
  amount: number;
}

interface AchievementMilestone {
  id: number;
  icon: string;
  title: string;
  date: string;
  description: string;
  type: "achievement" | "learning";
  details?: string;
  impact?: string;
  lesson?: string;
}

interface CashFlowMonth {
  month: string;
  invested: number;
  withdrawn: number;
  dividends: number;
  netFlow: number;
  cumulative: number;
}

interface CashFlowChartData {
  month: string;
  invested: number;
  portfolioValue: number;
}

interface Decision {
  id: number;
  rank: number;
  type: "best" | "learn" | "neutral";
  title: string;
  stock: string;
  action: string;
  price: number;
  date: string;
  currentPrice?: number;
  gain?: number;
  gainPercent?: number;
  whyWorked?: string[];
  whatHappened?: string[];
  lesson: string;
  silverLining?: string;
  missedGain?: number;
}

interface ComparativeGrowth {
  month: string;
  you: number;
  nifty: number;
  fd: number;
  gold: number;
}

interface BenchmarkComparison {
  strategy: string;
  invested: number;
  currentValue: number;
  gain: number;
  returnPercent: number;
}

const HistoryTab: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("timeline");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedStock, setSelectedStock] = useState<string>("all");
  const [evolutionView, setEvolutionView] = useState<EvolutionView>("stock");
  const [expandedStocks, setExpandedStocks] = useState<number[]>([]);
  const [calendarMonth, setCalendarMonth] = useState<number>(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState<number>(new Date().getFullYear());

  // Milestones data
  const milestones: Milestone[] = [
    { id: 1, label: "START", amount: "₹1.5L", date: "Jan'23", position: 0 },
    { id: 2, label: "FIRST ₹1L", amount: "", date: "Apr'23", position: 25 },
    { id: 3, label: "FIRST ₹5L", amount: "", date: "Dec'23", position: 50 },
    {
      id: 4,
      label: "CROSSED ₹10L",
      amount: "",
      date: "Jun'24",
      position: 75,
    },
    { id: 5, label: "TODAY", amount: "₹12.5L", date: "Oct'24", position: 100 },
  ];

  // Transaction data
  const transactions: Transaction[] = [
    {
      id: 1,
      date: "Oct 18, 2024",
      month: "October 2024",
      type: "dividend",
      stock: "ITC",
      total: 2400,
      fees: 0,
      taxDeducted: 240,
      netAmount: 2160,
      portfolioImpact: 0.02,
      note: "Regular quarterly dividend",
      quantity: 200,
      price: 12,
    },
    {
      id: 2,
      date: "Oct 12, 2024",
      month: "October 2024",
      type: "buy",
      stock: "Wipro",
      quantity: 150,
      price: 425,
      total: 63750,
      fees: 127,
      reason: "Adding IT exposure",
      portfolioImpact: 5.1,
      currentStatus: "+4.9%",
      currentGain: 3000,
      currentGainPercent: 4.9,
      healthScore: 73,
    },
    {
      id: 3,
      date: "Sep 28, 2024",
      month: "September 2024",
      type: "sell",
      stock: "HCL Tech",
      quantity: 80,
      price: 1280,
      total: 102400,
      fees: 205,
      boughtAt: 1050,
      boughtDate: "Mar 2023",
      holdingPeriod: "18 months",
      realizedGain: 18400,
      realizedGainPercent: 21.9,
      taxLiability: 1840,
      reason: "Rebalancing portfolio",
      decisionReview: "Good timing ✓",
      stockNowAt: 1240,
    },
    {
      id: 4,
      date: "Sep 15, 2024",
      month: "September 2024",
      type: "buy",
      stock: "Asian Paints",
      quantity: 40,
      price: 2850,
      total: 114000,
      fees: 228,
      reason: "Diversifying into consumer goods",
      portfolioImpact: 9.2,
      currentStatus: "+8.4%",
      currentGain: 9600,
      currentGainPercent: 8.4,
      healthScore: 86,
    },
    {
      id: 5,
      date: "Aug 22, 2024",
      month: "August 2024",
      type: "dividend",
      stock: "HDFC Bank",
      total: 1800,
      fees: 0,
      taxDeducted: 180,
      netAmount: 1620,
      portfolioImpact: 0.01,
      note: "Annual dividend",
      quantity: 120,
      price: 15,
    },
    {
      id: 6,
      date: "Aug 10, 2024",
      month: "August 2024",
      type: "buy",
      stock: "Reliance",
      quantity: 50,
      price: 2450,
      total: 122500,
      fees: 245,
      reason: "Strong fundamentals",
      portfolioImpact: 10.5,
      currentStatus: "+12.6%",
      currentGain: 15400,
      currentGainPercent: 12.6,
      healthScore: 84,
    },
    {
      id: 7,
      date: "Jul 28, 2024",
      month: "July 2024",
      type: "sell",
      stock: "Infosys",
      quantity: 100,
      price: 1420,
      total: 142000,
      fees: 284,
      boughtAt: 1460,
      boughtDate: "Jan 2024",
      holdingPeriod: "7 months",
      realizedGain: -4000,
      realizedGainPercent: -2.8,
      taxLiability: 0,
      reason: "Cut losses, underperforming",
      decisionReview: "Lesson learned - bought at peak",
      stockNowAt: 1380,
    },
    {
      id: 8,
      date: "Jul 15, 2024",
      month: "July 2024",
      type: "buy",
      stock: "TCS",
      quantity: 35,
      price: 3520,
      total: 123200,
      fees: 246,
      reason: "IT sector correction - good entry",
      portfolioImpact: 10.8,
      currentStatus: "+24.8%",
      currentGain: 30600,
      currentGainPercent: 24.8,
      healthScore: 88,
    },
  ];

  // Portfolio evolution data
  const evolutionData: EvolutionData[] = [
    {
      month: "Jan'23",
      HDFC: 150000,
      TCS: 0,
      Reliance: 0,
      Others: 0,
      total: 150000,
    },
    {
      month: "Apr'23",
      HDFC: 180000,
      TCS: 120000,
      Reliance: 0,
      Others: 120000,
      total: 420000,
    },
    {
      month: "Jul'23",
      HDFC: 220000,
      TCS: 180000,
      Reliance: 150000,
      Others: 200000,
      total: 750000,
    },
    {
      month: "Dec'23",
      HDFC: 250000,
      TCS: 210000,
      Reliance: 180000,
      Others: 360000,
      total: 1000000,
    },
    {
      month: "Jan'24",
      HDFC: 280000,
      TCS: 240000,
      Reliance: 200000,
      Others: 430000,
      total: 1150000,
    },
    {
      month: "Jun'24",
      HDFC: 300000,
      TCS: 260000,
      Reliance: 220000,
      Others: 470000,
      total: 1250000,
    },
    {
      month: "Oct'24",
      HDFC: 320000,
      TCS: 290000,
      Reliance: 240000,
      Others: 395800,
      total: 1245800,
    },
  ];

  // Portfolio snapshots
  const portfolioSnapshots: PortfolioSnapshot[] = [
    {
      period: "START",
      date: "Jan 2023",
      value: 150000,
      stocks: 3,
      sectors: 1,
      topHolding: "HDFC",
      topHoldingPercent: 100,
    },
    {
      period: "6 MONTHS",
      date: "Jul 2023",
      value: 420000,
      stocks: 8,
      sectors: 3,
      topHolding: "HDFC",
      topHoldingPercent: 35,
    },
    {
      period: "1 YEAR",
      date: "Jan 2024",
      value: 850000,
      stocks: 12,
      sectors: 5,
      topHolding: "HDFC",
      topHoldingPercent: 22,
    },
    {
      period: "TODAY",
      date: "Oct 2024",
      value: 1245800,
      stocks: 15,
      sectors: 6,
      topHolding: "HDFC",
      topHoldingPercent: 15,
    },
  ];

  // Monthly investment activity
  const monthlyInvestments: MonthlyInvestment[] = [
    { month: "Jan", amount: 150000 },
    { month: "Feb", amount: 80000 },
    { month: "Mar", amount: 60000 },
    { month: "Apr", amount: 120000 },
    { month: "May", amount: 90000 },
    { month: "Jun", amount: 110000 },
    { month: "Jul", amount: 180000 },
    { month: "Aug", amount: 70000 },
    { month: "Sep", amount: 85000 },
    { month: "Oct", amount: 95000 },
  ];

  // Stock Journeys
  const stockJourneys: StockJourney[] = [
    {
      id: 1,
      stock: "HDFC Bank",
      icon: "🏦",
      tagline: "Your Longest & Best Holding",
      journeyDuration: "22 months (Jan 2023 - Present)",
      status: "holding",
      totalReturn: 9000,
      totalReturnPercent: 35.2,
      transactions: [
        {
          date: "Jan 15, 2023",
          type: "Initial Buy",
          shares: 30,
          price: 1620,
          total: 48600,
          note: "Strong banking fundamentals",
        },
        {
          date: "Apr 10, 2023",
          type: "Added More",
          shares: 20,
          price: 1680,
          total: 33600,
          note: "Dip buying opportunity",
        },
      ],
      dividends: [
        { date: "Jan'23", amount: 750 },
        { date: "Jul'23", amount: 750 },
        { date: "Jan'24", amount: 700 },
        { date: "Jul'24", amount: 700 },
      ],
      currentPosition: {
        shares: 50,
        avgPrice: 1640,
        invested: 82000,
        currentValue: 91000,
        unrealizedGain: 9000,
        unrealizedGainPercent: 10.98,
      },
      performance: {
        bestMoment: "Up 42% at peak (Aug 2024)",
        toughMoment: "Down 8% during correction (Mar 2024)",
        yourResponse: "Held through volatility ✅",
      },
      healthEvolution: {
        initial: 78,
        current: 85,
        trend: "Improving fundamentals 🟢",
      },
      decisionReview: {
        entryTiming: "Excellent (near yearly low)",
        positionSizing: "Good (now 15% of portfolio)",
        holdingDiscipline: "Strong (ignored noise)",
        consideration: "Take partial profits? (up 35%)",
      },
    },
    {
      id: 2,
      stock: "TCS",
      icon: "💻",
      tagline: "Best Timing - Bought the Dip",
      journeyDuration: "6 months (Jul 2024 - Present)",
      status: "holding",
      totalReturn: 30600,
      totalReturnPercent: 24.8,
      transactions: [
        {
          date: "Jul 15, 2024",
          type: "Initial Buy",
          shares: 35,
          price: 3520,
          total: 123200,
          note: "IT sector correction - good entry",
        },
      ],
      dividends: [{ date: "Oct'24", amount: 1200 }],
      currentPosition: {
        shares: 35,
        avgPrice: 3520,
        invested: 123200,
        currentValue: 153800,
        unrealizedGain: 30600,
        unrealizedGainPercent: 24.8,
      },
      performance: {
        bestMoment: "Up 28% in first 3 months",
        toughMoment: "Initial 5% dip after purchase",
        yourResponse: "Stayed patient, added more at dip",
      },
      healthEvolution: {
        initial: 86,
        current: 88,
        trend: "Consistently strong 🟢",
      },
      decisionReview: {
        entryTiming: "Excellent (sector correction)",
        positionSizing: "Optimal (10% of portfolio)",
        holdingDiscipline: "Good (holding winners)",
      },
    },
    {
      id: 3,
      stock: "Infosys",
      icon: "💼",
      tagline: "Learning Experience - Cut Losses",
      journeyDuration: "7 months (Jan 2024 - Jul 2024)",
      status: "sold",
      totalReturn: -4000,
      totalReturnPercent: -2.8,
      transactions: [
        {
          date: "Jan 20, 2024",
          type: "Initial Buy",
          shares: 100,
          price: 1460,
          total: 146000,
          note: "Strong quarterly results",
        },
        {
          date: "Jul 28, 2024",
          type: "Full Exit",
          shares: 100,
          price: 1420,
          total: 142000,
          note: "Cut losses, underperforming",
        },
      ],
      dividends: [],
      performance: {
        bestMoment: "Briefly up 3% in Feb 2024",
        toughMoment: "Declined after weak guidance",
        yourResponse: "Decided to cut losses and move on",
      },
      healthEvolution: {
        initial: 82,
        current: 75,
        trend: "Deteriorating fundamentals 🔴",
      },
      decisionReview: {
        entryTiming: "Poor (bought at peak after news)",
        positionSizing: "Too large (12% at entry)",
        holdingDiscipline: "Good (exited when thesis broke)",
      },
      sellInfo: {
        reason: "Fundamentals weakened, better opportunities elsewhere",
        outcome: "Stock now at ₹1,380 - saved further 3% loss",
        lessonsLearned:
          "Don't buy on hype after good results. Wait for correction. FOMO is expensive.",
      },
    },
  ];

  // Achievement Milestones
  const achievementMilestones: AchievementMilestone[] = [
    {
      id: 1,
      icon: "🎉",
      title: "First ₹1 Lakh Invested",
      date: "Apr 2023",
      description: "Committed to systematic investing",
      type: "achievement",
    },
    {
      id: 2,
      icon: "🎊",
      title: "Portfolio Crossed ₹5L",
      date: "Dec 2023",
      description: "9 months to 5L - compounding working",
      type: "achievement",
    },
    {
      id: 3,
      icon: "🏆",
      title: "Beat Nifty 50 for First Time",
      date: "May 2024",
      description: "Stock selection paying off",
      type: "achievement",
    },
    {
      id: 4,
      icon: "💰",
      title: "First Dividend Received",
      date: "Jun 2023",
      description: "₹750 from HDFC - passive income started",
      type: "achievement",
    },
    {
      id: 5,
      icon: "📈",
      title: "Portfolio Crossed ₹10L",
      date: "Jun 2024",
      description: "10x from start - major milestone!",
      type: "achievement",
    },
    {
      id: 6,
      icon: "🎯",
      title: "Achieved 15-Stock Diversification",
      date: "Aug 2024",
      description: "Well-balanced portfolio built",
      type: "achievement",
    },
    {
      id: 7,
      icon: "⭐",
      title: "All Holdings Profitable",
      date: "Sep 2024",
      description: "No underwater positions - all green",
      type: "achievement",
    },
    {
      id: 8,
      icon: "📚",
      title: "First Losing Trade",
      date: "May 2023",
      description: "Sold Tech stock at 5% loss",
      type: "learning",
      lesson: "Don't buy on FOMO, do research",
      impact: "Since then, 90% win rate",
    },
    {
      id: 9,
      icon: "🧠",
      title: "Market Correction Handled Well",
      date: "Mar 2024",
      description: "Market down 8%, stayed calm",
      type: "learning",
      details: "Bought the dip instead of panicking",
      lesson: "Volatility = opportunity",
      impact: "Those buys up 18% now",
    },
    {
      id: 10,
      icon: "💡",
      title: "Discovered Health Scores",
      date: "Jul 2024",
      description: "Started focusing on fundamentals",
      type: "learning",
      details: "Added health-based filtering",
      lesson: "Quality > popularity",
      impact: "Portfolio health improved 78→82",
    },
    {
      id: 11,
      icon: "🎓",
      title: "Learned Position Sizing",
      date: "Sep 2024",
      description: "Realized over-concentrated in one stock",
      type: "learning",
      details: "Rebalanced to 15% max per stock",
      lesson: "Diversification reduces risk",
    },
  ];

  // Cash Flow Data
  const cashFlowMonths: CashFlowMonth[] = [
    {
      month: "Jan'23",
      invested: 150000,
      withdrawn: 0,
      dividends: 0,
      netFlow: 150000,
      cumulative: 150000,
    },
    {
      month: "Feb'23",
      invested: 50000,
      withdrawn: 0,
      dividends: 0,
      netFlow: 50000,
      cumulative: 200000,
    },
    {
      month: "Mar'23",
      invested: 80000,
      withdrawn: 0,
      dividends: 750,
      netFlow: 80750,
      cumulative: 280000,
    },
    {
      month: "Apr'23",
      invested: 120000,
      withdrawn: 0,
      dividends: 0,
      netFlow: 120000,
      cumulative: 400000,
    },
    {
      month: "Jul'23",
      invested: 180000,
      withdrawn: 0,
      dividends: 750,
      netFlow: 180750,
      cumulative: 580000,
    },
    {
      month: "Sep'24",
      invested: 40000,
      withdrawn: 102400,
      dividends: 2400,
      netFlow: -60000,
      cumulative: 885600,
    },
    {
      month: "Oct'24",
      invested: 25000,
      withdrawn: 0,
      dividends: 2400,
      netFlow: 27400,
      cumulative: 1000000,
    },
  ];

  // Cash Flow Chart Data
  const cashFlowChartData: CashFlowChartData[] = [
    { month: "Jan'23", invested: 150000, portfolioValue: 150000 },
    { month: "Apr'23", invested: 280000, portfolioValue: 420000 },
    { month: "Jul'23", invested: 460000, portfolioValue: 750000 },
    { month: "Dec'23", invested: 680000, portfolioValue: 1000000 },
    { month: "Jan'24", invested: 750000, portfolioValue: 1150000 },
    { month: "Jun'24", invested: 850000, portfolioValue: 1250000 },
    { month: "Oct'24", invested: 1000000, portfolioValue: 1245800 },
  ];

  // Decision Reviews
  const bestDecisions: Decision[] = [
    {
      id: 1,
      rank: 1,
      type: "best",
      title: "Bought HDFC Bank @ ₹1,640",
      stock: "HDFC Bank",
      action: "Bought",
      price: 1640,
      date: "Jan 2023",
      currentPrice: 1820,
      gain: 9000,
      gainPercent: 35.2,
      whyWorked: [
        "Bought near yearly low (timing ✅)",
        "Strong fundamentals (health 85/100)",
        "Held through volatility (discipline ✅)",
      ],
      lesson: "Value + Quality + Patience = Success",
    },
    {
      id: 2,
      rank: 2,
      type: "best",
      title: "Sold HCL Tech @ ₹1,280",
      stock: "HCL Tech",
      action: "Sold",
      price: 1280,
      date: "Sep 2024",
      currentPrice: 1240,
      gain: 18400,
      gainPercent: 21.9,
      whyWorked: [
        "Hit your target price",
        "Stock declined to ₹1,240 after (timing ✅)",
        "Rebalanced portfolio efficiently",
      ],
      lesson: "Having sell targets prevents greed",
    },
    {
      id: 3,
      rank: 3,
      type: "best",
      title: "Added TCS during correction",
      stock: "TCS",
      action: "Bought",
      price: 3420,
      date: "Mar 2024",
      currentPrice: 3600,
      gain: 30600,
      gainPercent: 28.5,
      whyWorked: [
        "Bought fear, not FOMO (contrarian ✅)",
        "Quality company on sale",
        "Market recovered, you won",
      ],
      lesson: "Corrections are opportunities, not threats",
    },
  ];

  const learningDecisions: Decision[] = [
    {
      id: 1,
      rank: 1,
      type: "learn",
      title: "Bought Infosys too high @ ₹1,420",
      stock: "Infosys",
      action: "Bought",
      price: 1420,
      date: "Jan 2024",
      currentPrice: 1380,
      gain: -2400,
      gainPercent: -2.8,
      whatHappened: [
        "Bought near 52-week high (timing ❌)",
        "Didn't wait for pullback",
        "Still underwater after 14 months",
      ],
      lesson: "Be patient, don't chase momentum",
      silverLining: "Health still 76 - may recover",
    },
    {
      id: 2,
      rank: 2,
      type: "learn",
      title: "Sold Wipro too early @ ₹405",
      stock: "Wipro",
      action: "Sold",
      price: 405,
      date: "Jul 2023",
      currentPrice: 480,
      gain: 12000,
      gainPercent: 12,
      missedGain: 6000,
      whatHappened: [
        "Stock went to ₹480 after (+18% more)",
        "Left ₹6,000 on table",
        "Exited based on short-term thinking",
      ],
      lesson: "Let winners run, don't book too early",
    },
    {
      id: 3,
      rank: 3,
      type: "learn",
      title: "Missed TCS dip @ ₹3,200",
      stock: "TCS",
      action: "Missed",
      price: 3200,
      date: "Feb 2024",
      currentPrice: 3420,
      missedGain: 7000,
      whatHappened: [
        "Hesitated during correction",
        "Bought after recovery started",
        "Still good, but could be better",
      ],
      lesson: "Have dry powder for corrections",
    },
  ];

  // Comparative Journey Data
  const comparativeGrowthData: ComparativeGrowth[] = [
    { month: "Jan'23", you: 150000, nifty: 150000, fd: 150000, gold: 150000 },
    { month: "Apr'23", you: 285000, nifty: 270000, fd: 258000, gold: 264000 },
    { month: "Jul'23", you: 445000, nifty: 410000, fd: 375000, gold: 388000 },
    { month: "Oct'23", you: 628000, nifty: 565000, fd: 498000, gold: 522000 },
    { month: "Jan'24", you: 785000, nifty: 710000, fd: 625000, gold: 658000 },
    { month: "Apr'24", you: 952000, nifty: 865000, fd: 758000, gold: 792000 },
    { month: "Jul'24", you: 1125000, nifty: 1005000, fd: 895000, gold: 935000 },
    { month: "Oct'24", you: 1246000, nifty: 1128000, fd: 1062000, gold: 1088000 },
  ];

  const benchmarkComparisons: BenchmarkComparison[] = [
    {
      strategy: "You (Active)",
      invested: 1000000,
      currentValue: 1246000,
      gain: 246000,
      returnPercent: 24.6,
    },
    {
      strategy: "Nifty 50 Index",
      invested: 1000000,
      currentValue: 1128000,
      gain: 128000,
      returnPercent: 12.8,
    },
    {
      strategy: "Fixed Deposit",
      invested: 1000000,
      currentValue: 1062000,
      gain: 62000,
      returnPercent: 6.2,
    },
    {
      strategy: "Gold",
      invested: 1000000,
      currentValue: 1088000,
      gain: 88000,
      returnPercent: 8.8,
    },
  ];

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    if (filterType === "buys" && t.type !== "buy") return false;
    if (filterType === "sells" && t.type !== "sell") return false;
    if (filterType === "dividends" && t.type !== "dividend") return false;
    if (selectedStock !== "all" && t.stock !== selectedStock) return false;
    return true;
  });

  // Get unique stocks for filter
  const uniqueStocks = Array.from(new Set(transactions.map((t) => t.stock)));

  // Calculate stats
  const totalInvested = 1000000;
  const currentValue = 1245800;
  const totalBuys = transactions.filter((t) => t.type === "buy").length;
  const totalSells = transactions.filter((t) => t.type === "sell").length;
  const winningTrades = 39;
  const totalTrades = 47;
  const winRate = (winningTrades / totalTrades) * 100;

  // Toggle stock expansion
  const toggleStockExpansion = (stockId: number) => {
    setExpandedStocks((prev) =>
      prev.includes(stockId)
        ? prev.filter((id) => id !== stockId)
        : [...prev, stockId]
    );
  };

  return (
    <div className="space-y-6">
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1: JOURNEY HERO
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Your investing journey started 22 months ago. Here's how far you've
            come:
          </p>
          <h3 className="text-2xl font-bold">Your Investment Journey</h3>
        </div>

        {/* Visual Timeline */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardContent className="pt-8 pb-6">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-primary"></div>

              {/* Milestones */}
              <div className="relative flex justify-between items-start">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg mb-2 cursor-pointer hover:scale-110 transition-transform">
                      <Flag className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-semibold text-center">
                      {milestone.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {milestone.date}
                    </p>
                    {milestone.amount && (
                      <p className="text-sm font-bold text-primary mt-1">
                        {milestone.amount}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journey Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Portfolio Journey */}
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Portfolio Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Started with</p>
                <p className="text-lg font-bold">₹1,50,000</p>
                <p className="text-xs text-muted-foreground">Jan 2023</p>
              </div>
              <div className="space-y-1 pt-2 border-t">
                <p className="text-xs text-muted-foreground">Current value</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹12,45,800
                </p>
              </div>
              <div className="pt-2 border-t space-y-1">
                <p className="text-xs text-muted-foreground">
                  Journey duration: 22 months
                </p>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Growth: 730% (8.3x) 🚀
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Investment Activity */}
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Investment Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total invested</span>
                  <span className="font-bold">₹10,00,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Number of buys</span>
                  <span className="font-semibold text-green-600">
                    {totalBuys} transactions
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Number of sells</span>
                  <span className="font-semibold text-blue-600">
                    {totalSells} transactions
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active months</span>
                  <span className="font-semibold">20 out of 22</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Decision Quality */}
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Decision Quality
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Winning trades</span>
                  <span className="font-bold text-green-600">
                    {winningTrades} / {totalTrades}
                  </span>
                </div>
                <Progress value={winRate} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {winRate.toFixed(0)}% success rate
                </p>
              </div>
              <div className="pt-2 border-t space-y-1 text-xs">
                <p className="text-muted-foreground">Avg holding: 8.5 months</p>
                <p className="text-green-600 font-semibold">
                  ✓ Best: HDFC at ₹1,640 (+35%)
                </p>
                <p className="text-orange-600 font-semibold">
                  ⚠ Learned: Infosys too high (-2.8%)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Evolution */}
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Evolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Started with</span>
                  <span className="font-semibold">3 stocks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Current holdings
                  </span>
                  <span className="font-semibold">15 stocks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Sectors diversified
                  </span>
                  <span className="font-semibold">1 → 6</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <Badge className="w-full justify-center bg-green-100 text-green-700 hover:bg-green-100">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Investing maturity: Growing 🟢
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2: TRANSACTION TIMELINE
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Let's walk through every investment decision you made
          </p>
          <h3 className="text-xl font-bold flex items-center gap-2">
            📅 Complete Transaction History
          </h3>
        </div>

        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <div className="space-y-4">
              {/* View Mode Controls */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={viewMode === "timeline" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("timeline")}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Timeline View
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                >
                  <Table2 className="w-4 h-4 mr-2" />
                  Table View
                </Button>
                <Button
                  variant={viewMode === "calendar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                >
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Calendar View
                </Button>
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap gap-2">
                <div className="flex gap-2">
                  <Button
                    variant={filterType === "all" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterType === "buys" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("buys")}
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Buys
                  </Button>
                  <Button
                    variant={filterType === "sells" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setFilterType("sells")}
                  >
                    <TrendingDown className="w-3 h-3 mr-1" />
                    Sells
                  </Button>
                  <Button
                    variant={
                      filterType === "dividends" ? "secondary" : "outline"
                    }
                    size="sm"
                    onClick={() => setFilterType("dividends")}
                  >
                    <DollarSign className="w-3 h-3 mr-1" />
                    Dividends
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {viewMode === "timeline" && (
              <div className="space-y-6">
                {/* Group by month */}
                {Array.from(
                  new Set(filteredTransactions.map((t) => t.month))
                ).map((month) => (
                  <div key={month}>
                    {/* Month Divider */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1 h-px bg-border"></div>
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        {month}
                      </h4>
                      <div className="flex-1 h-px bg-border"></div>
                    </div>

                    {/* Transactions for this month */}
                    <div className="space-y-4">
                      {filteredTransactions
                        .filter((t) => t.month === month)
                        .map((transaction) => (
                          <Card
                            key={transaction.id}
                            className={`
                            ${
                              transaction.type === "buy"
                                ? "bg-green-50/50 dark:bg-green-950/10 border-l-4 border-l-green-500"
                                : transaction.type === "sell"
                                ? "bg-blue-50/50 dark:bg-blue-950/10 border-l-4 border-l-blue-500"
                                : "bg-yellow-50/50 dark:bg-yellow-950/10 border-l-4 border-l-yellow-500"
                            }
                            hover:shadow-md transition-shadow
                          `}
                          >
                            <CardContent className="pt-4">
                              {/* Transaction Header */}
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      transaction.type === "buy"
                                        ? "bg-green-500 text-white"
                                        : transaction.type === "sell"
                                        ? "bg-blue-500 text-white"
                                        : "bg-yellow-500 text-white"
                                    }`}
                                  >
                                    {transaction.type === "buy" ? (
                                      <TrendingUp className="w-4 h-4" />
                                    ) : transaction.type === "sell" ? (
                                      <TrendingDown className="w-4 h-4" />
                                    ) : (
                                      <DollarSign className="w-4 h-4" />
                                    )}
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-lg">
                                      {transaction.type === "buy"
                                        ? "✅ Bought"
                                        : transaction.type === "sell"
                                        ? "❌ Sold"
                                        : "💰"}{" "}
                                      {transaction.stock}
                                      {transaction.type === "dividend" &&
                                        " Dividend Payment"}
                                    </h5>
                                    <p className="text-xs text-muted-foreground">
                                      {transaction.date}
                                    </p>
                                  </div>
                                </div>
                                <Badge
                                  variant={
                                    transaction.type === "buy"
                                      ? "default"
                                      : transaction.type === "sell"
                                      ? "secondary"
                                      : "outline"
                                  }
                                >
                                  {transaction.type.toUpperCase()}
                                </Badge>
                              </div>

                              {/* Transaction Details */}
                              <div className="space-y-3">
                                {/* BUY Transaction */}
                                {transaction.type === "buy" && (
                                  <>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <p className="text-muted-foreground">
                                          Quantity & Price
                                        </p>
                                        <p className="font-semibold">
                                          {transaction.quantity} shares @ ₹
                                          {transaction.price?.toLocaleString()}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">
                                          Total Amount
                                        </p>
                                        <p className="font-semibold">
                                          ₹
                                          {transaction.total.toLocaleString()} (+
                                          ₹{transaction.fees} fees)
                                        </p>
                                      </div>
                                    </div>

                                    {transaction.reason && (
                                      <div className="p-2 bg-background/50 rounded border border-border/50">
                                        <p className="text-xs text-muted-foreground">
                                          Reason
                                        </p>
                                        <p className="text-sm italic">
                                          "{transaction.reason}"
                                        </p>
                                      </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Portfolio impact
                                        </p>
                                        <p className="font-semibold">
                                          +{transaction.portfolioImpact}%
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground">
                                          Current status
                                        </p>
                                        <p className="font-semibold text-green-600">
                                          {transaction.currentStatus} (₹
                                          {transaction.currentGain?.toLocaleString()}{" "}
                                          gain)
                                        </p>
                                      </div>
                                    </div>

                                    {transaction.healthScore && (
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm text-muted-foreground">
                                          Health score:
                                        </span>
                                        <Badge
                                          className={`${
                                            transaction.healthScore >= 80
                                              ? "bg-green-100 text-green-700"
                                              : transaction.healthScore >= 60
                                              ? "bg-yellow-100 text-yellow-700"
                                              : "bg-red-100 text-red-700"
                                          }`}
                                        >
                                          {transaction.healthScore}/100{" "}
                                          {transaction.healthScore >= 80
                                            ? "🟢"
                                            : transaction.healthScore >= 60
                                            ? "🟡"
                                            : "🔴"}
                                        </Badge>
                                      </div>
                                    )}

                                    <div className="flex gap-2 pt-2">
                                      <Button variant="outline" size="sm">
                                        View Stock
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        Add Note
                                      </Button>
                                    </div>
                                  </>
                                )}

                                {/* SELL Transaction */}
                                {transaction.type === "sell" && (
                                  <>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <p className="text-muted-foreground">
                                          Quantity & Price
                                        </p>
                                        <p className="font-semibold">
                                          {transaction.quantity} shares @ ₹
                                          {transaction.price?.toLocaleString()}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">
                                          Total Amount
                                        </p>
                                        <p className="font-semibold">
                                          ₹
                                          {transaction.total.toLocaleString()} (-
                                          ₹{transaction.fees} fees)
                                        </p>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <p className="text-muted-foreground">
                                          Bought at
                                        </p>
                                        <p className="font-semibold">
                                          ₹
                                          {transaction.boughtAt?.toLocaleString()}{" "}
                                          ({transaction.boughtDate})
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">
                                          Holding period
                                        </p>
                                        <p className="font-semibold">
                                          {transaction.holdingPeriod}
                                        </p>
                                      </div>
                                    </div>

                                    {transaction.reason && (
                                      <div className="p-2 bg-background/50 rounded border border-border/50">
                                        <p className="text-xs text-muted-foreground">
                                          Reason
                                        </p>
                                        <p className="text-sm italic">
                                          "{transaction.reason}"
                                        </p>
                                      </div>
                                    )}

                                    <div className="p-3 bg-background rounded-lg border-2 border-primary/20">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold">
                                          Realized gain
                                        </span>
                                        <span
                                          className={`text-lg font-bold ${
                                            (transaction.realizedGain ?? 0) >= 0
                                              ? "text-green-600"
                                              : "text-red-600"
                                          }`}
                                        >
                                          {(transaction.realizedGain ?? 0) >= 0
                                            ? "+"
                                            : ""}
                                          ₹
                                          {transaction.realizedGain?.toLocaleString()}{" "}
                                          (
                                          {transaction.realizedGainPercent?.toFixed(
                                            1
                                          )}
                                          %){" "}
                                          {(transaction.realizedGain ?? 0) >= 0
                                            ? "🎉"
                                            : "📉"}
                                        </span>
                                      </div>
                                      {transaction.taxLiability! > 0 && (
                                        <p className="text-xs text-muted-foreground">
                                          Tax liability: ₹
                                          {transaction.taxLiability?.toLocaleString()}{" "}
                                          (LTCG)
                                        </p>
                                      )}
                                    </div>

                                    {transaction.decisionReview && (
                                      <div className="pt-2 border-t">
                                        <p className="text-sm font-semibold mb-1">
                                          Decision review:{" "}
                                          {transaction.decisionReview}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          (Stock now at ₹
                                          {transaction.stockNowAt?.toLocaleString()}{" "}
                                          -{" "}
                                          {(transaction.realizedGain ?? 0) >= 0
                                            ? "you sold high"
                                            : "cut losses early"}
                                          )
                                        </p>
                                      </div>
                                    )}

                                    <div className="pt-2">
                                      <Button variant="outline" size="sm">
                                        View Analysis
                                      </Button>
                                    </div>
                                  </>
                                )}

                                {/* DIVIDEND Transaction */}
                                {transaction.type === "dividend" && (
                                  <>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <p className="text-muted-foreground">
                                          Amount
                                        </p>
                                        <p className="font-semibold">
                                          ₹{transaction.total.toLocaleString()}{" "}
                                          (₹{transaction.price}/share ×{" "}
                                          {transaction.quantity})
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">
                                          Tax deducted
                                        </p>
                                        <p className="font-semibold">
                                          ₹
                                          {transaction.taxDeducted?.toLocaleString()}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-900/30">
                                      <p className="text-xs text-muted-foreground">
                                        Net received
                                      </p>
                                      <p className="text-lg font-bold text-green-600">
                                        ₹
                                        {transaction.netAmount?.toLocaleString()}
                                      </p>
                                    </div>

                                    <div className="text-sm">
                                      <p className="text-muted-foreground">
                                        Impact
                                      </p>
                                      <p className="font-semibold">
                                        +{transaction.portfolioImpact}% to
                                        portfolio
                                      </p>
                                    </div>

                                    {transaction.note && (
                                      <div className="p-2 bg-background/50 rounded border border-border/50">
                                        <p className="text-xs text-muted-foreground">
                                          Note
                                        </p>
                                        <p className="text-sm italic">
                                          {transaction.note}
                                        </p>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {viewMode === "table" && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {transaction.date}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.type === "buy"
                                ? "default"
                                : transaction.type === "sell"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          {transaction.stock}
                        </TableCell>
                        <TableCell className="text-right">
                          {transaction.quantity || "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          {transaction.price
                            ? `₹${transaction.price.toLocaleString()}`
                            : "-"}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ₹{transaction.total.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {transaction.type === "buy" && (
                            <span className="text-green-600 font-semibold">
                              {transaction.currentStatus}
                            </span>
                          )}
                          {transaction.type === "sell" && (
                            <span
                              className={
                                (transaction.realizedGain ?? 0) >= 0
                                  ? "text-green-600 font-semibold"
                                  : "text-red-600 font-semibold"
                              }
                            >
                              {(transaction.realizedGain ?? 0) >= 0 ? "+" : ""}
                              {transaction.realizedGainPercent?.toFixed(1)}%
                            </span>
                          )}
                          {transaction.type === "dividend" && (
                            <span className="text-yellow-600 font-semibold">
                              ₹{transaction.netAmount?.toLocaleString()}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {viewMode === "calendar" && (() => {
              // Calculate calendar data for current month
              const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();
              const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
              const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
              
              // Filter transactions for current month
              const monthTransactions = filteredTransactions.filter((t) => {
                const tDate = new Date(t.date);
                return tDate.getMonth() === calendarMonth && tDate.getFullYear() === calendarYear;
              });

              // Group transactions by day
              const transactionsByDay = monthTransactions.reduce((acc, t) => {
                const day = new Date(t.date).getDate();
                if (!acc[day]) acc[day] = [];
                acc[day].push(t);
                return acc;
              }, {} as Record<number, typeof monthTransactions>);

              // Navigation functions
              const goToPreviousMonth = () => {
                if (calendarMonth === 0) {
                  setCalendarMonth(11);
                  setCalendarYear(calendarYear - 1);
                } else {
                  setCalendarMonth(calendarMonth - 1);
                }
              };

              const goToNextMonth = () => {
                if (calendarMonth === 11) {
                  setCalendarMonth(0);
                  setCalendarYear(calendarYear + 1);
                } else {
                  setCalendarMonth(calendarMonth + 1);
                }
              };

              const goToToday = () => {
                const today = new Date();
                setCalendarMonth(today.getMonth());
                setCalendarYear(today.getFullYear());
              };

              return (
                <div className="space-y-4">
                  {/* Calendar Navigation */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousMonth}
                    >
                      <ChevronDown className="w-4 h-4 rotate-90" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-4">
                      <h4 className="text-xl font-bold">
                        {monthNames[calendarMonth]} {calendarYear}
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToToday}
                      >
                        Today
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextMonth}
                    >
                      Next
                      <ChevronDown className="w-4 h-4 -rotate-90" />
                    </Button>
                  </div>

                  {/* Transaction Count Badge */}
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {monthTransactions.length} transaction
                      {monthTransactions.length !== 1 ? "s" : ""} this month
                    </Badge>
                  </div>

                  {/* Calendar Grid */}
                  <div className="border rounded-lg overflow-hidden">
                    {/* Day headers */}
                    <div className="grid grid-cols-7 bg-muted/50">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div
                            key={day}
                            className="text-center text-xs font-semibold p-2 border-r last:border-r-0"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 bg-background">
                      {/* Empty cells before first day of month */}
                      {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div
                          key={`empty-${i}`}
                          className="min-h-[80px] p-2 border-r border-b bg-muted/20"
                        />
                      ))}

                      {/* Days of the month */}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const dayTransactions = transactionsByDay[day] || [];
                        const isToday = new Date().getDate() === day &&
                          new Date().getMonth() === calendarMonth &&
                          new Date().getFullYear() === calendarYear;

                        return (
                          <div
                            key={day}
                            className={`min-h-[80px] p-2 border-r border-b last:border-r-0 ${
                              dayTransactions.length > 0
                                ? "bg-background"
                                : "bg-muted/10"
                            } ${
                              isToday ? "ring-2 ring-primary ring-inset" : ""
                            }`}
                          >
                            <div className="flex flex-col h-full">
                              <div className={`text-sm font-medium mb-1 ${
                                isToday ? "text-primary font-bold" : ""
                              }`}>
                                {day}
                              </div>
                              {dayTransactions.length > 0 && (
                                <div className="flex-1 space-y-1">
                                  {dayTransactions.map((transaction) => (
                                    <div
                                      key={transaction.id}
                                      className={`text-xs p-1 rounded truncate ${
                                        transaction.type === "buy"
                                          ? "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400"
                                          : transaction.type === "sell"
                                          ? "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
                                          : "bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400"
                                      }`}
                                      title={`${transaction.stock} - ₹${transaction.total.toLocaleString()}`}
                                    >
                                      <div className="flex items-center gap-1">
                                        {transaction.type === "buy" ? (
                                          <ArrowUpRight className="w-2.5 h-2.5" />
                                        ) : transaction.type === "sell" ? (
                                          <ArrowDownRight className="w-2.5 h-2.5" />
                                        ) : (
                                          <DollarSign className="w-2.5 h-2.5" />
                                        )}
                                        <span className="truncate">
                                          {transaction.stock}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {/* Empty cells after last day to complete the grid */}
                      {Array.from({
                        length:
                          (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7,
                      }).map((_, i) => (
                        <div
                          key={`empty-end-${i}`}
                          className="min-h-[80px] p-2 border-r border-b last:border-r-0 bg-muted/20"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Month Summary */}
                  {monthTransactions.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-sm">
                      <Badge variant="outline" className="text-green-600 dark:text-green-400">
                        {monthTransactions.filter((t) => t.type === "buy").length}{" "}
                        Buy{monthTransactions.filter((t) => t.type === "buy").length !== 1 ? "s" : ""}
                      </Badge>
                      <Badge variant="outline" className="text-blue-600 dark:text-blue-400">
                        {monthTransactions.filter((t) => t.type === "sell").length}{" "}
                        Sell{monthTransactions.filter((t) => t.type === "sell").length !== 1 ? "s" : ""}
                      </Badge>
                      <Badge variant="outline" className="text-yellow-600 dark:text-yellow-400">
                        {monthTransactions.filter((t) => t.type === "dividend").length}{" "}
                        Dividend{monthTransactions.filter((t) => t.type === "dividend").length !== 1 ? "s" : ""}
                      </Badge>
                      <Badge variant="outline">
                        Total: ₹{monthTransactions.reduce((sum, t) => sum + t.total, 0).toLocaleString()}
                      </Badge>
                    </div>
                  )}
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3: PORTFOLIO EVOLUTION
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Watch how your portfolio transformed over time
          </p>
          <h3 className="text-xl font-bold flex items-center gap-2">
            🔄 Portfolio Composition Over Time
          </h3>
        </div>

        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle>Portfolio Evolution</CardTitle>
                <CardDescription>
                  Visual journey of your portfolio growth
                </CardDescription>
              </div>

              {/* View toggles */}
              <div className="flex gap-2">
                <Button
                  variant={evolutionView === "stock" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEvolutionView("stock")}
                >
                  By Stock
                </Button>
                <Button
                  variant={evolutionView === "sector" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEvolutionView("sector")}
                >
                  By Sector
                </Button>
                <Button
                  variant={evolutionView === "health" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setEvolutionView("health")}
                >
                  By Health
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Stacked Area Chart */}
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={evolutionData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorHDFC" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorTCS" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient
                      id="colorReliance"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorOthers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="month"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: any) => [
                      `₹${value.toLocaleString()}`,
                      "",
                    ]}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="HDFC"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="url(#colorHDFC)"
                    name="HDFC Bank"
                  />
                  <Area
                    type="monotone"
                    dataKey="TCS"
                    stackId="1"
                    stroke="#10b981"
                    fill="url(#colorTCS)"
                    name="TCS"
                  />
                  <Area
                    type="monotone"
                    dataKey="Reliance"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="url(#colorReliance)"
                    name="Reliance"
                  />
                  <Area
                    type="monotone"
                    dataKey="Others"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="url(#colorOthers)"
                    name="Others"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Interactive features info */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                <Play className="w-3 h-3 mr-1" />
                Click any point to see portfolio snapshot
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Activity className="w-3 h-3 mr-1" />
                Hover for exact allocations
              </Badge>
            </div>

            {/* Portfolio Snapshots */}
            <div className="pt-6 border-t">
              <h4 className="text-sm font-semibold mb-4">
                Portfolio Snapshots - Journey from Concentrated → Diversified
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {portfolioSnapshots.map((snapshot) => (
                  <Card
                    key={snapshot.period}
                    className="border-2 hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Flag className="w-4 h-4" />
                        {snapshot.period}
                      </CardTitle>
                      <CardDescription>{snapshot.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Value</p>
                        <p className="text-2xl font-bold text-primary">
                          ₹{(snapshot.value / 100000).toFixed(1)}L
                        </p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Stocks</span>
                          <span className="font-semibold">
                            {snapshot.stocks}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sectors</span>
                          <span className="font-semibold">
                            {snapshot.sectors}
                          </span>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground mb-1">
                          Top holding
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">
                            {snapshot.topHolding}
                          </span>
                          <Badge
                            variant="secondary"
                            className={
                              snapshot.topHoldingPercent > 50
                                ? "bg-red-100 text-red-700"
                                : snapshot.topHoldingPercent > 30
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }
                          >
                            {snapshot.topHoldingPercent}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: INVESTMENT PATTERNS
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Let's understand your investing patterns and habits
          </p>
          <h3 className="text-xl font-bold flex items-center gap-2">
            🧠 Your Investing Behavior
          </h3>
        </div>

        {/* Investment Frequency Analysis */}
        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Monthly Investment Activity</CardTitle>
            <CardDescription>
              Your investment pattern over the past 10 months
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyInvestments}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="month"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: any) => [
                      `₹${value.toLocaleString()}`,
                      "Invested",
                    ]}
                  />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900/30">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  💡 You invest most actively in January and July (bonus
                  months?)
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900/30">
                <p className="text-sm text-green-900 dark:text-green-100">
                  ✓ Average monthly investment: ₹1,04,000
                </p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900/30">
                <p className="text-sm text-purple-900 dark:text-purple-100">
                  📈 Most consistent period: Jun-Oct 2024 (no gaps)
                </p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
                <p className="text-sm text-yellow-900 dark:text-yellow-100">
                  ⏸️ Longest gap: 2 months (Feb-Mar 2024)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buying Behavior */}
        <div>
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Buying Behavior
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Buy Timing */}
            <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Buy Timing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Dips/corrections
                    </span>
                    <span className="font-bold text-green-600">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Momentum/breakouts
                    </span>
                    <span className="font-bold">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">All-time highs</span>
                    <span className="font-bold text-red-600">10%</span>
                  </div>
                  <Progress value={10} className="h-2" />
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground italic">
                    You're a value buyer - wait for corrections
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Position Sizing */}
            <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Position Sizing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Typical buy</span>
                    <span className="font-semibold">₹20K - ₹30K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Largest buy</span>
                    <span className="font-semibold text-primary">
                      ₹1,02,000
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">(HDFC Bank)</p>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Smallest buy</span>
                    <span className="font-semibold">₹8,500</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(top-up)</p>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground italic">
                    Consistent sizing, with conviction plays larger
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Stock Selection */}
            <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Stock Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Research before buying
                    </span>
                    <Badge className="bg-green-100 text-green-700">85%</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      From watchlist
                    </span>
                    <Badge variant="secondary">70%</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Impulse buys</span>
                    <Badge variant="outline">30%</Badge>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground italic">
                    Mostly planned, some opportunistic
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Holding Behavior */}
            <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Holding Behavior
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg holding</span>
                    <span className="font-semibold">8.5 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Longest held</span>
                    <span className="font-semibold text-primary">
                      22 months
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    (HDFC Bank, still holding)
                  </p>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shortest</span>
                    <span className="font-semibold">2 months</span>
                  </div>
                  <p className="text-xs text-muted-foreground">(Tech stock)</p>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground italic">
                    Long-term investor, rare quick exits
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Selling Behavior */}
        <div>
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-blue-600" />
            Selling Behavior
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Sell Triggers */}
            <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Sell Triggers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Profit booking</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      5 sells
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">
                    Hit target price
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Rebalancing</span>
                    </div>
                    <Badge variant="secondary">2 sells</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">
                    Portfolio allocation
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm">Cut losses</span>
                    </div>
                    <Badge variant="outline">1 sell</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">
                    Exited losing position
                  </p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground italic">
                    Disciplined profit booking, low panic selling
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Sell Timing Quality */}
            <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  Sell Timing Quality
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Sold before decline</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      3 stocks ✅
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">
                    Good timing
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm">Sold too early</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700">
                      2 stocks ⚠️
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground pl-6">
                    Missed 10%+ more gains
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingDownIcon className="w-4 h-4 text-red-600" />
                      <span className="text-sm">Sold too late</span>
                    </div>
                    <Badge className="bg-red-100 text-red-700">0 stocks ❌</Badge>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm font-semibold text-green-600">
                    Win rate: 88% of sells profitable
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emotional Discipline Score */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Emotional Discipline Score
            </CardTitle>
            <CardDescription>
              How you behaved during market volatility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* March 2024 Correction */}
            <div className="p-4 bg-background rounded-lg border-2 border-border">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center">
                  <TrendingDownIcon className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold mb-1">
                    March 2024 Market Correction (-8%)
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>
                        <strong>Your reaction:</strong> Added ₹50K during dip
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span>
                        <strong>Portfolio impact:</strong> Bought quality at
                        discount
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                      <span>
                        <strong>Result:</strong> Those purchases up 18% average
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* August 2024 Rally */}
            <div className="p-4 bg-background rounded-lg border-2 border-border">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold mb-1">
                    August 2024 Rally (+12%)
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>
                        <strong>Your reaction:</strong> Booked partial profits
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span>
                        <strong>Moved to cash:</strong> ₹80K
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-600" />
                      <span>
                        <strong>Result:</strong> Avoided subsequent 5%
                        correction
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discipline Score */}
            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-200 dark:border-green-900/30">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Overall Discipline Score
                </p>
                <p className="text-3xl font-bold text-green-600">
                  8.5<span className="text-lg">/10</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white text-lg px-4 py-2">
                  Excellent 🟢
                </Badge>
              </div>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900/30">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                💡 You demonstrate strong emotional control - buying dips and
                booking profits during rallies. This counter-cyclical behavior
                is a hallmark of successful investors.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5: STOCK JOURNEY CHRONICLES
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Let's see the journey of each stock in your portfolio
          </p>
          <h3 className="text-xl font-bold flex items-center gap-2">
            📖 Stock-by-Stock Chronicles
          </h3>
        </div>

        <div className="space-y-3">
          {stockJourneys.map((journey) => (
            <Card
              key={journey.id}
              className="border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden"
            >
              <Collapsible
                open={expandedStocks.includes(journey.id)}
                onOpenChange={() => toggleStockExpansion(journey.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{journey.icon}</span>
                        <div className="text-left">
                          <CardTitle className="text-lg">
                            {journey.stock} - {journey.tagline}
                          </CardTitle>
                          <CardDescription>
                            {journey.journeyDuration}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge
                            variant={
                              journey.status === "holding"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {journey.status === "holding"
                              ? "Still Holding"
                              : "Sold"}
                          </Badge>
                          <p
                            className={`text-lg font-bold mt-1 ${
                              journey.totalReturnPercent >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {journey.totalReturnPercent >= 0 ? "+" : ""}
                            {journey.totalReturnPercent.toFixed(1)}%{" "}
                            {journey.totalReturnPercent >= 10 ? "🎉" : ""}
                          </p>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            expandedStocks.includes(journey.id)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="space-y-6 pt-0">
                    {/* Transaction History */}
                    <div>
                      <h5 className="font-semibold mb-3 flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        TRANSACTION HISTORY
                      </h5>
                      <div className="space-y-3">
                        {journey.transactions.map((txn, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-background rounded-lg border"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="font-semibold text-sm">
                                  {txn.date} - {txn.type}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {txn.shares} shares @ ₹
                                  {txn.price.toLocaleString()} = ₹
                                  {txn.total.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs italic text-muted-foreground">
                              "{txn.note}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Current Position (for holding stocks) */}
                    {journey.currentPosition && (
                      <div className="p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
                        <h5 className="font-semibold mb-3">
                          Current Position:
                        </h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Holdings</p>
                            <p className="font-semibold">
                              {journey.currentPosition.shares} shares @ ₹
                              {journey.currentPosition.avgPrice} avg
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Invested</p>
                            <p className="font-semibold">
                              ₹{journey.currentPosition.invested.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              Current Value
                            </p>
                            <p className="font-semibold text-primary">
                              ₹
                              {journey.currentPosition.currentValue.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              Unrealized Gain
                            </p>
                            <p className="font-semibold text-green-600">
                              ₹
                              {journey.currentPosition.unrealizedGain.toLocaleString()}{" "}
                              (+
                              {journey.currentPosition.unrealizedGainPercent.toFixed(
                                2
                              )}
                              %)
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dividends Received */}
                    {journey.dividends.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          DIVIDENDS RECEIVED: ₹
                          {journey.dividends
                            .reduce((sum, d) => sum + d.amount, 0)
                            .toLocaleString()}{" "}
                          ({journey.dividends.length} payments)
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {journey.dividends.map((div, idx) => (
                            <Badge key={idx} variant="outline">
                              {div.date}: ₹{div.amount.toLocaleString()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Performance Journey */}
                    <div>
                      <h5 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        PERFORMANCE JOURNEY
                      </h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-600" />
                          <span className="text-muted-foreground">
                            Best moment:
                          </span>
                          <span className="font-semibold">
                            {journey.performance.bestMoment}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <span className="text-muted-foreground">
                            Tough time:
                          </span>
                          <span className="font-semibold">
                            {journey.performance.toughMoment}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-muted-foreground">
                            Your response:
                          </span>
                          <span className="font-semibold">
                            {journey.performance.yourResponse}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Health Evolution */}
                    <div>
                      <h5 className="font-semibold mb-3 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        HEALTH EVOLUTION
                      </h5>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={
                            journey.healthEvolution.initial >= 80
                              ? "bg-green-100 text-green-700"
                              : journey.healthEvolution.initial >= 60
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          Initial: {journey.healthEvolution.initial}
                        </Badge>
                        <span className="text-muted-foreground">→</span>
                        <Badge
                          className={
                            journey.healthEvolution.current >= 80
                              ? "bg-green-100 text-green-700"
                              : journey.healthEvolution.current >= 60
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          Current: {journey.healthEvolution.current}
                        </Badge>
                        <span className="text-sm font-semibold ml-2">
                          {journey.healthEvolution.trend}
                        </span>
                      </div>
                    </div>

                    {/* Decision Review */}
                    <div>
                      <h5 className="font-semibold mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        DECISION REVIEW
                      </h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <div>
                            <span className="text-muted-foreground">
                              Entry timing:
                            </span>{" "}
                            <span className="font-semibold">
                              {journey.decisionReview.entryTiming}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <div>
                            <span className="text-muted-foreground">
                              Position sizing:
                            </span>{" "}
                            <span className="font-semibold">
                              {journey.decisionReview.positionSizing}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                          <div>
                            <span className="text-muted-foreground">
                              Holding discipline:
                            </span>{" "}
                            <span className="font-semibold">
                              {journey.decisionReview.holdingDiscipline}
                            </span>
                          </div>
                        </div>
                        {journey.decisionReview.consideration && (
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                            <div>
                              <span className="text-muted-foreground">
                                Consider:
                              </span>{" "}
                              <span className="font-semibold">
                                {journey.decisionReview.consideration}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sell Info (for sold stocks) */}
                    {journey.sellInfo && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-2 border-blue-200 dark:border-blue-900/30">
                        <h5 className="font-semibold mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          LESSONS LEARNED
                        </h5>
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="text-muted-foreground mb-1">
                              Why sold:
                            </p>
                            <p className="font-semibold">
                              {journey.sellInfo.reason}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">
                              Outcome:
                            </p>
                            <p className="font-semibold">
                              {journey.sellInfo.outcome}
                            </p>
                          </div>
                          <div className="pt-2 border-t">
                            <p className="text-muted-foreground mb-1">
                              Key lesson:
                            </p>
                            <p className="font-semibold text-primary">
                              💡 {journey.sellInfo.lessonsLearned}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        View Full Analysis
                      </Button>
                      <Button variant="outline" size="sm">
                        Add Note
                      </Button>
                      <Button variant="outline" size="sm">
                        Set Alert
                      </Button>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6: PORTFOLIO MILESTONES
      ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Here are the defining moments of your investing journey
          </p>
          <h3 className="text-xl font-bold flex items-center gap-2">
            🎯 Key Milestones & Learnings
          </h3>
        </div>

        {/* Achievement Milestones */}
        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Achievement Milestones
            </CardTitle>
            <CardDescription>Proud moments in your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievementMilestones
                .filter((m) => m.type === "achievement")
                .map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-start gap-4 p-3 bg-background rounded-lg border hover:border-primary/50 transition-colors"
                  >
                    <span className="text-3xl">{milestone.icon}</span>
                    <div className="flex-1">
                      <h5 className="font-semibold">{milestone.title}</h5>
                      <p className="text-sm text-muted-foreground">
                        {milestone.date}
                      </p>
                      <p className="text-sm mt-1 italic">
                        "{milestone.description}"
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Milestones */}
        <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              Learning Milestones
            </CardTitle>
            <CardDescription>
              Lessons learned along the way
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievementMilestones
                .filter((m) => m.type === "learning")
                .map((milestone) => (
                  <div
                    key={milestone.id}
                    className="p-4 bg-background rounded-lg border-2 border-blue-200 dark:border-blue-900/30"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <span className="text-3xl">{milestone.icon}</span>
                      <div className="flex-1">
                        <h5 className="font-semibold">{milestone.title}</h5>
                        <p className="text-sm text-muted-foreground">
                          {milestone.date}
                        </p>
                        <p className="text-sm mt-1">{milestone.description}</p>
                      </div>
                    </div>
                    {milestone.details && (
                      <div className="ml-14 space-y-2 text-sm">
                        <p className="text-muted-foreground">
                          • {milestone.details}
                        </p>
                        {milestone.lesson && (
                          <p className="font-semibold text-primary">
                            💡 Lesson: "{milestone.lesson}"
                          </p>
                        )}
                        {milestone.impact && (
                          <p className="text-green-600 font-semibold">
                            ✅ Impact: {milestone.impact}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Behavioral Improvements */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Behavioral Improvements
            </CardTitle>
            <CardDescription>
              How you've evolved as an investor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before */}
              <div>
                <h5 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  EARLY DAYS (First 6 months)
                </h5>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold">Impulse buying: 45%</p>
                      <p className="text-muted-foreground">of trades</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold">Emotion-driven</p>
                      <p className="text-muted-foreground">
                        Panic in corrections
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold">No strategy</p>
                      <p className="text-muted-foreground">
                        Random stock picks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold">Short-term focus</p>
                      <p className="text-muted-foreground">
                        Wanted quick gains
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* After */}
              <div>
                <h5 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  NOW (Last 6 months)
                </h5>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold">Planned buying: 85%</p>
                      <p className="text-muted-foreground">from watchlist ✅</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold">Disciplined</p>
                      <p className="text-muted-foreground">
                        Buy dips, ignore noise ✅
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold">Strategy-driven</p>
                      <p className="text-muted-foreground">
                        Health + value focus ✅
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold">Long-term mindset</p>
                      <p className="text-muted-foreground">8+ month holds ✅</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-200 dark:border-green-900/30">
              <p className="text-center font-semibold text-green-700 dark:text-green-400">
                🎓 Growth visible: "You've matured as an investor"
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 7: Cash Flow Analysis */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">💰 Cash Flow Analysis</h2>
          <p className="text-muted-foreground">
            The money story: What you put in, what you took out, and the magic
            in between
          </p>
        </div>

        {/* Cash Flow Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Investment vs Portfolio Value</CardTitle>
            <CardDescription>
              See how your money has grown beyond what you invested
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashFlowChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => `₹${(value / 100000).toFixed(2)}L`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="invested"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Cash Invested"
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="portfolioValue"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Portfolio Value"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  Total Invested
                </div>
                <div className="text-2xl font-bold mt-1">₹10,00,000</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Over 7 months
                </div>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <div className="text-sm text-red-600 dark:text-red-400 font-medium">
                  Total Withdrawn
                </div>
                <div className="text-2xl font-bold mt-1">₹1,02,000</div>
                <div className="text-sm text-muted-foreground mt-1">
                  + ₹12,400 dividends
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Net Invested
                </div>
                <div className="text-2xl font-bold mt-1">₹8,98,000</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Current value: ₹12.5L
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Cash Flow Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Cash Flow Breakdown</CardTitle>
            <CardDescription>
              Track every rupee that moved in and out
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">Invested</TableHead>
                    <TableHead className="text-right">Withdrawn</TableHead>
                    <TableHead className="text-right">Dividends</TableHead>
                    <TableHead className="text-right">Net Flow</TableHead>
                    <TableHead className="text-right">Cumulative</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashFlowMonths.map((month) => (
                    <TableRow key={month.month}>
                      <TableCell className="font-medium">
                        {month.month}
                      </TableCell>
                      <TableCell className="text-right text-green-600 dark:text-green-400">
                        +₹{month.invested.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-red-600 dark:text-red-400">
                        {month.withdrawn > 0
                          ? `-₹${month.withdrawn.toLocaleString()}`
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right text-blue-600 dark:text-blue-400">
                        {month.dividends > 0
                          ? `+₹${month.dividends.toLocaleString()}`
                          : "-"}
                      </TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          month.netFlow >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {month.netFlow >= 0 ? "+" : ""}₹
                        {month.netFlow.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        ₹{month.cumulative.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Investment Sources & Withdrawal Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Sources</CardTitle>
              <CardDescription>Where your capital came from</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">💼 Salary</span>
                  <span className="text-sm font-bold">₹7,50,000 (75%)</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">🎁 Bonus/Incentive</span>
                  <span className="text-sm font-bold">₹2,00,000 (20%)</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    🔄 Dividend Reinvestment
                  </span>
                  <span className="text-sm font-bold">₹50,000 (5%)</span>
                </div>
                <Progress value={5} className="h-2" />
              </div>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                  💡 Insight: You're investing 40% of your salary
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Excellent savings rate for wealth building
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Analysis</CardTitle>
              <CardDescription>Why and when you withdrew funds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <Target className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Profit Booking</div>
                    <div className="text-xs text-muted-foreground">
                      ₹85,000 • 83% of withdrawals
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                      Locked in 22% gains on HCL Tech
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Rebalancing</div>
                    <div className="text-xs text-muted-foreground">
                      ₹12,000 • 12% of withdrawals
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Reduced overweight positions
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Cut Losses</div>
                    <div className="text-xs text-muted-foreground">
                      ₹5,000 • 5% of withdrawals
                    </div>
                    <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                      Exited poor performer early
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                  ✅ Healthy withdrawal pattern
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Most withdrawals are from profits, not panic
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section 8: Decision Review */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">🎯 Decision Review</h2>
          <p className="text-muted-foreground">
            Your best calls, your learning moments, and what they teach you
          </p>
        </div>

        {/* Best Decisions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              Top 3 Best Decisions
            </CardTitle>
            <CardDescription>
              The moves that made the biggest positive impact
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {bestDecisions.map((decision) => (
              <div
                key={decision.id}
                className="relative p-4 border-2 border-green-200 dark:border-green-900/30 rounded-lg bg-green-50 dark:bg-green-950/20"
              >
                {/* Rank Badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  #{decision.rank}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{decision.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span>{decision.stock}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {decision.action}
                        </Badge>
                        <span>•</span>
                        <span>{decision.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        +{decision.gainPercent}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ₹{decision.gain?.toLocaleString() ?? 0} gain
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg">
                      <div className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">
                        💡 Why It Worked
                      </div>
                      <p className="text-sm">{decision.whyWorked}</p>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg">
                      <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                        📚 The Lesson
                      </div>
                      <p className="text-sm">{decision.lesson}</p>
                    </div>
                  </div>

                  {decision.currentPrice && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Entry: ₹{decision.price.toLocaleString()}</span>
                      <ArrowUpRight className="w-3 h-3" />
                      <span>Current: ₹{decision.currentPrice.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Learning Decisions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              Top 3 Learning Moments
            </CardTitle>
            <CardDescription>
              Mistakes aren't failures if you learn from them
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningDecisions.map((decision) => (
              <div
                key={decision.id}
                className="relative p-4 border-2 border-orange-200 dark:border-orange-900/30 rounded-lg bg-orange-50 dark:bg-orange-950/20"
              >
                {/* Rank Badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  #{decision.rank}
                </div>

                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{decision.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <span>{decision.stock}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {decision.action}
                        </Badge>
                        <span>•</span>
                        <span>{decision.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {decision.gainPercent !== undefined ? (
                        <>
                          <div
                            className={`text-2xl font-bold ${
                              decision.gainPercent >= 0
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {decision.gainPercent >= 0 ? "+" : ""}
                            {decision.gainPercent}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ₹{Math.abs(decision.gain ?? 0).toLocaleString()}{" "}
                            {(decision.gain ?? 0) >= 0 ? "gain" : "loss"}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            Missed
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ₹{decision.missedGain?.toLocaleString()} potential
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg">
                      <div className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1">
                        🤔 What Happened
                      </div>
                      <p className="text-sm">{decision.whatHappened}</p>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg">
                      <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                        📚 The Lesson
                      </div>
                      <p className="text-sm">{decision.lesson}</p>
                    </div>
                  </div>

                  {decision.silverLining && (
                    <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                            Silver Lining
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {decision.silverLining}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {decision.price && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Entry: ₹{decision.price.toLocaleString()}</span>
                      {decision.currentPrice && (
                        <>
                          <ArrowUpRight className="w-3 h-3" />
                          <span>
                            Current: ₹{decision.currentPrice.toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Neutral & Overall Assessment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Neutral Decisions</CardTitle>
              <CardDescription>
                Not every move needs to be a home run
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <div className="font-medium">Asian Paints</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Bought at fair value, holding steady
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  +2.1% • Market-matching performance
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <div className="font-medium">Kotak Bank</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Defensive hold during volatility
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  -1.5% • Protected capital in downturn
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <div className="font-medium">Maruti Suzuki</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Sector bet, waiting for catalyst
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  +4.2% • Dividends provide cushion
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                  💼 Portfolio ballast
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  These stable positions reduce overall volatility
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Decision-Making Grade</CardTitle>
              <CardDescription>
                Your overall investment judgment score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="inline-block p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-2xl border-2 border-green-200 dark:border-green-900/30">
                  <div className="text-6xl font-bold text-green-600 dark:text-green-400">
                    B+
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Strong Performance
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        Strengths: Research & Discipline
                      </div>
                      <div className="text-xs text-muted-foreground">
                        85% of buys researched, patient holding
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        Opportunity: Entry Timing
                      </div>
                      <div className="text-xs text-muted-foreground">
                        2 premature entries, wait for better value
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        Development: Exit Strategy
                      </div>
                      <div className="text-xs text-muted-foreground">
                        1 early exit cost gains, plan holding duration
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg border border-green-200 dark:border-green-900/30">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                    🎯 Next Level: Refine entry timing to reach A grade
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section 9: Comparative Journey */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">📊 Your Journey vs Alternatives</h2>
          <p className="text-muted-foreground">
            How did your journey compare to passive investing?
          </p>
        </div>

        {/* Growth Race Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Growth Race: Active vs Passive</CardTitle>
            <CardDescription>
              Starting point: ₹1,50,000 (Jan 2023) - See how different
              strategies performed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={comparativeGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  />
                  <Tooltip
                    formatter={(value: number) => `₹${(value / 100000).toFixed(2)}L`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="you"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Your Portfolio"
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="nifty"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Nifty 50 Index"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="gold"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="2 2"
                    name="Gold"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="fd"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="8 4"
                    name="Fixed Deposit"
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-200 dark:border-green-900/30">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400 text-center">
                🏆 Your portfolio led the race from start to finish!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Final Values Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Final Values Comparison</CardTitle>
            <CardDescription>
              All strategies started with the same ₹10L investment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strategy</TableHead>
                    <TableHead className="text-right">Invested</TableHead>
                    <TableHead className="text-right">Current Value</TableHead>
                    <TableHead className="text-right">Gain</TableHead>
                    <TableHead className="text-right">Return %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {benchmarkComparisons.map((benchmark, index) => (
                    <TableRow
                      key={benchmark.strategy}
                      className={
                        index === 0
                          ? "bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-900/30"
                          : ""
                      }
                    >
                      <TableCell className="font-bold">
                        {index === 0 && (
                          <Trophy className="w-4 h-4 text-yellow-600 inline mr-2" />
                        )}
                        {benchmark.strategy}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{(benchmark.invested / 100000).toFixed(1)}L
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{(benchmark.currentValue / 100000).toFixed(2)}L
                      </TableCell>
                      <TableCell className="text-right text-green-600 dark:text-green-400 font-semibold">
                        +₹{(benchmark.gain / 100000).toFixed(2)}L
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        <Badge
                          variant={index === 0 ? "default" : "outline"}
                          className={
                            index === 0
                              ? "bg-green-600 dark:bg-green-700"
                              : ""
                          }
                        >
                          +{benchmark.returnPercent}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  vs Nifty 50
                </div>
                <div className="text-2xl font-bold mt-1">+₹1.18L</div>
                <div className="text-sm text-muted-foreground">
                  92% better returns
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <div className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  vs Fixed Deposit
                </div>
                <div className="text-2xl font-bold mt-1">+₹1.84L</div>
                <div className="text-sm text-muted-foreground">
                  297% better returns
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <div className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  vs Gold
                </div>
                <div className="text-2xl font-bold mt-1">+₹1.58L</div>
                <div className="text-sm text-muted-foreground">
                  178% better returns
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200 dark:border-blue-900/30">
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                💡 Your active investing added ₹1.18L over passive indexing -
                Worth the effort? You decide!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Time Invested Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Time Invested Analysis</CardTitle>
            <CardDescription>
              Was your time well spent? Let's calculate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Estimated Time Spent</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Research</span>
                    </div>
                    <span className="font-semibold">~30 hours</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Monitoring</span>
                    </div>
                    <span className="font-semibold">~44 hours</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-2 border-blue-200 dark:border-blue-900/30">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-bold">Total Time</span>
                    </div>
                    <span className="font-bold text-lg">~74 hours</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Over 22 months (~2 hours/month monitoring + initial research)
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Return on Time</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="text-sm text-green-600 dark:text-green-400">
                      Extra Returns Earned
                    </div>
                    <div className="text-3xl font-bold mt-1">₹1,18,000</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      vs Nifty 50 Index
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="text-sm text-purple-600 dark:text-purple-400">
                      Effective Hourly Rate
                    </div>
                    <div className="text-3xl font-bold mt-1">₹1,594/hour</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      ₹1,18,000 ÷ 74 hours
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-r from-green-50 to-purple-50 dark:from-green-950/20 dark:to-purple-950/20 rounded-lg border border-green-200 dark:border-green-900/30">
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400 text-center">
                    💰 Your time investment paid off handsomely!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 10: What's Next */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">🎯 Looking Ahead</h2>
          <p className="text-muted-foreground">
            Based on your journey so far, here's what to consider going forward
          </p>
        </div>

        {/* Future Projections */}
        <Card>
          <CardHeader>
            <CardTitle>If You Continue Current Pattern</CardTitle>
            <CardDescription>
              Projection based on your ₹45,000/month investment with 24.6%
              annual returns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 12 Month Projection */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border-2 border-blue-200 dark:border-blue-900/30">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-lg">Next 12 Months</h4>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Additional Invested
                    </div>
                    <div className="text-xl font-bold">₹5,40,000</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">
                      Expected Portfolio Value
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ₹18.9L - ₹19.8L
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">
                      Potential Total Gain
                    </div>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">
                      ₹6.4L - ₹7.3L
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Year Projection */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border-2 border-green-200 dark:border-green-900/30">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold text-lg">Next 3 Years</h4>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Cumulative Invested
                    </div>
                    <div className="text-xl font-bold">₹26.2L</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">
                      Expected Portfolio Value
                    </div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ₹36L - ₹42L
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">
                      Potential Total Gain
                    </div>
                    <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      ₹10L - ₹16L
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <p className="text-sm text-center text-muted-foreground italic">
                Assuming you maintain current investing pace and returns. Past
                performance doesn't guarantee future results.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Learnings to Apply */}
        <Card>
          <CardHeader>
            <CardTitle>Learnings to Apply</CardTitle>
            <CardDescription>
              Based on your history, here's what to remember
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Keep Doing */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-bold">Keep Doing</h4>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="font-medium text-sm">
                      Buy during corrections
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Worked 3/3 times
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="font-medium text-sm">
                      Focus on quality/health
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      82% success rate
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="font-medium text-sm">Hold long-term</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      8+ month holds = best returns
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="font-medium text-sm">
                      Diversify across sectors
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Reduced risk significantly
                    </div>
                  </div>
                </div>
              </div>

              {/* Adjust */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950/30 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold">Adjust</h4>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="font-medium text-sm">
                      Be more patient on entries
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Avoid buying highs
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="font-medium text-sm">
                      Set clear sell targets
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Prevent early exit regret
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="font-medium text-sm">Keep dry powder</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      For correction opportunities
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="font-medium text-sm">Review quarterly</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Not daily - avoid noise
                    </div>
                  </div>
                </div>
              </div>

              {/* Avoid */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <h4 className="font-bold">Avoid</h4>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <div className="font-medium text-sm">Impulse buying</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Impulse buys underperformed
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <div className="font-medium text-sm">Panic selling</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      You handled corrections well
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <div className="font-medium text-sm">
                      Over-concentration
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      You fixed this - maintain balance
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <div className="font-medium text-sm">
                      Ignoring health scores
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Correlation proven
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Milestones */}
        <Card>
          <CardHeader>
            <CardTitle>Next Milestones to Target</CardTitle>
            <CardDescription>Goals to aim for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Portfolio Milestones */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold">Portfolio Milestones</h4>
                </div>

                <div className="space-y-3">
                  <div className="p-3 border-2 border-blue-200 dark:border-blue-900/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Cross ₹15L</span>
                      <Badge variant="outline" className="text-xs">
                        ~4 months
                      </Badge>
                    </div>
                    <Progress value={83} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      ₹12.5L / ₹15L (83%)
                    </div>
                  </div>

                  <div className="p-3 border-2 border-blue-200 dark:border-blue-900/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Cross ₹20L</span>
                      <Badge variant="outline" className="text-xs">
                        ~10 months
                      </Badge>
                    </div>
                    <Progress value={62} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      ₹12.5L / ₹20L (62%)
                    </div>
                  </div>

                  <div className="p-3 border-2 border-blue-200 dark:border-blue-900/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">20-stock diversity</span>
                      <Badge variant="outline" className="text-xs">
                        Add 5 more
                      </Badge>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      15 / 20 stocks (75%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Milestones */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-bold">Quality Milestones</h4>
                </div>

                <div className="space-y-3">
                  <div className="p-3 border-2 border-yellow-200 dark:border-yellow-900/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Portfolio health 85+</span>
                      <Badge variant="outline" className="text-xs">
                        Current: 82
                      </Badge>
                    </div>
                    <Progress value={96} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      82 / 85 (96%)
                    </div>
                  </div>

                  <div className="p-3 border-2 border-yellow-200 dark:border-yellow-900/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">All stocks health &gt;70</span>
                      <Badge variant="outline" className="text-xs">
                        1 at 68
                      </Badge>
                    </div>
                    <Progress value={93} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      14 / 15 stocks (93%)
                    </div>
                  </div>

                  <div className="p-3 border-2 border-yellow-200 dark:border-yellow-900/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Avg holding 12+ months</span>
                      <Badge variant="outline" className="text-xs">
                        Current: 8.5
                      </Badge>
                    </div>
                    <Progress value={71} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      8.5 / 12 months (71%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Milestones */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h4 className="font-bold">Return Milestones</h4>
                </div>

                <div className="space-y-3">
                  <div className="p-3 border-2 border-green-200 dark:border-green-900/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Beat Nifty 24 months</span>
                      <Badge variant="outline" className="text-xs">
                        22/24 months
                      </Badge>
                    </div>
                    <Progress value={92} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      Outperformed 22 months
                    </div>
                  </div>

                  <div className="p-3 border-2 border-green-200 dark:border-green-900/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Achieve 30% returns</span>
                      <Badge variant="outline" className="text-xs">
                        Current: 24.6%
                      </Badge>
                    </div>
                    <Progress value={82} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      24.6% / 30% target
                    </div>
                  </div>

                  <div className="p-3 border-2 border-green-200 dark:border-green-900/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">₹20K+ dividend/year</span>
                      <Badge variant="outline" className="text-xs">
                        Current: ₹12K
                      </Badge>
                    </div>
                    <Progress value={60} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      ₹12K / ₹20K (60%)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20 rounded-lg border-2 border-green-200 dark:border-green-900/30">
              <p className="text-center font-bold text-lg text-green-700 dark:text-green-400">
                🚀 You've built a strong foundation. Keep the discipline, refine
                the edges.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HistoryTab;