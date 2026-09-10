import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';
import LoadingState from '@/components/ui/LoadingState';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { currentUser } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) {
    return <LoadingState fullPage text="Redirecting to login..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 p-4 sm:p-6 pb-20 lg:pb-6 overflow-x-hidden">
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
