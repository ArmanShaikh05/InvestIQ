"use client";

import { 
  Bell, 
  Settings,
  Clock,
  AlertCircle
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

const TriggeredAlertsData = [
  {
    id: 1,
    alertName: "Apple Inc. (AAPL)",
    alertDetails: "Price dropped below $180",
    time: "2h ago",
  },
  {
    id: 2,
    alertName: "Tesla Inc. (TSLA)",
    alertDetails: "Volume spike detected",
    time: "4h ago",
  },
  {
    id: 3,
    alertName: "Microsoft Corp. (MSFT)",
    alertDetails: "Price reached target of $420",
    time: "1d ago",
  },
  {
    id: 4,
    alertName: "NVIDIA Corp. (NVDA)",
    alertDetails: "Breaking news alert triggered",
    time: "2d ago",
  },
  
];

const ActiveAlertsData = [
  {
    id: 5,
    alertName: "Amazon.com (AMZN)",
    alertDetails: "Price alert set at $145",
    status: "Monitoring",
  },
  {
    id: 6,
    alertName: "Google (GOOGL)",
    alertDetails: "Volume alert for 200% spike",
    status: "Active",
  },
  {
    id: 7,
    alertName: "Meta (META)",
    alertDetails: "Earnings date reminder",
    status: "Pending",
  },
  {
    id: 8,
    alertName: "Netflix (NFLX)",
    alertDetails: "Price target at $480",
    status: "Monitoring",
  }
];

const RecentAlerts = () => {
  const [activeTab, setActiveTab] = useState<'triggered' | 'active'>('triggered');
  
  const currentData = activeTab === 'triggered' ? TriggeredAlertsData : ActiveAlertsData;
  const hasAlerts = currentData.length > 0;

  return (
    <div className="w-full h-full border rounded-xl border-border/50 bg-background/50 backdrop-blur-sm pt-6 pb-6 px-6 flex flex-col shadow-lg shadow-ring/10 hover:shadow-lg hover:shadow-ring/20 transition-all duration-200 ease-in-out">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold">Alerts</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-background/50 backdrop-blur-sm"
        >
          <Settings className="w-4 h-4" />
          Manage
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-4 p-1 bg-background/30 rounded-lg border border-border/20">
        <button
          onClick={() => setActiveTab('triggered')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
            activeTab === 'triggered'
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Triggered</span>
          {TriggeredAlertsData.length > 0 && (
            <span className="bg-orange-500/20 text-orange-400 text-xs px-1.5 py-0.5 rounded-full">
              {TriggeredAlertsData.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
            activeTab === 'active'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Active</span>
          {ActiveAlertsData.length > 0 && (
            <span className="bg-blue-500/20 text-blue-400 text-xs px-1.5 py-0.5 rounded-full">
              {ActiveAlertsData.length}
            </span>
          )}
        </button>
      </div>

      {/* Alerts List */}
      <div className="w-full flex flex-col gap-2 max-h-[370px] overflow-y-auto pr-1 custom-scrollbar">
        {hasAlerts ? (
          currentData.map((alert) => {
            return (
              <div
                key={alert.id}
                className={`group relative p-3 rounded-lg backdrop-blur-md border transition-all duration-300 cursor-pointer ${
                  activeTab === 'triggered' 
                    ? 'bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20'
                    : 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20'
                }`}
              >
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex items-center gap-3">
                  {/* Alert Icon */}
                  <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                    activeTab === 'triggered' 
                      ? 'bg-orange-500/20' 
                      : 'bg-blue-500/20'
                  }`}>
                    {activeTab === 'triggered' ? (
                      <Bell className="w-3.5 h-3.5 text-orange-400" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
                    )}
                  </div>

                  {/* Alert Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">
                          {alert.alertName}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {alert.alertDetails}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground/70 ml-3 flex-shrink-0">
                        {activeTab === 'triggered' ? (alert as any).time : (alert as any).status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          /* No Alerts Placeholder */
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="relative mb-4">
              <div className={`p-4 rounded-full border backdrop-blur-sm ${
                activeTab === 'triggered'
                  ? 'bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20'
                  : 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20'
              }`}>
                {activeTab === 'triggered' ? (
                  <Bell className="w-6 h-6 text-orange-400" />
                ) : (
                  <Clock className="w-6 h-6 text-blue-400" />
                )}
              </div>
            </div>
            <h3 className="font-semibold text-sm mb-2 text-muted-foreground">
              {activeTab === 'triggered' ? 'No Alerts Triggered' : 'No Active Alerts'}
            </h3>
            <p className="text-xs text-muted-foreground/70 mb-3 max-w-xs">
              {activeTab === 'triggered' 
                ? 'Your alerts are quiet. Portfolio is performing within set parameters.'
                : 'Set up price, volume, or news alerts to monitor your investments.'
              }
            </p>
            <Button
              variant="outline"
              size="sm"
              className="bg-background/50 backdrop-blur-sm hover:bg-background/80 text-xs"
            >
              {activeTab === 'triggered' ? 'View History' : 'Set New Alert'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentAlerts;
