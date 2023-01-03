import useSpotify from '../hooks/useSpotify';
import Card from './Card';
import { Filter } from './Filter';
import Loading from './Loading';

export default function Tracks() {
  const { tracks, handleTimeRange, timeRangeTracks, isFetchingTracks } = useSpotify();

  return (
    <section className='animate-leftToShow'>
      <div className='flex items-center justify-between mb-8 sm:flex-col sm:gap-4'>
        <h3 className='text-white text-3xl font-bold sm:text-2xl'>Top Tracks</h3>
        <Filter
          setTimeRange={handleTimeRange}
          timeRangeTracks={timeRangeTracks}
          typeContent='tracks'
        />
      </div>
      {isFetchingTracks ? (
        <div className='w-full h-[600px] flex justify-center items-center m-auto'>
          <Loading size='medium' />
        </div>
      ) : (
        <>
          <ul className='flex flex-wrap gap-6 justify-around'>
            {tracks?.slice(0, 10).map((track, index) => (
              <Card
                id={track.id}
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
            <button className='px-4 py-1 bg-white text-black rounded uppercase font-medium'>
              See All
            </button>
          </div>
        </>
      )}
    </section>
  );
}
