import classNames from 'classnames';
import { useState } from 'react';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import useMediaQuery from '../hooks/useMediaQuery';
import { TimeRange } from '../hooks/useSpotify';

interface PropsFilter {
  typeContent: 'tracks' | 'artists';
  setTimeRange: (type: 'tracks' | 'artists', range: TimeRange) => void;
  timeRangeTracks?: string;
  timeRangeArtists?: string;
}

export default function Filter({
  setTimeRange,
  typeContent,
  timeRangeTracks,
  timeRangeArtists,
}: PropsFilter) {
  const [show, setShow] = useState(false);
  const matches = useMediaQuery('(max-width:580px)');

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
            <li
              onClick={() => {
                typeContent === 'tracks'
                  ? setTimeRange('tracks', 'long_term')
                  : setTimeRange('artists', 'long_term');
                setShow(!show);
              }}
              className={classNames('hover:bg-gray-100 hover:cursor-pointer', {
                'bg-white text-gray-600':
                  (!timeRangeTracks && timeRangeArtists === 'long_term') ||
                  (!timeRangeArtists && timeRangeTracks === 'long_term'),
              })}
            >
              <span className='block px-4 py-2'>All time</span>
            </li>
            <li
              onClick={() => {
                typeContent === 'tracks'
                  ? setTimeRange('tracks', 'medium_term')
                  : setTimeRange('artists', 'medium_term');
                setShow(!show);
              }}
              className={classNames('hover:bg-gray-100 hover:cursor-pointer', {
                'bg-white text-gray-600':
                  (!timeRangeTracks && timeRangeArtists === 'medium_term') ||
                  (!timeRangeArtists && timeRangeTracks === 'medium_term'),
              })}
            >
              <span className='block px-4 py-2 '>6 Months</span>
            </li>
            <li
              onClick={() => {
                typeContent === 'tracks'
                  ? setTimeRange('tracks', 'short_term')
                  : setTimeRange('artists', 'short_term');
                setShow(!show);
              }}
              className={classNames('hover:bg-gray-100 hover:cursor-pointer', {
                'bg-white text-gray-600':
                  (!timeRangeTracks && timeRangeArtists === 'short_term') ||
                  (!timeRangeArtists && timeRangeTracks === 'short_term'),
              })}
            >
              <span className='block px-4 py-2'>Last Month</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div className='flex gap-3'>
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
