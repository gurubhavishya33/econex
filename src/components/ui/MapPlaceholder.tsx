import { MapPin } from 'lucide-react';

interface MapPlaceholderProps {
  address?: string;
  height?: string;
  label?: string;
}

export default function MapPlaceholder({ address, height = 'h-48', label = 'Pickup Location' }: MapPlaceholderProps) {
  return (
    <div className={`relative ${height} rounded-xl overflow-hidden bg-slate-100 border border-slate-200`}>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(22,163,74,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(22,163,74,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-eco-500 flex items-center justify-center text-white shadow-lg shadow-eco-500/30 animate-pulse-soft">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-eco-500 rounded-full opacity-30 animate-ping" />
        </div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        {address && <p className="text-xs text-slate-400 max-w-xs text-center px-4">{address}</p>}
      </div>
    </div>
  );
}
