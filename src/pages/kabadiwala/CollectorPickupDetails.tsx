import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import StatusTimeline from '@/components/ui/StatusTimeline';
import MapPlaceholder from '@/components/ui/MapPlaceholder';
import EmptyState from '@/components/ui/EmptyState';
import type { PickupStatus } from '@/types';
import {
  Package, Phone, MapPin, Weight, Calendar, Clock,
  User, ArrowRight, Truck, CheckCircle2, Navigation,
} from 'lucide-react';

export default function CollectorPickupDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, pickups, updatePickupStatus } = useApp();

  const pickup = pickups.find((p) => p.id === id);

  if (!pickup) {
    return (
      <DashboardLayout title="Pickup Details">
        <Card className="p-6">
          <EmptyState title="Pickup not found" description="This pickup request may have been removed." action={<Link to="/kabadiwala/requests"><Button size="sm">Back to Requests</Button></Link>} />
        </Card>
      </DashboardLayout>
    );
  }

  if (!currentUser) return null;

  const isAssigned = pickup.collectorId === currentUser.id;
  const isPending = pickup.status === 'Pending';

  const handleAccept = () => {
    updatePickupStatus(pickup.id, 'Accepted', currentUser.id, currentUser.name, currentUser.phone);
  };

  const handleStatusUpdate = (status: PickupStatus) => {
    updatePickupStatus(pickup.id, status);
  };

  const nextAction = (): { label: string; status: PickupStatus; icon: typeof Truck } | null => {
    switch (pickup.status) {
      case 'Accepted': return { label: 'Mark On the Way', status: 'On the Way', icon: Truck };
      case 'On the Way': return { label: 'Mark Collected', status: 'Collected', icon: Package };
      case 'Collected': return { label: 'Mark Completed', status: 'Completed', icon: CheckCircle2 };
      default: return null;
    }
  };

  const action = nextAction();

  return (
    <DashboardLayout title="Pickup Details">
      <button onClick={() => navigate(-1)} className="text-sm text-slate-400 hover:text-slate-600 mb-4 flex items-center gap-1">
        <ArrowRight className="w-4 h-4 rotate-180" /> Back
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-slate-400">Pickup ID</p>
                <p className="text-lg font-bold text-slate-800 font-display">{pickup.id}</p>
              </div>
              <Badge status={pickup.status} />
            </div>

            {/* Status timeline */}
            <div className="bg-slate-50/50 rounded-xl p-5 mb-5">
              <h4 className="text-sm font-semibold text-slate-700 mb-4">Status Timeline</h4>
              <StatusTimeline currentStatus={pickup.status} />
            </div>

            {/* Action button */}
            {isPending && (
              <Button fullWidth size="lg" onClick={handleAccept}>
                Accept Pickup Request <ArrowRight className="w-5 h-5" />
              </Button>
            )}
            {isAssigned && action && (
              <Button fullWidth size="lg" onClick={() => handleStatusUpdate(action.status)}>
                <action.icon className="w-5 h-5" /> {action.label}
              </Button>
            )}
            {pickup.status === 'Completed' && (
              <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-eco-50 text-eco-700">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-semibold">This pickup is completed!</span>
              </div>
            )}
          </Card>

          {/* Waste details */}
          <Card className="p-5">
            <h3 className="text-base font-bold text-slate-800 mb-4">Waste Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <Package className="w-5 h-5 text-eco-500" />
                <div><p className="text-xs text-slate-400">Waste Type</p><p className="text-sm font-semibold text-slate-700">{pickup.wasteType}</p></div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <Weight className="w-5 h-5 text-ocean-500" />
                <div><p className="text-xs text-slate-400">Estimated Weight</p><p className="text-sm font-semibold text-slate-700">{pickup.estimatedWeight} kg</p></div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <Calendar className="w-5 h-5 text-amberx-500" />
                <div><p className="text-xs text-slate-400">Pickup Date</p><p className="text-sm font-semibold text-slate-700">{pickup.pickupDate}</p></div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <Clock className="w-5 h-5 text-purple-500" />
                <div><p className="text-xs text-slate-400">Pickup Time</p><p className="text-sm font-semibold text-slate-700">{pickup.pickupTime}</p></div>
              </div>
            </div>
            {pickup.notes && (
              <div className="mt-4 p-3 rounded-xl bg-amberx-50 border border-amberx-100">
                <p className="text-xs font-semibold text-amberx-700 mb-1">Customer Notes</p>
                <p className="text-sm text-slate-600">{pickup.notes}</p>
              </div>
            )}
          </Card>

          {/* Map */}
          <Card className="p-5">
            <h3 className="text-base font-bold text-slate-800 mb-4">Pickup Location</h3>
            <MapPlaceholder address={pickup.address} label="Customer Location" />
          </Card>
        </div>

        {/* Customer info */}
        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="text-base font-bold text-slate-800 mb-4">Customer Information</h3>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-eco-50 mb-4">
              <div className="w-12 h-12 rounded-full gradient-eco flex items-center justify-center text-white font-bold">
                {pickup.citizenName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{pickup.citizenName}</p>
                <p className="text-xs text-slate-400">Citizen</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <Phone className="w-5 h-5 text-ocean-500" />
                <div><p className="text-xs text-slate-400">Phone</p><p className="text-sm font-semibold text-slate-700">{pickup.citizenPhone}</p></div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                <div><p className="text-xs text-slate-400">Address</p><p className="text-sm font-semibold text-slate-700">{pickup.address}</p></div>
              </div>
              {pickup.distance && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                  <Navigation className="w-5 h-5 text-amberx-500" />
                  <div><p className="text-xs text-slate-400">Distance</p><p className="text-sm font-semibold text-slate-700">{pickup.distance} km</p></div>
                </div>
              )}
            </div>
            <Button fullWidth className="mt-4">
              <Phone className="w-4 h-4" /> Contact Customer
            </Button>
          </Card>

          {/* Earnings estimate */}
          {isAssigned || !isPending ? (
            <Card className="p-5 bg-gradient-to-br from-eco-50 to-ocean-50 border-eco-100">
              <h3 className="text-base font-bold text-slate-800 mb-3">Estimated Earnings</h3>
              <p className="text-3xl font-bold text-eco-600 font-display">₹{pickup.estimatedWeight * 15}</p>
              <p className="text-xs text-slate-400 mt-1">{pickup.estimatedWeight} kg × ₹15/kg</p>
            </Card>
          ) : null}
        </div>
      </div>
    </DashboardLayout>
  );
}
