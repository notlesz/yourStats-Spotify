import { FaSpotify } from "react-icons/fa";

export default function Login() {
  const redirectToLogin = () => {
    const client_id = import.meta.env.VITE_API_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_API_REDIRECT_URI;
    const scope = import.meta.env.VITE_API_SCOPE;
    const URLAuth = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`;

    window.location.href = URLAuth;
  };

  return (
    <div className="h-screen w-full flex flex-col gap-20 justify-center items-center bg-black text-white">
      <div>
        <p className="text-4xl font-normal font-russoOne text-green-600 text-center mb-4">
          Hello There!
        </p>
        <h2 className="text-4xl font-bold">See your stats on Spotify</h2>
      </div>
      <button
        type="button"
        className="font-bold flex items-center gap-2 bg-green-600 rounded-lg px-4 py-3 cursor-pointer hover:bg-green-700"
        onClick={redirectToLogin}
      >
        <FaSpotify size={20} />
        Sign In
      </button>
    </div>
  );
}
