
"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, Users, ArrowUpRight } from "lucide-react";
import { Problem } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ProblemCardProps {
  problem: Problem;
}

export default function ProblemCard({ problem }: ProblemCardProps) {
  const statusColors = {
    CRITICAL: "bg-red-100 text-red-700 border-red-200",
    WARNING: "bg-orange-100 text-orange-700 border-orange-200",
    NORMAL: "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card border border-border shadow-sm">
      <CardHeader className="p-5 pb-2">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className={cn("text-[10px] font-bold px-2", statusColors[problem.status])}>
            {problem.status}
          </Badge>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
            <MapPin className="h-3 w-3" />
            {problem.location}
          </div>
        </div>
        {problem.escalating && (
          <div className="flex items-center gap-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">
            <TrendingUp className="h-3 w-3" />
            Escalating
          </div>
        )}
        <h3 className="text-lg font-bold leading-tight mt-1 group-hover:text-primary transition-colors">
          {problem.title}
        </h3>
      </CardHeader>
      
      <CardContent className="p-5 pt-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {problem.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <div className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Impacted</div>
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              <Users className="h-4 w-4 text-primary" />
              {problem.impact}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground font-bold uppercase mb-1">Trend</div>
            <div className="flex items-end gap-1 h-6">
              {problem.trend.map((val, i) => (
                <div 
                  key={i} 
                  className="w-1.5 bg-primary/20 rounded-full transition-all hover:bg-primary"
                  style={{ height: `${(val / Math.max(...problem.trend)) * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {problem.tags.map((tag) => (
            <span key={tag} className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
        <Button variant="outline" size="sm" className="w-full group/btn hover:bg-primary hover:text-white transition-all">
          Details
          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
