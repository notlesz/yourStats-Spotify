import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import Loading from '@/components/Loading';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Callback({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const code = params.code as string;

  if (!code) {
    redirect('/login?error=no_code');
  }

  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  const response = await fetch(`${baseUrl}/api/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
    cache: 'no-store',
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    redirect('/login?error=authentication_failed');
  }

  redirect('/home');

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Loading />
    </div>
  );
}
