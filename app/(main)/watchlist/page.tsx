"use client";

import { WatchlistStock, watchlistCategories, watchlistStocks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft, 
  ArrowUpDown, 
  Filter, 
  LayoutGrid, 
  Plus, 
  Search, 
  Settings2,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import StockListCard from "@/components/watchlist/StockListCard";
import StockDetailPanel from "@/components/watchlist/StockDetailPanel";

type ViewMode = 'compact' | 'detailed' | 'health-focus';
type SortBy = 'health' | 'price-change' | 'name' | 'date-added';

export default function WatchlistPage() {
  const [selectedStock, setSelectedStock] = useState<WatchlistStock | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('detailed');
  const [sortBy, setSortBy] = useState<SortBy>('health');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter stocks by category
  const filteredStocks = watchlistStocks.filter(stock => {
    // Filter by category
    const categoryMatch = activeCategory === 'all' || 
      stock.lists.some(list => 
        list.toLowerCase().replace(/\s+/g, '-') === activeCategory
      );
    
    // Filter by search query
    const searchMatch = searchQuery === '' || 
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  // Sort stocks
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    switch (sortBy) {
      case 'health':
        return b.healthScore - a.healthScore;
      case 'price-change':
        return b.dayChange - a.dayChange;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date-added':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      default:
        return 0;
    }
  });

  // Count triggered alerts
  const triggeredAlertsCount = watchlistStocks.reduce((count, stock) => {
    return count + stock.alerts.filter(alert => alert.triggered).length;
  }, 0);

  const handleStockClick = (stock: WatchlistStock) => {
    setSelectedStock(stock);
  };

  const handleCloseDetail = () => {
    setSelectedStock(null);
  };

  const isDetailOpen = selectedStock !== null;

  return (
    <div className="h-full w-full overflow-hidden bg-background">
      {/* Alert Bar */}
      {triggeredAlertsCount > 0 && (
        <div className="bg-orange-500/10 border-b border-orange-500/20 px-6 py-3">
          <p className="text-sm text-orange-600 dark:text-orange-400">
            🔔 {triggeredAlertsCount} alert{triggeredAlertsCount > 1 ? 's' : ''} triggered: 
            <span className="ml-2 font-medium">
              {watchlistStocks
                .flatMap(stock => 
                  stock.alerts
                    .filter(alert => alert.triggered)
                    .map(alert => `${stock.name} ${alert.type === 'price' ? `reached ₹${alert.value}` : 'health improved'}`)
                )
                .slice(0, 3)
                .join(' | ')}
            </span>
          </p>
        </div>
      )}

      <div className="flex h-full">
        {/* Stock List Section */}
        <div 
          className={cn(
            "transition-all duration-300 ease-out flex flex-col border-r",
            isDetailOpen ? "w-[30%]" : "w-full"
          )}
        >
          {/* Header */}
          <div className="border-b bg-card">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold">Your Watchlist</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Watching {sortedStocks.length} stock{sortedStocks.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Stock
                  </Button>
                  {!isDetailOpen && (
                    <>
                      <Button size="sm" variant="outline">
                        <LayoutGrid className="h-4 w-4 mr-2" />
                        Manage Lists
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Search bar - always visible */}
              {isDetailOpen && (
                <div className="mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCloseDetail}
                    className="mb-3"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Full List
                  </Button>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search stocks..." 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Category Tabs */}
            {!isDetailOpen && (
              <div className="px-6 pb-4">
                <div className="flex gap-2 overflow-x-auto pb-2 hidden-scrollbar">
                  {watchlistCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                        activeCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      )}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* View Controls */}
            {!isDetailOpen && (
              <div className="px-6 pb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    className="text-sm border rounded-md px-2 py-1 bg-background"
                  >
                    <option value="health">Health Score ↓</option>
                    <option value="price-change">Price Change</option>
                    <option value="name">Name</option>
                    <option value="date-added">Date Added</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">View:</span>
                  <div className="flex gap-1 border rounded-md p-1">
                    {(['compact', 'detailed', 'health-focus'] as ViewMode[]).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setViewMode(mode)}
                        className={cn(
                          "px-3 py-1 rounded text-xs font-medium transition-colors",
                          viewMode === mode
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        )}
                      >
                        {mode === 'compact' ? 'Compact' : mode === 'detailed' ? 'Detailed' : 'Health'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stock List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-4 space-y-3">
              {sortedStocks.length > 0 ? (
                sortedStocks.map(stock => (
                  <StockListCard
                    key={stock.ticker}
                    stock={stock}
                    viewMode={isDetailOpen ? 'compact' : viewMode}
                    isSelected={selectedStock?.ticker === stock.ticker}
                    onClick={() => handleStockClick(stock)}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No stocks found</p>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Stock
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {isDetailOpen && selectedStock && (
          <div 
            className="w-[70%] transition-all duration-300 ease-out animate-in slide-in-from-right"
          >
            <StockDetailPanel 
              stock={selectedStock} 
              onClose={handleCloseDetail}
            />
          </div>
        )}
      </div>
    </div>
  );
}
