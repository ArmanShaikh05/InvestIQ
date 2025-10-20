import { ChartAreaIcon } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";

const HoldingsData = [
  {
    id: 1,
    stockName: "Apple Inc.",
    quantity: 50,
    totalValue: "₹6,00,000",
    dailyPercentageChange: "+1.5%",
    change: "positive",
  },
  {
    id: 2,
    stockName: "Microsoft Corp.",
    quantity: 30,
    totalValue: "₹4,50,000",
    dailyPercentageChange: "+2.1%",
    change: "positive",
  },
  {
    id: 3,
    stockName: "Amazon.com Inc.",
    quantity: 20,
    totalValue: "₹3,20,000",
    dailyPercentageChange: "-0.5%",
    change: "negative",
  },
  {
    id: 4,
    stockName: "Alphabet Inc.",
    quantity: 15,
    totalValue: "₹2,80,000",
    dailyPercentageChange: "+0.8%",
    change: "positive",
  },
  {
    id: 5,
    stockName: "Tesla Inc.",
    quantity: 10,
    totalValue: "₹1,50,000",
    dailyPercentageChange: "+3.2%",
    change: "positive",
  },
  {
    id: 6,
    stockName: "Microsoft Corp.",
    quantity: 30,
    totalValue: "₹4,50,000",
    dailyPercentageChange: "+2.1%",
    change: "positive",
  },
];

const TopHoldings = () => {
  return (
    <div className="w-full border rounded-xl dark:bg-[linear-gradient(135deg,rgba(47,40,32,0.7)_0%,rgba(244,208,63,0.08)_100%)] pt-6 pb-10 px-6 md:px-10  flex flex-col items-center shadow-lg shadow-ring/10 hover:shadow-lg hover:shadow-ring/20  transition-all duration-200 ease-in-out">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl md:text-2xl">Top Holdings</h1>
        <ChartAreaIcon className="bg-primary/20 size-8 p-1.5 rounded-lg" />
      </div>

      <div className="w-full flex flex-col gap-3 mt-10 max-h-80 overflow-y-auto hidden-scrollbar">
        {HoldingsData.map((holding) => (
          <div
            key={holding.id}
            className="pb-2 border-b border-border flex flex-col"
          >
            <div className="w-full flex items-center justify-between">
              <span className="text-sm ">{holding.stockName}</span>
              <span className="text-sm  ">{holding.totalValue}</span>
            </div>
            <div className="w-full flex items-center justify-between">
              <span className="text-xs  text-muted-foreground/50">{holding.quantity} shares</span>
              <Badge
                variant={
                  holding.change === "positive" ? "success" : "destructive"
                }
              >
                {holding.dailyPercentageChange}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopHoldings;
