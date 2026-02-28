"use client";

import { StockData } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { Badge } from "../ui/badge";

interface PriceComparisonChartProps {
  leftStock: StockData;
  rightStock: StockData;
}

// Generate mock 1-year historical data
function generateHistoricalData(stock: StockData, isLeft: boolean) {
  const data = [];
  const currentPrice = stock.price || 100;
  const months = 12;
  
  for (let i = months; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    // Generate realistic price variation (±30% over the year)
    const randomVariation = 0.7 + Math.random() * 0.6; // 0.7 to 1.3
    const trendFactor = 1 + ((stock.momentum || 50) - 50) / 200; // Use momentum for trend
    const price = currentPrice * randomVariation * trendFactor * (i === 0 ? 1 : 0.85 + Math.random() * 0.3);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      price: Math.round(price * 100) / 100,
    });
  }
  
  return data;
}

export function PriceComparisonChart({ leftStock, rightStock }: PriceComparisonChartProps) {
  // Generate historical data
  const leftData = generateHistoricalData(leftStock, true);
  const rightData = generateHistoricalData(rightStock, false);
  
  // Merge the data by date
  const mergedData = leftData.map((item, idx) => ({
    date: item.date,
    [leftStock.ticker]: item.price,
    [rightStock.ticker]: rightData[idx].price,
  }));

  // Calculate price change percentages
  const leftChange = ((leftData[leftData.length - 1].price - leftData[0].price) / leftData[0].price) * 100;
  const rightChange = ((rightData[rightData.length - 1].price - rightData[0].price) / rightData[0].price) * 100;

  const chartConfig = {
    [leftStock.ticker]: {
      label: leftStock.name,
      color: "hsl(217, 91%, 60%)", // Blue
    },
    [rightStock.ticker]: {
      label: rightStock.name,
      color: "hsl(271, 91%, 65%)", // Purple
    },
  };

  return (
    <Card className="p-6 border-border ">
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-lg">1-Year Price Comparison</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Historical price trends over the past year
          </p>
        </div>

        {/* Performance Summary */}
        <div className="flex gap-4 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(217,91%,60%)]" />
            <div className="text-sm">
              <span className="font-medium">{leftStock.ticker}</span>
              <Badge variant={leftChange >= 0 ? 'success' : 'destructive'} className="ml-2">
                {leftChange >= 0 ? '+' : ''}{leftChange.toFixed(2)}%
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(271,91%,65%)]" />
            <div className="text-sm">
              <span className="font-medium">{rightStock.ticker}</span>
              <Badge variant={rightChange >= 0 ? 'success' : 'destructive'} className="ml-2">
                {rightChange >= 0 ? '+' : ''}{rightChange.toFixed(2)}%
              </Badge>
            </div>
          </div>
        </div>

        {/* Chart */}
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={mergedData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickMargin={8}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickMargin={8}
              tickFormatter={(value) => `₹${value}`}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey={leftStock.ticker}
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2}
              dot={false}
              name={leftStock.name}
            />
            <Line
              type="monotone"
              dataKey={rightStock.ticker}
              stroke="hsl(271, 91%, 65%)"
              strokeWidth={2}
              dot={false}
              name={rightStock.name}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </Card>
  );
}
