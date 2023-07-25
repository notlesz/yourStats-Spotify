import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import { Filter } from './';
import Card from './Card';
import Loading from './Loading';
import useSpotifyTracks from '../hooks/useSpotifyTracks';

export default function Tracks() {
  const navigate = useNavigate();
  const { tracks, isFetching } = useSpotifyTracks();
  const matches = useMediaQuery('(max-width:768px)');

  return (
    <section className='animate-leftToShow'>
      <div className='flex items-center justify-between mb-8'>
        <h3 className='text-white text-3xl font-bold md:text-2xl'>Top Tracks</h3>
        <Filter typeContent='tracks' />
      </div>
      {isFetching ? (
        <div className='w-full h-[600px] flex justify-center items-center m-auto'>
          <Loading size='medium' />
        </div>
      ) : (
        <>
          <ul className='flex flex-wrap gap-8 justify-around'>
            {tracks?.slice(0, matches ? 5 : 10).map((track, index) => (
              <Card
                title={track.name}
                subTitle={track.album.name}
                image={track.album.images[0].url}
                key={track.id}
                ranked={true}
                position={index + 1}
                externalUrl={track.external_urls.spotify}
              />
            ))}
          </ul>
          <div className='flex justify-center mt-10'>
            <button
              className='px-4 py-1 bg-white text-black rounded uppercase font-medium'
              onClick={() => navigate('/top/tracks')}
            >
              See All
            </button>
          </div>
        </>
      )}
    </section>
  );
}
