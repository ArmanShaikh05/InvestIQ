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
      <DialogContent className="max-w-xl max-h-[85vh] overflow-hidden flex flex-col gap-3 p-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Select What to Compare
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "stocks" | "sectors")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 bg-muted p-1 h-9 rounded-lg">
            <TabsTrigger
              value="stocks"
              disabled={stocksDisabled}
              className="data-[state=active]:bg-primary/40! text-sm"
            >
              <TrendingUp size={14} className="mr-1" />
              Stocks
            </TabsTrigger>
            <TabsTrigger
              value="sectors"
              disabled={sectorsDisabled}
              className="data-[state=active]:bg-primary/40! text-sm"
            >
              <Layers size={14} className="mr-1" />
              Sectors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stocks" className="space-y-2.5 mt-3">
            {/* Info Message when Stock is already selected */}
            {sectorsDisabled && (
              <div className="p-2 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center gap-1.5 text-xs">
                <TrendingUp size={12} className="text-blue-500 shrink-0" />
                <p className="text-blue-600 dark:text-blue-400">
                  <span className="font-semibold">Stock selected.</span> Compare
                  with another stock only.
                </p>
              </div>
            )}

            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={16}
              />
              <Input
                placeholder="Search stocks or type ticker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>

            {/* Selected Stock Pill */}
            {selectedItem && "symbol" in selectedItem && (
              <div className="flex items-center gap-2 p-2 rounded-md border border-primary/50 bg-primary/10">
                <TrendingUp size={14} className="text-primary shrink-0" />
                <span className="font-semibold flex-1 text-sm truncate">
                  {selectedItem.name}
                </span>
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 h-5 shrink-0"
                >
                  {selectedItem.symbol}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveClick}
                  className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive shrink-0"
                >
                  <X size={14} />
                </Button>
              </div>
            )}

            {/* Suggestions Header */}
            {excludedItem &&
              "symbol" in excludedItem &&
              filteredStocks.length > 0 && (
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  {filteredStocks[0]?.sector === excludedItem.sector
                    ? "Similar Stocks"
                    : "Suggestions"}
                </p>
              )}

            {(!excludedItem || !("symbol" in excludedItem)) &&
              filteredStocks.length > 0 && (
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Available Stocks
                </p>
              )}

            {/* Suggestions List */}
            <div className="overflow-y-auto max-h-[47vh] space-y-1.5 pr-1 custom-scrollbar ">
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
                      className="w-full text-left p-2.5 rounded-md border border-border/50 hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 group bg-card"
                    >
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                          <TrendingUp size={16} className="text-primary" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <h4 className="font-semibold text-sm line-clamp-1 flex-1">
                              {stock.name}
                            </h4>
                            {isFromSameSector && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1 py-0 h-4 shrink-0 border-primary/50 text-primary"
                              >
                                Similar
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap mt-2">
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0 h-4"
                            >
                              {stock.symbol}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">
                              •
                            </span>
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 py-0 h-4 truncate"
                            >
                              {stock.sector}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>

              {filteredStocks.length === 0 && searchTerm && (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="p-3 rounded-full bg-muted/50 w-fit mx-auto mb-3">
                    <Search size={32} className="opacity-30" />
                  </div>
                  <p className="font-medium text-sm">
                    No stocks found matching "{searchTerm}"
                  </p>
                  <p className="text-xs mt-1">
                    Try searching with a different term
                  </p>
                </div>
              )}

              {filteredStocks.length === 0 && !searchTerm && (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="p-3 rounded-full bg-muted/50 w-fit mx-auto mb-3">
                    <TrendingUp size={32} className="opacity-30" />
                  </div>
                  <p className="font-medium text-sm">
                    Start typing to search for stocks
                  </p>
                  <p className="text-xs mt-1">
                    Enter a ticker symbol or company name
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-2.5 mt-3">
            {/* Info Message when Sector is already selected */}
            {stocksDisabled && (
              <div className="p-2 rounded-md bg-purple-500/10 border border-purple-500/30 flex items-center gap-1.5 text-xs">
                <Layers size={12} className="text-purple-500 shrink-0" />
                <p className="text-purple-600 dark:text-purple-400">
                  <span className="font-semibold">Sector selected.</span>{" "}
                  Compare with another sector only.
                </p>
              </div>
            )}

            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={16}
              />
              <Input
                placeholder="Search sectors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>

            {/* Selected Sector Pill */}
            {selectedItem && "id" in selectedItem && (
              <div className="flex items-center gap-2 p-2 rounded-md border border-primary/50 bg-primary/10">
                <Layers size={14} className="text-primary shrink-0" />
                <span className="font-semibold flex-1 text-sm truncate">
                  {selectedItem.name}
                </span>
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 h-5 shrink-0"
                >
                  {selectedItem.stockCount} stocks
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveClick}
                  className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive shrink-0"
                >
                  <X size={14} />
                </Button>
              </div>
            )}

            {/* Sectors Header */}
            {filteredSectors.length > 0 && (
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                Available Sectors
              </p>
            )}

            {/* Sectors List */}
            <div className="overflow-y-auto max-h-[47vh] space-y-1.5 pr-1 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredSectors.map((sector, index) => (
                  <motion.button
                    key={sector.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleSelectSector(sector)}
                    className="w-full text-left p-2.5 rounded-md border border-border/50 hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 group bg-card"
                  >
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                        <Layers size={16} className="text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-0.5">
                          {sector.name}
                        </h4>

                        <div className="flex items-center gap-2 mt-2">
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {sector.description}
                          </p>
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0 h-4"
                          >
                            {sector.stockCount} stocks
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>

              {filteredSectors.length === 0 && searchTerm && (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="p-3 rounded-full bg-muted/50 w-fit mx-auto mb-3">
                    <Search size={32} className="opacity-30" />
                  </div>
                  <p className="font-medium text-sm">
                    No sectors found matching "{searchTerm}"
                  </p>
                  <p className="text-xs mt-1">
                    Try searching with a different term
                  </p>
                </div>
              )}

              {filteredSectors.length === 0 && !searchTerm && (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="p-3 rounded-full bg-muted/50 w-fit mx-auto mb-3">
                    <Layers size={32} className="opacity-30" />
                  </div>
                  <p className="font-medium text-sm">
                    Start typing to search for sectors
                  </p>
                  <p className="text-xs mt-1">
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
