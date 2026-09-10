import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import StatCard from '@/components/ui/StatCard';
import { useApp } from '@/context/AppContext';
import { sampleMaterials, monthlyRecyclingData } from '@/data/sampleData';
import { TrendingUp, Package, Recycle, IndianRupee, BarChart3 } from 'lucide-react';

export default function RecyclerAnalytics() {
  const { pickups } = useApp();
  const completed = pickups.filter((p) => p.status === 'Completed');
  const totalReceived = completed.reduce((s, p) => s + p.estimatedWeight, 0);
  const totalValue = sampleMaterials.reduce((s, m) => s + m.quantity * m.pricePerKg, 0);
  const maxMonthly = Math.max(...monthlyRecyclingData.map((d) => d.value));

  const wasteBreakdown = [
    { type: 'Plastic', qty: completed.filter((p) => p.wasteType === 'Plastic').reduce((s, p) => s + p.estimatedWeight, 0), color: 'bg-blue-500' },
    { type: 'Paper', qty: completed.filter((p) => p.wasteType === 'Paper').reduce((s, p) => s + p.estimatedWeight, 0), color: 'bg-amberx-500' },
    { type: 'Metal', qty: completed.filter((p) => p.wasteType === 'Metal').reduce((s, p) => s + p.estimatedWeight, 0), color: 'bg-slate-500' },
    { type: 'E-Waste', qty: completed.filter((p) => p.wasteType === 'E-Waste').reduce((s, p) => s + p.estimatedWeight, 0), color: 'bg-red-500' },
    { type: 'Glass', qty: completed.filter((p) => p.wasteType === 'Glass').reduce((s, p) => s + p.estimatedWeight, 0), color: 'bg-cyan-500' },
  ];
  const totalBreakdown = wasteBreakdown.reduce((s, w) => s + w.qty, 0) || 1;

  return (
    <DashboardLayout title="Analytics">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">Recycling Analytics</h2>
        <p className="text-sm text-slate-500 mt-0.5">Insights into your recycling operations.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Package className="w-5 h-5" />} label="Total Received" value={`${totalReceived} kg`} color="ocean" />
        <StatCard icon={<Recycle className="w-5 h-5" />} label="Materials Processed" value={sampleMaterials.length} color="eco" />
        <StatCard icon={<IndianRupee className="w-5 h-5" />} label="Total Value" value={`₹${totalValue.toLocaleString()}`} color="amber" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Growth Rate" value="+22%" color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly recycling chart */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-eco-500" /> Monthly Recycling Activity
          </h3>
          <div className="flex items-end justify-between gap-3 h-48">
            {monthlyRecyclingData.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex-1 flex items-end">
                  <div className="w-full rounded-t-lg gradient-eco transition-all duration-500 hover:opacity-80 relative group" style={{ height: `${(d.value / maxMonthly) * 100}%` }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">{d.value} kg</span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Waste breakdown */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4">Waste by Category</h3>
          <div className="space-y-3">
            {wasteBreakdown.map((w) => (
              <div key={w.type}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-600">{w.type}</span>
                  <span className="text-sm font-bold text-slate-700">{w.qty} kg</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${w.color} rounded-full transition-all duration-500`} style={{ width: `${(w.qty / totalBreakdown) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Summary cards */}
      <Card className="p-5 mt-6 bg-gradient-to-br from-eco-50 to-ocean-50 border-eco-100">
        <h3 className="text-base font-bold text-slate-800 mb-4">Operational Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Avg Processing Time', value: '2.5 days' },
            { label: 'Active Suppliers', value: '2' },
            { label: 'Capacity Utilization', value: '78%' },
            { label: 'Quality Rate', value: '96%' },
          ].map((s) => (
            <div key={s.label} className="p-3 bg-white rounded-xl text-center">
              <p className="text-lg font-bold text-slate-800 font-display">{s.value}</p>
              <p className="text-[10px] text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
