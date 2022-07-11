import { FaSpotify } from "react-icons/fa";
export function Login() {
  const loginSpotify = () => {
    const client_id = import.meta.env.VITE_API_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_API_REDIRECT_URI;
    const scope = import.meta.env.VITE_API_SCOPE;
    const URLAuth = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`;

    window.location.href = URLAuth;
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-900">
      <a className="flex items-center gap-2 bg-green-600 font-bold rounded-lg px-4 py-3 cursor-pointer hover:bg-green-700" onClick={loginSpotify}>
        <FaSpotify size={20}/>
        Login with Spotify
      </a>
    </div>
  );
}
