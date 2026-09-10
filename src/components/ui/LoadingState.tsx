import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  text?: string;
  fullPage?: boolean;
}

export default function LoadingState({ text = 'Loading...', fullPage = false }: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${fullPage ? 'min-h-screen' : 'py-20'} gap-3`}>
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-eco-100" />
        <Loader2 className="w-12 h-12 text-eco-500 absolute inset-0 animate-spin" />
      </div>
      <p className="text-sm text-slate-400 font-medium">{text}</p>
    </div>
  );
}
