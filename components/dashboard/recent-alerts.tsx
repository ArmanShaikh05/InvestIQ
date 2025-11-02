import { Bell, Settings } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const RecentAlertsData = [
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
  {
    id: 4,
    alertName: "NVIDIA Corp. (NVDA)",
    alertDetails: "Breaking news alert triggered",
    time: "2d ago",
  },
  {
    id: 4,
    alertName: "NVIDIA Corp. (NVDA)",
    alertDetails: "Breaking news alert triggered",
    time: "2d ago",
  },
  {
    id: 4,
    alertName: "NVIDIA Corp. (NVDA)",
    alertDetails: "Breaking news alert triggered",
    time: "2d ago",
  },
  {
    id: 4,
    alertName: "NVIDIA Corp. (NVDA)",
    alertDetails: "Breaking news alert triggered",
    time: "2d ago",
  },
  {
    id: 4,
    alertName: "NVIDIA Corp. (NVDA)",
    alertDetails: "Breaking news alert triggered",
    time: "2d ago",
  },
  {
    id: 4,
    alertName: "NVIDIA Corp. (NVDA)",
    alertDetails: "Breaking news alert triggered",
    time: "2d ago",
  },
  {
    id: 4,
    alertName: "NVIDIA Corp. (NVDA)",
    alertDetails: "Breaking news alert triggered",
    time: "2d ago",
  },
  {
    id: 4,
    alertName: "NVIDIA Corp. (NVDA)",
    alertDetails: "Breaking news alert triggered",
    time: "2d ago",
  },
  {
    id: 4,
    alertName: "NVIDIA Corp. (NVDA)",
    alertDetails: "Breaking news alert triggered",
    time: "2d ago",
  },
  {
    id: 4,
    alertName: "NVIDIA Corp. (NVDA)",
    alertDetails: "Breaking news alert triggered",
    time: "2d ago",
  },
  {
    id: 4,
    alertName: "NVIDIA Corp. (NVDA)",
    alertDetails: "Breaking news alert triggered",
    time: "2d ago",
  },
];

const RecentAlerts = () => {
  const hasAlerts = RecentAlertsData.length > 0;

  return (
    <div className="w-full h-full border rounded-xl dark:bg-[linear-gradient(135deg,rgba(47,40,32,0.7)_0%,rgba(244,208,63,0.08)_100%)] pt-6 pb-6 px-6 flex flex-col shadow-lg shadow-ring/10 hover:shadow-lg hover:shadow-ring/20 transition-all duration-200 ease-in-out">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl md:text-2xl font-semibold">Recent Alerts</h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-background/50 backdrop-blur-sm"
        >
          <Settings className="w-4 h-4" />
          All Alerts
        </Button>
      </div>

      {/* Alerts List */}
      <div className="w-full flex flex-col gap-2 max-h-[450px] overflow-y-auto hidden-scrollbar">
        {hasAlerts ? (
          RecentAlertsData.map((alert) => {
            return (
              <div
                key={alert.id}
                className="group relative p-3 rounded-lg backdrop-blur-md border transition-all duration-300  bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20 cursor-pointer"
              >
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex items-center gap-3">
                  {/* Alert Icon */}
                  <div className="p-1.5 rounded-lg flex-shrink-0 bg-orange-500/20">
                    <Bell className="w-3.5 h-3.5 text-orange-400" />
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
                        {alert.time}
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
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-4 rounded-full border border-orange-500/20 backdrop-blur-sm">
                <Bell className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <h3 className="font-semibold text-sm mb-2 text-muted-foreground">
              No Alerts Triggered
            </h3>
            <p className="text-xs text-muted-foreground/70 mb-3 max-w-xs">
              Your alerts are quiet. Portfolio is performing within set
              parameters.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="bg-background/50 backdrop-blur-sm hover:bg-background/80 text-xs"
            >
              Set New Alert
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentAlerts;
