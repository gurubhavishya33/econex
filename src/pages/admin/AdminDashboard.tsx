import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { weeklyPickupData, wasteByCategory, monthlyRecyclingData } from '@/data/sampleData';
import {
  Users, Package, CheckCircle2, Leaf, IndianRupee,
  TrendingUp, BarChart3, User, Truck, Recycle, ClipboardList,
} from 'lucide-react';

export default function AdminDashboard() {
  const { users, pickups } = useApp();

  const citizens = users.filter((u) => u.role === 'citizen');
  const collectors = users.filter((u) => u.role === 'kabadiwala');
  const recyclers = users.filter((u) => u.role === 'recycler');
  const completed = pickups.filter((p) => p.status === 'Completed');
  const totalWaste = completed.reduce((s, p) => s + p.estimatedWeight, 0);
  const totalCO2 = completed.reduce((s, p) => s + p.co2Saved, 0);
  const totalEarnings = collectors.reduce((s, u) => s + (u.earnings || 0), 0);
  const maxWeekly = Math.max(...weeklyPickupData.map((d) => d.count));
  const maxMonthly = Math.max(...monthlyRecyclingData.map((d) => d.value));
  const totalCategory = wasteByCategory.reduce((s, c) => s + c.count, 0);

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">Platform Overview</h2>
        <p className="text-sm text-slate-500 mt-0.5">Real-time analytics across the EcoNex network.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Users className="w-5 h-5" />} label="Total Users" value={users.length} color="ocean" />
        <StatCard icon={<Package className="w-5 h-5" />} label="Total Pickups" value={pickups.length} color="amber" />
        <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Completed Pickups" value={completed.length} color="eco" />
        <StatCard icon={<Leaf className="w-5 h-5" />} label="CO₂ Reduction" value={`${totalCO2.toFixed(1)} kg`} color="eco" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<User className="w-5 h-5" />} label="Citizens" value={citizens.length} color="ocean" />
        <StatCard icon={<Truck className="w-5 h-5" />} label="Collectors" value={collectors.length} color="amber" />
        <StatCard icon={<Recycle className="w-5 h-5" />} label="Recyclers" value={recyclers.length} color="eco" />
        <StatCard icon={<IndianRupee className="w-5 h-5" />} label="Collector Earnings" value={`₹${totalEarnings.toLocaleString()}`} color="purple" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly pickups */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-eco-500" /> Weekly Pickups
          </h3>
          <div className="flex items-end justify-between gap-3 h-48">
            {weeklyPickupData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex-1 flex items-end">
                  <div className="w-full rounded-t-lg gradient-eco transition-all duration-500 hover:opacity-80 relative group" style={{ height: `${(d.count / maxWeekly) * 100}%` }}>
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">{d.count}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium">{d.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Waste by category */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4">Waste by Category</h3>
          <div className="space-y-3">
            {wasteByCategory.map((c) => (
              <div key={c.type}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-600">{c.type}</span>
                  <span className="text-sm font-bold text-slate-700">{c.count}</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(c.count / totalCategory) * 100}%`, backgroundColor: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly recycling */}
      <Card className="p-5 mb-6">
        <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-eco-500" /> Monthly Recycling Activity
        </h3>
        <div className="flex items-end justify-between gap-3 h-40">
          {monthlyRecyclingData.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex-1 flex items-end">
                <div className="w-full rounded-t-lg gradient-ocean transition-all duration-500 hover:opacity-80 relative group" style={{ height: `${(d.value / maxMonthly) * 100}%` }}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">{d.value} kg</span>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">{d.month}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent pickups + User management */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-eco-500" /> Recent Pickup Requests
          </h3>
          <div className="space-y-2">
            {pickups.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700">{p.id} — {p.wasteType}</p>
                  <p className="text-xs text-slate-400">{p.citizenName} • {p.pickupDate}</p>
                </div>
                <Badge status={p.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-eco-500" /> User Management
          </h3>
          <div className="space-y-2">
            {users.slice(0, 5).map((u) => (
              <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-9 h-9 rounded-full gradient-eco flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {u.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{u.name}</p>
                  <p className="text-xs text-slate-400 capitalize">{u.role}</p>
                </div>
                <Badge variant={u.status === 'active' ? 'success' : 'danger'}>{u.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
