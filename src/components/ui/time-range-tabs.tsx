import { cn } from '@/lib/utils';

interface TimeRangeTabsProps {
  value: string;
  onChange: (value: string) => void;
}

const tabs = [
  { value: '1month', label: '1 Mês' },
  { value: '6months', label: '6 Meses' },
  { value: 'year', label: 'Ano' },
];

export const TimeRangeTabs = ({ value, onChange }: TimeRangeTabsProps) => {
  return (
    <div className='inline-flex items-center gap-1 rounded-lg bg-secondary p-1'>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'rounded-md px-4 py-2 text-sm font-medium transition-all duration-200',
            value === tab.value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
