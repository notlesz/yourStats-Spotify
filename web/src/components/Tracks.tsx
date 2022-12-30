import useSpotify from "../hook/useSpotify";
import { Filter } from "./Filter";
import Loading from "./Loading";

export default function Tracks() {
  const { topTracks, timeRangeTracks, loadingTracks, handleTimeRange } =
    useSpotify();

  return (
    <>
      {topTracks && (
        <section>
          <h3 className="text-white text-3xl font-bold mb-3">Top Songs</h3>
          <Filter
            setTimeRange={handleTimeRange}
            timeRangeTracks={timeRangeTracks}
            typeContent="tracks"
          />
          {loadingTracks ? (
            <div className="w-[150px] h-[150px] flex justify-center items-center m-auto">
              <Loading size="small" />
            </div>
          ) : (
            <ul className="flex flex-wrap">
              {topTracks?.map((track, index) => (
                <li
                  className="text-white flex items-center w-[20%] justify-around mb-8"
                  key={track.id}
                >
                  {index + 1}º
                  <div className="flex flex-col items-center gap-3 bg-gray-800 rounded w-[80%] px-4 py-7 h-[280px]">
                    <img
                      className="w-[150px] h-[150px] rounded-full "
                      src={track.album.images[0].url}
                      alt={track.album.name}
                    />
                    <div className="flex flex-col gap-1 items-center">
                      <span className="text-sm font-bold text-center">
                        {track?.name}
                      </span>
                      <span className="text-sm">{track.artists[0].name}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
}
