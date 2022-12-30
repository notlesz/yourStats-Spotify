import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import {
  getCurrentlyPlaying,
  getTopContent,
  getUserPlaylists,
} from "../services/api";
import { Artists } from "../types/artists";
import { Playlists } from "../types/playlists";
import { Tracks } from "../types/tracks";
export default function useSpotify() {
  const userToken = localStorage.getItem("token_user");

  const { user } = useContext(UserContext);

  const [userPlaylists, setUserPlaylists] = useState<Playlists[]>();

  const [topTracks, setTopTracks] = useState<Tracks[]>();
  const [topArtists, setTopArtists] = useState<Artists[]>();

  const [musicCurrentlyPlaying, setMusicCurrentlyPlaying] = useState<Tracks>();

  const [timeRangeTracks, setTimeRangeTracks] = useState("medium_term");
  const [timeRangeArtists, setTimeRangeArtists] = useState("medium_term");

  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingTracks, setLoadingTracks] = useState(true);
  const [loadingArtist, setLoadingArtist] = useState(true);

  const userPlaylistFilter = userPlaylists?.filter(
    (playlist) =>
      playlist.owner.display_name === user?.display_name &&
      !playlist.collaborative
  );

  const getListTopTracks = async () => {
    if (userToken) {
      const { data } = await getTopContent(
        "tracks",
        timeRangeTracks,
        userToken
      );
      setTopTracks(data.items);
      setLoadingTracks(false);
    }
  };

  const getListTopArtists = async () => {
    if (userToken) {
      const { data } = await getTopContent(
        "artists",
        timeRangeArtists,
        userToken
      );
      setTopArtists(data.items);
      setLoadingArtist(false);
    }
  };

  const getListUserPlaylists = async () => {
    if (userToken) {
      const { data } = await getUserPlaylists(userToken);
      setUserPlaylists(data.items);
    }
  };

  const getUserCurrentPlaying = async () => {
    if (userToken) {
      const { data } = await getCurrentlyPlaying(userToken);
      if (data.item) {
        setMusicCurrentlyPlaying(data.item);
      }
    }
  };

  const handleTimeRange = (type: "tracks" | "artists", range: string) => {
    if (type === "tracks") setTimeRangeTracks(range);
    else setTimeRangeArtists(range);
  };

  useEffect(() => {
    getListTopTracks();
    getListTopArtists();
    getListUserPlaylists();
    getUserCurrentPlaying();
    console.log(userToken)
  }, []);

  useEffect(() => {
    if (user && topTracks && topArtists && userPlaylists) setLoadingAll(false);
  }, [user, topTracks, topArtists, userPlaylists]);

  useEffect(() => {
    getListTopTracks();
    setLoadingTracks(true);
  }, [timeRangeTracks]);

  useEffect(() => {
    getListTopArtists();
    setLoadingArtist(true);
  }, [timeRangeArtists]);

  useEffect(() => {
    setInterval(() => {
      getUserCurrentPlaying();
    }, 30000);
  }, []);

  return {
    user,
    userPlaylistFilter,
    topTracks,
    topArtists,
    musicCurrentlyPlaying,
    timeRangeTracks,
    timeRangeArtists,
    loadingAll,
    loadingTracks,
    loadingArtist,
    handleTimeRange,
  };
}
