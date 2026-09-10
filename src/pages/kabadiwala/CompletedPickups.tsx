import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { Link } from 'react-router-dom';
import { Package, CheckCircle2, ArrowRight, Calendar, Weight } from 'lucide-react';

export default function CompletedPickups() {
  const { currentUser, pickups } = useApp();
  if (!currentUser) return null;

  const completed = pickups.filter((p) => p.collectorId === currentUser.id && p.status === 'Completed');

  return (
    <DashboardLayout title="Completed">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">Completed Pickups</h2>
        <p className="text-sm text-slate-500 mt-0.5">{completed.length} pickups completed.</p>
      </div>

      {completed.length === 0 ? (
        <Card className="p-6">
          <EmptyState icon={<CheckCircle2 className="w-7 h-7" />} title="No completed pickups yet" description="Your completed pickups will appear here." />
        </Card>
      ) : (
        <div className="space-y-3">
          {completed.map((p) => (
            <Card key={p.id} hover className="p-4">
              <Link to={`/kabadiwala/pickup/${p.id}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-eco-50 flex items-center justify-center text-eco-600 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-800">{p.id}</p>
                      <Badge status={p.status} />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{p.citizenName} • {p.wasteType} • {p.estimatedWeight} kg</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {p.pickupDate}</span>
                      <span className="flex items-center gap-1"><Weight className="w-3.5 h-3.5" /> {p.estimatedWeight} kg</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-eco-600">₹{p.estimatedWeight * 15}</p>
                    <p className="text-[10px] text-slate-400">earned</p>
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
