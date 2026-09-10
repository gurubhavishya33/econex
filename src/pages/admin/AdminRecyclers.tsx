import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Recycle, MapPin, Phone, Calendar, Package } from 'lucide-react';

export default function AdminRecyclers() {
  const { users, pickups } = useApp();
  const recyclers = users.filter((u) => u.role === 'recycler');

  return (
    <DashboardLayout title="Recyclers">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">Registered Recyclers</h2>
        <p className="text-sm text-slate-500 mt-0.5">{recyclers.length} recycler partners on the platform.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recyclers.map((r) => {
          const collected = pickups.filter((p) => p.status === 'Completed');
          return (
            <Card key={r.id} className="p-5 hover:card-shadow-lg transition-all">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl gradient-eco flex items-center justify-center text-white font-bold shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{r.name}</p>
                  <p className="text-xs text-slate-400">Recycler Partner</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {r.phone}</div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {r.location}</div>
                <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Joined {r.joinedDate}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="p-2 rounded-lg bg-slate-50 text-center">
                  <p className="text-sm font-bold text-slate-700">{collected.length}</p>
                  <p className="text-[10px] text-slate-400">Collections</p>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 text-center">
                  <p className="text-sm font-bold text-slate-700">{collected.reduce((s, p) => s + p.estimatedWeight, 0)} kg</p>
                  <p className="text-[10px] text-slate-400">Processed</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
