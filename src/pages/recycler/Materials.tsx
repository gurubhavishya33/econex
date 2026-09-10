import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { sampleMaterials } from '@/data/sampleData';
import { Boxes, IndianRupee, Package, Filter, ArrowRight } from 'lucide-react';
import type { WasteType } from '@/types';

const wasteTypeColors: Record<string, string> = {
  Plastic: 'bg-blue-50 text-blue-600',
  Paper: 'bg-amberx-50 text-amberx-600',
  Metal: 'bg-slate-50 text-slate-600',
  'E-Waste': 'bg-red-50 text-red-600',
  Glass: 'bg-cyan-50 text-cyan-600',
  'Mixed Recyclables': 'bg-eco-50 text-eco-600',
};

const statusVariant: Record<string, 'success' | 'info' | 'default'> = {
  available: 'success', processing: 'info', sold: 'default',
};

export default function Materials() {
  const [filter, setFilter] = useState<WasteType | 'All'>('All');

  const filters: (WasteType | 'All')[] = ['All', 'Plastic', 'Paper', 'Metal', 'E-Waste', 'Glass', 'Mixed Recyclables'];
  const filtered = filter === 'All' ? sampleMaterials : sampleMaterials.filter((m) => m.type === filter);
  const totalValue = sampleMaterials.reduce((sum, m) => sum + m.quantity * m.pricePerKg, 0);

  return (
    <DashboardLayout title="Materials">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <Package className="w-5 h-5 text-ocean-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-slate-800 font-display">{sampleMaterials.length}</p>
          <p className="text-xs text-slate-400">Total Materials</p>
        </Card>
        <Card className="p-4 text-center">
          <Boxes className="w-5 h-5 text-eco-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-slate-800 font-display">{sampleMaterials.reduce((s, m) => s + m.quantity, 0)} kg</p>
          <p className="text-xs text-slate-400">Total Quantity</p>
        </Card>
        <Card className="p-4 text-center">
          <IndianRupee className="w-5 h-5 text-amberx-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-slate-800 font-display">₹{totalValue.toLocaleString()}</p>
          <p className="text-xs text-slate-400">Total Value</p>
        </Card>
        <Card className="p-4 text-center">
          <Package className="w-5 h-5 text-purple-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-slate-800 font-display">{sampleMaterials.filter((m) => m.status === 'available').length}</p>
          <p className="text-xs text-slate-400">Available</p>
        </Card>
      </div>

      <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${filter === f ? 'bg-eco-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((m) => (
          <Card key={m.id} className="p-5 hover:card-shadow-lg transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl ${wasteTypeColors[m.type] || 'bg-slate-50'} flex items-center justify-center`}>
                <Boxes className="w-5 h-5" />
              </div>
              <Badge variant={statusVariant[m.status]}>{m.status}</Badge>
            </div>
            <h4 className="text-base font-bold text-slate-800">{m.type}</h4>
            <p className="text-xs text-slate-400 mt-0.5">From {m.source}</p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="p-2 rounded-lg bg-slate-50 text-center">
                <p className="text-sm font-bold text-slate-700">{m.quantity} {m.unit}</p>
                <p className="text-[10px] text-slate-400">Quantity</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 text-center">
                <p className="text-sm font-bold text-eco-600">₹{m.pricePerKg}/{m.unit}</p>
                <p className="text-[10px] text-slate-400">Price</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Received: {m.date}</p>
            {m.status === 'available' && (
              <Button size="sm" fullWidth className="mt-3">
                Request Purchase <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
