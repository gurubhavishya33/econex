import type { PickupStatus } from '@/types';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'eco';

interface BadgeProps {
  variant?: BadgeVariant;
  status?: PickupStatus;
  children?: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-600',
  success: 'bg-eco-100 text-eco-700',
  warning: 'bg-amberx-100 text-amberx-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-ocean-100 text-ocean-700',
  eco: 'bg-eco-100 text-eco-700',
};

const statusClasses: Record<PickupStatus, string> = {
  Pending: 'bg-amberx-100 text-amberx-700',
  Accepted: 'bg-ocean-100 text-ocean-700',
  'On the Way': 'bg-purple-100 text-purple-700',
  Collected: 'bg-cyan-100 text-cyan-700',
  Completed: 'bg-eco-100 text-eco-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function Badge({ variant = 'default', status, children, className = '' }: BadgeProps) {
  const classes = status ? statusClasses[status] : variantClasses[variant];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${classes} ${className}`}>
      {status && <span className={`w-1.5 h-1.5 rounded-full ${status === 'Completed' ? 'bg-eco-500' : status === 'Pending' ? 'bg-amberx-500' : 'bg-current'}`} />}
      {children ?? status}
    </span>
  );
}
