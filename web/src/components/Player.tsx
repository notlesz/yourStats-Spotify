import useSpotify from '../hooks/useSpotify';

export function Player() {
  const { currentlyPlaying } = useSpotify();

  return (
    <div className='flex items-center gap-5 bg-green-600 min-w-[300px] p-3 rounded xs:flex-col xs:min-w-[150px] xs:self-center py-4 animate-hideToShow'>
      <img
        className='w-[80px] h-[80px] rounded-full'
        src={currentlyPlaying?.album?.images[0]?.url}
        alt={currentlyPlaying?.album?.name}
      />
      <div className='flex flex-col'>
        <span className='font-bold text-white xs:text-xs xs:text-center'>
          {currentlyPlaying?.name}
        </span>
        <span className='font-semibold text-black xs:text-sm xs:text-center'>
          {currentlyPlaying?.artists[0]?.name}
        </span>
      </div>
    </div>
  );
}
