"use client";

import { useParams } from "next/navigation";
import { stocksData, sectorComparisonData, StockData } from "@/lib/mock-data";
import { ComparisonHeader } from "@/components/comparison/ComparisonHeader";
import { AIOverview } from "@/components/comparison/AIOverview";
import { QuickStatsCards } from "@/components/comparison/QuickStatsCards";
import { ComparisonTable } from "@/components/comparison/ComparisonTable";
import { VisualComparison } from "@/components/comparison/VisualComparison";

export default function ComparisonResultPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Parse the slug to extract symbols (could be stock tickers or sector IDs)
  const symbols = slug?.split("-vs-") || [];
  const leftSymbol = symbols[0];
  const rightSymbol = symbols[1];

  // Try to find in stocks first (uppercase ticker)
  let leftItem = stocksData.find(
    (stock) => stock.ticker.toUpperCase() === leftSymbol?.toUpperCase()
  );
  let rightItem = stocksData.find(
    (stock) => stock.ticker.toUpperCase() === rightSymbol?.toUpperCase()
  );

  // If not found in stocks, try sectors (using lowercase sector IDs)
  if (!leftItem) {
    leftItem = sectorComparisonData.find(
      (sector) => sector.ticker.toLowerCase() === leftSymbol?.toLowerCase()
    );
  }
  if (!rightItem) {
    rightItem = sectorComparisonData.find(
      (sector) => sector.ticker.toLowerCase() === rightSymbol?.toLowerCase()
    );
  }

  // Fallback if items not found
  if (!leftItem || !rightItem) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-6">
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-3xl font-bold text-muted-foreground">
            Comparison Items Not Found
          </h1>
          <p className="text-muted-foreground">
            Could not find data for "{leftSymbol}" or "{rightSymbol}"
          </p>
          <div className="text-sm text-muted-foreground space-y-2 mt-4">
            <p className="font-semibold">Available Stocks:</p>
            <p className="text-xs">{stocksData.map(s => s.ticker).join(", ")}</p>
            <p className="font-semibold mt-3">Available Sectors:</p>
            <p className="text-xs">{sectorComparisonData.map(s => s.ticker).join(", ")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header Section */}
      <ComparisonHeader leftStock={leftItem} rightStock={rightItem} />

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 py-6 space-y-8">
        {/* AI Overview */}
        <AIOverview leftStock={leftItem} rightStock={rightItem} />

        {/* Quick Stats Cards */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Key Metrics at a Glance</h3>
          <QuickStatsCards leftStock={leftItem} rightStock={rightItem} />
        </div>

        {/* Main Comparison Table */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Detailed Comparison</h3>
          <ComparisonTable leftStock={leftItem} rightStock={rightItem} />
        </div>

        {/* Visual Comparison */}
        <VisualComparison leftStock={leftItem} rightStock={rightItem} />
      </div>
    </div>
  );
}
