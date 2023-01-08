import { Fragment, useEffect } from 'react';
import { BiTime } from 'react-icons/bi';
import { FaSpotify } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import useMediaQuery from '../../hooks/useMediaQuery';
import useSpotify from '../../hooks/useSpotify';
import { msToTime } from '../../utils/conversions';
import redirectTo from '../../utils/document';

export default function SinglePlaylist() {
  const { handlePlaylistId, playlistById, isFetchingPlaylistById } = useSpotify();
  const { id } = useParams<{ id: string }>();
  const matches = useMediaQuery('(max-width:580px)');

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      handlePlaylistId(id);
    }
    return () => {
      handlePlaylistId(null);
    };
  }, [id]);

  return (
    <main className='mb-8 animate-leftToShow p-4'>
      <div className='flex items-center justify-between mb-8'>
        <button
          className='flex items-center gap-2 text-white text-lg font-bold hover:text-green-600'
          onClick={() => navigate(-1)}
        >
          <IoMdArrowRoundBack />
          Back
        </button>
      </div>
      <section className='flex flex-col w-full rounded bg-gray-600 p-8 gap-8 md:p-4 md:gap-4'>
        <>
          {isFetchingPlaylistById ? (
            <div className='w-full h-[600px] flex justify-center items-center m-auto'>
              <Loading size='medium' />
            </div>
          ) : (
            <>
              <div className='flex justify-between md:flex-col md:mb-8'>
                <div className='flex items-start gap-4 md:flex-col md:items-center md:mb-4'>
                  <img
                    src={playlistById?.images[0].url}
                    alt=''
                    className='w-[150px] h-[150px] md:w-[120px] md:h-[120px] xs:w-[80px] xs:h-[80px] object-cover rounded'
                  />
                  <div className='flex flex-col gap-3 self-stretch justify-around'>
                    <div>
                      <p className='font-bold text-white text-2xl max-w-[500px] md:text-center'>
                        {playlistById?.name}
                      </p>
                      <p className='text-gray-100 max-w-[500px] md:text-center'>
                        {playlistById?.description}
                      </p>
                    </div>
                    <div className='flex items-center gap-2 md:justify-center'>
                      <p className='text-gray-100'>
                        Followers:{' '}
                        <strong className='text-white'>{playlistById?.followers.total}</strong>
                      </p>
                      <p className='text-gray-100'>
                        Tracks:{' '}
                        <strong className='text-white'>{playlistById?.tracks.total} </strong>
                      </p>
                      <p className='text-gray-100'>
                        By:{' '}
                        <strong className='text-white'>{playlistById?.owner.display_name} </strong>
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type='button'
                  className='font-bold flex items-center gap-2 text-base text-white cursor-pointer hover:text-green-600 mt-3 md:self-center'
                  onClick={() => redirectTo(playlistById?.external_urls.spotify)}
                >
                  <FaSpotify className='w-4 h-4' />
                  Open in Spotify
                </button>
              </div>
              <h4 className='text-white text-center text-3xl font-bold md:mb-4'>All Tracks</h4>
              <div className='flex flex-col gap-4'>
                {playlistById?.tracks?.items?.map(({ track }, index) => (
                  <Fragment key={index}>
                    <div className='flex items-center justify-between gap-2'>
                      <div className='flex items-center gap-6 md:gap-3'>
                        <span className='text-white font-semibold md:text-xs flex gap-1 w-7 h-7 items-center justify-center rounded-full '>
                          {index + 1} <strong>º</strong>
                        </span>
                        <img
                          src={track.album?.images[0].url}
                          alt=''
                          className='w-[80px] h-[80px] rounded-md object-cover md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px]'
                        />
                        <p
                          className='text-white font-semibold md:text-sm max-w-sm xs:max-w-[90px] md:max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden hover:cursor-pointer hover:underline'
                          onClick={() => redirectTo(track.external_urls.spotify)}
                        >
                          {track.name}
                        </p>
                        <p
                          className='text-gray-100 text-sm font-semibold hover:cursor-pointer hover:underline'
                          onClick={() => redirectTo(track.artists[0].external_urls.spotify)}
                        >
                          {track.artists[0].name}
                        </p>
                      </div>
                      <span className='text-gray-100 text-sm font-semibold flex items-center gap-1'>
                        <BiTime className='w-4 h-4' />
                        {msToTime(track.duration_ms)}
                      </span>
                    </div>
                    {index + 1 === playlistById?.tracks?.items?.length ? null : (
                      <hr className='border-gray-450' />
                    )}
                  </Fragment>
                ))}
              </div>
              {playlistById?.tracks?.total! > playlistById?.tracks?.limit! && (
                <div className='flex items-center justify-center my-4'>
                  <p
                    className='text-center uppercase text-sm text-white font-medium hover:cursor-pointer hover:text-green-500 flex items-center gap-2'
                    onClick={() => redirectTo(playlistById?.external_urls.spotify)}
                  >
                    <FaSpotify className='w-5 h-5' />
                    See the full list on Spotify
                  </p>
                </div>
              )}
            </>
          )}
        </>
      </section>
    </main>
  );
}
