import useSpotify from '../hooks/useSpotify';
import Card from './Card';

export default function Playlists() {
  const { playlist, user } = useSpotify();
  const playlistFilter = playlist?.filter(
    (playlist) => playlist.owner.display_name === user?.display_name,
  );
  return (
    <section className='animate-leftToShow'>
      <h3 className='text-white text-3xl font-bold mb-8 sm:text-2xl'>Public Playlists</h3>
      <ul className='flex flex-wrap gap-4 justify-between sm:justify-center'>
        {playlistFilter?.map((playlist) => (
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
    </section>
  );
}
