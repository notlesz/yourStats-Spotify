import { Fragment } from 'react';
import { Loading } from '../../components';
import classNames from 'classnames';
import useMediaQuery from '../../hooks/useMediaQuery';
import useSpotifyArtists from '../../hooks/useSpotifyArtists';

export default function TopArtists() {
  const { isFetching, artists: topArtists } = useSpotifyArtists();

  const matches = useMediaQuery('(max-width:580px)');

  if (isFetching) {
    return (
      <div className='w-full h-[600px] flex justify-center items-center m-auto'>
        <Loading size='medium' />
      </div>
    );
  }

  return (
    <>
      {topArtists?.map((artist, index) => (
        <Fragment key={artist.id}>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-6 md:gap-3'>
              <span
                className={classNames(
                  'text-white font-semibold md:text-xs flex gap-1 w-7 h-7 items-center justify-center rounded-full ',
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
                src={artist.images[0].url}
                alt={artist.name}
                className='w-[80px] h-[80px] rounded-md object-cover md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px]'
              />
              <p className='text-white font-semibold md:text-sm'>{artist.name}</p>
            </div>
            <button
              type='button'
              className='font-semibold flex items-center gap-2 text-sm text-white px-3 py-2 cursor-pointer hover:text-green-500 md:text-xs'
              onClick={() => {
                window.open(artist.external_urls.spotify, '__blank');
              }}
            >
              <img src='/Spotify_Icon_White.png' className='w-5 h-5' />
              {!matches && 'Open in Spotify'}
            </button>
          </div>
          {index + 1 === topArtists?.length ? null : <hr className='border-gray-450' />}
        </Fragment>
      ))}
    </>
  );
}
