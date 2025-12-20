import AiInsights from "@/components/dashboard/ai-insights";
import GreetingSections from "@/components/dashboard/greeting-sections";
import ProfileOverview from "@/components/dashboard/profile-overview";
import RecentAlerts from "@/components/dashboard/recent-alerts";
import TopHoldings from "@/components/dashboard/top-holdings";
import TrendingToday from "@/components/dashboard/trending-today";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoveRight } from "lucide-react";


// h-[calc(100vh-6.8rem)]
const page = () => {
  return (
    <div className="  flex flex-col pb-4 gap-8 overflow-y-auto hidden-scrollbar">
      {/* Greetings Box */}
      <div className="w-full border rounded-xl border-border/50 bg-background/50 backdrop-blur-sm py-10 px-6   shadow-lg shadow-ring/10">
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
      <ProfileOverview />
     

      {/* First Row: Top Holdings (2 columns) + Trending Today (1 column) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8">
        {/* Top Holdings - spans 2 columns on large devices */}
        <div className="lg:col-span-2">
          <TopHoldings />
        </div>
        
        {/* Trending Today - spans 1 column */}
        <div className="lg:col-span-1">
          <TrendingToday />
        </div>
      </div>

      {/* Second Row: Recent Alerts (1 column) + AI Insights (2 columns) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8">
        {/* Recent Alerts - spans 1 column */}
        <div className="lg:col-span-1">
          <RecentAlerts />
        </div>
        
        {/* AI Insights - spans 2 columns on large devices */}
        <div className="lg:col-span-2">
          <AiInsights />
        </div>
      </div>
      
      
    </div>
  );
};

export default page;
