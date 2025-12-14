"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';

const PerformanceTab: React.FC = () => {
  return (
    <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Performance Analysis
        </CardTitle>
        <CardDescription>Track your portfolio performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground py-8">
          Performance charts and metrics will be implemented here
        </p>
      </CardContent>
    </Card>
  );
};

export default PerformanceTab;