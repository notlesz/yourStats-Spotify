import { Artists } from "../types/artists";
import { Playlists } from "../types/playlists";
import { Tracks } from "../types/tracks";

interface CardProps {
  listData: any[];
}

export function Card({ listData }: CardProps) {

  return (
    <ul className="flex flex-wrap ">
      {listData.map((track, index) => (
        <li
          className="text-white flex items-center w-[20%] justify-around mb-8"
          key={track.id}
        >
          {index + 1}º
          <div className="flex flex-col items-center gap-3 bg-gray-800 rounded w-[80%] px-4 py-7">
            <img
              className="w-[150px] h-[150px] rounded-full "
              src={track.album.images[0].url}
              alt={track.album.name}
            />
            <div className="flex flex-col gap-1 items-center">
              <span className="text-sm font-bold">{track?.name}</span>
              <span className="text-sm">{track.artists[0].name}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
