import { useEffect, useState } from "react";
import { Filter } from "../components/Filter";
import { Player } from "../components/Player";
import {
  getCurrentlyPlaying,
  getTopContent,
  getUserData,
  getUserPlaylists,
} from "../services/api";
import { Artists } from "../types/artists";
import { Playlists } from "../types/playlists";
import { CurrentlyPlaying, Tracks } from "../types/tracks";
import { User } from "../types/user";

export function Home() {
  const [userData, setUserData] = useState<User>();
  const [userPlaylists, setUserPlaylists] = useState<Playlists[]>();
  const [topTracks, setTopTracks] = useState<Tracks[]>();
  const [topArtists, setTopArtists] = useState<Artists[]>();
  const [musicCurrentlyPlaying, setMusicCurrentlyPlaying] = useState<Tracks>();
  const [timeRangeTracks, setTimeRangeTracks] = useState("medium_term");
  const [timeRangeArtists, setTimeRangeArtists] = useState("medium_term");

  const getUserInfo = async () => {
    const { data } = await getUserData();
    setUserData(data);
  };

  const getListTopTracks = async () => {
    const { data } = await getTopContent("tracks", timeRangeTracks);
    setTopTracks(data.items);
  };

  const getListTopArtists = async () => {
    const { data } = await getTopContent("artists", timeRangeArtists);
    setTopArtists(data.items);
  };

  const getListUserPlaylists = async () => {
    const { data } = await getUserPlaylists();
    setUserPlaylists(data.items);
  };

  const getUserCurrentPlaying = async () => {
    const { data } = await getCurrentlyPlaying();
    if (data.item) {
      setMusicCurrentlyPlaying(data.item);
    }
  };

  const handleTimeRange = (type: "tracks" | "artists", range: string) => {
    if (type === "tracks") setTimeRangeTracks(range);
    else setTimeRangeArtists(range);
  };

  useEffect(() => {
    getUserInfo();
    getListTopTracks();
    getListTopArtists();
    getListUserPlaylists();
    getUserCurrentPlaying();
  }, []);

  useEffect(() => {
    getListTopTracks();
  }, [timeRangeTracks]);

  useEffect(() => {
    getListTopArtists();
  }, [timeRangeArtists]);


  return (
    <div className="w-full min-h-screen bg-gray-900">
      <div className="max-w-[1350px] mx-auto my-0 flex flex-col justify-center gap-[30px]">
        <header className="flex justify-around items-center gap-4 py-20">
          {userData && (
            <>
              <div className="flex items-center gap-5">
                <img
                  className={`rounded-full w-[200px] h-[200px]`}
                  src={userData.images[0].url}
                  alt={userData.display_name}
                />
                <div className="flex flex-col gap-1 items-start">
                  <a
                    className="text-white text-2xl font-bold hover:text-slate-400 transition-colors"
                    href={userData.external_urls.spotify}
                    target={"_blank"}
                  >
                    {userData.display_name}
                  </a>
                  <span className="text-neutral-100 text-base font-bold">
                    Followers: {userData.followers.total}
                  </span>
                </div>
              </div>
              {musicCurrentlyPlaying && <Player song={musicCurrentlyPlaying} />}
            </>
          )}
        </header>
        <main className="flex flex-col gap-4">
          {topTracks && (
            <div>
              <h3 className="text-white text-3xl font-bold mb-3">Top Songs</h3>
              <Filter
                setTimeRange={handleTimeRange}
                timeRangeTracks={timeRangeTracks}
                typeContent="tracks"
              />
              <ul className="flex flex-wrap ">
                {topTracks.map((track, index) => (
                  <li
                    className="text-white flex items-center w-[20%] justify-around mb-8"
                    key={track.id}
                  >
                    {index + 1}º
                    <div className="flex flex-col items-center gap-3 bg-gray-800 rounded w-[80%] px-4 py-7 h-[280px]">
                      <img
                        className="w-[150px] h-[150px] rounded-full "
                        src={track.album.images[0].url}
                        alt={track.album.name}
                      />
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-sm font-bold text-center">
                          {track?.name}
                        </span>
                        <span className="text-sm">{track.artists[0].name}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {topArtists && (
            <div>
              <h3 className="text-white text-3xl font-bold mb-3">Top Artist</h3>
              <Filter
                setTimeRange={handleTimeRange}
                typeContent="artists"
                timeRangeArtists={timeRangeArtists}
              />
              <ul className="flex flex-wrap">
                {topArtists.map((artist, index) => (
                  <li
                    className="text-white flex items-center w-[20%] justify-around mb-8"
                    key={artist.id}
                  >
                    {index + 1}º
                    <div className="flex flex-col items-center gap-3 bg-gray-800 rounded w-[75%] px-4 py-7">
                      <img
                        className="w-[150px] h-[150px] rounded-full "
                        src={artist.images[0].url}
                        alt={artist.name}
                      />
                      <span className="font-bold text-center ">
                        {artist.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {userPlaylists && (
            <div>
              <h3 className="text-white text-3xl font-bold mb-8">
                Public Playlists
              </h3>
              <ul className="flex flex-wrap">
                {userPlaylists.map((playlist) => {
                  if (
                    playlist.owner.display_name === "Elton" &&
                    !playlist.collaborative
                  ) {
                    return (
                      <li
                        className="text-white flex items-center w-[20%] justify-around mb-8"
                        key={playlist.id}
                      >
                        <div className="flex flex-col items-center gap-3 bg-gray-800 rounded w-[75%] px-4 py-7">
                          <img
                            className="w-[150px] h-[150px] rounded-full object-cover "
                            src={playlist.images[0].url}
                            alt={playlist.name}
                          />
                          <span className="font-bold text-center">
                            {playlist.name}
                          </span>
                          <span>Songs: {playlist.tracks.total}</span>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
