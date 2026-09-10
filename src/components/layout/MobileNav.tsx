import { NavLink } from 'react-router-dom';
import type { UserRole } from '@/types';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard, PackagePlus, MapPin, Gift,
  ClipboardList, Truck, CheckCircle2, IndianRupee,
  Boxes, BarChart3, User,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

const navConfig: Record<UserRole, NavItem[]> = {
  citizen: [
    { label: 'Home', path: '/citizen/dashboard', icon: LayoutDashboard },
    { label: 'Book', path: '/citizen/book-pickup', icon: PackagePlus },
    { label: 'Track', path: '/citizen/track-pickup', icon: MapPin },
    { label: 'Rewards', path: '/citizen/rewards', icon: Gift },
    { label: 'Profile', path: '/citizen/profile', icon: User },
  ],
  kabadiwala: [
    { label: 'Home', path: '/kabadiwala/dashboard', icon: LayoutDashboard },
    { label: 'Requests', path: '/kabadiwala/requests', icon: ClipboardList },
    { label: 'Active', path: '/kabadiwala/active', icon: Truck },
    { label: 'Done', path: '/kabadiwala/completed', icon: CheckCircle2 },
    { label: 'Earnings', path: '/kabadiwala/earnings', icon: IndianRupee },
  ],
  recycler: [
    { label: 'Home', path: '/recycler/dashboard', icon: LayoutDashboard },
    { label: 'Materials', path: '/recycler/materials', icon: Boxes },
    { label: 'Collections', path: '/recycler/collections', icon: Truck },
    { label: 'Analytics', path: '/recycler/analytics', icon: BarChart3 },
    { label: 'Profile', path: '/recycler/profile', icon: User },
  ],
  admin: [
    { label: 'Home', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users', path: '/admin/users', icon: User },
    { label: 'Pickups', path: '/admin/pickups', icon: ClipboardList },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/admin/settings', icon: User },
  ],
};

export default function MobileNav() {
  const { currentUser } = useApp();
  if (!currentUser) return null;

  const navItems = navConfig[currentUser.role];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-30 px-2 py-1.5 flex items-center justify-around">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors ${
              isActive ? 'text-eco-600' : 'text-slate-400'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <item.icon className={`w-5 h-5 ${isActive ? 'text-eco-600' : 'text-slate-400'}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
