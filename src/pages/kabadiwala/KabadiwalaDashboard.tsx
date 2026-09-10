import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { Link } from 'react-router-dom';
import {
  Package, ClipboardList, CheckCircle2, IndianRupee,
  TrendingUp, MapPin, Weight, Clock, ArrowRight, Truck,
} from 'lucide-react';

export default function KabadiwalaDashboard() {
  const { currentUser, pickups } = useApp();
  if (!currentUser) return null;

  const myPickups = pickups.filter((p) => p.collectorId === currentUser.id);
  const pending = pickups.filter((p) => p.status === 'Pending');
  const active = myPickups.filter((p) => p.status === 'Accepted' || p.status === 'On the Way' || p.status === 'Collected');
  const completed = myPickups.filter((p) => p.status === 'Completed');
  const todayEarnings = completed
    .filter((p) => p.completedAt && new Date(p.completedAt).toDateString() === new Date().toDateString())
    .reduce((sum, p) => sum + p.estimatedWeight * 15, 0);
  const monthlyEarnings = myPickups
    .filter((p) => p.status === 'Completed')
    .reduce((sum, p) => sum + p.estimatedWeight * 15, 0);

  return (
    <DashboardLayout title="Dashboard">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">Welcome, {currentUser.name.split(' ')[0]}!</h2>
        <p className="text-sm text-slate-500 mt-0.5">You have {pending.length} new pickup requests waiting.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Package className="w-5 h-5" />} label="Total Pickups" value={myPickups.length} color="ocean" />
        <StatCard icon={<ClipboardList className="w-5 h-5" />} label="Pending Requests" value={pending.length} color="amber" />
        <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Completed" value={completed.length} color="eco" />
        <StatCard icon={<IndianRupee className="w-5 h-5" />} label="Today's Earnings" value={`₹${todayEarnings}`} color="eco" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Available requests */}
        <div className="lg:col-span-2">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800">Available Pickup Requests</h3>
              <Link to="/kabadiwala/requests"><span className="text-xs text-eco-600 font-medium hover:underline">View All</span></Link>
            </div>
            {pending.length === 0 ? (
              <EmptyState icon={<ClipboardList className="w-7 h-7" />} title="No new requests" description="Check back later for new pickup requests." />
            ) : (
              <div className="space-y-3">
                {pending.slice(0, 4).map((p) => (
                  <Link key={p.id} to={`/kabadiwala/pickup/${p.id}`} className="block">
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-eco-200 hover:bg-eco-50/30 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-amberx-50 flex items-center justify-center text-amberx-600 shrink-0">
                        <Package className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800">{p.citizenName}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> {p.wasteType}</span>
                          <span className="flex items-center gap-1"><Weight className="w-3.5 h-3.5" /> {p.estimatedWeight} kg</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {p.distance} km</span>
                        </div>
                      </div>
                      <Badge status={p.status} />
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Active pickups + earnings */}
        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800">Active Pickups</h3>
              <Link to="/kabadiwala/active"><span className="text-xs text-eco-600 font-medium hover:underline">View</span></Link>
            </div>
            {active.length === 0 ? (
              <EmptyState icon={<Truck className="w-7 h-7" />} title="No active pickups" />
            ) : (
              <div className="space-y-2">
                {active.map((p) => (
                  <Link key={p.id} to={`/kabadiwala/pickup/${p.id}`} className="block">
                    <div className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-700">{p.id}</p>
                        <Badge status={p.status} />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{p.citizenName} • {p.wasteType}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-5 bg-gradient-to-br from-eco-50 to-ocean-50 border-eco-100">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-eco-600" />
              <h3 className="text-base font-bold text-slate-800">Earnings</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                <span className="text-sm text-slate-500">Today</span>
                <span className="text-lg font-bold text-eco-600 font-display">₹{todayEarnings}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                <span className="text-sm text-slate-500">This Month</span>
                <span className="text-lg font-bold text-eco-600 font-display">₹{monthlyEarnings.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                <span className="text-sm text-slate-500">Total</span>
                <span className="text-lg font-bold text-slate-800 font-display">₹{(currentUser.earnings || 0).toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
