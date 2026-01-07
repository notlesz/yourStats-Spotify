import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const code = body.code;

    if (!code) {
      return NextResponse.json({ message: 'Invalid Code' }, { status: 400 });
    }

    const client_id = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    const client_secret = process.env.CLIENT_SECRET;

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri || '',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Spotify API error:', errorData);
      return NextResponse.json(
        { message: 'Failed to get token from Spotify', error: errorData },
        { status: response.status },
      );
    }

    const data = await response.json();

    const { access_token, expires_in, refresh_token } = data;

    const cookieStore = await cookies();

    cookieStore.set('spotify_access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: expires_in,
      path: '/',
    });

    cookieStore.set('spotify_refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });

    cookieStore.set('token_created_at', new Date().toISOString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: expires_in,
      path: '/',
    });

    return NextResponse.json({
      success: true,
      redirectTo: '/home',
    });
  } catch (error) {
    console.error('Token route error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: String(error) },
      { status: 500 },
    );
  }
}
