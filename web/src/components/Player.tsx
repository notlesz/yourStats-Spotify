import useSpotify from "../hook/useSpotify";

export function Player() {
  const { musicCurrentlyPlaying } = useSpotify();

  return (
    <>
      {musicCurrentlyPlaying && (
        <div className="flex items-center gap-5 bg-green-600 min-w-[300px] p-3 rounded">
          <img
            className="w-[80px] h-[80px] rounded-full"
            src={musicCurrentlyPlaying?.album?.images[0]?.url}
            alt={musicCurrentlyPlaying?.album?.name}
          />
          <div className="flex flex-col">
            <span className="font-bold text-white">
              {musicCurrentlyPlaying?.name}
            </span>
            <span className="font-semibold text-black">
              {musicCurrentlyPlaying?.artists[0]?.name}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
