import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  className?: string;
  delay?: number;
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  subtitle,
  className,
  delay = 0,
}: StatCardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl bg-card p-6 shadow-card transition-all duration-300 hover:scale-[1.02] hover:shadow-glow animate-slide-up',
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm font-medium text-muted-foreground'>{label}</p>
          <p className='mt-2 text-3xl font-bold text-foreground'>{value}</p>
          {subtitle && <p className='mt-1 text-sm text-muted-foreground'>{subtitle}</p>}
        </div>
        <div className='rounded-lg bg-primary/10 p-3'>
          <Icon className='h-6 w-6 text-primary' />
        </div>
      </div>
    </div>
  );
};
