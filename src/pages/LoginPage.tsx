import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { UserRole } from '@/types';
import { Mail, Lock, Eye, EyeOff, Users, Truck, Recycle, Shield, ArrowRight } from 'lucide-react';

const roles: { value: UserRole; label: string; icon: typeof Users; desc: string }[] = [
  { value: 'citizen', label: 'Citizen', icon: Users, desc: 'Request pickups' },
  { value: 'kabadiwala', label: 'Kabadiwala', icon: Truck, desc: 'Collect waste' },
  { value: 'recycler', label: 'Recycler', icon: Recycle, desc: 'Buy materials' },
  { value: 'admin', label: 'Admin', icon: Shield, desc: 'Manage platform' },
];

const demoCreds: { role: UserRole; email: string }[] = [
  { role: 'citizen', email: 'citizen@demo.com' },
  { role: 'kabadiwala', email: 'kabadiwala@demo.com' },
  { role: 'recycler', email: 'recycler@demo.com' },
  { role: 'admin', email: 'admin@demo.com' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email || `${role}@demo.com`, role);
      const routes: Record<UserRole, string> = {
        citizen: '/citizen/dashboard',
        kabadiwala: '/kabadiwala/dashboard',
        recycler: '/recycler/dashboard',
        admin: '/admin/dashboard',
      };
      navigate(routes[role]);
    }, 600);
  };

  const handleDemoLogin = (demoRole: UserRole, demoEmail: string) => {
    setRole(demoRole);
    setEmail(demoEmail);
    setPassword('demo123');
    setLoading(true);
    setTimeout(() => {
      login(demoEmail, demoRole);
      const routes: Record<UserRole, string> = {
        citizen: '/citizen/dashboard',
        kabadiwala: '/kabadiwala/dashboard',
        recycler: '/recycler/dashboard',
        admin: '/admin/dashboard',
      };
      navigate(routes[demoRole]);
    }, 400);
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
            <h2 className="text-4xl font-extrabold font-display leading-tight">Turn Your Waste Into Worth.</h2>
            <p className="text-eco-50 mt-4 text-lg leading-relaxed max-w-md">
              Join the movement. Schedule pickups, earn rewards, and make a measurable impact on the environment.
            </p>
            <div className="flex gap-6 mt-8">
              <div>
                <p className="text-3xl font-bold font-display">12K+</p>
                <p className="text-sm text-eco-100">Pickups Done</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-display">850+</p>
                <p className="text-sm text-eco-100">Tons Recycled</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-display">450</p>
                <p className="text-sm text-eco-100">Tons CO₂ Saved</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-eco-100">© 2025 EcoNex. Connecting Waste to Worth.</p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 font-display">Welcome Back</h1>
          <p className="text-sm text-slate-500 mt-1">Login to your EcoNex account to continue.</p>

          {/* Role selector */}
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-700 mb-2">Select your role</p>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 transition-all ${
                    role === r.value
                      ? 'border-eco-500 bg-eco-50 text-eco-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <r.icon className="w-4 h-4" />
                  <div className="text-left">
                    <p className="text-sm font-semibold">{r.label}</p>
                    <p className="text-[10px] text-slate-400">{r.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                icon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-eco-600 focus:ring-eco-500" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-eco-600 font-medium hover:underline">Forgot password?</button>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={loading}>
              {loading ? 'Logging in...' : <>Login <ArrowRight className="w-5 h-5" /></>}
            </Button>
          </form>

          {/* Demo login */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium">Quick Demo Login</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {demoCreds.map((cred) => (
                <button
                  key={cred.role}
                  onClick={() => handleDemoLogin(cred.role, cred.email)}
                  disabled={loading}
                  className="px-3 py-2 rounded-lg bg-slate-50 hover:bg-eco-50 hover:text-eco-700 text-slate-600 text-xs font-semibold transition-all border border-slate-100 hover:border-eco-200 capitalize disabled:opacity-50"
                >
                  {cred.role}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-eco-600 font-semibold hover:underline">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
