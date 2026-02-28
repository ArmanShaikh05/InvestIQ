"use client";

import { Stock, Sector } from "@/lib/indian-stocks-data";
import { Plus, TrendingUp, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SelectionRectangleProps {
  selection: Stock | Sector | null;
  onSelect: () => void;
  onRemove: () => void;
}

export function SelectionRectangle({
  selection,
  onSelect,
  onRemove,
}: SelectionRectangleProps) {
  // Mock data for demonstration - in real app, fetch from API
  const getStockData = (stock: Stock) => {
    const mockPrices: { [key: string]: number } = {
      HDFCBANK: 1820,
      ICICIBANK: 1045,
      TCS: 3620,
      INFY: 1480,
      RELIANCE: 2450,
      SBIN: 625,
    };

    const mockHealth: { [key: string]: number } = {
      HDFCBANK: 85,
      ICICIBANK: 82,
      TCS: 88,
      INFY: 86,
      RELIANCE: 79,
      SBIN: 75,
    };

    return {
      price: mockPrices[stock.symbol] || 1000,
      health: mockHealth[stock.symbol] || 80,
    };
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return "bg-green-500";
    if (health >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getHealthEmoji = (health: number) => {
    if (health >= 80) return "🟢";
    if (health >= 60) return "🟡";
    return "🔴";
  };

  if (!selection) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group cursor-pointer"
        onClick={onSelect}
      >
        <div className="relative w-full lg:w-80 h-80 rounded-2xl border-2 border-dashed border-primary/50 bg-gradient-to-br from-background/40 via-background/60 to-background/40 backdrop-blur-xl overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-xl group-hover:shadow-primary/10">
          {/* Glassmorphism effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-1/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center gap-4 text-muted-foreground/80 group-hover:text-muted-foreground/80 transition-colors duration-300">
            <div className="p-6 rounded-full bg-background/50 border border-primary/50 group-hover:border-primary/80 transition-colors duration-300">
              <Plus size={48} strokeWidth={1.5} />
            </div>
            <p className="text-lg font-medium">Select Stock/Sector</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Check if it's a Stock or Sector
  const isStock = "symbol" in selection;
  const isSector = "id" in selection;

  if (isStock) {
    const stockData = getStockData(selection);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group"
      >
        <div className="relative w-full lg:w-80 h-80 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-1/5" />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center gap-3 p-6">
            {/* Stock Icon */}
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
              <TrendingUp size={28} className="text-primary" />
            </div>

            {/* Stock Symbol */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Symbol</p>
              <h3 className="text-2xl font-bold">
                {selection.symbol}
              </h3>
            </div>

            {/* Stock Name */}
            <p className="text-sm text-center text-muted-foreground line-clamp-2 max-w-full px-2">
              {selection.name}
            </p>

            {/* Stock Details */}
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="flex items-center justify-center gap-4 w-full">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-lg font-semibold text-chart-1">
                    ₹{stockData.price.toLocaleString()}
                  </p>
                </div>
                <div className="h-8 w-px bg-border"></div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Health</p>
                  <p className="text-lg font-semibold">
                    {stockData.health} {getHealthEmoji(stockData.health)}
                  </p>
                </div>
              </div>

              <Badge variant="secondary" className="mt-1">
                {selection.sector}
              </Badge>
            </div>

            {/* Change Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onSelect}
              className="mt-1 hover:bg-primary/10 hover:border-primary/50"
            >
              Change
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Render Sector
  if (isSector) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="group"
      >
        <div className="relative w-full lg:w-80 h-80 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-1/5" />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center gap-4 p-6">
            {/* Sector Icon */}
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
              <Layers size={28} className="text-primary" />
            </div>

            {/* Sector Name */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Sector</p>
              <h3 className="text-2xl font-bold">
                {selection.name}
              </h3>
            </div>

            {/* Sector Description */}
            <p className="text-sm text-center text-muted-foreground line-clamp-2 max-w-full px-2">
              {selection.description}
            </p>

            {/* Sector Details */}
            <div className="flex flex-col items-center gap-2 w-full">
              <Badge variant="secondary" className="mt-1">
                {selection.stockCount} stocks
              </Badge>
            </div>

            {/* Change Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onSelect}
              className="mt-2 hover:bg-primary/10 hover:border-primary/50"
            >
              Change
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
