import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, Pickup, Notification, UserRole } from '@/types';
import { sampleUsers, samplePickups, sampleNotifications } from '@/data/sampleData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextValue {
  currentUser: User | null;
  users: User[];
  pickups: Pickup[];
  notifications: Notification[];
  toasts: Toast[];
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  signup: (data: Partial<User> & { name: string; email: string; role: UserRole }) => void;
  createPickup: (pickup: Omit<Pickup, 'id' | 'status' | 'rewardPoints' | 'co2Saved' | 'createdAt'>) => string;
  updatePickupStatus: (id: string, status: Pickup['status'], collectorId?: string, collectorName?: string, collectorPhone?: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  updateUser: (data: Partial<User>) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const wasteTypeToPoints: Record<string, number> = {
  Plastic: 50, Paper: 35, Metal: 60, 'E-Waste': 80, Glass: 45, 'Mixed Recyclables': 55,
};

const wasteTypeToCO2: Record<string, number> = {
  Plastic: 1.7, Paper: 1.2, Metal: 2.5, 'E-Waste': 7.3, Glass: 0.7, 'Mixed Recyclables': 1.2,
};

let pickupCounter = 7;

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [pickups, setPickups] = useState<Pickup[]>(samplePickups);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [toasts, setToasts] = useState<Toast[]>([]);
  


  const addToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = `t${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const login = useCallback((email: string, role: UserRole) => {
  const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    setCurrentUser(existingUser);
    addToast(`Welcome back, ${existingUser.name}!`, 'success');
    return;
  }

  // Create a demo user from the entered email
  const username = email.split('@')[0];
  const formattedName = username
    .replace(/[._-]+/g, ' ')
    .replace(/\d+/g, '')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase()) || 'EcoNex User';

  const newUser: User = {
    id: `u${Date.now()}`,
    name: formattedName,
    email,
    phone: '',
    location: '',
    role,
    rewardPoints: role === 'citizen' ? 0 : undefined,
    joinedDate: new Date().toISOString().split('T')[0],
    status: 'active',
    totalPickups: 0,
    completedPickups: 0,
    earnings: role === 'kabadiwala' ? 0 : undefined,
  };

  setUsers((prev) => [...prev, newUser]);
  setCurrentUser(newUser);
  addToast(`Welcome to EcoNex, ${newUser.name}!`, 'success');
}, [users, addToast]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    addToast('Logged out successfully.', 'info');
  }, [addToast]);

  const signup = useCallback((data: Partial<User> & { name: string; email: string; role: UserRole }) => {
    const newUser: User = {
      id: `u${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      location: data.location || '',
      role: data.role,
      rewardPoints: data.role === 'citizen' ? 0 : undefined,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      totalPickups: 0,
      completedPickups: 0,
      earnings: data.role === 'kabadiwala' ? 0 : undefined,
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    addToast(`Account created! Welcome to EcoNex, ${newUser.name}.`, 'success');
  }, [addToast]);

  const createPickup = useCallback((pickupData: Omit<Pickup, 'id' | 'status' | 'rewardPoints' | 'co2Saved' | 'createdAt'>) => {
    const id = `PKP-2026-${String(pickupCounter++).padStart(3, '0')}`;
    const rewardPoints = wasteTypeToPoints[pickupData.wasteType] || 40;
    const co2Saved = Number(((wasteTypeToCO2[pickupData.wasteType] || 1) * pickupData.estimatedWeight).toFixed(1));
    const newPickup: Pickup = {
      ...pickupData,
      id,
      status: 'Pending',
      rewardPoints,
      co2Saved,
      createdAt: new Date().toISOString(),
    };
    setPickups((prev) => [newPickup, ...prev]);

    const kabadiwalaNotif: Notification = {
      id: `n${Date.now()}`,
      userId: 'u2',
      title: 'New Pickup Request',
      message: `New ${pickupData.wasteType} pickup request from ${pickupData.citizenName} (${pickupData.estimatedWeight} kg).`,
      type: 'info',
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [kabadiwalaNotif, ...prev]);

    return id;
  }, []);

  const updatePickupStatus = useCallback((
    id: string,
    status: Pickup['status'],
    collectorId?: string,
    collectorName?: string,
    collectorPhone?: string,
  ) => {
    setPickups((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const updated = {
          ...p,
          status,
          ...(collectorId ? { collectorId } : {}),
          ...(collectorName ? { collectorName } : {}),
          ...(collectorPhone ? { collectorPhone } : {}),
          ...(status === 'Completed' ? { completedAt: new Date().toISOString() } : {}),
        };
        return updated;
      })
    );

    const pickup = pickups.find((p) => p.id === id);
    if (pickup) {
      const notif: Notification = {
        id: `n${Date.now()}`,
        userId: pickup.citizenId,
        title: `Pickup ${status}`,
        message: `Your pickup ${id} status has been updated to "${status}"${collectorName ? ` by ${collectorName}` : ''}.`,
        type: status === 'Completed' ? 'success' : 'info',
        read: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [notif, ...prev]);

      if (status === 'Completed' && currentUser) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === pickup.citizenId
              ? { ...u, rewardPoints: (u.rewardPoints || 0) + pickup.rewardPoints, completedPickups: (u.completedPickups || 0) + 1 }
              : u
          )
        );
        if (currentUser.role === 'kabadiwala') {
          setUsers((prev) =>
            prev.map((u) =>
              u.id === currentUser.id
                ? { ...u, completedPickups: (u.completedPickups || 0) + 1, earnings: (u.earnings || 0) + pickup.estimatedWeight * 15 }
                : u
            )
          );
        }
      }
    }

    addToast(`Pickup status updated to "${status}".`, 'success');
  }, [pickups, currentUser, addToast]);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    if (!currentUser) return;
    setNotifications((prev) => prev.map((n) => (n.userId === currentUser.id ? { ...n, read: true } : n)));
  }, [currentUser]);

  const updateUser = useCallback((data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
    addToast('Profile updated successfully.', 'success');
  }, [currentUser, addToast]);

  return (
    <AppContext.Provider value={{
      currentUser, users, pickups, notifications, toasts,
      login, logout, signup, createPickup, updatePickupStatus,
      markNotificationRead, markAllNotificationsRead, addToast, removeToast, updateUser,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
