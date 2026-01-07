'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/components/Loading';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      router.push('/login?error=no_code');
      return;
    }

    const exchangeToken = async () => {
      try {
        const response = await fetch('/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (data.success) {
          router.push(data.redirectTo || '/home');
        } else {
          router.push('/login?error=authentication_failed');
        }
      } catch (error) {
        console.error('Token exchange error:', error);
        router.push('/login?error=server_error');
      }
    };

    exchangeToken();
  }, [code, router]);

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Loading />
    </div>
  );
}

export default function Callback() {
  return (
    <Suspense
      fallback={
        <div className='h-screen w-screen flex justify-center items-center'>
          <Loading />
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
