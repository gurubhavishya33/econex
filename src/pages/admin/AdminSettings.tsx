import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { Settings, Bell, Shield, Globe, Mail, Lock, Save } from 'lucide-react';
import { useState } from 'react';

export default function AdminSettings() {
  const { addToast } = useApp();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    autoAssignPickups: false,
    requireCollectorVerification: true,
    maintenanceMode: false,
    minPickupWeight: 1,
    maxPickupDistance: 15,
    rewardPointsPerKg: 10,
  });

  const handleSave = () => {
    addToast('Settings saved successfully.', 'success');
  };

  return (
    <DashboardLayout title="Settings">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">Platform Settings</h2>
        <p className="text-sm text-slate-500 mt-0.5">Configure EcoNex platform preferences and rules.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-eco-500" /> General Settings
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-slate-700">Auto-assign Pickups</p>
                <p className="text-xs text-slate-400">Automatically assign pickups to nearest collector</p>
              </div>
              <input type="checkbox" checked={settings.autoAssignPickups} onChange={(e) => setSettings({ ...settings, autoAssignPickups: e.target.checked })} className="w-5 h-5 rounded border-slate-300 text-eco-600 focus:ring-eco-500" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-slate-700">Require Collector Verification</p>
                <p className="text-xs text-slate-400">New collectors must be verified before accepting pickups</p>
              </div>
              <input type="checkbox" checked={settings.requireCollectorVerification} onChange={(e) => setSettings({ ...settings, requireCollectorVerification: e.target.checked })} className="w-5 h-5 rounded border-slate-300 text-eco-600 focus:ring-eco-500" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-slate-700">Maintenance Mode</p>
                <p className="text-xs text-slate-400">Temporarily disable new pickups</p>
              </div>
              <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })} className="w-5 h-5 rounded border-slate-300 text-eco-600 focus:ring-eco-500" />
            </label>
          </div>
        </Card>

        {/* Pickup Rules */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-eco-500" /> Pickup Rules
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Minimum Pickup Weight (kg)</label>
              <input type="number" value={settings.minPickupWeight} onChange={(e) => setSettings({ ...settings, minPickupWeight: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-eco-500/30 focus:border-eco-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Max Pickup Distance (km)</label>
              <input type="number" value={settings.maxPickupDistance} onChange={(e) => setSettings({ ...settings, maxPickupDistance: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-eco-500/30 focus:border-eco-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Reward Points per kg</label>
              <input type="number" value={settings.rewardPointsPerKg} onChange={(e) => setSettings({ ...settings, rewardPointsPerKg: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-eco-500/30 focus:border-eco-500" />
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-eco-500" /> Notification Preferences
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-slate-700">Email Notifications</p>
                <p className="text-xs text-slate-400">Receive platform alerts via email</p>
              </div>
              <input type="checkbox" checked={settings.emailNotifications} onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })} className="w-5 h-5 rounded border-slate-300 text-eco-600 focus:ring-eco-500" />
            </label>
          </div>
        </Card>

        {/* System Info */}
        <Card className="p-5">
          <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-eco-500" /> System Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <span className="text-sm text-slate-500 flex items-center gap-2"><Lock className="w-4 h-4" /> Version</span>
              <span className="text-sm font-semibold text-slate-700">v1.0.0</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <span className="text-sm text-slate-500 flex items-center gap-2"><Mail className="w-4 h-4" /> Support Email</span>
              <span className="text-sm font-semibold text-slate-700">support@econex.in</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <span className="text-sm text-slate-500 flex items-center gap-2"><Globe className="w-4 h-4" /> Region</span>
              <span className="text-sm font-semibold text-slate-700">India</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button size="lg" onClick={handleSave}>
          <Save className="w-5 h-5" /> Save Settings
        </Button>
      </div>
    </DashboardLayout>
  );
}
