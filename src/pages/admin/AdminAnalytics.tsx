import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import StatCard from '@/components/ui/StatCard';
import { weeklyPickupData, wasteByCategory, monthlyRecyclingData } from '@/data/sampleData';
import { Users, Package, TrendingUp, Leaf, BarChart3, Activity, IndianRupee } from 'lucide-react';

export default function AdminAnalytics() {
  const { users, pickups } = useApp();
  const completed = pickups.filter((p) => p.status === 'Completed');
  const totalCO2 = completed.reduce((s, p) => s + p.co2Saved, 0);
  const totalWaste = completed.reduce((s, p) => s + p.estimatedWeight, 0);
  const totalEarnings = users.filter((u) => u.role === 'kabadiwala').reduce((s, u) => s + (u.earnings || 0), 0);

  const maxWeekly = Math.max(...weeklyPickupData.map((d) => d.count));
  const maxMonthly = Math.max(...monthlyRecyclingData.map((d) => d.value));
  const totalCategory = wasteByCategory.reduce((s, c) => s + c.count, 0);

  return (
    <DashboardLayout title="Analytics">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">Platform Analytics</h2>
        <p className="text-sm text-slate-500 mt-0.5">Comprehensive insights across the EcoNex ecosystem.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Users className="w-5 h-5" />} label="Total Users" value={users.length} color="ocean" />
        <StatCard icon={<Package className="w-5 h-5" />} label="Total Pickups" value={pickups.length} color="amber" />
        <StatCard icon={<Leaf className="w-5 h-5" />} label="CO₂ Saved" value={`${totalCO2.toFixed(1)} kg`} color="eco" />
        <StatCard icon={<IndianRupee className="w-5 h-5" />} label="Total Earnings" value={`₹${totalEarnings.toLocaleString()}`} color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-eco-500" /> Weekly Pickup Trends
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

        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4">Waste Category Distribution</h3>
          <div className="space-y-3">
            {wasteByCategory.map((c) => (
              <div key={c.type}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-600">{c.type}</span>
                  <span className="text-sm font-bold text-slate-700">{c.count} ({Math.round((c.count / totalCategory) * 100)}%)</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(c.count / totalCategory) * 100}%`, backgroundColor: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5 mb-6">
        <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-eco-500" /> Monthly Recycling Activity (kg)
        </h3>
        <div className="flex items-end justify-between gap-3 h-48">
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center bg-gradient-to-br from-eco-50 to-eco-100 border-eco-100">
          <Activity className="w-5 h-5 text-eco-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-800 font-display">{completed.length}</p>
          <p className="text-xs text-slate-400">Completed Pickups</p>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-ocean-50 to-ocean-100 border-ocean-100">
          <Package className="w-5 h-5 text-ocean-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-800 font-display">{totalWaste} kg</p>
          <p className="text-xs text-slate-400">Waste Collected</p>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-amberx-50 to-amberx-100 border-amberx-100">
          <Leaf className="w-5 h-5 text-amberx-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-800 font-display">{totalCO2.toFixed(1)} kg</p>
          <p className="text-xs text-slate-400">CO₂ Reduced</p>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-100">
          <IndianRupee className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <p className="text-lg font-bold text-slate-800 font-display">₹{(totalEarnings / 1000).toFixed(1)}K</p>
          <p className="text-xs text-slate-400">Earnings Paid</p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
