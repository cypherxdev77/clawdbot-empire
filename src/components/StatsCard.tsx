"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatsCard({ label, value, icon: Icon, trend, trendUp, className }: StatsCardProps) {
  return (
    <div className={cn("bg-white rounded-xl border border-gray-200 p-3 md:p-5 hover:shadow-md transition-shadow", className)}>
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs md:text-sm text-gray-500 font-medium truncate">{label}</p>
          <p className="text-lg md:text-2xl font-bold text-gray-900 mt-1 truncate">{value}</p>
          {trend && (
            <p className={cn("text-xs font-medium mt-1", trendUp ? "text-green-600" : "text-red-500")}>
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-vinted/10 flex items-center justify-center shrink-0 ml-2">
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-vinted" />
        </div>
      </div>
    </div>
  );
}
