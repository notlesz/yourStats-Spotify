import useSpotify from '../hooks/useSpotify';
import Card from './Card';
import { Filter } from './Filter';
import Loading from './Loading';

export default function Artists() {
  const { artists, handleTimeRange, isFetchingArtists, timeRangeArtists } = useSpotify();
  return (
    <section className='animate-leftToShow'>
      <div className='flex items-center justify-between mb-8 sm:flex-col sm:gap-4'>
        <h3 className='text-white text-3xl font-bold sm:text-2xl'>Top Artist</h3>
        <Filter
          setTimeRange={handleTimeRange}
          typeContent='artists'
          timeRangeArtists={timeRangeArtists}
        />
      </div>
      {isFetchingArtists ? (
        <div className='w-full h-[600px] flex justify-center items-center m-auto'>
          <Loading size='medium' />
        </div>
      ) : (
        <>
          <ul className='flex flex-wrap gap-6 justify-around'>
            {artists?.slice(0, 10).map((artist, index) => (
              <Card
                id={artist.id}
                title={artist.name}
                image={artist.images[0].url}
                ranked={true}
                key={artist.id}
                position={index + 1}
                externalUrl={artist.external_urls.spotify}
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
