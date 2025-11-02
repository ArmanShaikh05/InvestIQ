"use client";

import { ChartAreaIcon, TrendingDown, TrendingUp } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface HoldingData {
  id: number;
  stockName: string;
  symbol: string;
  quantity: number;
  totalValue: string;
  numericValue: number;
  dailyPercentageChange: string;
  change: "positive" | "negative";
  sector: string;
  marketCap: string;
  peRatio: string;
  dividendYield: string;
  avgCost: string;
  currentPrice: string;
  dayRange: string;
  yearHigh: string;
  yearLow: string;
}

const HoldingsData: HoldingData[] = [
  {
    id: 1,
    stockName: "Apple Inc.",
    symbol: "AAPL",
    quantity: 50,
    totalValue: "₹6,00,000",
    numericValue: 600000,
    dailyPercentageChange: "+1.5%",
    change: "positive",
    sector: "Technology",
    marketCap: "₹2.8T",
    peRatio: "29.8",
    dividendYield: "0.48%",
    avgCost: "₹11,800",
    currentPrice: "₹12,000",
    dayRange: "₹11,950 - ₹12,100",
    yearHigh: "₹15,200",
    yearLow: "₹8,900",
  },
  {
    id: 2,
    stockName: "Microsoft Corp.",
    symbol: "MSFT",
    quantity: 30,
    totalValue: "₹4,50,000",
    numericValue: 450000,
    dailyPercentageChange: "+2.1%",
    change: "positive",
    sector: "Technology",
    marketCap: "₹2.5T",
    peRatio: "32.1",
    dividendYield: "0.75%",
    avgCost: "₹14,800",
    currentPrice: "₹15,000",
    dayRange: "₹14,900 - ₹15,200",
    yearHigh: "₹18,500",
    yearLow: "₹12,100",
  },
  {
    id: 3,
    stockName: "Amazon.com Inc.",
    symbol: "AMZN",
    quantity: 20,
    totalValue: "₹3,20,000",
    numericValue: 320000,
    dailyPercentageChange: "-0.5%",
    change: "negative",
    sector: "Consumer Discretionary",
    marketCap: "₹1.6T",
    peRatio: "45.2",
    dividendYield: "0.00%",
    avgCost: "₹15,800",
    currentPrice: "₹16,000",
    dayRange: "₹15,800 - ₹16,100",
    yearHigh: "₹19,200",
    yearLow: "₹13,500",
  },
  {
    id: 4,
    stockName: "Alphabet Inc.",
    symbol: "GOOGL",
    quantity: 15,
    totalValue: "₹2,80,000",
    numericValue: 280000,
    dailyPercentageChange: "+0.8%",
    change: "positive",
    sector: "Communication Services",
    marketCap: "₹1.7T",
    peRatio: "26.5",
    dividendYield: "0.00%",
    avgCost: "₹18,500",
    currentPrice: "₹18,667",
    dayRange: "₹18,400 - ₹18,800",
    yearHigh: "₹22,100",
    yearLow: "₹15,900",
  },
  {
    id: 5,
    stockName: "Tesla Inc.",
    symbol: "TSLA",
    quantity: 10,
    totalValue: "₹1,50,000",
    numericValue: 150000,
    dailyPercentageChange: "+3.2%",
    change: "positive",
    sector: "Consumer Discretionary",
    marketCap: "₹800B",
    peRatio: "67.8",
    dividendYield: "0.00%",
    avgCost: "₹14,500",
    currentPrice: "₹15,000",
    dayRange: "₹14,800 - ₹15,300",
    yearHigh: "₹20,500",
    yearLow: "₹11,200",
  },
];

// Color palette for the pie chart
const chartColors = [
  { primary: "#3B82F6", secondary: "#93C5FD", glow: "#3B82F6" }, // Blue
  { primary: "#10B981", secondary: "#6EE7B7", glow: "#10B981" }, // Green
  { primary: "#F59E0B", secondary: "#FCD34D", glow: "#F59E0B" }, // Amber
  { primary: "#EF4444", secondary: "#FCA5A5", glow: "#EF4444" }, // Red
  { primary: "#8B5CF6", secondary: "#C4B5FD", glow: "#8B5CF6" }, // Purple
];

// Helper function to create SVG path for pie slice
const createPieSlice = (
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  isExpanded: boolean = false
) => {
  const expandedRadius = isExpanded ? radius + 8 : radius;
  const start = polarToCartesian(centerX, centerY, expandedRadius, endAngle);
  const end = polarToCartesian(centerX, centerY, expandedRadius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    centerX,
    centerY,
    "L",
    start.x,
    start.y,
    "A",
    expandedRadius,
    expandedRadius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "Z",
  ].join(" ");

  return d;
};

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

