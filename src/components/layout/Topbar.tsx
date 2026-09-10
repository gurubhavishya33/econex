import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Bell, Menu, ChevronDown, LogOut, User as UserIcon, Settings } from 'lucide-react';

interface TopbarProps {
  onMenuClick: () => void;
  title: string;
}

export default function Topbar({ onMenuClick, title }: TopbarProps) {
  const { currentUser, notifications, markNotificationRead, markAllNotificationsRead, logout } = useApp();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const userNotifications = notifications.filter((n) => n.userId === currentUser?.id);
  const unreadCount = userNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const profileBase = currentUser.role === 'admin' ? '/admin' : currentUser.role === 'kabadiwala' ? '/kabadiwala' : currentUser.role === 'recycler' ? '/recycler' : '/citizen';

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden text-slate-500 hover:text-slate-700">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-slate-800 font-display hidden sm:block">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl card-shadow-lg border border-slate-100 overflow-hidden animate-scale-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-700">Notifications</p>
                {unreadCount > 0 && (
                  <button onClick={markAllNotificationsRead} className="text-xs text-eco-600 font-medium hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {userNotifications.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-8">No notifications yet</p>
                ) : (
                  userNotifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`w-full text-left px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-eco-50/40' : ''}`}
                    >
                      <div className="flex items-start gap-2">
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.type === 'success' ? 'bg-eco-500' : n.type === 'warning' ? 'bg-amberx-500' : 'bg-ocean-500'}`} />
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{n.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{n.message}</p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full gradient-eco flex items-center justify-center text-white font-bold text-xs">
              {currentUser.name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-slate-600 hidden sm:block">{currentUser.name.split(' ')[0]}</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl card-shadow-lg border border-slate-100 overflow-hidden animate-scale-in">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-700">{currentUser.name}</p>
                <p className="text-xs text-slate-400">{currentUser.email}</p>
              </div>
              <div className="py-1">
                <button onClick={() => { setProfileOpen(false); navigate(`${profileBase}/profile`); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                  <UserIcon className="w-4 h-4 text-slate-400" /> My Profile
                </button>
                <button onClick={() => { setProfileOpen(false); navigate(`${profileBase}/profile`); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                  <Settings className="w-4 h-4 text-slate-400" /> Settings
                </button>
                <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-slate-100">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
