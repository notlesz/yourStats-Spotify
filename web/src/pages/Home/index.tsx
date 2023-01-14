import { Artists, Playlists, Tracks } from '../../components';

export default function Home() {
  return (
    <div className='flex flex-col gap-20 px-4 md:px-4'>
      <Tracks />
      <Artists />
      <Playlists />
    </div>
  );
}
