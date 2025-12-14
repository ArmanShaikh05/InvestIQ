"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';

const AnalyticsTab: React.FC = () => {
  return (
    <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Advanced Analytics
        </CardTitle>
        <CardDescription>Deep insights into your investment strategy</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground py-8">
          Analytics dashboard will be implemented here
        </p>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTab;