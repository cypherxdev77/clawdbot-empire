"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { topBrandsData } from "@/lib/mock-data";
import { useEffect, useState } from "react";

const COLORS = ['#09B1BA', '#f59e0b', '#8b5cf6', '#ef4444', '#22c55e'];

export function MarginDistribution() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Top marques par ventes</h3>
      <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
        <PieChart>
          <Pie
            data={topBrandsData}
            cx="50%"
            cy="50%"
            innerRadius={isMobile ? 45 : 60}
            outerRadius={isMobile ? 80 : 100}
            dataKey="sales"
            nameKey="brand"
            paddingAngle={3}
          >
            {topBrandsData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }}
            formatter={(value: number) => [`${value} ventes`]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
