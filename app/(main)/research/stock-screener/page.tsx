"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, TrendingDown, Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

// Sample recommended stocks
const recommendedStocks = [
  { ticker: "AAPL", name: "Apple Inc.", trend: "up" },
  { ticker: "GOOGL", name: "Alphabet Inc.", trend: "up" },
  { ticker: "MSFT", name: "Microsoft", trend: "up" },
  { ticker: "TSLA", name: "Tesla Inc.", trend: "down" },
  { ticker: "NVDA", name: "NVIDIA Corp.", trend: "up" },
  { ticker: "AMZN", name: "Amazon.com", trend: "up" },
  { ticker: "META", name: "Meta Platforms", trend: "down" },
  { ticker: "NFLX", name: "Netflix Inc.", trend: "up" },
];

const StockScreenerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState("");

  const handleStockClick = (ticker: string) => {
    setSearchTerm(ticker);
    setSelectedStock(ticker);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mx-auto text-center space-y-12"
      >
        {/* Title and Description */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            Stock Analysis
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Search and analyze any stock to get comprehensive insights, health scores, and investment recommendations
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative w-full max-w-2xl mx-auto"
        >
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
            <Input
              type="text"
              placeholder="Search stocks by ticker or company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-16 pl-16 pr-6 text-lg rounded-2xl border-2 border-border bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 placeholder:text-muted-foreground/50 shadow-lg"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </motion.div>

        {/* Recommended Stocks */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Recommended Stocks</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
            {recommendedStocks.map((stock, index) => (
              <motion.button
                key={stock.ticker}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.5 + (index * 0.05),
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                onClick={() => handleStockClick(stock.ticker)}
                className={`
                  group relative px-4 py-2 rounded-full border transition-all duration-300 hover:scale-105 hover:shadow-lg
                  ${selectedStock === stock.ticker 
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' 
                    : 'bg-background/60 border-border/50 hover:border-primary/50 hover:bg-background/80'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{stock.ticker}</span>
                  <div className="flex items-center gap-1">
                    {stock.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                  </div>
                </div>
                <span className="text-xs opacity-70 hidden group-hover:block absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-background border border-border rounded px-2 py-1 shadow-lg">
                  {stock.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Search Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button 
            size="lg"
            className="px-8 py-6 text-lg rounded-2xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            disabled={!searchTerm.trim()}
          >
            <Search className="w-5 h-5 mr-2" />
            Analyze Stock
          </Button>
        </motion.div>

        {/* Subtle background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute top-3/4 left-3/4 w-24 h-24 bg-green-500/5 rounded-full blur-2xl" />
        </div>
      </motion.div>
    </div>
  );
};

export default StockScreenerPage;