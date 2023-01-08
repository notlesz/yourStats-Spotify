import Artists from '../../components/Artists';
import Playlists from '../../components/Playlists';
import Tracks from '../../components/Tracks';

export default function Home() {
  return (
    <main className='flex flex-col gap-20 mb-10 px-4 md:px-4'>
      <Tracks />
      <Artists />
      <Playlists />
    </main>
  );
}