interface PieChartProps {
  data: HoldingData[];
  selectedSlice: number | null;
  onSliceClick: (index: number) => void;
  onSliceHover: (index: number | null) => void;
  hoveredSlice: number | null;
}

const InteractivePieChart: React.FC<PieChartProps> = ({
  data,
  selectedSlice,
  onSliceClick,
  onSliceHover,
  hoveredSlice,
}) => {
  const totalValue = data.reduce((sum, item) => sum + item.numericValue, 0);
  const centerX = 140;
  const centerY = 140;
  const radius = 90;
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Calculate tooltip position based on hovered slice
  useEffect(() => {
    if (hoveredSlice !== null && svgRef.current) {
      const slice = data[hoveredSlice];
      const percentage = (slice.numericValue / totalValue) * 100;
      const angle = (percentage / 100) * 360;

      // Calculate the middle angle of the slice
      let currentAngle = 0;
      for (let i = 0; i < hoveredSlice; i++) {
        const slicePercentage = (data[i].numericValue / totalValue) * 100;
        currentAngle += (slicePercentage / 100) * 360;
      }
      const middleAngle = currentAngle + angle / 2;

      // Convert to radians and calculate position
      const angleInRadians = ((middleAngle - 90) * Math.PI) / 180.0;
      const tooltipRadius = radius + 60; // Position tooltip outside the pie

      const x = centerX + tooltipRadius * Math.cos(angleInRadians);
      const y = centerY + tooltipRadius * Math.sin(angleInRadians);

      setTooltipPosition({ x, y });
    }
  }, [hoveredSlice, data, totalValue, radius]);

  let currentAngle = 0;
  const slices = data.map((item, index) => {
    const percentage = (item.numericValue / totalValue) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    const isSelected = selectedSlice === index;
    const isHovered = hoveredSlice === index;
    const isExpanded = isSelected || isHovered;

    return {
      ...item,
      index,
      percentage,
      startAngle,
      endAngle,
      path: createPieSlice(
        centerX,
        centerY,
        radius,
        startAngle,
        endAngle,
        isExpanded
      ),
      color: chartColors[index % chartColors.length],
      isExpanded,
    };
  });

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
    >
      <motion.svg
        ref={svgRef}
        width="280"
        height="280"
        className="drop-shadow-xl"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      >
        {/* Gradient definitions */}
        <defs>
          {chartColors.map((color, index) => (
            <radialGradient
              key={index}
              id={`gradient-${index}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop offset="0%" stopColor={color.secondary} />
              <stop offset="100%" stopColor={color.primary} />
            </radialGradient>
          ))}
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background circle for glassmorphism effect */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius + 20}
          fill="rgba(255, 255, 255, 0.1)"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1"
          className="backdrop-blur-sm"
        />

        {/* Pie slices */}
        {slices.map((slice) => (
          <motion.path
            key={slice.index}
            d={slice.path}
            fill={`url(#gradient-${slice.index % chartColors.length})`}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2"
            className="cursor-pointer"
            filter={slice.isExpanded ? "url(#glow)" : "none"}
            onClick={() => onSliceClick(slice.index)}
            onMouseEnter={() => onSliceHover(slice.index)}
            onMouseLeave={() => onSliceHover(null)}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{
              opacity: 1,
              pathLength: 1,
              scale: slice.isExpanded ? 1.05 : 1,
              filter: slice.isExpanded
                ? "brightness(1.2) url(#glow)"
                : "brightness(1)",
            }}
            transition={{
              duration: 0.5,
              delay: slice.index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              filter: "brightness(1.15) saturate(1.2)",
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            style={{
              transformOrigin: `${centerX}px ${centerY}px`,
            }}
          />
        ))}

        {/* Center circle for depth */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="25"
          fill="rgba(255, 255, 255, 0.15)"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="2"
          className="backdrop-blur-sm"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
      </motion.svg>

      {/* Floating tooltip */}
      <AnimatePresence>
        {hoveredSlice !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bg-background/95 backdrop-blur-md border border-border/50 rounded-xl p-3 shadow-xl z-20 min-w-[180px] pointer-events-none"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: `translate(-50%, -100%)`,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    chartColors[hoveredSlice % chartColors.length].primary,
                }}
              />
              <div className="text-xs font-semibold">
                {data[hoveredSlice].stockName}
              </div>
            </div>
            <div className="text-sm font-bold text-primary mb-1">
              {data[hoveredSlice].totalValue}
            </div>
            <div className="text-xs text-muted-foreground mb-1">
              {((data[hoveredSlice].numericValue / totalValue) * 100).toFixed(
                1
              )}
              % of portfolio
            </div>
            <div className="text-xs text-muted-foreground">
              {data[hoveredSlice].quantity} shares
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TopHoldings = () => {
  const [selectedSlice, setSelectedSlice] = useState<number | null>(null);
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliceClick = (index: number) => {
    setSelectedSlice(selectedSlice === index ? null : index);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSelectedSlice(null);
      }
    };

    if (selectedSlice !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedSlice]);

  const selectedHolding =
    selectedSlice !== null ? HoldingsData[selectedSlice] : null;

  return (
    <div
      ref={containerRef}
      className="w-full border rounded-xl dark:bg-[linear-gradient(135deg,rgba(47,40,32,0.7)_0%,rgba(244,208,63,0.08)_100%)] bg-[linear-gradient(135deg,rgba(255,255,255,0.9)_0%,rgba(248,250,252,0.8)_100%)] pt-6 pb-10 px-6 md:px-10 flex flex-col items-center shadow-lg shadow-ring/10 hover:shadow-lg hover:shadow-ring/20 transition-all duration-200 ease-in-out backdrop-blur-sm relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-2xl -z-10" />

      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6 md:mb-8">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Top Holdings
        </h1>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChartAreaIcon className="bg-primary/20 size-6 sm:size-8 p-1.5 rounded-lg backdrop-blur-sm border border-primary/30" />
        </motion.div>
      </div>

      <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
        {/* Pie Chart */}
        <div className="flex justify-center lg:flex-shrink-0">
          <InteractivePieChart
            data={HoldingsData}
            selectedSlice={selectedSlice}
            onSliceClick={handleSliceClick}
            onSliceHover={setHoveredSlice}
            hoveredSlice={hoveredSlice}
          />
        </div>

        {/* Holdings Legend */}
        <div className="w-full lg:flex-1">
          <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto hidden-scrollbar">
            {HoldingsData.map((holding, index) => (
              <motion.div
                key={holding.id}
                className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                  selectedSlice === index
                    ? "bg-primary/10 border-primary/30 shadow-md"
                    : "bg-background/50 border-border/50 hover:bg-background/80"
                }`}
                onClick={() => handleSliceClick(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{
                      backgroundColor:
                        chartColors[index % chartColors.length].primary,
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">
                        {holding.stockName}
                      </span>
                      <span className="text-sm font-semibold">
                        {holding.totalValue}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {holding.quantity} shares • {holding.sector}
                      </span>
                      <Badge
                        variant={
                          holding.change === "positive"
                            ? "success"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {holding.change === "positive" ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {holding.dailyPercentageChange}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Information Panel */}
      <AnimatePresence>
        {selectedHolding && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 32 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full border-t border-border/50 pt-6 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-background/50 to-background/30 rounded-2xl p-6 backdrop-blur-sm border border-border/50">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center font-bold text-white text-lg"
                  style={{
                    backgroundColor:
                      chartColors[selectedSlice! % chartColors.length].primary,
                  }}
                >
                  {selectedHolding.symbol.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {selectedHolding.stockName}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedHolding.symbol} • {selectedHolding.sector}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-2xl font-bold">
                    {selectedHolding.currentPrice}
                  </div>
                  <Badge
                    variant={
                      selectedHolding.change === "positive"
                        ? "success"
                        : "destructive"
                    }
                    className="mt-1"
                  >
                    {selectedHolding.change === "positive" ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    {selectedHolding.dailyPercentageChange}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-medium">
                      Holdings
                    </p>
                    <p className="text-lg font-semibold">
                      {selectedHolding.quantity} shares
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-medium">
                      Total Value
                    </p>
                    <p className="text-lg font-semibold">
                      {selectedHolding.totalValue}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-medium">
                      Avg Cost
                    </p>
                    <p className="text-lg font-semibold">
                      {selectedHolding.avgCost}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-medium">
                      Market Cap
                    </p>
                    <p className="text-lg font-semibold">
                      {selectedHolding.marketCap}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-medium">
                      P/E Ratio
                    </p>
                    <p className="text-lg font-semibold">
                      {selectedHolding.peRatio}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-medium">
                      Dividend Yield
                    </p>
                    <p className="text-lg font-semibold">
                      {selectedHolding.dividendYield}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-medium">
                      Day Range
                    </p>
                    <p className="text-sm font-medium">
                      {selectedHolding.dayRange}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground font-medium">
                      52W Range
                    </p>
                    <p className="text-sm font-medium">
                      {selectedHolding.yearLow} - {selectedHolding.yearHigh}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopHoldings;
