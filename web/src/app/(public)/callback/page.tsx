'use client';

import { Loading } from '@/components';
import { UserContext } from '@/context/userContext';
import { getAccessToken } from '@/services/api';
import { useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function LoginCallback() {
  const searchParams = useSearchParams();
  const { signIn } = useContext(UserContext);

  const token = searchParams.get('code');

  const getCredentials = async (token: string) => {
    const { data } = await getAccessToken(token);
    signIn(data);
  };

  useEffect(() => {
    if (token) {
      getCredentials(token);
    }
  }, [token]);

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Loading />
    </div>
  );
}
