import { useApp } from '@/context/AppContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import { sampleRewards } from '@/data/sampleData';
import { Award, Trophy, Crown, Star, Gift, Leaf, TrendingUp, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, typeof Award> = {
  Award, Trophy, Crown,
};

const tierClasses = {
  bronze: { bg: 'from-amberx-50 to-amberx-100', border: 'border-amberx-200', icon: 'text-amberx-600', iconBg: 'bg-amberx-100' },
  silver: { bg: 'from-slate-50 to-slate-100', border: 'border-slate-200', icon: 'text-slate-600', iconBg: 'bg-slate-100' },
  gold: { bg: 'from-eco-50 to-eco-100', border: 'border-eco-200', icon: 'text-eco-600', iconBg: 'bg-eco-100' },
};

export default function Rewards() {
  const { currentUser } = useApp();
  if (!currentUser) return null;

  const points = currentUser.rewardPoints || 0;
  const nextReward = sampleRewards.find((r) => r.pointsRequired > points);
  const currentTier = sampleRewards.filter((r) => r.pointsRequired <= points).pop();

  return (
    <DashboardLayout title="Rewards">
      {/* Current points hero */}
      <Card className="p-6 mb-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-48 h-48 bg-eco-100/40 rounded-full blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Your Reward Points</p>
            <p className="text-4xl font-extrabold text-gradient-eco font-display mt-1">{points}</p>
            {currentTier && (
              <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full bg-eco-50 text-eco-700 text-xs font-semibold">
                <Star className="w-3.5 h-3.5" /> Current Tier: {currentTier.name}
              </div>
            )}
          </div>
          <div className="w-24 h-24 rounded-full gradient-eco flex items-center justify-center text-white shadow-lg shadow-eco-500/20">
            <Gift className="w-12 h-12" />
          </div>
        </div>
      </Card>

      {/* Progress to next reward */}
      {nextReward && (
        <Card className="p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-eco-500" />
            <h3 className="text-base font-bold text-slate-800">Progress to {nextReward.name}</h3>
          </div>
          <ProgressBar value={points} max={nextReward.pointsRequired} color="eco" />
          <p className="text-xs text-slate-400 mt-2 text-center">
            {nextReward.pointsRequired - points} more points to unlock {nextReward.name}!
          </p>
        </Card>
      )}

      {/* Milestones */}
      <h3 className="text-base font-bold text-slate-800 mb-4">Recycling Milestones</h3>
      <div className="space-y-4 mb-6">
        {sampleRewards.map((reward) => {
          const Icon = iconMap[reward.icon] || Award;
          const isUnlocked = points >= reward.pointsRequired;
          const tier = tierClasses[reward.tier];

          return (
            <Card key={reward.id} className={`p-5 bg-gradient-to-r ${tier.bg} border ${tier.border} ${isUnlocked ? '' : 'opacity-75'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${tier.iconBg} ${tier.icon} flex items-center justify-center shrink-0`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-800">{reward.name}</h4>
                    {isUnlocked && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-eco-600">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{reward.description}</p>
                  <div className="mt-2">
                    <ProgressBar value={Math.min(points, reward.pointsRequired)} max={reward.pointsRequired} color="eco" showValue={false} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{reward.pointsRequired} points required</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Available rewards */}
      <h3 className="text-base font-bold text-slate-800 mb-4">Available Rewards</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Eco-Friendly Bag', cost: 200, icon: '🛍️' },
          { name: 'Tree Planted in Your Name', cost: 300, icon: '🌳' },
          { name: 'Recycled Notebook Set', cost: 150, icon: '📓' },
          { name: 'Stainless Steel Bottle', cost: 400, icon: '🍶' },
          { name: 'EcoNex Merch Kit', cost: 600, icon: '👕' },
          { name: 'Premium Recycler Badge', cost: 800, icon: '🏅' },
        ].map((reward) => {
          const canRedeem = points >= reward.cost;
          return (
            <Card key={reward.name} className="p-5 text-center hover:card-shadow-lg transition-all">
              <div className="text-4xl mb-3">{reward.icon}</div>
              <p className="text-sm font-bold text-slate-800">{reward.name}</p>
              <p className="text-xs text-slate-400 mt-1">{reward.cost} points</p>
              <Button size="sm" fullWidth className="mt-3" disabled={!canRedeem}>
                {canRedeem ? 'Redeem' : `${reward.cost - points} more pts`}
              </Button>
            </Card>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
