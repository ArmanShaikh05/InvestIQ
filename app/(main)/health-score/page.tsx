"use client";

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign,
  Users,
  Heart,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StockData {
  ticker: string;
  name: string;
  score: number;
  profitability: number;
  growth: number;
  stability: number;
  efficiency: number;
  valuation: number;
  momentum: number;
  trend: number;
  activity: number;
  sentiment: number;
  sector: string;
}

const stocksData: StockData[] = [
  { ticker: 'HDFC', name: 'HDFC Bank', score: 85, profitability: 88, growth: 82, stability: 90, efficiency: 85, valuation: 70, momentum: 75, trend: 80, activity: 85, sentiment: 78, sector: 'Banking' },
  { ticker: 'RELIANCE', name: 'Reliance Industries', score: 83, profitability: 85, growth: 80, stability: 85, efficiency: 82, valuation: 75, momentum: 78, trend: 82, activity: 80, sentiment: 75, sector: 'Energy' },
  { ticker: 'TCS', name: 'Tata Consultancy', score: 88, profitability: 90, growth: 85, stability: 92, efficiency: 88, valuation: 73, momentum: 82, trend: 85, activity: 88, sentiment: 82, sector: 'IT' },
  { ticker: 'INFY', name: 'Infosys', score: 86, profitability: 88, growth: 83, stability: 90, efficiency: 86, valuation: 72, momentum: 80, trend: 83, activity: 86, sentiment: 80, sector: 'IT' },
  { ticker: 'ITC', name: 'ITC Limited', score: 82, profitability: 85, growth: 75, stability: 88, efficiency: 80, valuation: 78, momentum: 72, trend: 75, activity: 80, sentiment: 76, sector: 'FMCG' },
  { ticker: 'WIPRO', name: 'Wipro', score: 79, profitability: 78, growth: 75, stability: 85, efficiency: 80, valuation: 77, momentum: 74, trend: 76, activity: 78, sentiment: 72, sector: 'IT' },
  { ticker: 'SBIN', name: 'State Bank of India', score: 78, profitability: 72, growth: 80, stability: 75, efficiency: 78, valuation: 85, momentum: 76, trend: 78, activity: 82, sentiment: 74, sector: 'Banking' },
  { ticker: 'MARUTI', name: 'Maruti Suzuki', score: 83, profitability: 80, growth: 85, stability: 82, efficiency: 84, valuation: 74, momentum: 82, trend: 84, activity: 80, sentiment: 78, sector: 'Auto' },
  { ticker: 'TATAMOTORS', name: 'Tata Motors', score: 75, profitability: 70, growth: 78, stability: 72, efficiency: 76, valuation: 80, momentum: 76, trend: 78, activity: 74, sentiment: 70, sector: 'Auto' },
  { ticker: 'SUNPHARMA', name: 'Sun Pharmaceutical', score: 77, profitability: 75, growth: 72, stability: 80, efficiency: 78, valuation: 80, momentum: 74, trend: 76, activity: 76, sentiment: 72, sector: 'Pharma' },
  { ticker: 'HCLTECH', name: 'HCL Technologies', score: 84, profitability: 85, growth: 80, stability: 88, efficiency: 84, valuation: 75, momentum: 78, trend: 80, activity: 84, sentiment: 78, sector: 'IT' },
  { ticker: 'BAJFINANCE', name: 'Bajaj Finance', score: 87, profitability: 90, growth: 88, stability: 82, efficiency: 87, valuation: 68, momentum: 85, trend: 88, activity: 90, sentiment: 84, sector: 'NBFC' },
];

const sectors = ['Banking', 'IT', 'Auto', 'Pharma', 'FMCG', 'Energy', 'NBFC'];
const assetTypes = ['Large Cap', 'Mid Cap', 'Small Cap', 'Blue Chip', 'Growth', 'Value'];
const biases = ['Momentum', 'Quality', 'Low Volatility', 'High Dividend', 'ESG', 'Innovation'];
const categories = ['Technology', 'Financial Services', 'Healthcare', 'Consumer Goods', 'Energy', 'Infrastructure'];

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-red-400';
};

const getScoreIcon = (score: number) => {
  if (score >= 80) return '🟢';
  if (score >= 60) return '🟡';
  return '🔴';
};

const getMetricClass = (value: number) => {
  if (value >= 80) return 'bg-green-500/80 text-white';
  if (value >= 60) return 'bg-yellow-500/80 text-white';
  return 'bg-red-500/80 text-white';
};

const HealthScorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedBiases, setSelectedBiases] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredAndSortedStocks = useMemo(() => {
    let filtered = stocksData.filter(stock => {
      const matchesSearch = 
        stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(stock.sector);
      
      return matchesSearch && matchesSector;
    });

    // Sort by score (high to low) by default
    filtered.sort((a, b) => b.score - a.score);

    return filtered;
  }, [searchTerm, selectedSectors, selectedAssets, selectedBiases, selectedCategories]);

  return (
    <div className="space-y-4 p-6 pt-2">
      {/* Thin Header with Search and Filters */}
      <div className="flex items-center gap-4 justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary text-sm"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2">
          {/* Assets Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-background/50">
                Assets {selectedAssets.length > 0 && `(${selectedAssets.length})`}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Asset Types</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {assetTypes.map((asset) => (
                <DropdownMenuCheckboxItem
                  key={asset}
                  checked={selectedAssets.includes(asset)}
                  onCheckedChange={(checked: boolean) => {
                    if (checked) {
                      setSelectedAssets([...selectedAssets, asset]);
                    } else {
                      setSelectedAssets(selectedAssets.filter(a => a !== asset));
                    }
                  }}
                >
                  {asset}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sectors Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-background/50">
                Sectors {selectedSectors.length > 0 && `(${selectedSectors.length})`}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Sectors</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sectors.map((sector) => (
                <DropdownMenuCheckboxItem
                  key={sector}
                  checked={selectedSectors.includes(sector)}
                  onCheckedChange={(checked: boolean) => {
                    if (checked) {
                      setSelectedSectors([...selectedSectors, sector]);
                    } else {
                      setSelectedSectors(selectedSectors.filter(s => s !== sector));
                    }
                  }}
                >
                  {sector}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Biases Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-background/50">
                Biases {selectedBiases.length > 0 && `(${selectedBiases.length})`}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Investment Biases</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {biases.map((bias) => (
                <DropdownMenuCheckboxItem
                  key={bias}
                  checked={selectedBiases.includes(bias)}
                  onCheckedChange={(checked: boolean) => {
                    if (checked) {
                      setSelectedBiases([...selectedBiases, bias]);
                    } else {
                      setSelectedBiases(selectedBiases.filter(b => b !== bias));
                    }
                  }}
                >
                  {bias}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-background/50">
                Categories {selectedCategories.length > 0 && `(${selectedCategories.length})`}
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Business Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked: boolean) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(c => c !== category));
                    }
                  }}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table Section */}
      <div className="border rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-4 font-semibold text-sm">
                  <div className="flex items-center gap-2">
                    Stock
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </th>
                <th className="text-center p-4 font-semibold text-sm">
                  <div className="flex items-center justify-center gap-1">
                    <Heart className="w-4 h-4" />
                    Overall Score
                  </div>
                </th>
                {/* Fundamentals Header */}
                <th colSpan={5} className="text-center p-4 font-semibold text-sm bg-blue-500/10 border-l border-r border-blue-500/20">
                  <div className="flex items-center justify-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    FUNDAMENTALS
                  </div>
                </th>
                {/* Technical Header */}
                <th colSpan={2} className="text-center p-4 font-semibold text-sm bg-green-500/10 border-r border-green-500/20">
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    TECHNICAL
                  </div>
                </th>
                {/* Institutional Header */}
                <th colSpan={2} className="text-center p-4 font-semibold text-sm bg-purple-500/10 border-r border-purple-500/20">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    INSTITUTIONAL
                  </div>
                </th>
              </tr>
              <tr className="border-b bg-muted/20">
                <th></th>
                <th></th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground">Profit</th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground">Growth</th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground">Stability</th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground">Efficiency</th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground">Valuation</th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground">Momentum</th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground">Trend</th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground">Activity</th>
                <th className="text-center p-2 text-xs font-medium text-muted-foreground">Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedStocks.map((stock, index) => (
                <tr 
                  key={stock.ticker} 
                  className="border-b hover:bg-muted/30 transition-colors cursor-pointer group"
                >
                  <td className="p-4">
                    <div>
                      <div className="font-bold text-sm">{stock.ticker}</div>
                      <div className="text-xs text-muted-foreground">{stock.name}</div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className={`text-2xl font-bold ${getScoreColor(stock.score)}`}>
                        {stock.score}
                      </span>
                      <span className="text-lg">{getScoreIcon(stock.score)}</span>
                    </div>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className={`${getMetricClass(stock.profitability)} min-w-[40px] justify-center`}>
                      {stock.profitability}
                    </Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className={`${getMetricClass(stock.growth)} min-w-[40px] justify-center`}>
                      {stock.growth}
                    </Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className={`${getMetricClass(stock.stability)} min-w-[40px] justify-center`}>
                      {stock.stability}
                    </Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className={`${getMetricClass(stock.efficiency)} min-w-[40px] justify-center`}>
                      {stock.efficiency}
                    </Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className={`${getMetricClass(stock.valuation)} min-w-[40px] justify-center`}>
                      {stock.valuation}
                    </Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className={`${getMetricClass(stock.momentum)} min-w-[40px] justify-center`}>
                      {stock.momentum}
                    </Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className={`${getMetricClass(stock.trend)} min-w-[40px] justify-center`}>
                      {stock.trend}
                    </Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className={`${getMetricClass(stock.activity)} min-w-[40px] justify-center`}>
                      {stock.activity}
                    </Badge>
                  </td>
                  <td className="p-2 text-center">
                    <Badge className={`${getMetricClass(stock.sentiment)} min-w-[40px] justify-center`}>
                      {stock.sentiment}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredAndSortedStocks.length === 0 && (
          <div className="text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-muted/20 rounded-full">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">No stocks found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthScorePage;
