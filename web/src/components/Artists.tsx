import useSpotify from "../hook/useSpotify";
import { Filter } from "./Filter";
import Loading from "./Loading";

export default function Artists() {
  const { topArtists, timeRangeArtists, loadingArtist, handleTimeRange } =
    useSpotify();

  return (
    <>
      {topArtists && (
        <section>
          <h3 className="text-white text-3xl font-bold mb-3">Top Artist</h3>
          <Filter
            setTimeRange={handleTimeRange}
            typeContent="artists"
            timeRangeArtists={timeRangeArtists}
          />
          {loadingArtist ? (
            <div className="w-[150px] h-[150px] flex justify-center items-center m-auto">
              <Loading size="small" />
            </div>
          ) : (
            <ul className="flex flex-wrap">
              {topArtists?.map((artist, index) => (
                <li
                  className="text-white flex items-center w-[20%] justify-around mb-8"
                  key={artist.id}
                >
                  {index + 1}º
                  <div className="flex flex-col items-center gap-3 bg-gray-800 rounded w-[75%] px-4 py-7">
                    <img
                      className="w-[150px] h-[150px] rounded-full "
                      src={artist.images[0].url}
                      alt={artist.name}
                    />
                    <span className="font-bold text-center ">
                      {artist.name}
                    </span>
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
