import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import {
  User as UserIcon, Mail, Phone, MapPin, Shield, Bell,
  Edit3, Save, LogOut, CheckCircle2, Lock, Globe,
} from 'lucide-react';

const roleLabels: Record<string, string> = {
  citizen: 'Citizen', kabadiwala: 'Kabadiwala', recycler: 'Recycler', admin: 'Admin',
};

export default function ProfilePage() {
  const { currentUser, updateUser, logout } = useApp();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || '',
  });
  const [notifSettings, setNotifSettings] = useState({
    pickupUpdates: true,
    rewardMilestones: true,
    promotions: false,
    weeklyReport: true,
  });

  if (!currentUser) return null;

  const handleSave = () => {
    updateUser(form);
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <DashboardLayout title="Profile">
      {/* Profile header */}
      <Card className="p-6 mb-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-24 gradient-eco" />
        <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-4 pt-8">
          <div className="w-20 h-20 rounded-2xl gradient-eco flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-eco-500/20 shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-slate-800 font-display">{currentUser.name}</h2>
            <div className="flex items-center gap-2 justify-center sm:justify-start mt-1">
              <Badge variant="eco">{roleLabels[currentUser.role]}</Badge>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-eco-500" /> Active
              </span>
            </div>
          </div>
          {!editing ? (
            <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
              <Edit3 className="w-4 h-4" /> Edit Profile
            </Button>
          ) : (
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          )}
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal info */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-eco-500" /> Personal Information
          </h3>
          <div className="space-y-4">
            <Input
              label="Full Name"
              icon={<UserIcon className="w-4 h-4" />}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={!editing}
            />
            <Input
              label="Email Address"
              icon={<Mail className="w-4 h-4" />}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={!editing}
            />
            <Input
              label="Phone Number"
              icon={<Phone className="w-4 h-4" />}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              disabled={!editing}
            />
            <Input
              label="Location"
              icon={<MapPin className="w-4 h-4" />}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              disabled={!editing}
            />
          </div>
          {editing && (
            <div className="flex gap-2 mt-4">
              <Button size="sm" onClick={handleSave}>Save</Button>
              <Button variant="outline" size="sm" onClick={() => { setEditing(false); setForm({ name: currentUser.name, email: currentUser.email, phone: currentUser.phone, location: currentUser.location }); }}>Cancel</Button>
            </div>
          )}
        </Card>

        {/* Right column */}
        <div className="space-y-6">
          {/* Account info */}
          <Card className="p-5">
            <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-eco-500" /> Account
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <span className="text-sm text-slate-500">Role</span>
                <Badge variant="eco">{roleLabels[currentUser.role]}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <span className="text-sm text-slate-500">Member Since</span>
                <span className="text-sm font-semibold text-slate-700">{currentUser.joinedDate}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <span className="text-sm text-slate-500">Account Status</span>
                <Badge variant="success">Active</Badge>
              </div>
              {currentUser.rewardPoints !== undefined && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <span className="text-sm text-slate-500">Reward Points</span>
                  <span className="text-sm font-bold text-eco-600">{currentUser.rewardPoints}</span>
                </div>
              )}
              {currentUser.earnings !== undefined && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <span className="text-sm text-slate-500">Total Earnings</span>
                  <span className="text-sm font-bold text-eco-600">₹{currentUser.earnings.toLocaleString()}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Notification settings */}
          <Card className="p-5">
            <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-eco-500" /> Notification Settings
            </h3>
            <div className="space-y-3">
              {[
                { key: 'pickupUpdates', label: 'Pickup status updates', desc: 'Get notified when your pickup status changes' },
                { key: 'rewardMilestones', label: 'Reward milestones', desc: 'Celebrate when you unlock new rewards' },
                { key: 'promotions', label: 'Promotions & offers', desc: 'Special deals and eco-friendly product offers' },
                { key: 'weeklyReport', label: 'Weekly impact report', desc: 'Summary of your environmental contribution' },
              ].map((setting) => (
                <label key={setting.key} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifSettings[setting.key as keyof typeof notifSettings]}
                    onChange={(e) => setNotifSettings({ ...notifSettings, [setting.key]: e.target.checked })}
                    className="w-4 h-4 mt-1 rounded border-slate-300 text-eco-600 focus:ring-eco-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{setting.label}</p>
                    <p className="text-xs text-slate-400">{setting.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* Security & logout */}
          <Card className="p-5">
            <h3 className="text-base font-bold text-slate-800 mb-4">Security</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                <Lock className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">Change Password</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                <Globe className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">Privacy Settings</span>
              </button>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-left">
                <LogOut className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-500 font-medium">Logout</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
