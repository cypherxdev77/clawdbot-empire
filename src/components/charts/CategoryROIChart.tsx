"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { categoryROIData } from "@/lib/mock-data";

const COLORS = ['#09B1BA', '#078A91', '#0CD4DF', '#06696E', '#14D3DD'];

export function CategoryROIChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">ROI par catégorie (%)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={categoryROIData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="category" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13 }}
            formatter={(value: number) => [`${value}%`, 'ROI']}
          />
          <Bar dataKey="roi" radius={[6, 6, 0, 0]}>
            {categoryROIData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
