import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { Link } from 'react-router-dom';
import { Package, MapPin, Weight, Clock, ArrowRight, ClipboardList } from 'lucide-react';

export default function PickupRequests() {
  const { pickups } = useApp();
  const pending = pickups.filter((p) => p.status === 'Pending');

  return (
    <DashboardLayout title="Pickup Requests">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">Available Requests</h2>
        <p className="text-sm text-slate-500 mt-0.5">{pending.length} pickup requests waiting to be accepted.</p>
      </div>

      {pending.length === 0 ? (
        <Card className="p-6">
          <EmptyState icon={<ClipboardList className="w-7 h-7" />} title="No pending requests" description="All caught up! New requests will appear here." />
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {pending.map((p) => (
            <Card key={p.id} hover className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amberx-50 flex items-center justify-center text-amberx-600">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{p.citizenName}</p>
                    <p className="text-xs text-slate-400">{p.id}</p>
                  </div>
                </div>
                <Badge status={p.status} />
              </div>
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2"><Package className="w-3.5 h-3.5" /> {p.wasteType}</div>
                <div className="flex items-center gap-2"><Weight className="w-3.5 h-3.5" /> {p.estimatedWeight} kg</div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {p.distance} km away</div>
                <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {p.pickupDate} at {p.pickupTime}</div>
                <div className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {p.address}</div>
              </div>
              <Link to={`/kabadiwala/pickup/${p.id}`}>
                <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-eco-600 hover:bg-eco-700 text-white text-sm font-semibold transition-all">
                  View Details & Accept <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
