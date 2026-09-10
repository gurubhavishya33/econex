import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import StatCard from '@/components/ui/StatCard';
import ProgressBar from '@/components/ui/ProgressBar';
import { IndianRupee, TrendingUp, Calendar, Award, Wallet, Target } from 'lucide-react';

export default function Earnings() {
  const { currentUser, pickups } = useApp();
  if (!currentUser) return null;

  const myCompleted = pickups.filter((p) => p.collectorId === currentUser.id && p.status === 'Completed');
  const totalEarnings = (currentUser.earnings || 0);
  const monthlyEarnings = myCompleted.reduce((sum, p) => sum + p.estimatedWeight * 15, 0);
  const todayEarnings = myCompleted
    .filter((p) => p.completedAt && new Date(p.completedAt).toDateString() === new Date().toDateString())
    .reduce((sum, p) => sum + p.estimatedWeight * 15, 0);
  const monthlyTarget = 30000;
  const avgPerPickup = myCompleted.length > 0 ? Math.round(monthlyEarnings / myCompleted.length) : 0;

  const weeklyData = [
    { day: 'Mon', amount: 450 },
    { day: 'Tue', amount: 620 },
    { day: 'Wed', amount: 380 },
    { day: 'Thu', amount: 750 },
    { day: 'Fri', amount: 900 },
    { day: 'Sat', amount: 680 },
    { day: 'Sun', amount: 320 },
  ];
  const maxAmount = Math.max(...weeklyData.map((d) => d.amount));

  return (
    <DashboardLayout title="Earnings">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">Earnings Overview</h2>
        <p className="text-sm text-slate-500 mt-0.5">Track your income from waste collection.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Wallet className="w-5 h-5" />} label="Today" value={`₹${todayEarnings}`} color="eco" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="This Month" value={`₹${monthlyEarnings.toLocaleString()}`} color="ocean" />
        <StatCard icon={<IndianRupee className="w-5 h-5" />} label="Total Earned" value={`₹${totalEarnings.toLocaleString()}`} color="amber" />
        <StatCard icon={<Target className="w-5 h-5" />} label="Avg / Pickup" value={`₹${avgPerPickup}`} color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly chart */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-eco-500" /> Weekly Earnings
          </h3>
          <div className="flex items-end justify-between gap-2 h-48">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className="w-full rounded-t-lg gradient-eco transition-all duration-500 hover:opacity-80 relative group"
                    style={{ height: `${(d.amount / maxAmount) * 100}%` }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">₹{d.amount}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium">{d.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly target */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-eco-500" /> Monthly Target
          </h3>
          <div className="text-center py-4">
            <p className="text-4xl font-extrabold text-gradient-eco font-display">₹{monthlyEarnings.toLocaleString()}</p>
            <p className="text-sm text-slate-400 mt-1">of ₹{monthlyTarget.toLocaleString()} target</p>
          </div>
          <ProgressBar value={monthlyEarnings} max={monthlyTarget} color="eco" showValue={false} />
          <p className="text-xs text-slate-400 mt-2 text-center">
            {monthlyEarnings >= monthlyTarget ? 'Target achieved! Amazing work!' : `₹${monthlyTarget - monthlyEarnings} to reach your target`}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="p-3 rounded-xl bg-eco-50 text-center">
              <Award className="w-5 h-5 text-eco-500 mx-auto mb-1" />
              <p className="text-sm font-bold text-slate-700">{myCompleted.length}</p>
              <p className="text-[10px] text-slate-400">Pickups Done</p>
            </div>
            <div className="p-3 rounded-xl bg-ocean-50 text-center">
              <TrendingUp className="w-5 h-5 text-ocean-500 mx-auto mb-1" />
              <p className="text-sm font-bold text-slate-700">+18%</p>
              <p className="text-[10px] text-slate-400">vs Last Month</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent transactions */}
      <Card className="p-5 mt-6">
        <h3 className="text-base font-bold text-slate-800 mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {myCompleted.slice(0, 6).map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-eco-50 flex items-center justify-center text-eco-500 shrink-0">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-700">{p.id} — {p.wasteType}</p>
                <p className="text-xs text-slate-400">{p.citizenName} • {p.pickupDate}</p>
              </div>
              <p className="text-sm font-bold text-eco-600">+₹{p.estimatedWeight * 15}</p>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}
