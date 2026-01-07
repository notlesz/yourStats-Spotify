'use server';

import { spotifyFetch } from '@/lib/spotify';

/**
 * Fetches the current user's profile.
 * Replaces /api/user
 */
export async function getUserProfile() {
  const { data, error } = await spotifyFetch('/me');
  if (error) throw new Error(error);
  return data;
}

/**
 * Fetches the user's top tracks or artists.
 * Replaces /api/user/top
 */
interface GetTopItemsParams {
  type: 'tracks' | 'artists';
  time_range?: string;
  limit?: number;
}

export async function getTopItems({
  type,
  time_range = 'medium_term',
  limit = 20,
}: GetTopItemsParams) {
  const endpoint = `/me/top/${type}?time_range=${time_range}&limit=${limit}`;
  const { data, error } = await spotifyFetch(endpoint);
  if (error) throw new Error(error);
  return data; // returns object with .items
}

/**
 * Fetches the user's playlists.
 * Replaces /api/user/playlists
 */
export async function getUserPlaylists(limit = 20) {
  const { data, error } = await spotifyFetch(`/me/playlists?limit=${limit}`);
  if (error) throw new Error(error);
  return data; // returns object with .items
}

/**
 * Fetches a single playlist by ID.
 * Replaces /api/playlists/[id]
 */
export async function getPlaylist(playlistId: string) {
  const { data, error } = await spotifyFetch(`/playlists/${playlistId}`);
  if (error) throw new Error(error);
  return data;
}
