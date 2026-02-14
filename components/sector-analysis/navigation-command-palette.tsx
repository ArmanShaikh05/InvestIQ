"use client";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Activity,
    DollarSign,
    Gauge,
    LayoutDashboard,
    Zap
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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
    tab: "summary",
    label: "Summary",
    icon: LayoutDashboard,
    sections: [
      { id: "key-metrics", label: "Key Financial Metrics" },
      { id: "sector-overview", label: "Sector Overview" },
      { id: "smart-highlights", label: "What You Should Know" },
      { id: "performance-chart", label: "Sector Performance Over Time" },
      { id: "health-pillars", label: "Health Pillars" },
      { id: "market-concentration", label: "Market Concentration" },
      { id: "top-performers", label: "Top Performing Stocks" },
    ],
  },
  {
    tab: "health",
    label: "Health",
    icon: Gauge,
    sections: [
      { id: "health-overview", label: "Overall Health Score" },
      { id: "health-story", label: "Health Story in Plain English" },
      { id: "category-breakdown", label: "Health Category Breakdown" },
      { id: "sector-comparison", label: "Health Comparison Across Sectors" },
      { id: "score-distribution", label: "Health Score Distribution" },
      { id: "health-journey", label: "Health Journey - Last 2 Years" },
      { id: "key-takeaways", label: "Key Takeaways" },
    ],
  },
  {
    tab: "activity",
    label: "Activity",
    icon: Activity,
    sections: [
      { id: "activity-snapshot", label: "Activity Snapshot" },
      { id: "activity-story", label: "What the Activity Tells Us" },
      { id: "fund-flows", label: "Institutional Fund Flows" },
      { id: "significant-deals", label: "Significant Deals" },
      { id: "trading-quality", label: "Trading Quality Indicators" },
      { id: "promoter-trends", label: "Promoter & Insider Trends" },
      { id: "ownership-changes", label: "Ownership Changes" },
      { id: "money-flow-summary", label: "Money Flow Summary" },
    ],
  },
  {
    tab: "financial",
    label: "Financial",
    icon: DollarSign,
    sections: [
      { id: "sector-metrics", label: "Key Sector Metrics" },
      { id: "financial-story", label: "What the Financials Tell Us" },
      { id: "growth-trajectory", label: "Growth Trajectory" },
      { id: "margin-deep-dive", label: "Margin Deep-Dive" },
      { id: "capital-efficiency", label: "Capital Efficiency" },
      { id: "balance-sheet", label: "Balance Sheet Health" },
      { id: "company-comparison", label: "Company-Level Comparison" },
    ],
  },
];

interface SectorNavigationCommandPaletteProps {
  currentSector: string;
}

export function SectorNavigationCommandPalette({
  currentSector,
}: SectorNavigationCommandPaletteProps) {
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
    const url = `/research/sector-analysis/${currentSector}?tab=${tab}&section=${sectionId}`;
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
