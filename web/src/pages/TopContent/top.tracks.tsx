import { Fragment } from 'react';
import { Loading } from '../../components';
import useSpotifyTracks from '../../hooks/useSpotifyTracks';
import classNames from 'classnames';
import { redirectTo } from '../../utils/document';
import { BiTime } from 'react-icons/bi';
import { msToTime } from '../../utils/conversions';

export default function TopTracks() {
  const { isFetching, tracks: topTracks } = useSpotifyTracks();

  if (isFetching) {
    return (
      <div className='w-full h-[600px] flex justify-center items-center m-auto'>
        <Loading size='medium' />
      </div>
    );
  }

  return (
    <>
      {topTracks?.map((track, index) => (
        <Fragment key={track.id}>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-6 md:gap-3'>
              <span
                className={classNames(
                  'text-white font-semibold md:text-xs flex gap-1 w-7 h-7 items-center justify-center rounded-full xs:w-4 xs:h-4',
                  {
                    'bg-gold-500': index + 1 === 1,
                    'bg-silver-500': index + 1 === 2,
                    'bg-bronze-500': index + 1 === 3,
                  },
                )}
              >
                {index + 1} {index + 1 > 3 && <strong>º</strong>}
              </span>
              <img
                src={track.album.images[0].url}
                alt={track.album.name}
                className='w-[80px] h-[80px] rounded-md object-cover md:w-[60px] md:h-[60px] xs:w-[30px] xs:h-[30px]'
              />
              <p
                className='text-white font-semibold md:text-sm max-w-sm xs:max-w-[60px] md:max-w-[100px] text-ellipsis whitespace-nowrap overflow-hidden hover:cursor-pointer hover:underline'
                onClick={() => redirectTo(track.external_urls.spotify)}
              >
                {track.name}
              </p>
              <p
                className='text-gray-100 text-sm font-semibold xs:max-w-[40px] text-ellipsis whitespace-nowrap overflow-hidden hover:cursor-pointer hover:underline'
                onClick={() => redirectTo(track.artists[0].external_urls.spotify)}
              >
                {track.artists[0].name}
              </p>
            </div>
            <span className='text-gray-100 text-sm font-semibold flex items-center gap-1 md:text-xs'>
              <BiTime className='w-4 h-4' />
              {msToTime(track.duration_ms)}
            </span>
          </div>
          {index + 1 === topTracks.length ? null : <hr className='border-gray-450' />}
        </Fragment>
      ))}
    </>
  );
}
