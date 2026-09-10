import { Link } from 'react-router-dom';
import { Recycle } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  light?: boolean;
}

const sizeClasses = {
  sm: { box: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-lg' },
  md: { box: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-xl' },
  lg: { box: 'w-12 h-12', icon: 'w-7 h-7', text: 'text-2xl' },
};

export default function Logo({ size = 'md', showText = true, light = false }: LogoProps) {
  const s = sizeClasses[size];
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className={`${s.box} rounded-xl gradient-eco flex items-center justify-center text-white shadow-sm shadow-eco-500/30 group-hover:scale-105 transition-transform`}>
        <Recycle className={s.icon} />
      </div>
      {showText && (
        <span className={`font-display font-extrabold ${s.text} ${light ? 'text-white' : 'text-slate-800'}`}>
          Eco<span className="text-eco-500">Nex</span>
        </span>
      )}
    </Link>
  );
}
