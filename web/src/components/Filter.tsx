import classNames from 'classnames';
import { TimeRange } from '../hooks/useSpotify';

interface PropsFilter {
  typeContent: 'tracks' | 'artists' | 'playlists';
  setTimeRange: (type: 'tracks' | 'artists', range: TimeRange) => void;
  timeRangeTracks?: string;
  timeRangeArtists?: string;
}

export function Filter({
  setTimeRange,
  typeContent,
  timeRangeTracks,
  timeRangeArtists,
}: PropsFilter) {
  return (
    <div className='flex gap-3 mb-8 '>
      <span
        className={classNames(
          'cursor-pointer text-white text-sm font-bold py-[5px] px-[10px] flex items-center justify-center rounded border border-white hover:text-black hover:bg-white transition-colors',
          {
            'bg-white text-black':
              (!timeRangeTracks && timeRangeArtists === 'long_term') ||
              (!timeRangeArtists && timeRangeTracks === 'long_term'),
          },
        )}
        onClick={() => {
          typeContent === 'tracks'
            ? setTimeRange('tracks', 'long_term')
            : setTimeRange('artists', 'long_term');
        }}
      >
        All Time
      </span>
      <span
        className={classNames(
          'cursor-pointer text-white text-sm font-bold py-[5px] px-[10px] flex items-center justify-center rounded border border-white hover:text-black hover:bg-white transition-colors',
          {
            'bg-white text-black':
              (!timeRangeTracks && timeRangeArtists === 'medium_term') ||
              (!timeRangeArtists && timeRangeTracks === 'medium_term'),
          },
        )}
        onClick={() => {
          typeContent === 'tracks'
            ? setTimeRange('tracks', 'medium_term')
            : setTimeRange('artists', 'medium_term');
        }}
      >
        6 Months
      </span>
      <span
        className={classNames(
          'cursor-pointer text-white text-sm font-bold py-[5px] px-[10px] flex items-center justify-center rounded border border-white hover:text-black hover:bg-white transition-colors',
          {
            'bg-white text-black':
              (!timeRangeTracks && timeRangeArtists === 'short_term') ||
              (!timeRangeArtists && timeRangeTracks === 'short_term'),
          },
        )}
        onClick={() => {
          typeContent === 'tracks'
            ? setTimeRange('tracks', 'short_term')
            : setTimeRange('artists', 'short_term');
        }}
      >
        Last Month
      </span>
    </div>
  );
}
