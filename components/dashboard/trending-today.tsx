import { TrendingUp } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";

const TrendingTodayData = [
  {
    id: 1,
    stockName: "ABC Corp",
    sector: "Technology",
    score: 95,
  },
  {
    id: 2,
    stockName: "XYZ Ltd",
    sector: "Healthcare",
    score: 90,
  },
  {
    id: 3,
    stockName: "LMN Inc",
    sector: "Finance",
    score: 40,
  },
  {
    id: 4,
    stockName: "DEF Co",
    sector: "Energy",
    score: 72,
  },
  {
    id: 5,
    stockName: "GHI PLC",
    sector: "Retail",
    score: 85,
  },
];

const TrendingToday = () => {
  return (
    <div className="w-full border rounded-xl dark:bg-[linear-gradient(135deg,rgba(47,40,32,0.7)_0%,rgba(244,208,63,0.08)_100%)] pt-6 pb-10 px-6 md:px-10  flex flex-col items-center shadow-lg shadow-ring/10 hover:shadow-lg hover:shadow-ring/20 transition-all duration-200 ease-in-out">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl md:text-2xl">Trending Today</h1>
        <TrendingUp className="bg-primary/20 size-8 p-1.5 rounded-lg" />
      </div>

      <div className="w-full flex flex-col gap-3 mt-10 max-h-80 overflow-y-auto hidden-scrollbar">
        {TrendingTodayData.map((trend, index) => (
          <div
            key={trend.id}
            className="pb-2 border-b border-border flex gap-4"
          >
            <div className="size-8 p-2 rounded-xl text-primary bg-sidebar-accent/60 flex items-center justify-center shrink-0 font-medium">
              {index + 1}
            </div>
            <div className=" flex flex-col grow ml-4 gap-0.5">
              <span className="text-sm ">{trend.stockName}</span>
              <span className="text-xs  text-muted-foreground/50 ">
                {trend.sector}
              </span>
            </div>
            <Badge
              variant={
                trend.score >= 80
                  ? "success"
                  : trend.score >= 60
                  ? "default"
                  : "destructive"
              }
              className="w-12 rounded-2xl"
            >
              {trend.score}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingToday;
