"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from 'lucide-react';

const HoldingsTab: React.FC = () => {
  return (
    <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          All Holdings
        </CardTitle>
        <CardDescription>Complete view of your stock positions</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground py-8">
          Holdings content will be implemented here
        </p>
      </CardContent>
    </Card>
  );
};

export default HoldingsTab;