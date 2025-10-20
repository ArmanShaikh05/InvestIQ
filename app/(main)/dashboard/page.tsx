import AiInsights from "@/components/dashboard/ai-insights";
import GreetingSections from "@/components/dashboard/greeting-sections";
import RecentAlerts from "@/components/dashboard/recent-alerts";
import TopHoldings from "@/components/dashboard/top-holdings";
import TrendingToday from "@/components/dashboard/trending-today";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoveRight } from "lucide-react";

const profileOverviewData = [
  {
    title: "Total Value",
    value: "₹12.4L",
    badge: { text: "↗ +24.5% YTD", variant: "success" },
  },
  {
    title: "Today's Change",
    value: "+₹28.5K",
    badge: { text: "↗ +2.35%", variant: "success" },
  },
  {
    title: "Avg Health Score",
    value: "82/100",
    badge: { text: "Strong", variant: "success" },
  },
  {
    title: "Active Holdings",
    value: "15",
    badge: { text: "Well Diversified", variant: "default" },
  },
];
// h-[calc(100vh-6.8rem)]
const page = () => {
  return (
    <div className="  flex flex-col pb-4 gap-8 overflow-y-auto hidden-scrollbar">
      {/* Greetings Box */}
      <div className="w-full border rounded-xl dark:bg-[linear-gradient(135deg,rgba(47,40,32,0.7)_0%,rgba(244,208,63,0.08)_100%)] py-10 px-6   shadow-lg shadow-ring/10">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 text-center">
            Welcome back, Investor!
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground text-center mt-2">
            Your portfolio is up ₹28,500 today. Keep up the momentum!
          </p>

          {/* Search Input */}
          <div className="w-full relative h-14 mt-8">
            <Input
              placeholder="Ask me anything about your investments..."
              className="w-full h-full rounded-4xl pl-6 border border-border text-xs md:text-sm placeholder:text-muted-foreground/50"
            />

            <Button className="absolute right-4 top-2 rounded-full hover:scale-110 transition-transform ">
              <MoveRight />
            </Button>
          </div>

          {/* Greeting Section */}
          <GreetingSections />
        </div>
      </div>

      {/* Profile Overview */}
      <div className="w-full border rounded-xl dark:bg-[linear-gradient(135deg,rgba(47,40,32,0.7)_0%,rgba(244,208,63,0.08)_100%)] pt-6 pb-10 px-6 md:px-10  flex flex-col items-center shadow-lg shadow-ring/10">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-lg md:text-2xl">Profile Overview</h1>
          <Button>View Details</Button>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-4  mt-8 max-[350px]:flex max-[350px]:flex-col">
          {profileOverviewData.map((item, index) => (
            <div
              className="w-full flex flex-col gap-2 items-center"
              key={index}
            >
              <h3 className="text-muted-foreground/50 uppercase text-xs md:text-sm">
                {item.title}
              </h3>
              <h1 className="text-3xl lg:text-4xl">{item.value}</h1>
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
              >
                {item.badge.text}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8 ">
        {/* Top Holdings */}
        <TopHoldings />
        <RecentAlerts />
        <TrendingToday />
        <AiInsights />
      </div>
    </div>
  );
};

export default page;
