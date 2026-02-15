"use client";

import { useState, useEffect } from "react";
import {
  Stock,
  indianStocks,
  Sector,
  indianSectors,
} from "@/lib/indian-stocks-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, TrendingUp, X, BarChart3, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type SelectionItem = Stock | Sector;
type SelectionType = "stock" | "sector" | null;

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: Stock | Sector, type: "stock" | "sector") => void;
  selectedItem: Stock | Sector | null;
  excludedItem: Stock | Sector | null;
  selectionType: SelectionType;
  onRemove: () => void;
}

export function SelectionModal({
  isOpen,
  onClose,
  onSelect,
  selectedItem,
  excludedItem,
  selectionType,
  onRemove,
}: SelectionModalProps) {
  const [activeTab, setActiveTab] = useState<"stocks" | "sectors">("stocks");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [filteredSectors, setFilteredSectors] = useState<Sector[]>([]);

  // Mock data for demonstration
  const getStockData = (stock: Stock) => {
    const mockPrices: { [key: string]: number } = {
      HDFCBANK: 1820,
      ICICIBANK: 1045,
      TCS: 3620,
      INFY: 1480,
      RELIANCE: 2450,
      SBIN: 625,
      KOTAKBANK: 1755,
      AXISBANK: 985,
      MARUTI: 10850,
      TATAMOTORS: 895,
      HINDUNILVR: 2380,
      ITC: 420,
      SUNPHARMA: 1585,
      BHARTIARTL: 1245,
      TATASTEEL: 145,
      ULTRACEMCO: 9850,
      LT: 3620,
      TITAN: 3480,
      WIPRO: 425,
      HCLTECH: 1680,
    };

    const mockHealth: { [key: string]: number } = {
      HDFCBANK: 85,
      ICICIBANK: 82,
      TCS: 88,
      INFY: 86,
      RELIANCE: 79,
      SBIN: 75,
      KOTAKBANK: 84,
      AXISBANK: 78,
      MARUTI: 81,
      TATAMOTORS: 73,
      HINDUNILVR: 89,
      ITC: 87,
      SUNPHARMA: 83,
      BHARTIARTL: 80,
      TATASTEEL: 72,
      ULTRACEMCO: 85,
      LT: 82,
      TITAN: 88,
      WIPRO: 79,
      HCLTECH: 84,
    };

    return {
      price: mockPrices[stock.symbol] || 1000,
      health: mockHealth[stock.symbol] || 80,
    };
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-green-500";
    if (health >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      // Reset to stocks tab if no selection type, or match the selection type
      if (!selectionType) {
        setActiveTab("stocks");
      }
      return;
    }

    // Auto-switch tabs based on selection type
    if (selectionType === "stock" && activeTab === "sectors") {
      setActiveTab("stocks");
    } else if (selectionType === "sector" && activeTab === "stocks") {
      setActiveTab("sectors");
    }

    // Filter stocks
    let stocks = indianStocks;
    if (excludedItem && "symbol" in excludedItem) {
      stocks = stocks.filter((s) => s.symbol !== excludedItem.symbol);
    }
    if (searchTerm.trim()) {
      stocks = stocks.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.sector.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    if (excludedItem && "symbol" in excludedItem) {
      stocks.sort((a, b) => {
        const aSameSector = a.sector === excludedItem.sector ? 1 : 0;
        const bSameSector = b.sector === excludedItem.sector ? 1 : 0;
        return bSameSector - aSameSector;
      });
    }
    setFilteredStocks(stocks.slice(0, 20));

    // Filter sectors
    let sectors = indianSectors;
    if (excludedItem && "id" in excludedItem) {
      sectors = sectors.filter((s) => s.id !== excludedItem.id);
    }
    if (searchTerm.trim()) {
      sectors = sectors.filter(
        (sector) =>
          sector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sector.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredSectors(sectors);
  }, [searchTerm, excludedItem, isOpen, selectionType, activeTab]);

  const handleSelectStock = (stock: Stock) => {
    onSelect(stock, "stock");
    setSearchTerm("");
  };

  const handleSelectSector = (sector: Sector) => {
    onSelect(sector, "sector");
    setSearchTerm("");
  };

  const handleRemoveClick = () => {
    onRemove();
    setSearchTerm("");
  };

  // Determine if tabs should be disabled based on selection type
  const stocksDisabled = selectionType === "sector";
  const sectorsDisabled = selectionType === "stock";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Select What to Compare
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "stocks" | "sectors")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 bg-muted p-1 h-11 rounded-lg">
            <TabsTrigger value="stocks" disabled={stocksDisabled} className="data-[state=active]:bg-primary/40!">
              <TrendingUp size={16} className="mr-1.5" />
              Stocks
            </TabsTrigger>
            <TabsTrigger value="sectors" disabled={sectorsDisabled} className="data-[state=active]:bg-primary/40!">
              <Layers size={16} className="mr-1.5" />
              Sectors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stocks" className="space-y-4 mt-4">
            {/* Info Message when Stock is already selected */}
            {sectorsDisabled && (
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-start gap-2">
                <div className="p-1 rounded-full bg-blue-500/20 mt-0.5">
                  <TrendingUp size={14} className="text-blue-500" />
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  <span className="font-semibold">Stock selected.</span> You can
                  only compare with another stock.
                </p>
              </div>
            )}

            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                placeholder="Search stocks or type ticker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Selected Stock Pill */}
            {selectedItem && "symbol" in selectedItem && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Selected:
                </p>
                <div className="flex items-center gap-2 p-3 rounded-lg border-2 border-primary/50 bg-primary/10">
                  <TrendingUp size={18} className="text-primary" />
                  <span className="font-semibold flex-1">
                    {selectedItem.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {selectedItem.symbol}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveClick}
                    className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Suggestions Header */}
            {excludedItem &&
              "symbol" in excludedItem &&
              filteredStocks.length > 0 && (
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {filteredStocks[0]?.sector === excludedItem.sector
                    ? "Compare with similar stocks:"
                    : "Suggestions:"}
                </p>
              )}

            {(!excludedItem || !("symbol" in excludedItem)) &&
              filteredStocks.length > 0 && (
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Popular Stocks:
                </p>
              )}

            {/* Suggestions List */}
            <div className="overflow-y-auto max-h-[400px] space-y-2 pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredStocks.map((stock, index) => {
                  const stockData = getStockData(stock);
                  const isFromSameSector =
                    excludedItem &&
                    "symbol" in excludedItem &&
                    stock.sector === excludedItem.sector;

                  return (
                    <motion.button
                      key={stock.symbol}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleSelectStock(stock)}
                      className="w-full text-left p-4 rounded-lg border-2 border-border/50 hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 group bg-card"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <TrendingUp size={20} className="text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-base line-clamp-1">
                                  {stock.name}
                                </h4>
                                {isFromSameSector && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs shrink-0 border-primary/50 text-primary"
                                  >
                                    Similar
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <Badge variant="secondary" className="text-xs">
                                  {stock.symbol}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  •
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {stock.sector}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 mt-2 text-sm">
                                <span className="font-medium text-chart-1">
                                  ₹{stockData.price.toLocaleString()}
                                </span>
                                <span className="text-muted-foreground">•</span>
                                <span className="font-medium">
                                  Health: {stockData.health}{" "}
                                  <span
                                    className={getHealthColor(stockData.health)}
                                  >
                                    {stockData.health >= 80
                                      ? "🟢"
                                      : stockData.health >= 60
                                        ? "🟡"
                                        : "🔴"}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>

              {filteredStocks.length === 0 && searchTerm && (
                <div className="text-center py-16 text-muted-foreground">
                  <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto mb-4">
                    <Search size={48} className="opacity-30" />
                  </div>
                  <p className="font-medium">
                    No stocks found matching "{searchTerm}"
                  </p>
                  <p className="text-sm mt-1">
                    Try searching with a different term
                  </p>
                </div>
              )}

              {filteredStocks.length === 0 && !searchTerm && (
                <div className="text-center py-16 text-muted-foreground">
                  <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto mb-4">
                    <TrendingUp size={48} className="opacity-30" />
                  </div>
                  <p className="font-medium">
                    Start typing to search for stocks
                  </p>
                  <p className="text-sm mt-1">
                    Enter a ticker symbol or company name
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-4 mt-4">
            {/* Info Message when Sector is already selected */}
            {stocksDisabled && (
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-start gap-2">
                <div className="p-1 rounded-full bg-purple-500/20 mt-0.5">
                  <Layers size={14} className="text-purple-500" />
                </div>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  <span className="font-semibold">Sector selected.</span> You
                  can only compare with another sector.
                </p>
              </div>
            )}

            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                placeholder="Search sectors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Selected Sector Pill */}
            {selectedItem && "id" in selectedItem && (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Selected:
                </p>
                <div className="flex items-center gap-2 p-3 rounded-lg border-2 border-primary/50 bg-primary/10">
                  <Layers size={18} className="text-primary" />
                  <span className="font-semibold flex-1">
                    {selectedItem.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {selectedItem.stockCount} stocks
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveClick}
                    className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>
            )}

            {/* Sectors Header */}
            {filteredSectors.length > 0 && (
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Available Sectors:
              </p>
            )}

            {/* Sectors List */}
            <div className="overflow-y-auto max-h-[400px] space-y-2 pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredSectors.map((sector, index) => (
                  <motion.button
                    key={sector.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleSelectSector(sector)}
                    className="w-full text-left p-4 rounded-lg border-2 border-border/50 hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 group bg-card"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Layers size={20} className="text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-base">
                              {sector.name}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {sector.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs">
                                {sector.stockCount} stocks
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>

              {filteredSectors.length === 0 && searchTerm && (
                <div className="text-center py-16 text-muted-foreground">
                  <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto mb-4">
                    <Search size={48} className="opacity-30" />
                  </div>
                  <p className="font-medium">
                    No sectors found matching "{searchTerm}"
                  </p>
                  <p className="text-sm mt-1">
                    Try searching with a different term
                  </p>
                </div>
              )}

              {filteredSectors.length === 0 && !searchTerm && (
                <div className="text-center py-16 text-muted-foreground">
                  <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto mb-4">
                    <Layers size={48} className="opacity-30" />
                  </div>
                  <p className="font-medium">
                    Start typing to search for sectors
                  </p>
                  <p className="text-sm mt-1">
                    Enter a sector name or description
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
