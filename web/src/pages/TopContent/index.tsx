import classNames from 'classnames';
import { Fragment } from 'react';
import { BiTime } from 'react-icons/bi';
import { FaSpotify } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { Filter } from '../../components/Filter';
import Loading from '../../components/Loading';
import useMediaQuery from '../../hooks/useMediaQuery';
import useSpotify from '../../hooks/useSpotify';
import { msToTime } from '../../utils/conversions';
import redirectTo from '../../utils/document';

export default function TopContent() {
  const { type } = useParams<{ type: 'tracks' | 'artists' }>();
  const {
    artists: allTopArtists,
    tracks: allTopTracks,
    handleTimeRange,
    timeRangeTracks,
    isFetchingTracks,
    timeRangeArtists,
    isFetchingArtists,
  } = useSpotify();

  const navigate = useNavigate();
  const matches = useMediaQuery('(max-width:580px)');

  return (
    <main className='mb-8 animate-leftToShow p-4'>
      <h4 className='text-white text-center text-3xl font-bold mb-8 sm:text-2xl font-russoOne capitalize'>
        Top {type}
      </h4>
      <div className='flex items-center justify-between mb-8'>
        <button
          className='flex items-center gap-2 text-white text-lg font-bold hover:text-green-600'
          onClick={() => navigate('/home')}
        >
          <IoMdArrowRoundBack />
          Back
        </button>
        {type === 'artists' ? (
          <Filter
            setTimeRange={handleTimeRange}
            typeContent={type!}
            timeRangeArtists={timeRangeArtists}
          />
        ) : (
          <Filter
            setTimeRange={handleTimeRange}
            typeContent={type!}
            timeRangeTracks={timeRangeTracks}
          />
        )}
      </div>
      <section className='flex flex-col w-full rounded bg-gray-600 p-8 gap-8 md:p-4 md:gap-4'>
        {type === 'artists' && (
          <>
            {isFetchingArtists ? (
              <div className='w-full h-[600px] flex justify-center items-center m-auto'>
                <Loading size='medium' />
              </div>
            ) : (
              <>
                {allTopArtists?.map((artists, index) => (
                  <Fragment key={artists.id}>
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
                          src={artists.images[0].url}
                          alt=''
                          className='w-[80px] h-[80px] rounded-md object-cover md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px]'
                        />
                        <p className='text-white font-semibold md:text-sm max-w-sm xs:max-w-[90px] md:max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden '>
                          {artists.name}
                        </p>
                      </div>
                      <button
                        type='button'
                        className='font-semibold flex items-center gap-2 text-sm text-white px-3 py-2 cursor-pointer hover:text-green-500 md:text-xs'
                        onClick={() => {
                          window.open(artists.external_urls.spotify, '__blank');
                        }}
                      >
                        <FaSpotify className='w-5 h-5' />
                        {!matches && 'Open in Spotify'}
                      </button>
                    </div>
                    {index + 1 === allTopArtists.length ? null : <hr className='border-gray-450' />}
                  </Fragment>
                ))}
              </>
            )}
          </>
        )}
        {type === 'tracks' && (
          <>
            {isFetchingTracks ? (
              <div className='w-full h-[600px] flex justify-center items-center m-auto'>
                <Loading size='medium' />
              </div>
            ) : (
              <></>
            )}
            {allTopTracks?.map((track, index) => (
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
                      alt=''
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
                {index + 1 === allTopTracks.length ? null : <hr className='border-gray-450' />}
              </Fragment>
            ))}
          </>
        )}
      </section>
    </main>
  );
}
