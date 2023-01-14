import { useNavigate } from 'react-router-dom';
import useSpotify from '../../hooks/useSpotify';
import { getToken } from '../../utils/keys';

export default function Login() {
  const { user } = useSpotify();

  const token = getToken();

  const navigate = useNavigate();

  const redirectToLogin = () => {
    const client_id = import.meta.env.VITE_API_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_API_REDIRECT_URI;
    const scope = import.meta.env.VITE_API_SCOPE;
    const URLAuth = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`;

    window.location.href = URLAuth;
  };

  return (
    <div className='h-screen w-full flex flex-col gap-20 justify-center items-center bg-black text-white xs:gap-10 px-4'>
      <div>
        <img src='/logo.png' alt='Logo' className='m-auto' />
        <p className='text-4xl font-normal font-russoOne text-green-600 text-center mb-4 xs:text-xl'>
          Hello There!
        </p>
        <h2 className='text-4xl font-bold text-center xs:text-xl'>See your stats on Spotify</h2>
      </div>
      <button
        type='button'
        className='font-bold flex items-center gap-2 bg-green-600 rounded-lg px-4 py-3 cursor-pointer hover:bg-green-700 xs:px-3 sm:py-2 xs:text-sm'
        onClick={() => {
          if (user && token) {
            navigate('/home');
          } else {
            redirectToLogin();
          }
        }}
      >
        {user && token ? (
          "Let's Go!"
        ) : (
          <>
            <img src='/Spotify_Icon_White.png' className='w-5 h-5' />
            Sign In
          </>
        )}
      </button>
    </div>
  );
}
