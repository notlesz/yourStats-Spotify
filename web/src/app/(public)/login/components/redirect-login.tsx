'use client';

import Image from 'next/image';

export default function RedirectLogin() {
  const redirectToLogin = () => {
    window.location.href = '/api/redirect-login';
  };

  return (
    <button
      onClick={redirectToLogin}
      className='font-bold flex items-center gap-2 bg-green-600 rounded-lg mt-4  px-4 py-3 cursor-pointer hover:bg-green-700 xs:px-3 sm:py-2 xs:text-sm'
    >
      <Image src='/Spotify_Icon_White.png' alt='Spotify icon' width={20} height={20} />
      Sign In
    </button>
  );
}
