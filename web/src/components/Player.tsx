import { Tracks } from "../types/tracks";

interface PlayerProps {
  song: Tracks;
}
export function Player({ song }: PlayerProps) {
  return (
    <div className="flex items-center gap-5 bg-green-600 min-w-[300px] p-3 rounded">
      <img
        className="w-[80px] h-[80px] rounded-full"
        src={song.album.images[0].url}
        alt={song.album.name}
      />
      <div className="flex flex-col">
        <span className="font-bold text-white">{song.name}</span>
        <span className="font-semibold text-black">{song.artists[0].name}</span>
      </div>
    </div>
  );
}
