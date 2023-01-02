import { FaSpotify } from 'react-icons/fa';

export default function Login() {
  const redirectToLogin = () => {
    const client_id = import.meta.env.VITE_API_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_API_REDIRECT_URI;
    const scope = import.meta.env.VITE_API_SCOPE;
    const URLAuth = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`;

    window.location.href = URLAuth;
  };

  return (
    <div className='h-screen w-full flex flex-col gap-20 justify-center items-center bg-black text-white sm:gap-10 px-4'>
      <div>
        <p className='text-4xl font-normal font-russoOne text-green-600 text-center mb-4 sm:text-xl'>
          Hello There!
        </p>
        <h2 className='text-4xl font-bold text-center sm:text-xl'>See your stats on Spotify</h2>
      </div>
      <button
        type='button'
        className='font-bold flex items-center gap-2 bg-green-600 rounded-lg px-4 py-3 cursor-pointer hover:bg-green-700 sm:px-3 sm:py-2 sm:text-sm'
        onClick={redirectToLogin}
      >
        <FaSpotify className='w-5 h-5 sm:w-4 sm:h-4' />
        Sign In
      </button>
    </div>
  );
}
