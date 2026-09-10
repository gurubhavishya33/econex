import type { PickupStatus } from '@/types';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface StatusTimelineProps {
  currentStatus: PickupStatus;
}

const steps: PickupStatus[] = [
  'Pending',
  'Accepted',
  'On the Way',
  'Collected',
  'Completed',
];

export default function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, idx) => {
        const isFinished = idx <= currentIndex;
        const isCurrent = idx === currentIndex && currentStatus !== 'Completed';
        const isPending = idx > currentIndex;

        return (
          <div key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              {isFinished ? (
                <div className="w-8 h-8 rounded-full bg-eco-500 flex items-center justify-center text-white shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              ) : isCurrent ? (
                <div className="w-8 h-8 rounded-full bg-eco-100 flex items-center justify-center text-eco-600 shrink-0 ring-4 ring-eco-50">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 shrink-0">
                  <Circle className="w-4 h-4" />
                </div>
              )}

              {idx < steps.length - 1 && (
                <div
                  className={`w-0.5 h-10 ${
                    isFinished ? 'bg-eco-400' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>

            <div className="pt-1 pb-6">
              <p
                className={`text-sm font-semibold ${
                  isFinished
                    ? 'text-eco-700'
                    : isCurrent
                    ? 'text-slate-800'
                    : 'text-slate-400'
                }`}
              >
                {step}
              </p>

              {isCurrent && (
                <p className="text-xs text-eco-600 mt-0.5">
                  In progress...
                </p>
              )}

              {isFinished && (
                <p className="text-xs text-eco-500 mt-0.5">
                  Completed
                </p>
              )}

              {isPending && (
                <p className="text-xs text-slate-400 mt-0.5">
                  Awaiting
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}