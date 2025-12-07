import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function refreshSpotifyToken(refreshToken: string) {
  const client_id = process.env.CLIENT_ID!;
  const client_secret = process.env.CLIENT_SECRET!;

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return {
      access_token: data.access_token,
      expires_in: data.expires_in,
      refresh_token: data.refresh_token || refreshToken,
    };
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicRoutes = ['/', '/login', '/callback'];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('spotify_access_token');
  const refreshToken = request.cookies.get('spotify_refresh_token');
  const tokenCreatedAt = request.cookies.get('token_created_at');

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // if dont have access token but have refresh token, try to refresh
  if (!accessToken && refreshToken) {
    const newTokens = await refreshSpotifyToken(refreshToken.value);

    if (newTokens) {
      const response = NextResponse.next();

      response.cookies.set('spotify_access_token', newTokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: newTokens.expires_in,
        path: '/',
      });

      response.cookies.set('spotify_refresh_token', newTokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 ano
        path: '/',
      });

      response.cookies.set('token_created_at', new Date().toISOString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: newTokens.expires_in,
        path: '/',
      });

      return response;
    } else {
      // refresh is failed, clean the cookies and redirect to login
      const response = NextResponse.redirect(new URL('/login?error=session_expired', request.url));

      response.cookies.delete('spotify_access_token');
      response.cookies.delete('spotify_refresh_token');
      response.cookies.delete('token_created_at');

      return response;
    }
  }

  // check the access toke expired
  if (accessToken && tokenCreatedAt) {
    const createdAt = new Date(tokenCreatedAt.value);
    const now = new Date();
    const diffInSeconds = (now.getTime() - createdAt.getTime()) / 1000;

    // Spotify tokens duration is 3600 seconds (1 hour)
    // Refresh token with 5 minutes of anticipation (3300 seconds)
    if (diffInSeconds > 3300) {
      if (refreshToken) {
        const newTokens = await refreshSpotifyToken(refreshToken.value);

        if (newTokens) {
          const response = NextResponse.next();

          response.cookies.set('spotify_access_token', newTokens.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: newTokens.expires_in,
            path: '/',
          });

          response.cookies.set('spotify_refresh_token', newTokens.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 365,
            path: '/',
          });

          response.cookies.set('token_created_at', new Date().toISOString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: newTokens.expires_in,
            path: '/',
          });

          return response;
        } else {
          const response = NextResponse.redirect(
            new URL('/login?error=session_expired', request.url),
          );

          response.cookies.delete('spotify_access_token');
          response.cookies.delete('spotify_refresh_token');
          response.cookies.delete('token_created_at');

          return response;
        }
      } else {
        const response = NextResponse.redirect(
          new URL('/login?error=session_expired', request.url),
        );

        response.cookies.delete('spotify_access_token');
        response.cookies.delete('token_created_at');

        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
