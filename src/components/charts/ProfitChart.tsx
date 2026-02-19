"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { monthlyProfitData } from "@/lib/mock-data";
import { useEffect, useState } from "react";

export function ProfitChart() {
  const [chartHeight, setChartHeight] = useState(300);

  useEffect(() => {
    const update = () => setChartHeight(window.innerWidth < 768 ? 220 : 300);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Évolution des profits</h3>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <LineChart data={monthlyProfitData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" width={40} />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }}
            formatter={(value: number, name: string) => [`${value} €`, name === 'profit' ? 'Profit' : 'CA']}
          />
          <Legend formatter={(value) => value === 'profit' ? 'Profit net' : 'Chiffre d\'affaires'} />
          <Line type="monotone" dataKey="ca" stroke="#d1d5db" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="profit" stroke="#09B1BA" strokeWidth={2.5} dot={{ r: 3, fill: '#09B1BA' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
