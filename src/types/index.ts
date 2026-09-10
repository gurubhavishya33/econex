export type UserRole = 'citizen' | 'kabadiwala' | 'recycler' | 'admin';

export type PickupStatus =
  | 'Pending'
  | 'Accepted'
  | 'On the Way'
  | 'Collected'
  | 'Completed'
  | 'Cancelled';

export type WasteType = 'Plastic' | 'Paper' | 'Metal' | 'E-Waste' | 'Glass' | 'Mixed Recyclables';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: UserRole;
  avatar?: string;
  rewardPoints?: number;
  joinedDate: string;
  status: 'active' | 'suspended';
  totalPickups?: number;
  completedPickups?: number;
  earnings?: number;
}

export interface Pickup {
  id: string;
  citizenId: string;
  citizenName: string;
  citizenPhone: string;
  wasteType: WasteType;
  estimatedWeight: number;
  pickupDate: string;
  pickupTime: string;
  address: string;
  notes?: string;
  photoUrl?: string;
  status: PickupStatus;
  collectorId?: string;
  collectorName?: string;
  collectorPhone?: string;
  distance?: number;
  rewardPoints: number;
  co2Saved: number;
  createdAt: string;
  completedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  createdAt: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold';
}

export interface RecyclerMaterial {
  id: string;
  type: WasteType;
  quantity: number;
  unit: string;
  pricePerKg: number;
  source: string;
  date: string;
  status: 'available' | 'sold' | 'processing';
}
