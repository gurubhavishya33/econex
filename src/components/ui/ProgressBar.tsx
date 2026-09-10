interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showValue?: boolean;
  color?: 'eco' | 'ocean' | 'amber';
}

export default function ProgressBar({ value, max, label, showValue = true, color = 'eco' }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const colorClasses = {
    eco: 'from-eco-400 to-eco-600',
    ocean: 'from-ocean-400 to-ocean-600',
    amber: 'from-amberx-400 to-amberx-600',
  };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-medium text-slate-500">{label}</span>}
          {showValue && <span className="text-xs font-semibold text-slate-600">{value} / {max}</span>}
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
