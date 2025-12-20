import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

const profileOverviewData = [
  {
    title: "Total Value",
    value: "₹12.4L",
    badge: { text: "↗ +24.5% YTD", variant: "success" },
    description: "Current portfolio worth",
    subValue: "₹9.2L invested",
    trend: "+2.8L gains",
    icon: "💰",
  },
  {
    title: "Today's Change",
    value: "+₹28.5K",
    badge: { text: "↗ +2.35%", variant: "success" },
    description: "Daily performance",
    subValue: "Best day this month",
    trend: "Market outperformed",
    icon: "📈",
  },
  {
    title: "Health Score",
    value: "82/100",
    badge: { text: "Strong", variant: "success" },
    description: "Portfolio strength",
    subValue: "Risk: Moderate",
    trend: "Improved +5 pts",
    icon: "🎯",
  },
  {
    title: "Active Holdings",
    value: "15",
    badge: { text: "Well Diversified", variant: "default" },
    description: "Total investments",
    subValue: "8 sectors covered",
    trend: "Balanced allocation",
    icon: "📊",
  },
];

const ProfileOverview = () => {
  return (
    <div className="w-full ">
      
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {profileOverviewData.map((item, index) => (
          <div
            className="group relative border rounded-xl border-border/50 bg-background/50 backdrop-blur-sm p-4 lg:p-5 shadow-lg shadow-ring/10 hover:shadow-xl transition-all duration-300  overflow-hidden"
            key={index}
          >
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Subtle Border Glow */}
            <div className="absolute inset-0 rounded-xl border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 space-y-3">
              {/* Header with Icon and Badge */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {item.title}
                  </h3>
                </div>
                <Badge
                  variant={
                    item.badge.variant as
                      | "success"
                      | "default"
                      | "secondary"
                      | "destructive"
                      | "outline"
                      | null
                      | undefined
                  }
                  className="text-xs px-2 py-1"
                >
                  {item.badge.text}
                </Badge>
              </div>

              {/* Main Value */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                  {item.value}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>

              {/* Additional Info */}
              <div className="space-y-1 pt-2 border-t border-border/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {item.subValue}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs text-primary font-medium">
                    {item.trend}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileOverview;
