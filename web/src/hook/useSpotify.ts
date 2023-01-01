import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../context/userContext";
import {
  getCurrentlyPlaying,
  getTopContent,
  getUserPlaylists
} from "../services/api";
import { Artists } from "../types/artists";
import { Playlists } from "../types/playlists";
import { Tracks } from "../types/tracks";
import useToast from "./useToast";

export type TimeRange = "medium_term" | "long_term" | "short_term";

export default function useSpotify() {
  const { user, logout } = useContext(UserContext);
  const [timeRangeTracks, setTimeRangeTracks] =
    useState<TimeRange>("medium_term");
  const [timeRangeArtists, setTimeRangeArtists] =
    useState<TimeRange>("medium_term");

  const token = localStorage.getItem("token_user") || null;
  const { handleToast } = useToast();

  const { data: playlist, isFetching: isFetchingPlaylist } = useQuery<
    Playlists[]
  >(
    "playlist",
    async () => {
      if (token) {
        try {
          const { data } = await getUserPlaylists(token);
          return data.items;
        } catch (error: any) {
          if (error.response.status === 401) {
            handleToast("error", error.response.message);
            logout();
          }
        }
      }
    },
    {
      staleTime: 3000 * 60,
    }
  );

  const { data: tracks, isFetching: isFetchingTracks } = useQuery<Tracks[]>(
    ["tracks", timeRangeTracks],
    async () => {
      if (token) {
        const { data } = await getTopContent("tracks", timeRangeTracks, token);
        return data.items;
      }
    },
    {
      staleTime: 3000 * 60,
    }
  );

  const { data: artists, isFetching: isFetchingArtists } = useQuery<Artists[]>(
    ["artists", timeRangeArtists],
    async () => {
      if (token) {
        const { data } = await getTopContent(
          "artists",
          timeRangeArtists,
          token
        );
        return data.items;
      }
    },
    {
      staleTime: 3000 * 60,
    }
  );

  const { data: currentlyPlaying, isFetching: isFetchingCurrently } =
    useQuery<Tracks>(
      "currentlyPlaying",
      async () => {
        if (token && user) {
          try {
            const { data } = await getCurrentlyPlaying(token);
            return data.item;
          } catch (error: any) {
            if (error.response.status === 401) {
              handleToast("error", error.response.message);
              logout();
            }
          }
        }
      },
      {
        refetchInterval: 1000 * 30, // 30 seconds
      }
    );

  const handleTimeRange = (
    type: "tracks" | "artists",
    timeRange: TimeRange
  ) => {
    if (type === "tracks") {
      if (timeRange !== timeRangeTracks) {
        setTimeRangeTracks(timeRange);
        // queryClient.invalidateQueries("tracks");
      }
    } else {
      if (timeRange !== timeRangeArtists) {
        setTimeRangeArtists(timeRange);
        // queryClient.invalidateQueries("artists");
      }
    }
  };

  return {
    artists,
    user,
    tracks,
    playlist,
    currentlyPlaying,
    timeRangeArtists,
    timeRangeTracks,
    handleTimeRange,
    isFetchingArtists,
    isFetchingCurrently,
    isFetchingPlaylist,
    isFetchingTracks,
  };
}
