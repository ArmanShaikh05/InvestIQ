"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Activity,
  BarChart3,
  Calendar,
  FileText,
  Gauge,
  LineChart,
  Newspaper,
  LayoutDashboard,
  TrendingUp,
  Zap,
} from "lucide-react";

interface Section {
  id: string;
  label: string;
  description?: string;
}

interface TabSection {
  tab: string;
  label: string;
  icon: React.ElementType;
  sections: Section[];
}

const tabSections: TabSection[] = [
  {
    tab: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    sections: [
      { id: "company-identity", label: "Company Identity" },
      { id: "health-score", label: "Health Score at a Glance" },
      { id: "price-performance", label: "Price Performance" },
      { id: "key-metrics", label: "Key Metrics Snapshot" },
      { id: "peer-comparison", label: "Peer Comparison" },
      { id: "strengths-concerns", label: "Strengths & Concerns" },
      { id: "ai-summary", label: "AI Summary" },
      { id: "whats-next", label: "What's Next" },
    ],
  },
  {
    tab: "health",
    label: "Health Score",
    icon: Gauge,
    sections: [
      { id: "health-deep-dive", label: "Health Score Deep-Dive" },
      { id: "profitability", label: "Profitability Analysis" },
      { id: "growth-momentum", label: "Growth Momentum" },
      { id: "financial-stability", label: "Financial Stability" },
      { id: "efficiency", label: "Efficiency Metrics" },
      { id: "valuation-health", label: "Valuation Health" },
    ],
  },
  {
    tab: "fundamentals",
    label: "Fundamentals",
    icon: BarChart3,
    sections: [
      { id: "financial-performance", label: "Financial Performance Overview" },
      { id: "balance-sheet", label: "Balance Sheet Snapshot" },
      { id: "cash-flow", label: "Cash Flow Quality" },
      { id: "profitability-metrics", label: "Return Metrics Deep-Dive" },
      { id: "whats-next", label: "What's Next" },
    ],
  },
  {
    tab: "valuation",
    label: "Valuation",
    icon: TrendingUp,
    sections: [
      { id: "valuation-snapshot", label: "Current Valuation Snapshot" },
      { id: "valuation-story", label: "Valuation Story" },
      { id: "historical-context", label: "Historical Valuation Context" },
      { id: "peer-valuation", label: "Peer Valuation Comparison" },
      { id: "peg-analysis", label: "Growth-Adjusted Valuation (PEG)" },
      { id: "intrinsic-value", label: "Intrinsic Value Estimates" },
      { id: "valuation-risks", label: "Valuation Risks & Considerations" },
      { id: "investment-framework", label: "Investment Decision Framework" },
      { id: "whats-next", label: "What's Next" },
    ],
  },
  {
    tab: "technical",
    label: "Technical",
    icon: LineChart,
    sections: [
      { id: "technical-snapshot", label: "Technical Health Snapshot" },
      { id: "price-chart", label: "Interactive Price Chart" },
      { id: "trend-analysis", label: "Trend Analysis" },
      { id: "momentum-indicators", label: "Momentum Indicators" },
      { id: "support-resistance", label: "Support & Resistance Levels" },
      { id: "volume-analysis", label: "Volume Analysis" },
      { id: "chart-patterns", label: "Chart Patterns & Signals" },
      { id: "technical-verdict", label: "Technical Verdict" },
      { id: "whats-next", label: "What's Next" },
    ],
  },
  {
    tab: "activity",
    label: "Activity",
    icon: Activity,
    sections: [{ id: "activity-overview", label: "Activity Overview" }],
  },
  {
    tab: "events",
    label: "Events",
    icon: Calendar,
    sections: [{ id: "calendar-view", label: "Calendar View" }],
  },
  {
    tab: "news",
    label: "News",
    icon: Newspaper,
    sections: [{ id: "latest-news", label: "Latest News & Updates" }],
  },
];

interface NavigationCommandPaletteProps {
  currentSymbol: string;
}

export function NavigationCommandPalette({
  currentSymbol,
}: NavigationCommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "p" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleNavigate = (tab: string, sectionId: string) => {
    // Navigate to the tab with section query parameter
    const url = `/research/stock-screener/${currentSymbol}?tab=${tab}&section=${sectionId}`;
    router.push(url);
    setOpen(false);

    // Scroll to section after navigation
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <>
      {/* Keyboard shortcut hint */}
      <div onClick={()=>setOpen(true)} className="cursor-pointer">
        <div className="bg-muted/90 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Quick Navigation</span>
            <Zap className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search sections..." />
        <CommandList>
          <CommandEmpty>No sections found.</CommandEmpty>
          {tabSections.map((tabSection) => {
            const Icon = tabSection.icon;
            return (
              <CommandGroup key={tabSection.tab} heading={tabSection.label}>
                {tabSection.sections.map((section) => (
                  <CommandItem
                    key={`${tabSection.tab}-${section.id}`}
                    value={`${tabSection.label} ${section.label}`}
                    onSelect={() => handleNavigate(tabSection.tab, section.id)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{section.label}</span>
                    {section.description && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        {section.description}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}
