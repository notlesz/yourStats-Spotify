import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import useSpotify from '../hooks/useSpotify';
import Card from './Card';

export default function Playlists() {
  const { playlist, user } = useSpotify();
  const playlistFilter = playlist?.filter(
    (playlist) => playlist.owner.display_name === user?.display_name,
  );

  const navigate = useNavigate();
  const matches = useMediaQuery('(max-width:768px)');

  return (
    <section className='animate-leftToShow'>
      <h3 className='text-white text-3xl font-bold mb-8 md:text-2xl md:text-center font-russoOne'>
        Public Playlists
      </h3>
      <ul className='flex flex-wrap gap-8 justify-between md:justify-center'>
        {playlistFilter?.slice(0, matches ? 5 : 10).map((playlist) => (
          <Card
            id={playlist.id}
            key={playlist.id}
            title={playlist.name}
            image={playlist.images[0].url}
            total={playlist.tracks.total}
            externalUrl={playlist.external_urls.spotify}
            ranked={false}
          />
        ))}
      </ul>
      <div className='flex justify-center mt-10'>
        <button
          className='px-4 py-1 bg-white text-black rounded uppercase font-medium'
          onClick={() => navigate('/playlists/all')}
        >
          See All
        </button>
      </div>
    </section>
  );
}
