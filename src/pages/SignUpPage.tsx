import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { UserRole } from '@/types';
import { Mail, Lock, User as UserIcon, Phone, MapPin, Users, Truck, Recycle, Shield, ArrowRight } from 'lucide-react';

const roles: { value: UserRole; label: string; icon: typeof Users }[] = [
  { value: 'citizen', label: 'Citizen', icon: Users },
  { value: 'kabadiwala', label: 'Kabadiwala', icon: Truck },
  { value: 'recycler', label: 'Recycler', icon: Recycle },
  { value: 'admin', label: 'Admin', icon: Shield },
];

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useApp();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', location: '',
  });
  const [role, setRole] = useState<UserRole>('citizen');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      signup({ ...form, role });
      const routes: Record<UserRole, string> = {
        citizen: '/citizen/dashboard',
        kabadiwala: '/kabadiwala/dashboard',
        recycler: '/recycler/dashboard',
        admin: '/admin/dashboard',
      };
      navigate(routes[role]);
    }, 600);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-eco relative overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Logo size="md" light />
          <div>
            <h2 className="text-4xl font-extrabold font-display leading-tight">Join the Green Movement.</h2>
            <p className="text-eco-50 mt-4 text-lg leading-relaxed max-w-md">
              Create your account and start turning waste into worth. Every pickup makes a difference.
            </p>
            <div className="mt-8 space-y-3">
              {['Earn rewards for every pickup', 'Track your environmental impact', 'Support local waste collectors'].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-eco-50">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-eco-100">© 2025 EcoNex. Connecting Waste to Worth.</p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-4">
          <div className="lg:hidden mb-8">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 font-display">Create Account</h1>
          <p className="text-sm text-slate-500 mt-1">Join EcoNex and start making an impact today.</p>

          {/* Role selector */}
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-700 mb-2">I am a...</p>
            <div className="grid grid-cols-4 gap-2">
              {roles.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border-2 transition-all ${
                    role === r.value
                      ? 'border-eco-500 bg-eco-50 text-eco-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <r.icon className="w-4 h-4" />
                  <span className="text-[11px] font-semibold">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              icon={<UserIcon className="w-4 h-4" />}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Phone Number"
                placeholder="+91 98765 43210"
                icon={<Phone className="w-4 h-4" />}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-4 h-4" />}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <Input
              label="Location"
              placeholder="Sector 18, Noida, UP"
              icon={<MapPin className="w-4 h-4" />}
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? 'Creating account...' : <>Create Account <ArrowRight className="w-5 h-5" /></>}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-eco-600 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
