"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, X, Target, FileText, Bell, TrendingUp, Folder } from "lucide-react";
import { indianStocks, Stock } from "@/lib/indian-stocks-data";

interface AddStockModalProps {
  open: boolean;
  onClose: () => void;
  watchlists: string[];
  onAddStock: (data: AddStockData) => void;
  onCreateWatchlist: (name: string) => void;
}

export interface AddStockData {
  ticker: string;
  name: string;
  watchlist: string;
  targetPrice?: number;
  notes?: string;
  setPriceAlert?: boolean;
  priceAlertValue?: number;
}

export default function AddStockModal({ 
  open, 
  onClose, 
  watchlists,
  onAddStock,
  onCreateWatchlist
}: AddStockModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState<{ ticker: string; name: string } | null>(null);
  const [selectedWatchlist, setSelectedWatchlist] = useState(watchlists[0] || "");
  const [targetPrice, setTargetPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [setPriceAlert, setSetPriceAlert] = useState(false);
  const [priceAlertValue, setPriceAlertValue] = useState("");
  const [showNewWatchlistInput, setShowNewWatchlistInput] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [showStockSuggestions, setShowStockSuggestions] = useState(false);

  // Filter stocks based on search
  const filteredStocks = indianStocks
    .filter((stock: Stock) => 
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 8);

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock({ ticker: stock.symbol, name: stock.name });
    setSearchQuery(`${stock.name} (${stock.symbol})`);
    setShowStockSuggestions(false);
  };

  const handleCreateWatchlist = () => {
    if (newWatchlistName.trim()) {
      onCreateWatchlist(newWatchlistName.trim());
      setSelectedWatchlist(newWatchlistName.trim());
      setNewWatchlistName("");
      setShowNewWatchlistInput(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedStock || !selectedWatchlist) return;

    const data: AddStockData = {
      ticker: selectedStock.ticker,
      name: selectedStock.name,
      watchlist: selectedWatchlist,
      targetPrice: targetPrice ? parseFloat(targetPrice) : undefined,
      notes: notes || undefined,
      setPriceAlert,
      priceAlertValue: priceAlertValue ? parseFloat(priceAlertValue) : undefined,
    };

    onAddStock(data);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedStock(null);
    setTargetPrice("");
    setNotes("");
    setSetPriceAlert(false);
    setPriceAlertValue("");
    setNewWatchlistName("");
    setShowNewWatchlistInput(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add Stock to Watchlist</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Search for a stock and configure your tracking preferences
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 py-4 pr-4">
          {/* Stock Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              Search Stock
            </label>
            <div className="relative">
              <Input
                placeholder="Search by name or symbol (e.g., HDFCBANK, Infosys)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowStockSuggestions(true);
                  if (!e.target.value) setSelectedStock(null);
                }}
                onFocus={() => setShowStockSuggestions(true)}
                className="pr-10"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedStock(null);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              {/* Stock Suggestions Dropdown */}
              {showStockSuggestions && searchQuery && filteredStocks.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-popover border rounded-lg shadow-lg max-h-64 overflow-auto">
                  {filteredStocks.map((stock: Stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => handleStockSelect(stock)}
                      className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center justify-between border-b last:border-b-0"
                    >
                      <div>
                        <div className="font-medium">{stock.name}</div>
                        <div className="text-xs text-muted-foreground">{stock.symbol} • {stock.sector}</div>
                      </div>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {stock.exchange}
                      </Badge>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {selectedStock && (
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <TrendingUp className="h-4 w-4" />
                Selected: {selectedStock.name} ({selectedStock.ticker})
              </div>
            )}
          </div>

          {/* Watchlist Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Folder className="h-4 w-4 text-primary" />
              Select Watchlist
            </label>
            
            {!showNewWatchlistInput ? (
              <div className="space-y-2">
                <select
                  value={selectedWatchlist}
                  onChange={(e) => setSelectedWatchlist(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                >
                  {watchlists.length === 0 && (
                    <option value="">No watchlists available</option>
                  )}
                  {watchlists.map((list) => (
                    <option key={list} value={list}>
                      {list}
                    </option>
                  ))}
                </select>
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewWatchlistInput(true)}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Watchlist
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter watchlist name"
                    value={newWatchlistName}
                    onChange={(e) => setNewWatchlistName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCreateWatchlist();
                      if (e.key === 'Escape') setShowNewWatchlistInput(false);
                    }}
                    autoFocus
                  />
                  <Button
                    type="button"
                    onClick={handleCreateWatchlist}
                    disabled={!newWatchlistName.trim()}
                  >
                    Create
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowNewWatchlistInput(false);
                      setNewWatchlistName("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Optional Fields */}
          <div className="border-t pt-4 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Optional Settings
            </h3>

            {/* Target Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-500" />
                Target Price (₹)
              </label>
              <Input
                type="number"
                placeholder="e.g., 1750"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                min="0"
                step="0.01"
              />
              <p className="text-xs text-muted-foreground">
                Set a target price to track when the stock reaches your goal
              </p>
            </div>

            {/* Price Alert */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Bell className="h-4 w-4 text-orange-500" />
                  Price Alert
                </label>
                <button
                  type="button"
                  onClick={() => setSetPriceAlert(!setPriceAlert)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                    setPriceAlert ? "bg-primary" : "bg-muted"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      setPriceAlert ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
              
              {setPriceAlert && (
                <Input
                  type="number"
                  placeholder="Alert price (₹)"
                  value={priceAlertValue}
                  onChange={(e) => setPriceAlertValue(e.target.value)}
                  min="0"
                  step="0.01"
                />
              )}
              <p className="text-xs text-muted-foreground">
                Get notified when stock reaches a specific price
              </p>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-500" />
                Notes
              </label>
              <textarea
                placeholder="Add your research notes, entry strategy, or reminders..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg bg-background resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Personal notes visible only to you
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t pt-4 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
          >
            Cancel
          </Button>
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedStock || !selectedWatchlist}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Watchlist
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
