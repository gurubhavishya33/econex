import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Users, Search, Filter, User, Truck, Recycle, Shield } from 'lucide-react';
import type { UserRole } from '@/types';

const roleIcons: Record<UserRole, typeof User> = {
  citizen: User, kabadiwala: Truck, recycler: Recycle, admin: Shield,
};

export default function AdminUsers() {
  const { users } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<UserRole | 'All'>('All');

  const filters: (UserRole | 'All')[] = ['All', 'citizen', 'kabadiwala', 'recycler', 'admin'];
  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || u.role === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout title="Users">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 font-display">User Management</h2>
        <p className="text-sm text-slate-500 mt-0.5">{users.length} registered users on the platform.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center">
          <User className="w-5 h-5 text-ocean-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-slate-800 font-display">{users.filter((u) => u.role === 'citizen').length}</p>
          <p className="text-xs text-slate-400">Citizens</p>
        </Card>
        <Card className="p-4 text-center">
          <Truck className="w-5 h-5 text-amberx-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-slate-800 font-display">{users.filter((u) => u.role === 'kabadiwala').length}</p>
          <p className="text-xs text-slate-400">Collectors</p>
        </Card>
        <Card className="p-4 text-center">
          <Recycle className="w-5 h-5 text-eco-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-slate-800 font-display">{users.filter((u) => u.role === 'recycler').length}</p>
          <p className="text-xs text-slate-400">Recyclers</p>
        </Card>
        <Card className="p-4 text-center">
          <Users className="w-5 h-5 text-purple-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-slate-800 font-display">{users.length}</p>
          <p className="text-xs text-slate-400">Total Users</p>
        </Card>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-eco-500/30 focus:border-eco-500" />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap capitalize transition-all ${filter === f ? 'bg-eco-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">User</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Role</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 hidden sm:table-cell">Location</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3 hidden md:table-cell">Joined</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const RoleIcon = roleIcons[u.role];
                return (
                  <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full gradient-eco flex items-center justify-center text-white font-bold text-xs shrink-0">{u.name.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{u.name}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 capitalize">
                        <RoleIcon className="w-3.5 h-3.5" /> {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell"><span className="text-sm text-slate-500">{u.location}</span></td>
                    <td className="px-4 py-3 hidden md:table-cell"><span className="text-sm text-slate-500">{u.joinedDate}</span></td>
                    <td className="px-4 py-3"><Badge variant={u.status === 'active' ? 'success' : 'danger'}>{u.status}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
