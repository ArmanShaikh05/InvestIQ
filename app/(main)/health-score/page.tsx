"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  assetTypes,
  biases,
  categories,
  sectors,
  stocksData
} from "@/lib/mock-data";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  DollarSign,
  Heart,
  Search,
  TrendingUp,
  Users
} from "lucide-react";
import { useMemo, useState } from "react";

const getScoreBgColor = (score: number) => {
  if (score >= 80)
    return "bg-gradient-to-br from-green-400/20 to-green-600/30 border border-green-500/30 text-green-400";
  if (score >= 60)
    return "bg-gradient-to-br from-yellow-400/20 to-yellow-600/30 border border-yellow-500/30 text-yellow-400";
  return "bg-gradient-to-br from-red-400/20 to-red-600/30 border border-red-500/30 text-red-400";
};

const getMetricClass = (value: number) => {
  if (value >= 80) return "bg-green-900/50 text-green-500 ";
  if (value >= 60) return "bg-yellow-500/20 text-yellow-500 ";
  return "bg-red-700/40 text-red-500 ";
};

const HealthScorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [selectedBiases, setSelectedBiases] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11; // Fixed at 10 rows per page

  const handleRowClick = (ticker: string) => {
    setSelectedRow(selectedRow === ticker ? null : ticker);
  };

  const handleOutsideClick = () => {
    setSelectedRow(null);
  };

  const filteredAndSortedStocks = useMemo(() => {
    let filtered = stocksData.filter((stock) => {
      const matchesSearch =
        stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSector =
        selectedSectors.length === 0 || selectedSectors.includes(stock.sector);

      return matchesSearch && matchesSector;
    });

    // Sort by score (high to low) by default
    filtered.sort((a, b) => b.score - a.score);

    return filtered;
  }, [
    searchTerm,
    selectedSectors,
    selectedAssets,
    selectedBiases,
    selectedCategories,
  ]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedStocks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStocks = filteredAndSortedStocks.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSectors, selectedAssets, selectedBiases, selectedCategories]);

  return (
    <div className="space-y-4 py-6 sm:px-6 px-0 pt-2 relative">
      {/* Click overlay for outside detection */}
      {selectedRow && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={handleOutsideClick}
        />
      )}
      
      {/* Thin Header with Search and Filters */}
      <div className="flex items-center flex-col sm:flex-row gap-4 justify-between relative z-20">
        {/* Search Bar */}
        <div className="relative flex-1 w-full  sm:max-w-md">
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
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {/* Assets Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs bg-background/50"
              >
                Assets{" "}
                {selectedAssets.length > 0 && `(${selectedAssets.length})`}
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
                      setSelectedAssets(
                        selectedAssets.filter((a) => a !== asset)
                      );
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
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs bg-background/50"
              >
                Sectors{" "}
                {selectedSectors.length > 0 && `(${selectedSectors.length})`}
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
                      setSelectedSectors(
                        selectedSectors.filter((s) => s !== sector)
                      );
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
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs bg-background/50"
              >
                Biases{" "}
                {selectedBiases.length > 0 && `(${selectedBiases.length})`}
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
                      setSelectedBiases(
                        selectedBiases.filter((b) => b !== bias)
                      );
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
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs bg-background/50"
              >
                Categories{" "}
                {selectedCategories.length > 0 &&
                  `(${selectedCategories.length})`}
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
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== category)
                      );
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
      <div 
        className="border border-border/30 rounded-sm bg-background/50 backdrop-blur-sm transition-all duration-300 relative z-20 h-[510px] flex flex-col"
        style={{
          overflow: selectedRow ? 'visible' : 'hidden',
          position: 'relative'
        }}
      >
        <div className="flex-1 overflow-auto">
          <Table 
            style={{
              overflow: selectedRow ? 'visible' : 'auto',
              position: 'relative'
            }}
          >
          <TableHeader>
            {/* Main Category Headers */}
            <TableRow className="border-b border-border/30 bg-muted/30 hover:bg-muted/30">
              <TableHead
                rowSpan={2}
                className="text-left p-3 font-semibold text-xs sm:text-sm border-r border-border/20"
              >
                <div className="flex items-center justify-center gap-2">
                  Stock
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
              </TableHead>
              <TableHead
                rowSpan={2}
                className="text-center p-3 font-semibold text-xs sm:text-sm border-r border-border/20"
              >
                <div className="flex items-center justify-center gap-1">
                  <Heart className="w-4 h-4" />
                  Score
                </div>
              </TableHead>
              {/* Fundamentals Header */}
              <TableHead
                colSpan={5}
                className="text-center p-3 font-semibold text-xs sm:text-sm bg-blue-500/10 border-l border-r border-blue-500/20"
              >
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  FUNDAMENTALS
                </div>
              </TableHead>
              {/* Technical Header */}
              <TableHead
                colSpan={2}
                className="text-center p-3 font-semibold text-xs sm:text-sm bg-green-500/10 border-r border-green-500/20"
              >
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  TECHNICAL
                </div>
              </TableHead>
              {/* Institutional Header */}
              <TableHead
                colSpan={2}
                className="text-center p-3 font-semibold text-xs sm:text-sm bg-purple-500/10 border-r border-purple-500/20"
              >
                <div className="flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  INSTITUTIONAL
                </div>
              </TableHead>
            </TableRow>
            <TableRow className="border-b border-border/30 bg-muted/20 hover:bg-muted/20">
              <TableHead className="text-center p-2 text-xs font-medium text-muted-foreground border-r border-border/20">
                Profit
              </TableHead>
              <TableHead className="text-center p-2 text-xs font-medium text-muted-foreground border-r border-border/20">
                Growth
              </TableHead>
              <TableHead className="text-center p-2 text-xs font-medium text-muted-foreground border-r border-border/20">
                Stability
              </TableHead>
              <TableHead className="text-center p-2 text-xs font-medium text-muted-foreground border-r border-border/20">
                Efficiency
              </TableHead>
              <TableHead className="text-center p-2 text-xs font-medium text-muted-foreground border-r border-border/20">
                Valuation
              </TableHead>
              <TableHead className="text-center p-2 text-xs font-medium text-muted-foreground border-r border-border/20">
                Momentum
              </TableHead>
              <TableHead className="text-center p-2 text-xs font-medium text-muted-foreground border-r border-border/20">
                Trend
              </TableHead>
              <TableHead className="text-center p-2 text-xs font-medium text-muted-foreground border-r border-border/20">
                Activity
              </TableHead>
              <TableHead className="text-center p-2 text-xs font-medium text-muted-foreground">
                Sentiment
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="relative">
            {paginatedStocks.map((stock, index) => {
              const isSelected = selectedRow === stock.ticker;
              const isOtherSelected = selectedRow && selectedRow !== stock.ticker;
              
              return (
                <TableRow
                  key={stock.ticker}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRowClick(stock.ticker);
                  }}
                  className={`
                    border-b border-border/30 hover:bg-muted/20 transition-all duration-500 ease-in-out cursor-pointer group
                    ${isSelected ? ' z-30 relative shadow-2xl bg-muted/40 ring-2 ring-primary/20' : ''}
                    ${isOtherSelected ? 'blur-[2px] opacity-40 scale-[0.98]' : ''}
                  `}
                  style={{
                    transformOrigin: 'center',
                  }}
                >
                <TableCell className="px-2 h-full border-r border-border/20">
                  <div className="font-bold text-xs sm:text-sm">{stock.ticker}</div>
                </TableCell>
                <TableCell className="p-0 h-full text-center border-r border-border/20 ">
                  <div
                    className={`${getScoreBgColor(
                      stock.score
                    )} h-full w-full flex items-center justify-center py-2 text-sm font-medium`}
                  >
                    {stock.score}
                  </div>
                </TableCell>
                <TableCell className="p-0 text-center border-r border-border/20">
                  <div
                    className={`${getMetricClass(
                      stock.profitability
                    )} h-full w-full flex items-center justify-center py-2 text-sm font-medium`}
                  >
                    {stock.profitability}
                  </div>
                </TableCell>
                <TableCell className="p-0 text-center border-r border-border/20 h-full">
                  <div
                    className={`${getMetricClass(
                      stock.growth
                    )} h-full w-full flex items-center justify-center py-2 text-sm font-medium`}
                  >
                    {stock.growth}
                  </div>
                </TableCell>
                <TableCell className="p-0 text-center border-r border-border/20">
                  <div
                    className={`${getMetricClass(
                      stock.stability
                    )} h-full w-full flex items-center justify-center py-2 text-sm font-medium`}
                  >
                    {stock.stability}
                  </div>
                </TableCell>
                <TableCell className="p-0 text-center border-r border-border/20">
                  <div
                    className={`${getMetricClass(
                      stock.efficiency
                    )} h-full w-full flex items-center justify-center py-2 text-sm font-medium`}
                  >
                    {stock.efficiency}
                  </div>
                </TableCell>
                <TableCell className="p-0 text-center border-r border-border/20">
                  <div
                    className={`${getMetricClass(
                      stock.valuation
                    )} h-full w-full flex items-center justify-center py-2 text-sm font-medium`}
                  >
                    {stock.valuation}
                  </div>
                </TableCell>
                <TableCell className="p-0 text-center border-r border-border/20">
                  <div
                    className={`${getMetricClass(
                      stock.momentum
                    )} h-full w-full flex items-center justify-center py-2 text-sm font-medium`}
                  >
                    {stock.momentum}
                  </div>
                </TableCell>
                <TableCell className="p-0 text-center border-r border-border/20">
                  <div
                    className={`${getMetricClass(
                      stock.trend
                    )} h-full w-full flex items-center justify-center py-2 text-sm font-medium`}
                  >
                    {stock.trend}
                  </div>
                </TableCell>
                <TableCell className="p-0 text-center border-r border-border/20">
                  <div
                    className={`${getMetricClass(
                      stock.activity
                    )} h-full w-full flex items-center justify-center py-2 text-sm font-medium`}
                  >
                    {stock.activity}
                  </div>
                </TableCell>
                <TableCell className="p-0 text-center">
                  <div
                    className={`${getMetricClass(
                      stock.sentiment
                    )} h-full w-full flex items-center justify-center py-2 text-sm font-medium`}
                  >
                    {stock.sentiment}
                  </div>
                </TableCell>
              </TableRow>
              );
            })}
          </TableBody>
          </Table>
        </div>

        {paginatedStocks.length === 0 && filteredAndSortedStocks.length > 0 && (
          <div className="text-right py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-muted/20 rounded-full">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">No results on this page</h3>
                <p className="text-muted-foreground">
                  Try going to the first page or adjusting your filters
                </p>
              </div>
            </div>
          </div>
        )}

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

      {/* Compact Pagination */}
      {filteredAndSortedStocks.length > 0 && (
        <div className="flex items-center justify-end bg-background/50 backdrop-blur-sm  rounded-sm px-4 py-2">
          {/* Pagination Controls */}
          <div className="flex items-center gap-1">
            {/* First Page */}
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-3 w-3" />
            </Button>

            {/* Previous Page */}
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>

            {/* Page Display */}
            <div className="flex items-center gap-1 mx-4">
              <span className="text-sm font-medium text-foreground">
                {currentPage}
              </span>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm font-medium text-foreground">
                {totalPages}
              </span>
            </div>

            {/* Next Page */}
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>

            {/* Last Page */}
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthScorePage;
