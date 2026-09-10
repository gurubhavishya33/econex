import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import StatusTimeline from '@/components/ui/StatusTimeline';
import MapPlaceholder from '@/components/ui/MapPlaceholder';
import EmptyState from '@/components/ui/EmptyState';
import { Package, Phone, MapPin, Clock, User, ArrowRight, Search } from 'lucide-react';

export default function TrackPickup() {
  const { currentUser, pickups } = useApp();
  const [searchId, setSearchId] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!currentUser) return null;

  const userPickups = pickups.filter((p) => p.citizenId === currentUser.id);
  const activePickups = userPickups.filter((p) => p.status !== 'Completed' && p.status !== 'Cancelled');
  const displayPickups = selectedId
    ? userPickups.filter((p) => p.id === selectedId)
    : activePickups;
  const searchedPickup = searchId
    ? userPickups.filter((p) => p.id.toLowerCase().includes(searchId.toLowerCase()))
    : null;

  const showPickups = searchedPickup !== null ? searchedPickup : displayPickups;
  const currentPickup = showPickups[0];

  return (
    <DashboardLayout title="Track Pickup">
      {/* Search */}
      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            placeholder="Search by Pickup ID (e.g. PKP-2025-002)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-eco-500/30 focus:border-eco-500"
          />
        </div>
      </Card>

      {!currentPickup ? (
        <Card className="p-6">
          <EmptyState
            icon={<Package className="w-7 h-7" />}
            title="No active pickups to track"
            description="Book a pickup to see its real-time status here."
            action={<Link to="/citizen/book-pickup"><Button size="sm">Book a Pickup <ArrowRight className="w-4 h-4" /></Button></Link>}
          />
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main tracking card */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs text-slate-400">Pickup ID</p>
                  <p className="text-lg font-bold text-slate-800 font-display">{currentPickup.id}</p>
                </div>
                <Badge status={currentPickup.status} />
              </div>

              {/* Status timeline */}
              <div className="bg-slate-50/50 rounded-xl p-5 mb-5">
                <h4 className="text-sm font-semibold text-slate-700 mb-4">Status Timeline</h4>
                <StatusTimeline currentStatus={currentPickup.status} />
              </div>

              {/* Details grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <Package className="w-5 h-5 text-eco-500" />
                  <div>
                    <p className="text-xs text-slate-400">Waste Type</p>
                    <p className="text-sm font-semibold text-slate-700">{currentPickup.wasteType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <Package className="w-5 h-5 text-ocean-500" />
                  <div>
                    <p className="text-xs text-slate-400">Estimated Weight</p>
                    <p className="text-sm font-semibold text-slate-700">{currentPickup.estimatedWeight} kg</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <Clock className="w-5 h-5 text-amberx-500" />
                  <div>
                    <p className="text-xs text-slate-400">Scheduled For</p>
                    <p className="text-sm font-semibold text-slate-700">{currentPickup.pickupDate} • {currentPickup.pickupTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-xs text-slate-400">Address</p>
                    <p className="text-sm font-semibold text-slate-700 line-clamp-1">{currentPickup.address}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map */}
            <Card className="p-5">
              <h3 className="text-base font-bold text-slate-800 mb-4">Pickup Location</h3>
              <MapPlaceholder address={currentPickup.address} label="Pickup Location" />
            </Card>
          </div>

          {/* Collector info */}
          <div>
            <Card className="p-5">
              <h3 className="text-base font-bold text-slate-800 mb-4">Collector Information</h3>
              {currentPickup.collectorName ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-eco-50">
                    <div className="w-12 h-12 rounded-full gradient-eco flex items-center justify-center text-white font-bold">
                      {currentPickup.collectorName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{currentPickup.collectorName}</p>
                      <p className="text-xs text-slate-400">Waste Collector</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                    <Phone className="w-5 h-5 text-ocean-500" />
                    <div>
                      <p className="text-xs text-slate-400">Phone</p>
                      <p className="text-sm font-semibold text-slate-700">{currentPickup.collectorPhone}</p>
                    </div>
                  </div>
                  {currentPickup.distance && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                      <MapPin className="w-5 h-5 text-amberx-500" />
                      <div>
                        <p className="text-xs text-slate-400">Distance</p>
                        <p className="text-sm font-semibold text-slate-700">{currentPickup.distance} km away</p>
                      </div>
                    </div>
                  )}
                  <Button fullWidth>
                    <Phone className="w-4 h-4" /> Contact Collector
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mx-auto mb-3">
                    <User className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-semibold text-slate-600">Awaiting collector</p>
                  <p className="text-xs text-slate-400 mt-1">A nearby collector will accept your request soon.</p>
                </div>
              )}
            </Card>

            {/* Estimated time */}
            <Card className="p-5 mt-6 bg-gradient-to-br from-ocean-50 to-eco-50 border-ocean-100">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-ocean-600" />
                <h3 className="text-base font-bold text-slate-800">Estimated Pickup</h3>
              </div>
              <p className="text-3xl font-bold text-slate-800 font-display">{currentPickup.pickupTime}</p>
              <p className="text-sm text-slate-500 mt-1">{currentPickup.pickupDate}</p>
              <div className="mt-3 p-3 rounded-xl bg-white/60">
                <p className="text-xs text-slate-500">
                  {currentPickup.status === 'Pending' && 'Waiting for a collector to accept your request.'}
                  {currentPickup.status === 'Accepted' && 'Collector has accepted! They will be on their way soon.'}
                  {currentPickup.status === 'On the Way' && 'Collector is heading to your location!'}
                  {currentPickup.status === 'Collected' && 'Waste has been collected. Completion pending.'}
                  {currentPickup.status === 'Completed' && 'Pickup completed! You earned reward points.'}
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* All pickups list */}
      {userPickups.length > 0 && !selectedId && (
        <Card className="p-5 mt-6">
          <h3 className="text-base font-bold text-slate-800 mb-4">All My Pickups</h3>
          <div className="space-y-2">
            {userPickups.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selectedId === p.id ? 'border-eco-300 bg-eco-50' : 'border-slate-100 hover:bg-slate-50'}`}
              >
                <Package className="w-5 h-5 text-slate-400" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">{p.id} — {p.wasteType}</p>
                  <p className="text-xs text-slate-400">{p.pickupDate} • {p.estimatedWeight} kg</p>
                </div>
                <Badge status={p.status} />
              </button>
            ))}
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
}
