import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import MapPlaceholder from '@/components/ui/MapPlaceholder';
import type { WasteType } from '@/types';
import {
  Trash2, Calendar, Clock, MapPin, Camera, FileText,
  Package, CheckCircle2, ArrowRight, Upload,
} from 'lucide-react';

const wasteTypes: { value: WasteType; icon: string; color: string }[] = [
  { value: 'Plastic', icon: '🥤', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { value: 'Paper', icon: '📄', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { value: 'Metal', icon: '🔩', color: 'bg-slate-50 border-slate-200 text-slate-700' },
  { value: 'E-Waste', icon: '💻', color: 'bg-red-50 border-red-200 text-red-700' },
  { value: 'Glass', icon: '🍾', color: 'bg-cyan-50 border-cyan-200 text-cyan-700' },
  { value: 'Mixed Recyclables', icon: '♻️', color: 'bg-eco-50 border-eco-200 text-eco-700' },
];

export default function BookPickup() {
  const { currentUser, createPickup } = useApp();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<WasteType>('Plastic');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState(currentUser?.location || '');
  const [notes, setNotes] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [success, setSuccess] = useState(false);
  const [pickupId, setPickupId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setLoading(true);
    setTimeout(() => {
      const id = createPickup({
        citizenId: currentUser.id,
        citizenName: currentUser.name,
        citizenPhone: currentUser.phone,
        wasteType: selectedType,
        estimatedWeight: Number(weight),
        pickupDate: date,
        pickupTime: time,
        address,
        notes,
        photoUrl: photoName || undefined,
      });
      setPickupId(id);
      setSuccess(true);
      setLoading(false);
    }, 800);
  };

  if (success) {
    return (
      <DashboardLayout title="Book Pickup">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="p-8 text-center animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-eco-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-eco-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 font-display">Pickup request created successfully!</h2>
            <p className="text-slate-500 mt-2">Your pickup request has been sent to nearby collectors.</p>
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-400">Your Pickup ID</p>
              <p className="text-xl font-bold text-eco-600 font-display mt-1">{pickupId}</p>
            </div>
            <div className="flex gap-3 justify-center mt-6">
              <Button onClick={() => navigate('/citizen/track-pickup')}>Track Pickup <ArrowRight className="w-4 h-4" /></Button>
              <Button variant="outline" onClick={() => { setSuccess(false); setWeight(''); setDate(''); setTime(''); setNotes(''); setPhotoName(''); }}>Book Another</Button>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Book Pickup">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
        {/* Waste type */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-eco-500" /> Waste Type
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {wasteTypes.map((wt) => (
              <button
                key={wt.value}
                type="button"
                onClick={() => setSelectedType(wt.value)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                  selectedType === wt.value
                    ? `${wt.color} border-current`
                    : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                <span className="text-2xl">{wt.icon}</span>
                <span className="text-sm font-semibold text-left">{wt.value}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Details */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-eco-500" /> Pickup Details
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Estimated Weight (kg)"
              type="number"
              placeholder="e.g. 5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <Input
              label="Pickup Date"
              type="date"
              icon={<Calendar className="w-4 h-4" />}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Input
              label="Pickup Time"
              type="time"
              icon={<Clock className="w-4 h-4" />}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <Input
              label="Pickup Address"
              placeholder="House no, Street, Area, City"
              icon={<MapPin className="w-4 h-4" />}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </Card>

        {/* Map */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-eco-500" /> Location
          </h3>
          <MapPlaceholder address={address || 'Set your pickup address above'} label="Pickup Location" />
        </Card>

        {/* Photo & Notes */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-eco-500" /> Additional Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Upload Waste Photo</label>
              <label className="flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-xl border-2 border-dashed border-slate-200 hover:border-eco-300 cursor-pointer transition-colors">
                <div className="w-10 h-10 rounded-full bg-eco-50 flex items-center justify-center text-eco-500">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-sm text-slate-500">{photoName || 'Click to upload a photo of your waste'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setPhotoName(e.target.files?.[0]?.name || '')}
                />
              </label>
            </div>
            <Textarea
              label="Additional Notes"
              placeholder="Any special instructions for the collector? e.g. 'Ring the doorbell twice'"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </Card>

        <Button type="submit" size="lg" fullWidth disabled={loading}>
          {loading ? 'Creating request...' : <>Submit Pickup Request <ArrowRight className="w-5 h-5" /></>}
        </Button>
      </form>
    </DashboardLayout>
  );
}
