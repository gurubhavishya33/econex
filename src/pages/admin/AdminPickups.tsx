import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Search, Filter, Package, Calendar, Weight } from 'lucide-react';
import type { PickupStatus } from '@/types';

export default function AdminPickups() {
  const { pickups } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<PickupStatus | 'All'>('All');

  const filters: (PickupStatus | 'All')[] = ['All', 'Pending', 'Accepted', 'On the Way', 'Collected', 'Completed'];
  const filtered = pickups.filter((p) => {
    const matchesSearch = p.id.toLowerCase().includes(search.toLowerCase()) || p.citizenName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout title="Pickups">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">All Pickups</h2>
        <p className="text-sm text-slate-500 mt-0.5">{pickups.length} total pickups across the platform.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input placeholder="Search by ID or citizen name..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-eco-500/30 focus:border-eco-500" />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${filter === f ? 'bg-eco-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>{f}</button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Pickup ID</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 hidden sm:table-cell">Citizen</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 hidden md:table-cell">Waste Type</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 hidden lg:table-cell">Weight</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 hidden lg:table-cell">Date</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-semibold text-slate-700">{p.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell"><span className="text-sm text-slate-600">{p.citizenName}</span></td>
                  <td className="px-4 py-3 hidden md:table-cell"><span className="text-sm text-slate-600">{p.wasteType}</span></td>
                  <td className="px-4 py-3 hidden lg:table-cell"><span className="text-sm text-slate-600">{p.estimatedWeight} kg</span></td>
                  <td className="px-4 py-3 hidden lg:table-cell"><span className="text-sm text-slate-500">{p.pickupDate}</span></td>
                  <td className="px-4 py-3"><Badge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
