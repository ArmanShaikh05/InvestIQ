"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddStockModal, {
  AddStockData,
} from "@/components/watchlist/AddStockModal";
import StockDetailPanel from "@/components/watchlist/StockDetailPanel";
import { WatchlistStock, watchlistStocks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Heart,
  Plus,
  Search,
  Star,
  StarIcon
} from "lucide-react";
import { useState } from "react";

type SortBy =
  | "rank"
  | "name"
  | "price"
  | "1h"
  | "24h"
  | "7d"
  | "marketcap"
  | "volume";

// Helper function to generate sparkline path
function generateSparklinePath(
  isPositive: boolean,
  withArea: boolean = false,
): string {
  const width = 120;
  const height = 32;
  const points = 24; // 24 data points for 24 hours

  // Generate random but smooth data points
  const data: number[] = [];
  let value = height / 2;

  for (let i = 0; i < points; i++) {
    // Add some randomness but keep it smooth
    const change = (Math.random() - 0.5) * 6;
    value = Math.max(2, Math.min(height - 2, value + change));

    // Trend towards end based on whether positive or negative
    if (i > points * 0.7) {
      value += isPositive ? -0.5 : 0.5;
    }

    data.push(value);
  }

  // Create SVG path
  const stepX = width / (points - 1);
  let path = `M 0 ${data[0]}`;

  for (let i = 1; i < points; i++) {
    const x = i * stepX;
    const y = data[i];

    // Use quadratic curves for smoothness
    const prevX = (i - 1) * stepX;
    const prevY = data[i - 1];
    const cpX = prevX + stepX / 2;
    const cpY = (prevY + y) / 2;

    path += ` Q ${cpX} ${cpY}, ${x} ${y}`;
  }

  // If area fill, close the path at the bottom
  if (withArea) {
    path += ` L ${width} ${height} L 0 ${height} Z`;
  }

  return path;
}

