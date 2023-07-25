import { Fragment, useContext, useEffect } from 'react';
import { BiTime } from 'react-icons/bi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdLibraryMusic } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../../components';
import useMediaQuery from '../../hooks/useMediaQuery';
import { msToTime } from '../../utils/conversions';
import { redirectTo } from '../../utils/document';
import useSpotifySinglePlaylist from '../../hooks/useSpotifySinglePlaylist';
import { SpotifyContext } from '../../context/spotifyContext';

export default function SinglePlaylist() {
  const { handlePlaylistId } = useContext(SpotifyContext);

  const { isFetching, singlePlaylist } = useSpotifySinglePlaylist();

  const { id } = useParams<{ id: string }>();
  const matches = useMediaQuery('(max-width:720px)');

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
    <div className='animate-leftToShow p-4 mb-20 mt-5 md:mb-10 min-h-screen'>
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
          {isFetching ? (
            <div className='w-full h-[600px] flex justify-center items-center m-auto'>
              <Loading size='medium' />
            </div>
          ) : (
            <>
              {singlePlaylist && (
                <>
                  <div className='flex justify-between md:flex-col md:mb-8'>
                    <div className='flex items-start gap-4 md:flex-col md:items-center md:mb-4'>
                      {singlePlaylist.images.length > 0 ? (
                        <img
                          src={singlePlaylist?.images[0].url}
                          alt={singlePlaylist?.name}
                          className='w-[150px] h-[150px] md:w-[120px] md:h-[120px] xs:w-[80px] xs:h-[80px] object-cover rounded'
                        />
                      ) : (
                        <div className='w-[150px] h-[150px] rounded-full md:w-[100px] md:h-[100px] bg-black flex justify-center items-center'>
                          <MdLibraryMusic className='w-6 h-6 text-white' />
                        </div>
                      )}

                      <div className='flex flex-col gap-3 self-stretch justify-around'>
                        <div>
                          <p className='font-bold text-white text-2xl max-w-[500px] md:text-center md:max-w-none md:text-xl'>
                            {singlePlaylist?.name}
                          </p>
                          <p className='text-gray-100 max-w-[500px] md:text-center'>
                            {singlePlaylist?.description}
                          </p>
                        </div>
                        <div className='flex items-center gap-2 md:justify-center md:flex-col'>
                          <p className='text-gray-100'>
                            Followers:{' '}
                            <strong className='text-white'>
                              {singlePlaylist?.followers?.total}
                            </strong>
                          </p>
                          <p className='text-gray-100'>
                            Tracks:{' '}
                            <strong className='text-white'>{singlePlaylist?.tracks?.total} </strong>
                          </p>
                          <p className='text-gray-100'>
                            By:{' '}
                            <strong
                              className='text-white hover:text-green-500 hover:cursor-pointer'
                              onClick={() => redirectTo(singlePlaylist.owner.external_urls.spotify)}
                            >
                              {singlePlaylist?.owner?.display_name}{' '}
                            </strong>
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      type='button'
                      className='font-bold flex items-center gap-2 text-base text-white cursor-pointer hover:text-green-600 mt-3 md:self-center'
                      onClick={() => redirectTo(singlePlaylist?.external_urls.spotify)}
                    >
                      <img src='/Spotify_Icon_White.png' className='w-5 h-5' />
                      Open Spotify
                    </button>
                  </div>
                  {singlePlaylist.tracks?.items?.length! > 0 ? (
                    <>
                      <h4 className='text-white text-center text-3xl font-bold md:mb-4'>
                        All Tracks
                      </h4>
                      <div className='flex flex-col gap-4'>
                        {singlePlaylist.tracks.items?.map(({ track }, index) => (
                          <Fragment key={index}>
                            <div className='flex items-center justify-between gap-2'>
                              <div className='flex items-center gap-6 md:gap-3'>
                                <span className='text-white font-semibold md:text-xs flex gap-1 w-7 h-7 items-center justify-center rounded-full '>
                                  {index + 1} <strong>º</strong>
                                </span>
                                <img
                                  src={track.album?.images[0].url}
                                  alt={track.album?.name}
                                  className='w-[80px] h-[80px] rounded-md object-cover md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px]'
                                />
                                <p
                                  className='text-white font-semibold md:text-sm max-w-sm xs:max-w-[50px] md:max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden hover:cursor-pointer hover:underline'
                                  onClick={() => redirectTo(track.external_urls.spotify)}
                                >
                                  {track.name}
                                </p>
                                <p
                                  className='text-gray-100 text-sm font-semibold max-w-sm xs:max-w-[70px] md:max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden hover:cursor-pointer hover:underline'
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
                            {index + 1 === singlePlaylist?.tracks?.items?.length ? null : (
                              <hr className='border-gray-450' />
                            )}
                          </Fragment>
                        ))}
                      </div>
                    </>
                  ) : (
                    <h4 className='text-white text-center text-2xl font-bold md:mb-4'>No Tracks</h4>
                  )}
                  {singlePlaylist.tracks.total > singlePlaylist?.tracks?.limit && (
                    <div className='flex items-center justify-center my-4'>
                      <p
                        className='text-center uppercase text-sm text-white font-medium hover:cursor-pointer hover:text-green-500 flex items-center gap-2'
                        onClick={() => redirectTo(singlePlaylist?.external_urls.spotify)}
                      >
                        <img src='/Spotify_Icon_White.png' className='w-5 h-5' />
                        See the full list on Spotify
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      </section>
    </div>
  );
}
