"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from 'lucide-react';

const HistoryTab: React.FC = () => {
  return (
    <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Transaction History
        </CardTitle>
        <CardDescription>Complete history of all your trades and transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground py-8">
          Transaction history will be implemented here
        </p>
      </CardContent>
    </Card>
  );
};

export default HistoryTab;