import type { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  sublabel?: string;
  color?: 'eco' | 'ocean' | 'amber' | 'red' | 'purple';
  trend?: string;
}

const colorClasses = {
  eco: { bg: 'bg-eco-50', text: 'text-eco-600', ring: 'ring-eco-100' },
  ocean: { bg: 'bg-ocean-50', text: 'text-ocean-600', ring: 'ring-ocean-100' },
  amber: { bg: 'bg-amberx-50', text: 'text-amberx-600', ring: 'ring-amberx-100' },
  red: { bg: 'bg-red-50', text: 'text-red-600', ring: 'ring-red-100' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', ring: 'ring-purple-100' },
};

export default function StatCard({ icon, label, value, sublabel, color = 'eco', trend }: StatCardProps) {
  const c = colorClasses[color];
  return (
    <div className="bg-white rounded-2xl card-shadow border border-slate-100 p-5 transition-all duration-300 hover:card-shadow-lg hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center ring-4 ${c.ring}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-semibold ${c.text} bg-${color === 'eco' ? 'eco' : color === 'ocean' ? 'ocean' : 'amberx'}-50 px-2 py-1 rounded-full`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-800 mt-3 font-display">{value}</p>
      <p className="text-sm text-slate-500 mt-0.5">{label}</p>
      {sublabel && <p className="text-xs text-slate-400 mt-1">{sublabel}</p>}
    </div>
  );
}
