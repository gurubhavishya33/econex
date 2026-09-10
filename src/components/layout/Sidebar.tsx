import { NavLink } from 'react-router-dom';
import type { UserRole } from '@/types';
import { useApp } from '@/context/AppContext';
import Logo from '@/components/ui/Logo';
import {
  LayoutDashboard, PackagePlus, MapPin, History, Gift, User,
  ClipboardList, Truck, CheckCircle2, IndianRupee,
  Boxes, BarChart3, Users, Settings, Recycle, X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

const navConfig: Record<UserRole, NavItem[]> = {
  citizen: [
    { label: 'Dashboard', path: '/citizen/dashboard', icon: LayoutDashboard },
    { label: 'Book Pickup', path: '/citizen/book-pickup', icon: PackagePlus },
    { label: 'Track Pickup', path: '/citizen/track-pickup', icon: MapPin },
    { label: 'History', path: '/citizen/history', icon: History },
    { label: 'Rewards', path: '/citizen/rewards', icon: Gift },
    { label: 'Profile', path: '/citizen/profile', icon: User },
  ],
  kabadiwala: [
    { label: 'Dashboard', path: '/kabadiwala/dashboard', icon: LayoutDashboard },
    { label: 'Pickup Requests', path: '/kabadiwala/requests', icon: ClipboardList },
    { label: 'Active Pickups', path: '/kabadiwala/active', icon: Truck },
    { label: 'Completed', path: '/kabadiwala/completed', icon: CheckCircle2 },
    { label: 'Earnings', path: '/kabadiwala/earnings', icon: IndianRupee },
    { label: 'Profile', path: '/kabadiwala/profile', icon: User },
  ],
  recycler: [
    { label: 'Dashboard', path: '/recycler/dashboard', icon: LayoutDashboard },
    { label: 'Materials', path: '/recycler/materials', icon: Boxes },
    { label: 'Collections', path: '/recycler/collections', icon: Recycle },
    { label: 'Analytics', path: '/recycler/analytics', icon: BarChart3 },
    { label: 'Profile', path: '/recycler/profile', icon: User },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Pickups', path: '/admin/pickups', icon: ClipboardList },
    { label: 'Recyclers', path: '/admin/recyclers', icon: Recycle },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ],
};

const roleLabels: Record<UserRole, string> = {
  citizen: 'Citizen',
  kabadiwala: 'Kabadiwala',
  recycler: 'Recycler',
  admin: 'Admin',
};

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { currentUser } = useApp();
  if (!currentUser) return null;

  const navItems = navConfig[currentUser.role];

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-100 z-40 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <Logo size="sm" />
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-3 py-4">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-eco-50 mb-4">
            <div className="w-10 h-10 rounded-full gradient-eco flex items-center justify-center text-white font-bold text-sm shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{currentUser.name}</p>
              <p className="text-xs text-eco-600 font-medium">{roleLabels[currentUser.role]}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-eco-50 text-eco-700'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-[18px] h-[18px] ${isActive ? 'text-eco-600' : 'text-slate-400'}`} />
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-xl bg-gradient-to-br from-eco-50 to-ocean-50 p-4 border border-eco-100">
            <p className="text-xs font-semibold text-slate-600 mb-1">Need help?</p>
            <p className="text-xs text-slate-400 leading-relaxed">Contact our support team for any assistance with your pickups.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
