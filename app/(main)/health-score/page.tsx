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
import { useOutsideClick } from "@/hooks/use-outside-click";
import { AnimatePresence, motion } from "framer-motion";

import {
  assetTypes,
  biases,
  categories,
  sectors,
  stocksData,
} from "@/lib/mock-data";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  DollarSign,
  Heart,
  Info,
  Search,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

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
  const [modalStock, setModalStock] = useState<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const itemsPerPage = 20; // Fixed at 10 rows per page

  // Modal functionality
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalStock(null);
      }
    }

    if (modalStock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalStock]);

  useOutsideClick(modalRef, () => setModalStock(null));

  // Modal functionality
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalStock(null);
      }
    }

    if (modalStock) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalStock]);

  useOutsideClick(modalRef, () => setModalStock(null));

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
  }, [
    searchTerm,
    selectedSectors,
    selectedAssets,
    selectedBiases,
    selectedCategories,
  ]);

  return (
    <div className="space-y-4 py-6 sm:px-6 px-0 pt-2 relative">
      {/* Click overlay for outside detection */}
      {selectedRow && (
        <div className="fixed inset-0 z-10" onClick={handleOutsideClick} />
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
        className="border border-border/30 rounded-sm bg-background/50 backdrop-blur-sm transition-all duration-300 relative  z-20 flex flex-col "
        style={{
          overflow: selectedRow ? "visible" : "hidden",
          position: "relative",
        }}
      >
        <div className="flex-1 overflow-auto">
          <Table
            style={{
              overflow: selectedRow ? "visible" : "auto",
              position: "relative",
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
                {/* Actions Column - no header, reduced width */}
                <TableHead
                  rowSpan={2}
                  className="w-12 text-center p-1"
                ></TableHead>
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
                const isOtherSelected =
                  selectedRow && selectedRow !== stock.ticker;

                return (
                  <TableRow
                    key={stock.ticker}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(stock.ticker);
                    }}
                    className={`
                    border-b border-border/30 hover:bg-muted/20 transition-all duration-500 ease-in-out cursor-pointer group
                    ${
                      isSelected
                        ? " z-30 relative shadow-2xl bg-muted/40 ring-2 ring-primary/20"
                        : ""
                    }
                    ${
                      isOtherSelected
                        ? "blur-[2px] opacity-40 scale-[0.98]"
                        : ""
                    }
                  `}
                    style={{
                      transformOrigin: "center",
                    }}
                  >
                    <TableCell className="px-2 h-full border-r border-border/20">
                      <div className="font-bold text-xs sm:text-sm">
                        {stock.ticker}
                      </div>
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
                    <TableCell className="p-0 text-center border-r border-border/20">
                      <div
                        className={`${getMetricClass(
                          stock.sentiment
                        )} h-full w-full flex items-center justify-center py-2 text-sm font-medium`}
                      >
                        {stock.sentiment}
                      </div>
                    </TableCell>
                    <TableCell className="p-1 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 hover:bg-primary/10 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalStock(stock);
                        }}
                      >
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
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
                <h3 className="font-semibold text-lg mb-2">
                  No results on this page
                </h3>
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
        <div className="flex items-center justify-end bg-background/50 backdrop-blur-sm  rounded-sm px-4 py-0">
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

      {/* Modal Overlay */}
      <AnimatePresence>
        {modalStock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-50 flex items-center justify-center p-4"
          />
        )}
      </AnimatePresence>

      {/* Modal Content */}
      <AnimatePresence>
        {modalStock && (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.7, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 50 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.8,
                duration: 0.2,
              }}
              className="w-full max-w-4xl max-h-[95vh] bg-background/95 backdrop-blur-md rounded-2xl border border-border/50 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="relative p-4 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
                <button
                  onClick={() => setModalStock(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background border border-border/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-start justify-between pr-12">
                  {/* Left side - Name and ticker */}
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2">
                        {modalStock.ticker} - {modalStock.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-xs">
                          {modalStock.sector}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Health score */}
                  <div className="text-right">
                    <div className="text-2xl font-bold mb-1">Health Score</div>
                    <div
                      className={`${getScoreBgColor(
                        modalStock.score
                      )} px-4 py-2 rounded-md text-lg font-bold inline-block`}
                    >
                      {modalStock.score}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Body with Custom Scrollbar */}
              <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto space-y-6 custom-scrollbar">
                {/* Overall Health Summary */}
                <div className="bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl border border-blue-500/20 p-4">
                  <h3 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Overall Health Summary
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {modalStock.score >= 80
                      ? `${modalStock.ticker} shows excellent investment health with strong fundamentals and positive market indicators. This stock demonstrates robust performance across multiple metrics, making it a compelling investment opportunity.`
                      : modalStock.score >= 60
                      ? `${modalStock.ticker} presents moderate investment potential with mixed signals across different metrics. While some areas show strength, others may require closer monitoring.`
                      : `${modalStock.ticker} exhibits concerning investment signals with below-average performance in key metrics. This stock may require careful consideration and additional research before investment.`}
                  </p>
                </div>

                {/* Fundamentals Section */}
                <div className="bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl border border-blue-500/20 p-4">
                  <h3 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Fundamental Analysis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-background/50 rounded-lg p-3 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Profitability</span>
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${getMetricClass(
                            modalStock.profitability
                          )}`}
                        >
                          {modalStock.profitability}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {modalStock.profitability >= 80
                          ? "Excellent profit margins and earnings consistency. Strong ability to generate returns."
                          : modalStock.profitability >= 60
                          ? "Adequate profitability with room for improvement. Moderate earnings performance."
                          : "Concerning profit levels. May indicate operational inefficiencies or market challenges."}
                      </p>
                    </div>

                    <div className="bg-background/50 rounded-lg p-3 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Growth</span>
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${getMetricClass(
                            modalStock.growth
                          )}`}
                        >
                          {modalStock.growth}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {modalStock.growth >= 80
                          ? "Outstanding growth trajectory with strong revenue and earnings expansion."
                          : modalStock.growth >= 60
                          ? "Moderate growth showing steady but not exceptional expansion."
                          : "Limited growth potential with possible stagnation concerns."}
                      </p>
                    </div>

                    <div className="bg-background/50 rounded-lg p-3 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Financial Stability</span>
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${getMetricClass(
                            modalStock.stability
                          )}`}
                        >
                          {modalStock.stability}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {modalStock.stability >= 80
                          ? "Strong balance sheet with low debt and consistent cash flow."
                          : modalStock.stability >= 60
                          ? "Acceptable financial position with manageable debt levels."
                          : "Financial stability concerns with potential liquidity or debt issues."}
                      </p>
                    </div>

                    <div className="bg-background/50 rounded-lg p-3 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          Operational Efficiency
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${getMetricClass(
                            modalStock.efficiency
                          )}`}
                        >
                          {modalStock.efficiency}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {modalStock.efficiency >= 80
                          ? "Highly efficient operations with excellent asset utilization and cost management."
                          : modalStock.efficiency >= 60
                          ? "Good operational efficiency with room for optimization."
                          : "Operational inefficiencies may be impacting overall performance."}
                      </p>
                    </div>

                    <div className="bg-background/50 rounded-lg p-3 border border-border/30 md:col-span-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Valuation</span>
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${getMetricClass(
                            modalStock.valuation
                          )}`}
                        >
                          {modalStock.valuation}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {modalStock.valuation >= 80
                          ? "Attractive valuation with stock trading below intrinsic value. Potential upside opportunity."
                          : modalStock.valuation >= 60
                          ? "Fair valuation reflecting current market conditions. Reasonably priced."
                          : "Potentially overvalued. Current price may not reflect fundamental value."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Analysis Section */}
                <div className="bg-gradient-to-br from-green-500/5 to-transparent rounded-xl border border-green-500/20 p-4">
                  <h3 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Technical Analysis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-background/50 rounded-lg p-3 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Price Momentum</span>
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${getMetricClass(
                            modalStock.momentum
                          )}`}
                        >
                          {modalStock.momentum}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {modalStock.momentum >= 80
                          ? "Strong upward price momentum with positive technical indicators."
                          : modalStock.momentum >= 60
                          ? "Moderate momentum showing mixed technical signals."
                          : "Weak momentum with bearish technical patterns emerging."}
                      </p>
                    </div>

                    <div className="bg-background/50 rounded-lg p-3 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Trend Analysis</span>
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${getMetricClass(
                            modalStock.trend
                          )}`}
                        >
                          {modalStock.trend}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {modalStock.trend >= 80
                          ? "Clear upward trend with strong support levels and bullish patterns."
                          : modalStock.trend >= 60
                          ? "Neutral trend with sideways movement and unclear direction."
                          : "Downward trend with potential resistance levels above current price."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Institutional Analysis Section */}
                <div className="bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl border border-purple-500/20 p-4">
                  <h3 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Institutional Perspective
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-background/50 rounded-lg p-3 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          Institutional Activity
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${getMetricClass(
                            modalStock.activity
                          )}`}
                        >
                          {modalStock.activity}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {modalStock.activity >= 80
                          ? "High institutional interest with increased buying activity from major funds."
                          : modalStock.activity >= 60
                          ? "Moderate institutional activity showing balanced institutional interest."
                          : "Low institutional activity with possible institutional selling pressure."}
                      </p>
                    </div>

                    <div className="bg-background/50 rounded-lg p-3 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Market Sentiment</span>
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${getMetricClass(
                            modalStock.sentiment
                          )}`}
                        >
                          {modalStock.sentiment}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {modalStock.sentiment >= 80
                          ? "Positive market sentiment with bullish analyst ratings and investor confidence."
                          : modalStock.sentiment >= 60
                          ? "Mixed market sentiment with neutral analyst opinions and moderate investor interest."
                          : "Negative market sentiment with bearish outlook and declining investor confidence."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Investment Recommendation */}
                <div className="bg-gradient-to-br from-orange-500/5 to-transparent rounded-xl border border-orange-500/20 p-4">
                  <h3 className="font-semibold text-orange-400 mb-3">
                    Investment Recommendation
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {modalStock.score >= 80
                      ? `Based on the comprehensive analysis, ${modalStock.ticker} appears to be a strong investment candidate. The high scores across fundamental, technical, and institutional metrics suggest this stock has solid potential for growth and stability. Consider this as a potential addition to a diversified portfolio.`
                      : modalStock.score >= 60
                      ? `${modalStock.ticker} presents a moderate investment opportunity with mixed signals. While some metrics show promise, others suggest caution. This stock may be suitable for investors willing to accept moderate risk and monitor performance closely.`
                      : `${modalStock.ticker} shows concerning signals across multiple metrics. This stock may not be suitable for conservative investors. If considering investment, thorough additional research and risk assessment are strongly recommended.`}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HealthScorePage;
