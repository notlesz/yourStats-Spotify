import useMediaQuery from '@/hooks/useMediaQuery';
import useSpotifyArtists from '@/hooks/useSpotifyArtists';
import { useRouter } from 'next/navigation';
import { Filter } from './';
import Card from './Card';
import Loading from './Loading';

export default function Artists() {
  const { artists, isFetching } = useSpotifyArtists();

  const navigate = useRouter();
  const matches = useMediaQuery('(max-width:768px)');

  return (
    <section className='animate-leftToShow'>
      <div className='flex items-center justify-between mb-8'>
        <h3 className='text-white text-3xl font-bold md:text-2xl'>Top Artist</h3>
        <Filter typeContent='artists' />
      </div>
      {isFetching ? (
        <div className='w-full h-[600px] flex justify-center items-center m-auto'>
          <Loading size='medium' />
        </div>
      ) : (
        <>
          <ul className='flex flex-wrap gap-8 justify-around'>
            {artists?.slice(0, matches ? 5 : 10).map((artist, index) => (
              <Card
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
            <button
              className='px-4 py-1 bg-white text-black rounded uppercase font-medium'
              onClick={() => navigate.push('/top/artists')}
            >
              See All
            </button>
          </div>
        </>
      )}
    </section>
  );
}
