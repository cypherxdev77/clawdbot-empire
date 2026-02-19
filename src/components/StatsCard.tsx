'use client';

type StatsCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
};

export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  const trendIsPositive = trend?.value && trend.value > 0;

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trendIsPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}
          >
            {trendIsPositive ? '+' : ''}{trend.value}%
            <span className="text-gray-600 dark:text-gray-400 ml-1">{trend.label}</span>
          </span>
        )}
      </div>
    </div>
  );
}