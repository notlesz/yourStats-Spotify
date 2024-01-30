import { PlaylistFilter, SpotifyContext, TimeRange } from '@/context/spotifyContext';
import useMediaQuery from '@/hooks/useMediaQuery';
import classNames from 'classnames';
import { useContext, useState } from 'react';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';

interface PropsFilter {
  typeContent: 'artists' | 'tracks' | 'playlist';
}

type FilterContent = {
  typeFilter: TimeRange | PlaylistFilter;
  name: string;
};

export default function Filter({ typeContent }: PropsFilter) {
  const {
    handlePlaylistFilter,
    handleTimeRange,
    timeRangeArtists,
    timeRangeTracks,
    playlistFilter,
  } = useContext(SpotifyContext);

  const matches = useMediaQuery('(max-width:720px)');

  const [show, setShow] = useState(false);

  const listFilterContent = [
    {
      typeFilter: 'long_term',
      name: 'All time',
    },
    {
      typeFilter: 'medium_term',
      name: '6 Months',
    },
    ,
    {
      typeFilter: 'short_term',
      name: 'Last Month',
    },
  ] as FilterContent[];

  const ListPlaylistFilter = [
    {
      typeFilter: 'all',
      name: 'All',
    },
    {
      typeFilter: 'others',
      name: 'Others',
    },
    ,
    {
      typeFilter: 'me',
      name: 'Me',
    },
  ] as FilterContent[];

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

  if (matches) {
    return (
      <div>
        <button
          className='text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center gap-2 relative'
          type='button'
          onClick={() => setShow(!show)}
        >
          Filter
          {!show ? <IoMdArrowDown /> : <IoMdArrowUp />}
        </button>
        <div
          className={classNames(
            'z-10 bg-gray-700 divide-y divide-gray-100 rounded shadow w-44  absolute right-0 mt-2 mr-4',
            { hidden: !show },
          )}
        >
          <ul className='py-1 text-sm text-gray-200'>
            {currentContentFilter.map(({ typeFilter, name }) => (
              <li
                key={name}
                onClick={() => {
                  handleFilter(typeFilter);
                  setShow(!show);
                }}
                className={classNames('hover:bg-gray-100 hover:cursor-pointer', {
                  'bg-white text-gray-600': currentFilter === typeFilter,
                })}
              >
                <span className='block px-4 py-2'>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div className='flex gap-3'>
      {currentContentFilter.map(({ name, typeFilter }) => (
        <span
          key={name}
          className={classNames(
            'cursor-pointer text-white text-sm font-bold py-[5px] px-[10px] flex items-center justify-center rounded border border-white hover:text-black hover:bg-white transition-colors',
            {
              'bg-white text-black': currentFilter === typeFilter,
            },
          )}
          onClick={() => handleFilter(typeFilter)}
        >
          {name}
        </span>
      ))}
    </div>
  );
}
