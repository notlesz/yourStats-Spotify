export const getTopGenre = (artists: any[] = []) => {
  if (!artists.length) return 'N/A';
  const genreCounts: Record<string, number> = {};
  artists.forEach((artist) => {
    artist.genres?.forEach((genre: string) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });
  const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
  return sortedGenres[0]?.[0] || 'N/A';
};

export const getGenreChartData = (artists: any[] = []) => {
  if (!artists.length) return [];
  const genreCounts: Record<string, number> = {};
  let total = 0;
  artists.forEach((artist) => {
    artist.genres?.forEach((genre: string) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      total++;
    });
  });

  return Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5) // Top 5
    .map(([name, count], index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Math.round((count / total) * 100),
      count: count, // Added count for consistency if needed
      percentage: Math.round((count / total) * 100), // Added explicit percentage
      color: [
        'hsl(var(--spotify-green))',
        '#a855f7', // Purple
        '#3b82f6', // Blue
        '#f97316', // Orange
        '#eab308', // Yellow
      ][index % 5],
    }));
};
