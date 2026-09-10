import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { Recycle, Package, Calendar, Weight } from 'lucide-react';

export default function Collections() {
  const { pickups } = useApp();
  const completed = pickups.filter((p) => p.status === 'Completed');

  return (
    <DashboardLayout title="Collections">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">Recent Collections</h2>
        <p className="text-sm text-slate-500 mt-0.5">{completed.length} collections received from collectors.</p>
      </div>

      {completed.length === 0 ? (
        <Card className="p-6">
          <EmptyState icon={<Recycle className="w-7 h-7" />} title="No collections yet" description="Collections from completed pickups will appear here." />
        </Card>
      ) : (
        <div className="space-y-3">
          {completed.map((p) => (
            <Card key={p.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-eco-50 flex items-center justify-center text-eco-600 shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-slate-800">{p.id}</p>
                    <Badge variant="success">Received</Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> {p.wasteType}</span>
                    <span className="flex items-center gap-1"><Weight className="w-3.5 h-3.5" /> {p.estimatedWeight} kg</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {p.pickupDate}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Collector: {p.collectorName || 'N/A'} • Citizen: {p.citizenName}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-eco-600">₹{p.estimatedWeight * 15}</p>
                  <p className="text-[10px] text-slate-400">value</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
