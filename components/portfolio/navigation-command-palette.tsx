"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Kbd } from "@/components/ui/kbd";
import {
  Eye,
  Heart,
  Briefcase,
  BarChart3,
  Clock,
  TrendingUp,
  PieChart,
  Target,
  DollarSign,
  LineChart,
  Activity,
  Award,
  Calendar,
  Flag,
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  Zap,
} from "lucide-react";

interface Section {
  id: string;
  title: string;
  tab: string;
}

const sections: Section[] = [
  // Overview Tab
  { id: "portfolio-hero", title: "Portfolio Hero", tab: "overview" },
  { id: "portfolio-glance", title: "Portfolio at a Glance", tab: "overview" },
  {
    id: "portfolio-value-chart",
    title: "Portfolio Value Chart",
    tab: "overview",
  },
  {
    id: "portfolio-composition",
    title: "Portfolio Composition",
    tab: "overview",
  },
  {
    id: "top-holdings-snapshot",
    title: "Top Holdings Snapshot",
    tab: "overview",
  },
  { id: "returns-breakdown", title: "Returns Breakdown", tab: "overview" },
  {
    id: "recommendations-alerts",
    title: "Recommendations & Alerts",
    tab: "overview",
  },
  {
    id: "portfolio-health-summary",
    title: "Portfolio Health Summary",
    tab: "overview",
  },
  { id: "whats-next", title: "What's Next", tab: "overview" },

  // Health Tab
  { id: "aggregate-health-dna", title: "Aggregate Health DNA", tab: "health" },
  { id: "health-trends", title: "Health Trends", tab: "health" },
  { id: "quality-spectrum", title: "The Quality Spectrum", tab: "health" },
  { id: "health-distribution", title: "Health Distribution", tab: "health" },
  {
    id: "sector-health-comparison",
    title: "Sector Health Comparison",
    tab: "health",
  },
  {
    id: "health-deep-dive",
    title: "Interactive Health Deep-Dive",
    tab: "health",
  },

  // Holdings Tab
  {
    id: "holdings-command-center",
    title: "Holdings Command Center",
    tab: "holdings",
  },
  {
    id: "filters-actions-toolbar",
    title: "Filters & Actions Toolbar",
    tab: "holdings",
  },
  {
    id: "main-holdings-display",
    title: "Main Holdings Display",
    tab: "holdings",
  },
  { id: "bulk-actions-bar", title: "Bulk Actions Bar", tab: "holdings" },

  // Analytics Tab
  { id: "performance-hero", title: "Performance Hero", tab: "analytics" },
  { id: "performance-chart", title: "Performance Chart", tab: "analytics" },
  { id: "returns-analysis", title: "Returns Analysis", tab: "analytics" },
  {
    id: "stock-wise-performance",
    title: "Stock-wise Performance",
    tab: "analytics",
  },
  { id: "sector-performance", title: "Sector Performance", tab: "analytics" },
  {
    id: "risk-adjusted-returns",
    title: "Risk-Adjusted Returns",
    tab: "analytics",
  },
  { id: "benchmarking", title: "Benchmarking", tab: "analytics" },
  {
    id: "dividend-performance",
    title: "Dividend Performance",
    tab: "analytics",
  },
  {
    id: "performance-health-correlation",
    title: "Performance & Health Correlation",
    tab: "analytics",
  },
  {
    id: "transaction-performance",
    title: "Transaction Performance",
    tab: "analytics",
  },
  {
    id: "forward-looking-performance",
    title: "Forward-Looking Performance",
    tab: "analytics",
  },

  // History Tab
  { id: "journey-hero", title: "Journey Hero", tab: "history" },
  { id: "transaction-timeline", title: "Transaction Timeline", tab: "history" },
  { id: "portfolio-evolution", title: "Portfolio Evolution", tab: "history" },
  { id: "investment-patterns", title: "Investment Patterns", tab: "history" },
  {
    id: "stock-journey-chronicles",
    title: "Stock Journey Chronicles",
    tab: "history",
  },
  { id: "portfolio-milestones", title: "Portfolio Milestones", tab: "history" },
];

const tabIcons: Record<string, any> = {
  overview: Eye,
  health: Heart,
  holdings: Briefcase,
  analytics: BarChart3,
  history: Clock,
};

export function PortfolioNavigationCommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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

  const handleSelect = (section: Section) => {
    // Update URL with query parameters
    const params = new URLSearchParams();
    params.set("tab", section.tab);
    params.set("section", section.id);
    router.push(`?${params.toString()}`, { scroll: false });

    setOpen(false);

    // Wait for tab to switch before scrolling
    setTimeout(() => {
      const element = document.getElementById(section.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Group sections by tab
  const groupedSections = sections.reduce(
    (acc, section) => {
      if (!acc[section.tab]) {
        acc[section.tab] = [];
      }
      acc[section.tab].push(section);
      return acc;
    },
    {} as Record<string, Section[]>,
  );

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

      {/* Command Palette Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search portfolio sections..." />
        <CommandList>
          <CommandEmpty>No sections found.</CommandEmpty>

          {Object.entries(groupedSections).map(([tab, tabSections]) => {
            const Icon = tabIcons[tab] || LayoutDashboard;
            return (
              <CommandGroup
                key={tab}
                heading={
                  <div className="flex items-center gap-2 ">
                    <Icon className="w-4 h-4" />
                    <span className="capitalize">{tab}</span>
                  </div>
                }
              >
                {tabSections.map((section) => (
                  <CommandItem
                    key={section.id}
                    value={`${section.tab} ${section.title}`}
                    onSelect={() => handleSelect(section)}
                  >
                    <span>{section.title}</span>
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
