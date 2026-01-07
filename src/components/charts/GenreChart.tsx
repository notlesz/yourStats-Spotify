import { cn } from '@/lib/utils';

interface Genre {
  name: string;
  percentage: number; // or value, depending on usage. Let's check usage.
  color: string;
  value?: number; // Add value as optional if inconsistent
}

interface GenreChartProps {
  genres: any[]; // Relax to any[] to match whatever is passed, or use Genre[] if I align data.
}

export const GenreChart = ({ genres }: GenreChartProps) => {
  return (
    <div className='space-y-4'>
      {genres.map((genre, index) => (
        <div
          key={genre.name}
          className='animate-slide-up'
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className='flex items-center justify-between mb-2'>
            <span className='font-medium text-foreground'>{genre.name}</span>
            <span className='text-sm text-muted-foreground'>{genre.percentage}%</span>
          </div>
          <div className='h-3 w-full overflow-hidden rounded-full bg-secondary'>
            <div
              className={cn('h-full rounded-full transition-all duration-1000 ease-out')}
              style={{
                width: `${genre.percentage}%`,
                backgroundColor: genre.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
