import useSpotify from "../hook/useSpotify";
import Card from "./Card";
import { Filter } from "./Filter";
import Loading from "./Loading";

export default function Tracks() {
  const { tracks, handleTimeRange, timeRangeTracks, isFetchingTracks } =
    useSpotify();

  return (
    <section className="animate-leftToShow">
      <h3 className="text-white text-3xl font-bold mb-3 sm:text-2xl">
        Top Songs
      </h3>
      <Filter
        setTimeRange={handleTimeRange}
        timeRangeTracks={timeRangeTracks}
        typeContent="tracks"
      />
      {isFetchingTracks ? (
        <div className="w-full h-[600px] flex justify-center items-center m-auto">
          <Loading size="medium" />
        </div>
      ) : (
        <ul className="flex flex-wrap gap-6 justify-around">
          {tracks?.map((track, index) => (
            <Card
              title={track.name}
              subTitle={track.album.name}
              image={track.album.images[0].url}
              key={track.id}
              ranked={true}
              position={index + 1}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
