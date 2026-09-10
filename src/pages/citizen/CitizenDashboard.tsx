import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { Link } from 'react-router-dom';
import {
  Package, CheckCircle2, Gift, Leaf, PackagePlus,
  Bell, TrendingUp, Clock, MapPin, ArrowRight,
} from 'lucide-react';

export default function CitizenDashboard() {
  const { currentUser, pickups, notifications } = useApp();
  if (!currentUser) return null;

  const userPickups = pickups.filter((p) => p.citizenId === currentUser.id);
  const completed = userPickups.filter((p) => p.status === 'Completed');
  const active = userPickups.filter((p) => p.status !== 'Completed' && p.status !== 'Cancelled');
  const totalCO2 = completed.reduce((sum, p) => sum + p.co2Saved, 0);
  const userNotifs = notifications.filter((n) => n.userId === currentUser.id);

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">Welcome back, {currentUser.name.split(' ')[0]}! 👋</h2>
        <p className="text-sm text-slate-500 mt-0.5">Here's your recycling impact at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Package className="w-5 h-5" />} label="Total Pickups" value={userPickups.length} color="ocean" />
        <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Completed" value={completed.length} color="eco" />
        <StatCard icon={<Gift className="w-5 h-5" />} label="Reward Points" value={currentUser.rewardPoints || 0} color="amber" />
        <StatCard icon={<Leaf className="w-5 h-5" />} label="CO₂ Saved" value={`${totalCO2.toFixed(1)} kg`} color="eco" />
      </div>

      {/* Book pickup CTA */}
      <Card className="mb-6 overflow-hidden">
        <div className="relative gradient-eco p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white">
            <h3 className="text-xl font-bold font-display">Ready to recycle?</h3>
            <p className="text-eco-50 text-sm mt-1">Schedule a waste pickup in just a few clicks.</p>
          </div>
          <Link to="/citizen/book-pickup">
            <Button className="bg-white text-eco-700 hover:bg-eco-50" size="lg">
              Book Waste Pickup <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current pickup status */}
        <div className="lg:col-span-2">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800">Current Pickup Status</h3>
              <Link to="/citizen/track-pickup"><Button variant="ghost" size="sm">Track <ArrowRight className="w-4 h-4" /></Button></Link>
            </div>
            {active.length === 0 ? (
              <EmptyState
                icon={<PackagePlus className="w-7 h-7" />}
                title="No active pickups"
                description="You don't have any pickups in progress right now."
                action={<Link to="/citizen/book-pickup"><Button size="sm">Book a Pickup</Button></Link>}
              />
            ) : (
              <div className="space-y-3">
                {active.map((pickup) => (
                  <Link key={pickup.id} to="/citizen/track-pickup" className="block">
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-eco-200 hover:bg-eco-50/30 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-eco-50 flex items-center justify-center text-eco-600 shrink-0">
                        <Package className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-slate-800">{pickup.wasteType}</p>
                          <Badge status={pickup.status} />
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{pickup.id} • {pickup.estimatedWeight} kg • {pickup.pickupDate}</p>
                      </div>
                      {pickup.collectorName && (
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-slate-400">Collector</p>
                          <p className="text-sm font-medium text-slate-600">{pickup.collectorName}</p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>

          {/* Recent history */}
          <Card className="p-5 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800">Recent Pickup History</h3>
              <Link to="/citizen/history"><Button variant="ghost" size="sm">View All <ArrowRight className="w-4 h-4" /></Button></Link>
            </div>
            {completed.length === 0 ? (
              <EmptyState title="No completed pickups yet" description="Your completed pickups will appear here." />
            ) : (
              <div className="space-y-2">
                {completed.slice(0, 4).map((pickup) => (
                  <div key={pickup.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-eco-50 flex items-center justify-center text-eco-500 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700">{pickup.wasteType} • {pickup.estimatedWeight} kg</p>
                      <p className="text-xs text-slate-400">{pickup.id} • {pickup.pickupDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-eco-600">+{pickup.rewardPoints} pts</p>
                      <p className="text-[10px] text-slate-400">{pickup.co2Saved} kg CO₂</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Notifications */}
        <div>
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-slate-400" />
              <h3 className="text-base font-bold text-slate-800">Notifications</h3>
            </div>
            {userNotifs.length === 0 ? (
              <EmptyState title="No notifications" />
            ) : (
              <div className="space-y-2">
                {userNotifs.slice(0, 5).map((notif) => (
                  <div key={notif.id} className={`p-3 rounded-xl ${!notif.read ? 'bg-eco-50/40' : 'bg-slate-50'}`}>
                    <p className="text-sm font-semibold text-slate-700">{notif.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{notif.message}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Impact card */}
          <Card className="p-5 mt-6 bg-gradient-to-br from-eco-50 to-ocean-50 border-eco-100">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-eco-600" />
              <h3 className="text-base font-bold text-slate-800">Your Impact</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-slate-500">CO₂ Saved</span>
                  <span className="text-xs font-semibold text-eco-600">{totalCO2.toFixed(1)} kg</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full gradient-eco rounded-full" style={{ width: `${Math.min((totalCO2 / 100) * 100, 100)}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="text-center p-3 bg-white rounded-xl">
                  <Leaf className="w-5 h-5 text-eco-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-slate-800 font-display">{completed.length}</p>
                  <p className="text-[10px] text-slate-400">Trees Equivalent</p>
                </div>
                <div className="text-center p-3 bg-white rounded-xl">
                  <Clock className="w-5 h-5 text-ocean-500 mx-auto mb-1" />
                  <p className="text-lg font-bold text-slate-800 font-display">{completed.length * 3}</p>
                  <p className="text-[10px] text-slate-400">Lives Impacted</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
