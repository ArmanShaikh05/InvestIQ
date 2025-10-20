import { Bell, MailWarning } from "lucide-react";
import React from "react";

const RecentAlertsData = [
  {
    id: 1,
    alertName: "Apple Inc.",
    alertDetails: "Price dropped by 2% today",
    alertType: "price-drop",
    time: "2h ago",
  },
  {
    id: 2,
    alertName: "Microsoft Corp.",
    alertDetails: "Earnings report released",
    alertType: "earnings",
    time: "5h ago",
  },
  {
    id: 3,
    alertName: "Amazon.com Inc.",
    alertDetails: "New product launch announced",
    alertType: "product-launch",
    time: "1d ago",
  },
  {
    id: 4,
    alertName: "Alphabet Inc.",
    alertDetails: "Stock upgraded by analysts",
    alertType: "stock-upgrade",
    time: "2d ago",
  },
  {
    id: 5,
    alertName: "Tesla Inc.",
    alertDetails: "CEO interview highlights future plans",
    alertType: "news",
    time: "3d ago",
  },
];

const RecentAlerts = () => {
  return (
    <div className="w-full border rounded-xl dark:bg-[linear-gradient(135deg,rgba(47,40,32,0.7)_0%,rgba(244,208,63,0.08)_100%)] pt-6 pb-10 px-6  flex flex-col items-center shadow-lg shadow-ring/10 hover:shadow-lg hover:shadow-ring/20  transition-all duration-200 ease-in-out">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl md:text-2xl">Recent Alerts</h1>
        <Bell className="bg-primary/20 size-8 p-1.5 rounded-lg" />
      </div>

      <div className="w-full flex flex-col gap-3 mt-10 max-h-80 overflow-y-auto hidden-scrollbar">
        {RecentAlertsData.map((alert) => (
          <div
            key={alert.id}
            className="px-4 py-2 rounded-xl bg-sidebar-accent/60 border border-border flex gap-4 items-start"
          >
            <MailWarning className="bg-primary size-8 rounded-full p-2 text-white shrink-0" />
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col w-full gap-0.5">
                <h3 className="font-medium text-sm">{alert.alertName}</h3>
                <p className="text-xs  font-light text-muted-foreground/70 ">
                  {alert.alertDetails}
                </p>
              </div>
              <span className="text-muted-foreground/50 text-[10px] font-thin">
                {alert.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAlerts;
