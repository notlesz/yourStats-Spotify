import useSpotify from "../hook/useSpotify";
import Card from "./Card";

export default function Playlists() {
  const { playlist, user } = useSpotify();
  const playlistFilter = playlist?.filter(
    (playlist) => playlist.owner.display_name === user?.display_name
  );
  return (
    <section className="animate-leftToShow">
      <h3 className="text-white text-3xl font-bold mb-8 sm:text-2xl">
        Public Playlists
      </h3>
      <ul className="flex flex-wrap gap-4 justify-between sm:justify-center">
        {playlistFilter?.map((playlist) => (
          <Card
            key={playlist.id}
            title={playlist.name}
            image={playlist.images[0].url}
            total={playlist.tracks.total}
            ranked={false}
          />
        ))}
      </ul>
    </section>
  );
}
