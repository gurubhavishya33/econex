import { useApp } from '@/context/AppContext';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-eco-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-ocean-500" />,
  };

  const bgMap = {
    success: 'border-eco-200',
    error: 'border-red-200',
    info: 'border-ocean-200',
  };

  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 bg-white rounded-xl card-shadow-lg border ${bgMap[toast.type]} px-4 py-3 animate-slide-in pointer-events-auto`}
        >
          {iconMap[toast.type]}
          <p className="text-sm text-slate-700 flex-1 leading-relaxed">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
