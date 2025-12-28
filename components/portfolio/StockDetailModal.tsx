"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Heart,
  Plus,
  Target,
  Bell,
  BarChart3,
  X,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  investedAmount: number;
  gainLoss: number;
  gainLossPercent: number;
  dayChange: number;
  dayChangePercent: number;
  healthScore: number;
  sector: string;
  marketCap: "Large" | "Mid" | "Small";
  weight: number;
}

interface StockDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  holding: Holding | null;
}

const StockDetailModal: React.FC<StockDetailModalProps> = ({
  isOpen,
  onClose,
  holding,
}) => {
  if (!holding) return null;

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 dark:bg-green-950/20";
    if (score >= 60) return "text-blue-600 bg-blue-50 dark:bg-blue-950/20";
    if (score >= 40)
      return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20";
    return "text-red-600 bg-red-50 dark:bg-red-950/20";
  };

  const getHealthLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Poor";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto hidden-scrollbar">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-bold">
                {holding.symbol}
              </DialogTitle>
              <DialogDescription className="text-sm">
                {holding.name}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Top Row: Current Price & P&L */}
          <div className="grid grid-cols-2 gap-4">
            {/* Current Price Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-4 pb-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Current Price</p>
                  <p className="text-3xl font-bold">
                    ₹{holding.currentPrice.toFixed(2)}
                  </p>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      holding.dayChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {holding.dayChange >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                      {holding.dayChange >= 0 ? "+" : ""}₹
                      {holding.dayChange.toFixed(2)} (
                      {holding.dayChangePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* P&L Card */}
            <Card
              className={`${
                holding.gainLoss >= 0
                  ? "border-green-500/30 bg-green-50/50 dark:bg-green-950/10"
                  : "border-red-500/30 bg-red-50/50 dark:bg-red-950/10"
              }`}
            >
              <CardContent className="pt-4 pb-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Total P&L</p>
                  <p
                    className={`text-3xl font-bold ${
                      holding.gainLoss >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {holding.gainLoss >= 0 ? "+" : ""}₹
                    {holding.gainLoss.toLocaleString()}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      holding.gainLossPercent >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {holding.gainLossPercent >= 0 ? "+" : ""}
                    {holding.gainLossPercent.toFixed(2)}% Return
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Row: Position Summary */}
          <div className="grid grid-cols-4 gap-3">
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
              <CardContent className="pt-3 pb-3">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Investment
                </p>
                <p className="text-lg font-bold">
                  ₹{holding.investedAmount.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-cyan-950/30 dark:to-cyan-900/20 border-cyan-200 dark:border-cyan-800">
              <CardContent className="pt-3 pb-3">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Current Value
                </p>
                <p className="text-lg font-bold">
                  ₹{holding.value.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/20 border-indigo-200 dark:border-indigo-800">
              <CardContent className="pt-3 pb-3">
                <p className="text-xs text-muted-foreground mb-0.5">Quantity</p>
                <p className="text-lg font-bold">{holding.quantity}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800">
              <CardContent className="pt-3 pb-3">
                <p className="text-xs text-muted-foreground mb-0.5">
                  Avg Price
                </p>
                <p className="text-lg font-bold">
                  ₹{holding.avgPrice.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row: Details & Health Side by Side */}
          <div className="grid grid-cols-3 gap-4">
            {/* Position Details */}
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-950/30 dark:to-slate-900/20 border-slate-200 dark:border-slate-800 col-span-2">
              <CardContent className="pt-3 pb-3">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Position Details
                </h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">
                      Portfolio Weight
                    </span>
                    <span className="font-medium">{holding.weight}%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">Sector</span>
                    <span className="font-medium">{holding.sector}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">Market Cap</span>
                    <span className="font-medium">{holding.marketCap} Cap</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/30">
                    <span className="text-muted-foreground">Total Shares</span>
                    <span className="font-medium">
                      {holding.quantity} shares
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Score */}
            <Card className="bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/20 border-pink-200 dark:border-pink-800">
              <CardContent className="pt-3 pb-3">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-red-500" />
                  Health Score
                </h3>
                <div className="flex flex-col items-center justify-center">
                  <div className="relative">
                    <svg className="w-20 h-20" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={
                          holding.healthScore >= 70
                            ? "#10b981"
                            : holding.healthScore >= 40
                            ? "#eab308"
                            : "#ef4444"
                        }
                        strokeWidth="8"
                        strokeDasharray={`${holding.healthScore * 2.51} 251`}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold">
                        {holding.healthScore}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {getHealthLabel(holding.healthScore)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <BarChart3 className="w-3.5 h-3.5 mr-1.5" />
              Analysis
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Bell className="w-3.5 h-3.5 mr-1.5" />
              Alert
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Buy More
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Target className="w-3.5 h-3.5 mr-1.5" />
              Target
            </Button>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              size="sm"
              className="flex-1 h-9 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              onClick={() => {
                console.log("Sell", holding.symbol);
                onClose();
              }}
            >
              <TrendingDown className="w-3.5 h-3.5 mr-1.5" />
              Sell
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StockDetailModal;
