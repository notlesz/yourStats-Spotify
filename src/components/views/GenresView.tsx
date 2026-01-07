'use client';

import { GenreChart } from '@/components/charts/GenreChart';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getGenreChartData } from '@/utils/stats';

interface GenresViewProps {
  artists: any[];
}

export default function GenresView({ artists }: GenresViewProps) {
  const chartData = getGenreChartData(artists);

  return (
    <div className='space-y-8 p-8'>
      {/* Header */}
      <div className='gradient-hero -mx-8 -mt-8 px-8 pb-12 pt-8'>
        <h1 className='text-4xl font-bold text-foreground animate-fade-in'>Seus Gêneros</h1>
        <p
          className='mt-2 text-lg text-muted-foreground animate-fade-in'
          style={{ animationDelay: '100ms' }}
        >
          Análise dos gêneros musicais que você mais ouve
        </p>
      </div>

      <div className='grid gap-8 lg:grid-cols-2'>
        {/* Pie Chart */}
        <div className='rounded-xl bg-card p-6 shadow-card animate-slide-up'>
          <h2 className='mb-6 text-xl font-bold text-foreground'>Distribuição</h2>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={chartData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey='value'
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0 0% 11%)',
                    border: '1px solid hsl(0 0% 20%)',
                    borderRadius: '8px',
                    color: 'hsl(0 0% 98%)',
                  }}
                  formatter={(value: any) => [`${value}%`, 'Porcentagem']}
                />
                <Legend
                  formatter={(value) => <span style={{ color: 'hsl(0 0% 98%)' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div
          className='rounded-xl bg-card p-6 shadow-card animate-slide-up'
          style={{ animationDelay: '100ms' }}
        >
          <h2 className='mb-6 text-xl font-bold text-foreground'>Rankings</h2>
          <GenreChart genres={chartData} />
        </div>
      </div>

      {/* Genre Details */}
      <div
        className='rounded-xl bg-card p-6 shadow-card animate-slide-up'
        style={{ animationDelay: '200ms' }}
      >
        <h2 className='mb-6 text-xl font-bold text-foreground'>Detalhes dos Gêneros</h2>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {chartData.map((genre, index) => (
            <div
              key={genre.name}
              className='rounded-lg bg-secondary p-4 transition-all duration-300 hover:bg-surface-hover animate-slide-up'
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className='flex items-center gap-3'>
                <div className='h-4 w-4 rounded-full' style={{ backgroundColor: genre.color }} />
                <h3 className='font-semibold text-foreground'>{genre.name}</h3>
              </div>
              <p className='mt-2 text-2xl font-bold text-foreground'>{genre.value}%</p>
              <p className='text-sm text-muted-foreground'>do seu tempo de escuta</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
