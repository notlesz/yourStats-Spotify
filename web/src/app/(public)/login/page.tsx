import Image from 'next/image';
import RedirectLogin from './components/redirect-login';

export default function Login() {
  return (
    <div className='h-screen w-full flex flex-col gap-20 justify-center items-center bg-black text-white xs:gap-10 px-4'>
      <div className='flex flex-col items-center'>
        <Image src='/logo.png' alt='Logo' width={300} height={300} />
        <p className='text-4xl font-normal font-russoOne text-green-600 text-center mb-4 xs:text-xl'>
          Hello There!
        </p>
        <h2 className='text-4xl font-bold text-center xs:text-xl'>See your stats on Spotify</h2>
        <RedirectLogin />
      </div>
    </div>
  );
}
