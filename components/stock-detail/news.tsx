"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ExternalLink, Filter } from "lucide-react";

interface NewsArticle {
  id: string;
  category: "Company" | "Results" | "Management" | "Sector" | "Regulatory" | "Analyst";
  source: string;
  sourceLogo?: string;
  date: string;
  headline: string;
  excerpt: string;
  url: string;
}

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All News");
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("Last 7 Days");
  const [selectedSource, setSelectedSource] = useState<string>("All Sources");

  // Mock news data
  const newsArticles: NewsArticle[] = [
    {
      id: "1",
      category: "Results",
      source: "Economic Times",
      date: "Oct 18, 2024",
      headline: "HDFC Bank Q2 profit rises 18% to ₹8,200 crore, beats street estimates",
      excerpt: "The private sector lender reported net profit of ₹8,200 crore for the quarter ended September, compared to ₹6,950 crore a year ago. Net interest income grew 8.5% to ₹32,500 crore.",
      url: "https://economictimes.com/hdfc-bank-q2-results"
    },
    {
      id: "2",
      category: "Company",
      source: "HDFC Bank",
      date: "Oct 15, 2024",
      headline: "Board Meeting Scheduled for October 25 to Consider Unaudited Financial Results",
      excerpt: "The Board of Directors will meet on Thursday, October 25, 2024 to consider and approve the unaudited financial results for the quarter and half year ended September 30, 2024.",
      url: "https://hdfcbank.com/board-meeting-notice"
    },
    {
      id: "3",
      category: "Management",
      source: "Mint",
      date: "Oct 12, 2024",
      headline: "HDFC Bank CEO discusses digital transformation strategy at industry summit",
      excerpt: "Chief Executive Officer outlined the bank's five-year digital roadmap, emphasizing AI and machine learning investments to enhance customer experience and operational efficiency across all business segments.",
      url: "https://livemint.com/hdfc-ceo-digital-strategy"
    },
    {
      id: "4",
      category: "Sector",
      source: "Business Standard",
      date: "Oct 10, 2024",
      headline: "RBI keeps repo rate unchanged at 6.5%, maintains accommodative stance on banking sector",
      excerpt: "The Reserve Bank of India kept the benchmark interest rate steady in its monetary policy review, signaling continued support for the banking sector while monitoring inflation trends and economic growth.",
      url: "https://business-standard.com/rbi-policy-october"
    },
    {
      id: "5",
      category: "Regulatory",
      source: "BSE",
      date: "Oct 8, 2024",
      headline: "Outcome of Board Meeting - Dividend Declaration",
      excerpt: "The Board of Directors has declared an interim dividend of ₹8 per equity share. The record date for the dividend payment is October 29, 2024. Payment will be made by November 15, 2024.",
      url: "https://bseindia.com/hdfc-dividend-announcement"
    },
    {
      id: "6",
      category: "Analyst",
      source: "MoneyControl",
      date: "Oct 5, 2024",
      headline: "HDFC Bank remains top pick among private banks: Analysts maintain 'buy' rating",
      excerpt: "Leading brokerages reiterated their positive stance on the stock with price targets ranging from ₹1,950 to ₹2,100, citing strong asset quality, improving margins, and stable deposit franchise.",
      url: "https://moneycontrol.com/hdfc-analyst-rating"
    },
    {
      id: "7",
      category: "Company",
      source: "HDFC Bank",
      date: "Oct 2, 2024",
      headline: "HDFC Bank launches new savings account variant for millennials",
      excerpt: "The bank introduced DigiSave Plus, a zero-balance digital savings account with premium features including free international debit card, higher withdrawal limits, and exclusive lounge access at major airports.",
      url: "https://hdfcbank.com/digisave-plus-launch"
    },
    {
      id: "8",
      category: "Sector",
      source: "Reuters",
      date: "Sep 28, 2024",
      headline: "Indian banking sector shows strong credit growth in Q2, NPA levels decline",
      excerpt: "The Indian banking industry recorded healthy loan growth of 15.8% year-on-year, driven by retail lending and MSME credit. Gross NPAs declined to multi-year lows across major private banks.",
      url: "https://reuters.com/india-banking-q2-performance"
    },
    {
      id: "9",
      category: "Management",
      source: "Bloomberg",
      date: "Sep 25, 2024",
      headline: "HDFC Bank appoints new Chief Risk Officer to strengthen governance framework",
      excerpt: "The bank announced the appointment of industry veteran as Chief Risk Officer, effective November 1, 2024. The move is aimed at strengthening risk management capabilities amid rapid business expansion.",
      url: "https://bloomberg.com/hdfc-cro-appointment"
    },
    {
      id: "10",
      category: "Results",
      source: "Economic Times",
      date: "Sep 20, 2024",
      headline: "HDFC Bank's deposit growth outpaces credit growth in recent quarter",
      excerpt: "The lender's deposit base grew 14.2% annually, surpassing credit growth of 13.8%, improving the credit-deposit ratio and providing more ammunition for future loan expansion.",
      url: "https://economictimes.com/hdfc-deposit-growth"
    }
  ];

  // Category badge colors
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Company: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      Results: "bg-green-500/10 text-green-600 border-green-500/20",
      Management: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      Sector: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      Regulatory: "bg-red-500/10 text-red-600 border-red-500/20",
      Analyst: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20"
    };
    return colors[category] || "bg-gray-500/10 text-gray-600 border-gray-500/20";
  };

  // Filter categories
  const categories = ["All News", "Company Announcements", "Results & Earnings", "Management Updates", "Sector News", "Analyst Reports", "Regulatory Filings"];
  const timePeriods = ["Last 7 Days", "Last 30 Days", "Last 3 Months", "Last 6 Months", "Last Year"];
  const sources = ["All Sources", "Company Website", "Economic Times", "Business Standard", "Mint", "MoneyControl", "Reuters", "Bloomberg", "Others"];

  return (
    <div className="space-y-6">
      {/* Section 1: News Feed Header */}
      <div className="space-y-4">
        {/* Storytelling Header */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Stay updated on the latest news and developments
          </p>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            📰 News & Updates
          </h2>
        </div>

        {/* Filter Controls */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Left: Item count */}
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{newsArticles.length}</span> news items from last 30 days
              </div>

              {/* Right: Filters */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none px-4 py-2 pr-10 text-sm border rounded-lg bg-background hover:bg-muted/50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Time Period Filter */}
                <div className="relative">
                  <select
                    value={selectedTimePeriod}
                    onChange={(e) => setSelectedTimePeriod(e.target.value)}
                    className="appearance-none px-4 py-2 pr-10 text-sm border rounded-lg bg-background hover:bg-muted/50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {timePeriods.map((period) => (
                      <option key={period} value={period}>{period}</option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>

                {/* Source Filter */}
                <div className="relative">
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="appearance-none px-4 py-2 pr-10 text-sm border rounded-lg bg-background hover:bg-muted/50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    {sources.map((source) => (
                      <option key={source} value={source}>{source}</option>
                    ))}
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 2: News Feed */}
      <div className="space-y-4">
        {newsArticles.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow group">
            <CardContent className="pt-6">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Category Badge */}
                  <Badge 
                    variant="outline" 
                    className={`text-xs font-medium ${getCategoryColor(article.category)}`}
                  >
                    {article.category}
                  </Badge>
                  
                  {/* Source */}
                  <span className="text-sm font-medium text-muted-foreground">
                    {article.source}
                  </span>
                </div>

                {/* Date */}
                <span className="text-sm text-muted-foreground">
                  {article.date}
                </span>
              </div>

              {/* Card Body */}
              <div className="space-y-3">
                {/* Headline */}
                <h3 className="text-lg font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {article.headline}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Read Full Article Link */}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Read Full Article
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More (Optional) */}
      <div className="flex justify-center pt-4">
        <button className="px-6 py-2 text-sm font-medium border rounded-lg hover:bg-muted/50 transition-colors">
          Load More News
        </button>
      </div>
    </div>
  );
};

export default News;
