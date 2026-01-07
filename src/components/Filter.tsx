'use client';

import { useSpotifyStore, PlaylistFilter, TimeRange } from '@/store/useSpotifyStore';
import classNames from 'classnames';

interface PropsFilter {
  typeContent: 'artists' | 'tracks' | 'playlist';
}

type FilterContent = {
  typeFilter: TimeRange | PlaylistFilter;
  name: string;
};

export default function Filter({ typeContent }: PropsFilter) {
  const playlistFilter = useSpotifyStore((state) => state.playlistFilter);
  const timeRangeTracks = useSpotifyStore((state) => state.timeRangeTracks);
  const timeRangeArtists = useSpotifyStore((state) => state.timeRangeArtists);
  const { handlePlaylistFilter, handleTimeRange } = useSpotifyStore((state) => state.actions);

  const listFilterContent: FilterContent[] = [
    {
      typeFilter: 'long_term',
      name: 'All time',
    },
    {
      typeFilter: 'medium_term',
      name: '6 Months',
    },
    {
      typeFilter: 'short_term',
      name: 'Last Month',
    },
  ];

  const ListPlaylistFilter: FilterContent[] = [
    {
      typeFilter: 'all',
      name: 'All',
    },
    {
      typeFilter: 'others',
      name: 'Others',
    },
    {
      typeFilter: 'me',
      name: 'Me',
    },
  ];

  const filters = {
    artists: timeRangeArtists,
    tracks: timeRangeTracks,
    playlist: playlistFilter,
  };

  const currentFilter = filters[typeContent];

  const currentContentFilter = typeContent === 'playlist' ? ListPlaylistFilter : listFilterContent;

  const handleFilter = (filter: TimeRange | PlaylistFilter) => {
    if (typeContent === 'playlist') {
      handlePlaylistFilter(filter as PlaylistFilter);
      return;
    }
    handleTimeRange(typeContent, filter as TimeRange);
  };

  /* Updated to match the segmented control style in the mockup */
  return (
    <div className='flex bg-[#282828] p-1 rounded-md inline-flex self-end md:self-auto'>
      {currentContentFilter.map(({ name, typeFilter }) => (
        <button
          key={name}
          onClick={() => handleFilter(typeFilter)}
          className={classNames(
            'px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 min-w-[80px]',
            {
              'bg-[#1DB954] text-black': currentFilter === typeFilter,
              'text-gray-400 hover:text-white': currentFilter !== typeFilter,
            },
          )}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
