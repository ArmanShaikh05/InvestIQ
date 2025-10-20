"use client";

import React, { useState } from "react";
import { MultiStepLoader } from "./pro-mode-loader";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabItems = [
  { value: "simple", label: "Simple" },
  { value: "pro", label: "Pro" },
];

const ToggleToProMode = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("simple");

  const changeMode = (mode: string) => {
    setLoading(true);
    setTimeout(() => {
      setActiveTab(mode);
      setLoading(false);
    }, 4000);
  };

  return (
    <div>
      <Tabs
        defaultValue={activeTab}
        onValueChange={(value) => changeMode(value)}
        className="bg-muted/30 inline-block rounded-full p-1 shadow-sm"
      >
        <TabsList className="bg-transparent">
          {tabItems.map((item, index) => (
            <TabsTrigger
              key={index}
              value={item.value}
              className="data-[state=active]:!bg-sidebar-accent rounded-full w-20 sm:w-24 lg:w-32 cursor-pointer data-[state=active]:cursor-default"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <MultiStepLoader loading={loading} setLoading={setLoading} />
    </div>
  );
};

export default ToggleToProMode;
