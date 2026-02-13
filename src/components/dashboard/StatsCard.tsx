
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  growth: string;
  icon: LucideIcon;
  className?: string;
}

export default function StatsCard({ label, value, growth, icon: Icon, className }: StatsCardProps) {
  const isLive = growth === "LIVE";

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md hover:-translate-y-1 bg-card border-none shadow-sm", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <Badge 
            variant={isLive ? "default" : "secondary"} 
            className={cn(
              "text-[10px] font-bold px-1.5 py-0.5",
              isLive ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-green-100 text-green-700 hover:bg-green-100"
            )}
          >
            {growth}
          </Badge>
        </div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-foreground">{value}</h3>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
