import useSpotify from "../hook/useSpotify";
import Card from "./Card";
import { Filter } from "./Filter";
import Loading from "./Loading";

export default function Artists() {
  const { artists, handleTimeRange, isFetchingArtists, timeRangeArtists } =
    useSpotify();
  return (
    <section className="animate-leftToShow">
      <h3 className="text-white text-3xl font-bold mb-3 sm:text-2xl">
        Top Artist
      </h3>
      <Filter
        setTimeRange={handleTimeRange}
        typeContent="artists"
        timeRangeArtists={timeRangeArtists}
      />
      {isFetchingArtists ? (
        <div className="w-full h-[600px] flex justify-center items-center m-auto">
          <Loading size="medium" />
        </div>
      ) : (
        <ul className="flex flex-wrap gap-6 justify-around">
          {artists?.map((artist, index) => (
            <Card
              title={artist.name}
              image={artist.images[0].url}
              ranked={true}
              key={artist.id}
              position={index + 1}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