export default function WatchlistPage() {
  const [selectedStock, setSelectedStock] = useState<WatchlistStock | null>(
    null,
  );
  const [sortBy, setSortBy] = useState<SortBy>("rank");
  const [searchQuery, setSearchQuery] = useState("");
  const [watchedStocks, setWatchedStocks] = useState<Set<string>>(
    new Set(watchlistStocks.map((s) => s.ticker)),
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [watchlists, setWatchlists] = useState<string[]>([
    "Main Watchlist",
    "Banking Stocks",
    "IT Sector",
    "High Growth",
  ]);
  const [currentWatchlist, setCurrentWatchlist] = useState("Main Watchlist");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Filter stocks by search query and favorites
  const filteredStocks = watchlistStocks.filter((stock) => {
    const searchMatch =
      searchQuery === "" ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.ticker.toLowerCase().includes(searchQuery.toLowerCase());

    const favoriteMatch = !showFavoritesOnly || watchedStocks.has(stock.ticker);

    return searchMatch && favoriteMatch;
  });

  // Sort stocks
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price":
        return b.currentPrice - a.currentPrice;
      case "24h":
        return b.dayChange - a.dayChange;
      case "7d":
        return b.weekChange - a.weekChange;
      default:
        return 0;
    }
  });

  const handleStockClick = (stock: WatchlistStock) => {
    setSelectedStock(stock);
  };

  const handleCloseDetail = () => {
    setSelectedStock(null);
  };

  const toggleWatchlist = (ticker: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWatchedStocks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ticker)) {
        newSet.delete(ticker);
      } else {
        newSet.add(ticker);
      }
      return newSet;
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) {
      return `₹${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `₹${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `₹${(num / 1000).toFixed(2)}K`;
    }
    return `₹${num.toFixed(2)}`;
  };

  const handleAddStock = (data: AddStockData) => {
    // Handle adding stock to watchlist
    console.log("Adding stock:", data);
    // TODO: Implement actual add stock logic
  };

  const handleCreateWatchlist = (name: string) => {
    if (!watchlists.includes(name)) {
      setWatchlists([...watchlists, name]);
    }
  };

  const isDetailOpen = selectedStock !== null;

  return (
    <div className="h-full w-full flex overflow-hidden bg-background">
      {/* Add Stock Modal */}
      <AddStockModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        watchlists={watchlists}
        onAddStock={handleAddStock}
        onCreateWatchlist={handleCreateWatchlist}
      />

      {/* Stock Detail Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={(open) => !open && handleCloseDetail()}>
        <SheetContent side="right" className="w-[70%] max-w-[70%]! overflow-hidden flex flex-col p-0">
          {selectedStock && (
            <StockDetailPanel stock={selectedStock} onClose={handleCloseDetail} />
          )}
        </SheetContent>
      </Sheet>

      {/* Table Section */}
      <div className="transition-all duration-300 ease-out flex flex-col w-full">
        {/* Minimalistic Header */}
        <div className="border-b sticky top-0 z-10 px-6 py-3 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="w-max flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stocks..."
                  className="pl-9 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Watchlist Dropdown */}
              <Select
                value={currentWatchlist}
                onValueChange={setCurrentWatchlist}
              >
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Select watchlist" />
                </SelectTrigger>
                <SelectContent>
                  {watchlists.map((list) => (
                    <SelectItem key={list} value={list}>
                      {list}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Favorites Button */}
              <Button
                variant={showFavoritesOnly ? "default" : "outline"}
                size="icon"
                className="h-9 w-9"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                title={
                  showFavoritesOnly ? "Show all stocks" : "Show favorites only"
                }
              >
                <StarIcon
                  className={cn("h-4 w-4", showFavoritesOnly && "fill-current")}
                />
              </Button>
            </div>

            {/* Add Stock Button */}
            <Button
              size="sm"
              className="h-9"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Stock
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-2 mt-2 custom-scrollbar">
          <div className="watchlist-table-container bg-card">
            <table className="w-full watchlist-table">
              {/* Sticky Header */}
              <thead className=" bg-card border-b">
                <tr className="text-[11px] font-medium text-muted-foreground/70 tracking-wide">
                  <th className="text-left pl-4 pr-2 py-3 w-10"></th>
                  <th className="text-left px-3 py-3 w-10">#</th>
                  <th className="text-left px-3 py-3 min-w-[200px]">Name</th>
                  <th className="text-right px-3 py-3 w-[120px]">Price</th>
                  <th className="text-right px-3 py-3 w-[90px]">1h %</th>
                  <th className="text-right px-3 py-3 w-[90px]">24h %</th>
                  <th className="text-right px-3 py-3 w-[90px]">7d %</th>
                  <th className="text-right px-3 py-3 w-[120px]">Market Cap</th>
                  <th className="text-right px-3 py-3 w-[120px]">
                    Volume (24h)
                  </th>
                  <th className="text-right px-3 py-3 w-[100px]">ATH</th>
                  <th className="text-right px-3 py-3 w-[100px]">ATL</th>
                  <th className="text-center px-3 py-3 w-[140px]">Last 24h</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {sortedStocks.map((stock, index) => {
                  const isWatched = watchedStocks.has(stock.ticker);
                  const priceChange =
                    stock.currentPrice * (stock.dayChange / 100);

                  // Mock data for missing fields
                  const hourChange = (Math.random() * 4 - 2).toFixed(2);
                  const volume =
                    stock.currentPrice * 1000000 * (50 + Math.random() * 100);
                  const ath = stock.week52High * 1.1;
                  const atl = stock.week52Low * 0.9;

                  return (
                    <tr
                      key={stock.ticker}
                      onClick={() => handleStockClick(stock)}
                      className={cn(
                        "border-b border-border/50 cursor-pointer transition-colors",
                        "hover:bg-muted/50",
                        selectedStock?.ticker === stock.ticker &&
                          "bg-primary/5",
                      )}
                      style={{ height: "54px" }}
                    >
                      {/* Star Icon */}
                      <td className="pl-4 pr-2">
                        <button
                          onClick={(e) => toggleWatchlist(stock.ticker, e)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Star
                            className={cn(
                              "h-3 w-3",
                              isWatched
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-muted-foreground/50",
                            )}
                          />
                        </button>
                      </td>

                      {/* Rank */}
                      <td className="px-3 text-[13px] font-normal text-muted-foreground/50">
                        {index + 1}
                      </td>

                      {/* Name with Icon */}
                      <td className="px-3">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-xs font-semibold text-primary">
                              {stock.ticker.substring(0, 2)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <span className="text-[14px] font-medium">
                              {stock.name}
                            </span>
                            <span className="text-[13px] font-normal text-muted-foreground/60 ml-2">
                              ({stock.ticker})
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-3 text-right text-[14px] font-medium tabular-nums">
                        ₹
                        {stock.currentPrice.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>

                      {/* 1h % */}
                      <td
                        className={cn(
                          "px-3 text-right text-[13px] font-medium tabular-nums",
                          parseFloat(hourChange) >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400",
                        )}
                      >
                        {parseFloat(hourChange) >= 0 ? "+" : ""}
                        {hourChange}%
                      </td>

                      {/* 24h % */}
                      <td
                        className={cn(
                          "px-3 text-right text-[13px] font-medium tabular-nums",
                          stock.dayChange >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400",
                        )}
                      >
                        {stock.dayChange >= 0 ? "+" : ""}
                        {stock.dayChange.toFixed(2)}%
                      </td>

                      {/* 7d % */}
                      <td
                        className={cn(
                          "px-3 text-right text-[13px] font-medium tabular-nums",
                          stock.weekChange >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400",
                        )}
                      >
                        {stock.weekChange >= 0 ? "+" : ""}
                        {stock.weekChange.toFixed(2)}%
                      </td>

                      {/* Market Cap */}
                      <td className="px-3 text-right text-[13px] font-normal text-muted-foreground/80 tabular-nums">
                        {stock.marketCap}
                      </td>

                      {/* Volume */}
                      <td className="px-3 text-right text-[13px] font-normal text-muted-foreground/80 tabular-nums">
                        {formatNumber(volume)}
                      </td>

                      {/* ATH */}
                      <td className="px-3 text-right text-[13px] font-normal text-muted-foreground/80 tabular-nums">
                        ₹
                        {ath.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </td>

                      {/* ATL */}
                      <td className="px-3 text-right text-[13px] font-normal text-muted-foreground/80 tabular-nums">
                        ₹
                        {atl.toLocaleString("en-IN", {
                          maximumFractionDigits: 0,
                        })}
                      </td>

                      {/* Sparkline */}
                      <td className="px-3">
                        <div className="flex items-center justify-center">
                          <svg
                            width="120"
                            height="32"
                            className="overflow-visible"
                          >
                            {/* Generate simple sparkline path */}
                            <path
                              d={generateSparklinePath(stock.dayChange >= 0)}
                              fill="none"
                              stroke={
                                stock.dayChange >= 0
                                  ? "rgb(34, 197, 94)"
                                  : "rgb(239, 68, 68)"
                              }
                              strokeWidth="1.5"
                              vectorEffect="non-scaling-stroke"
                            />
                            {/* Area fill */}
                            <path
                              d={generateSparklinePath(
                                stock.dayChange >= 0,
                                true,
                              )}
                              fill={
                                stock.dayChange >= 0
                                  ? "rgba(34, 197, 94, 0.1)"
                                  : "rgba(239, 68, 68, 0.1)"
                              }
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {sortedStocks.length === 0 && (
            <div className="text-center py-12">
              {showFavoritesOnly ? (
                <>
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground mb-2">
                    No favorite stocks yet
                  </p>
                  <p className="text-sm text-muted-foreground/70 mb-4">
                    Click the star icon next to stocks to add them to favorites
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowFavoritesOnly(false)}
                  >
                    Show All Stocks
                  </Button>
                </>
              ) : searchQuery ? (
                <>
                  <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground mb-2">No stocks found</p>
                  <p className="text-sm text-muted-foreground/70">
                    Try searching with a different term
                  </p>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground mb-4">
                    No stocks in this watchlist
                  </p>
                  <Button size="sm" onClick={() => setShowAddModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Stock
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
