import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { sampleMaterials } from '@/data/sampleData';
import { Boxes, Package, Recycle, TrendingUp, ArrowRight, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

const wasteTypeColors: Record<string, string> = {
  Plastic: 'bg-blue-50 text-blue-600',
  Paper: 'bg-amberx-50 text-amberx-600',
  Metal: 'bg-slate-50 text-slate-600',
  'E-Waste': 'bg-red-50 text-red-600',
  Glass: 'bg-cyan-50 text-cyan-600',
  'Mixed Recyclables': 'bg-eco-50 text-eco-600',
};

export default function RecyclerDashboard() {
  const { currentUser, pickups } = useApp();
  if (!currentUser) return null;

  const completed = pickups.filter((p) => p.status === 'Completed');
  const totalMaterial = completed.reduce((sum, p) => sum + p.estimatedWeight, 0);
  const plasticQty = completed.filter((p) => p.wasteType === 'Plastic').reduce((s, p) => s + p.estimatedWeight, 0);
  const paperQty = completed.filter((p) => p.wasteType === 'Paper').reduce((s, p) => s + p.estimatedWeight, 0);
  const metalQty = completed.filter((p) => p.wasteType === 'Metal').reduce((s, p) => s + p.estimatedWeight, 0);
  const eWasteQty = completed.filter((p) => p.wasteType === 'E-Waste').reduce((s, p) => s + p.estimatedWeight, 0);

  return (
    <DashboardLayout title="Dashboard">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">Welcome, {currentUser.name.split(' ')[0]}!</h2>
        <p className="text-sm text-slate-500 mt-0.5">Here's your recycling inventory and activity overview.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Package className="w-5 h-5" />} label="Total Material Received" value={`${totalMaterial} kg`} color="ocean" />
        <StatCard icon={<Recycle className="w-5 h-5" />} label="Available Materials" value={sampleMaterials.filter((m) => m.status === 'available').length} color="eco" />
        <StatCard icon={<Boxes className="w-5 h-5" />} label="Recent Collections" value={completed.length} color="amber" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Active Suppliers" value={2} color="purple" />
      </div>

      {/* Material breakdown */}
      <Card className="p-5 mb-6">
        <h3 className="text-base font-bold text-slate-800 mb-4">Material Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Plastic', value: plasticQty, icon: '🥤' },
            { label: 'Paper', value: paperQty, icon: '📄' },
            { label: 'Metal', value: metalQty, icon: '🔩' },
            { label: 'E-Waste', value: eWasteQty, icon: '💻' },
          ].map((m) => (
            <div key={m.label} className="p-4 rounded-xl bg-slate-50 text-center">
              <div className="text-2xl mb-2">{m.icon}</div>
              <p className="text-xl font-bold text-slate-800 font-display">{m.value} kg</p>
              <p className="text-xs text-slate-400">{m.label}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Available materials */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-800">Available Recyclable Materials</h3>
            <Link to="/recycler/materials"><span className="text-xs text-eco-600 font-medium hover:underline">View All</span></Link>
          </div>
          <div className="space-y-3">
            {sampleMaterials.filter((m) => m.status === 'available').slice(0, 4).map((m) => (
              <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className={`w-10 h-10 rounded-xl ${wasteTypeColors[m.type] || 'bg-slate-50'} flex items-center justify-center`}>
                  <Boxes className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">{m.type}</p>
                  <p className="text-xs text-slate-400">{m.quantity} kg • from {m.source}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-eco-600">₹{m.pricePerKg}/kg</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent collections */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-800">Recent Collections</h3>
            <Link to="/recycler/collections"><span className="text-xs text-eco-600 font-medium hover:underline">View All</span></Link>
          </div>
          <div className="space-y-3">
            {completed.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className={`w-10 h-10 rounded-xl ${wasteTypeColors[p.wasteType] || 'bg-slate-50'} flex items-center justify-center`}>
                  <Recycle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">{p.wasteType} • {p.estimatedWeight} kg</p>
                  <p className="text-xs text-slate-400">{p.id} • {p.collectorName || 'Unknown'}</p>
                </div>
                <Badge variant="success">Received</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
