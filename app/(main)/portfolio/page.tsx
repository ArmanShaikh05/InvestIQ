"use client";

import AnalyticsTab from "@/components/portfolio/AnalyticsTab";
import HealthTab from "@/components/portfolio/HealthTab";
import HistoryTab from "@/components/portfolio/HistoryTab";
import HoldingsTab from "@/components/portfolio/HoldingsTab";
import OverviewTab from "@/components/portfolio/OverviewTab";
import { PortfolioNavigationCommandPalette } from "@/components/portfolio/navigation-command-palette";
import { BarChart3, Briefcase, Clock, Eye, Heart } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const PortfolioContent = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Handle URL query parameters for tab and section navigation
  useEffect(() => {
    const tab = searchParams.get("tab");
    const section = searchParams.get("section");

    if (tab) {
      setActiveTab(tab);
    }

    if (section) {
      // Wait for tab content to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [searchParams]);

  // Mock data for portfolio
  const portfolioStats = {
    totalValue: 125430.5,
    todayChange: 2450.3,
    todayChangePercent: 1.98,
    totalGainLoss: 15230.5,
    totalGainLossPercent: 13.78,
    totalInvested: 110200.0,
  };

  const topHoldings = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      value: 25430,
      percentage: 20.3,
      change: 2.4,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      value: 18650,
      percentage: 14.9,
      change: -1.2,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      value: 15280,
      percentage: 12.2,
      change: 3.1,
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      value: 12940,
      percentage: 10.3,
      change: 5.6,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      value: 11230,
      percentage: 9.0,
      change: 1.8,
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "health", label: "Health", icon: Heart },
    { id: "holdings", label: "Holdings", icon: Briefcase },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "history", label: "History", icon: Clock },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "health":
        return <HealthTab />;
      case "holdings":
        return <HoldingsTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "history":
        return <HistoryTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="space-y-6 p-6 pt-2">
      {/* Modern Tab Navigation */}
      <div className="relative w-full flex justify-between items-center">
        <div className="flex items-center gap-8 border-b border-border/30">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative pb-4 px-1 text-sm font-medium transition-all duration-300 ease-in-out
                  flex items-center gap-2 hover:text-foreground
                  ${
                    activeTab === tab.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-muted-foreground/80"
                  }
                `}
              >
                <IconComponent className="w-4 h-4" />
                {tab.label}

                {/* Animated bottom border */}
                <div
                  className={`
                    absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out
                    ${activeTab === tab.id ? "w-full opacity-100" : "w-0 opacity-0"}
                  `}
                />
              </button>
            );
          })}
        </div>

        {/* Navigation Command Palette */}
        <PortfolioNavigationCommandPalette />
      </div>

      {/* Tab Content */}
      <div className="mt-6">{renderTabContent()}</div>
    </div>
  );
};

const PortfolioPage = () => {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <PortfolioContent />
    </Suspense>
  );
};

export default PortfolioPage;
