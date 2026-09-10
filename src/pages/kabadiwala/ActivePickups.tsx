import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { Link } from 'react-router-dom';
import { Package, Truck, ArrowRight, Clock, MapPin } from 'lucide-react';

export default function ActivePickups() {
  const { currentUser, pickups } = useApp();
  if (!currentUser) return null;

  const active = pickups.filter(
    (p) => p.collectorId === currentUser.id && (p.status === 'Accepted' || p.status === 'On the Way' || p.status === 'Collected')
  );

  return (
    <DashboardLayout title="Active Pickups">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">Active Pickups</h2>
        <p className="text-sm text-slate-500 mt-0.5">{active.length} pickups currently in progress.</p>
      </div>

      {active.length === 0 ? (
        <Card className="p-6">
          <EmptyState icon={<Truck className="w-7 h-7" />} title="No active pickups" description="Accept a pickup request to see it here." />
        </Card>
      ) : (
        <div className="space-y-3">
          {active.map((p) => (
            <Card key={p.id} hover className="p-4">
              <Link to={`/kabadiwala/pickup/${p.id}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-ocean-50 flex items-center justify-center text-ocean-600 shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-800">{p.id}</p>
                      <Badge status={p.status} />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{p.citizenName} • {p.wasteType} • {p.estimatedWeight} kg</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {p.pickupDate} {p.pickupTime}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {p.distance} km</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
