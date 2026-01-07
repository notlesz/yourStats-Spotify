import { cookies } from 'next/headers';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

interface SpotifyFetchResult<T = any> {
  data?: T;
  error?: string;
  status: number;
}

export async function spotifyFetch<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<SpotifyFetchResult<T>> {
  const cookieStore = await cookies();
  const token = cookieStore.get('spotify_access_token')?.value;

  if (!token) {
    return { error: 'Invalid Access Token', status: 401 };
  }

  try {
    const url = endpoint.startsWith('http') ? endpoint : `${SPOTIFY_API_BASE}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return { status: 204 };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData?.error?.message || 'Spotify API Error',
        status: response.status,
      };
    }

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    console.error('Spotify Service Error:', error);
    return { error: 'Internal Server Error', status: 500 };
  }
}
