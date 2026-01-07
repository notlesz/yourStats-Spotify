import { NextResponse } from 'next/server';

export async function GET() {
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI;
  const scope = process.env.SCOPE;

  if (!client_id || !redirect_uri || !scope) {
    return NextResponse.json(
      { error: 'Missing environment variables' },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
  });


  const url = `https://accounts.spotify.com/authorize?${params.toString()}`;

  return NextResponse.redirect(url);
}