import useSpotify from "../hook/useSpotify";

export default function Playlists() {
  const { userPlaylistFilter } = useSpotify();

  return (
    <>
      {userPlaylistFilter && (
        <section>
          <h3 className="text-white text-3xl font-bold mb-8">
            Public Playlists
          </h3>
          <ul className="flex flex-wrap">
            {userPlaylistFilter?.map((playlist) => (
              <li
                className="text-white flex items-center w-[20%] justify-around mb-8"
                key={playlist.id}
              >
                <div className="flex flex-col items-center gap-3 bg-gray-800 rounded w-[75%] px-4 py-7">
                  <img
                    className="w-[150px] h-[150px] rounded-full object-cover "
                    src={playlist.images[0]?.url}
                    alt={playlist.name}
                  />
                  <span className="font-bold text-center">{playlist.name}</span>
                  <span>Songs: {playlist.tracks.total}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
