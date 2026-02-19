"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { monthlyProfitData } from "@/lib/mock-data";

export function ProfitChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Évolution des profits</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyProfitData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }}
            formatter={(value: number, name: string) => [`${value} €`, name === 'profit' ? 'Profit' : 'CA']}
          />
          <Legend formatter={(value) => value === 'profit' ? 'Profit net' : 'Chiffre d\'affaires'} />
          <Line type="monotone" dataKey="ca" stroke="#d1d5db" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="profit" stroke="#09B1BA" strokeWidth={2.5} dot={{ r: 4, fill: '#09B1BA' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
