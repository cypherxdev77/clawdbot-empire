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
    <div className={cn("bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={cn("text-xs font-medium mt-1", trendUp ? "text-green-600" : "text-red-500")}>
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg bg-vinted/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-vinted" />
        </div>
      </div>
    </div>
  );
}
