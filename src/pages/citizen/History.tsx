import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { Package, Calendar, Weight, Award, Leaf, PackagePlus, Filter } from 'lucide-react';
import { useState } from 'react';
import type { PickupStatus } from '@/types';

export default function History() {
  const { currentUser, pickups } = useApp();
  const [filter, setFilter] = useState<PickupStatus | 'All'>('All');

  if (!currentUser) return null;

  const userPickups = pickups.filter((p) => p.citizenId === currentUser.id);
  const filtered = filter === 'All' ? userPickups : userPickups.filter((p) => p.status === filter);
  const completed = userPickups.filter((p) => p.status === 'Completed');
  const totalCO2 = completed.reduce((sum, p) => sum + p.co2Saved, 0);
  const totalPoints = completed.reduce((sum, p) => sum + p.rewardPoints, 0);

  const filters: (PickupStatus | 'All')[] = ['All', 'Pending', 'Accepted', 'On the Way', 'Collected', 'Completed'];

  return (
    <DashboardLayout title="Pickup History">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 text-center">
          <Package className="w-5 h-5 text-ocean-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-800 font-display">{userPickups.length}</p>
          <p className="text-xs text-slate-400">Total Pickups</p>
        </Card>
        <Card className="p-4 text-center">
          <Leaf className="w-5 h-5 text-eco-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-800 font-display">{totalCO2.toFixed(1)}</p>
          <p className="text-xs text-slate-400">kg CO₂ Saved</p>
        </Card>
        <Card className="p-4 text-center">
          <Award className="w-5 h-5 text-amberx-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-800 font-display">{totalPoints}</p>
          <p className="text-xs text-slate-400">Points Earned</p>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filter === f ? 'bg-eco-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <Card className="p-6">
          <EmptyState
            icon={<Package className="w-7 h-7" />}
            title="No pickups found"
            description="Try a different filter or book your first pickup."
            action={<Link to="/citizen/book-pickup"><Button size="sm"><PackagePlus className="w-4 h-4" /> Book Pickup</Button></Link>}
          />
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((pickup) => (
            <Card key={pickup.id} hover className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-eco-50 flex items-center justify-center text-eco-600 shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-slate-800">{pickup.id}</p>
                    <Badge status={pickup.status} />
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> {pickup.wasteType}</span>
                    <span className="flex items-center gap-1"><Weight className="w-3.5 h-3.5" /> {pickup.estimatedWeight} kg</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {pickup.pickupDate}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 truncate">{pickup.address}</p>
                </div>
                {pickup.status === 'Completed' && (
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-eco-600">+{pickup.rewardPoints}</p>
                    <p className="text-[10px] text-slate-400">points</p>
                    <p className="text-[10px] text-eco-500 mt-1">{pickup.co2Saved} kg CO₂</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
