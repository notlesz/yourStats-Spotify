import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { Filter } from '../../components';
import TopTracks from './top.tracks';
import TopArtists from './top.artists';

export default function TopContent() {
  const { type } = useParams<{ type: 'tracks' | 'artists' }>();

  const navigate = useNavigate();

  return (
    <div className='animate-leftToShow p-4 my-20 md:my-10 min-h-screen'>
      <h4 className='text-white text-center text-4xl font-bold mb-8 md:text-2xl capitalize'>
        Top {type}
      </h4>
      <div className='flex items-center justify-between mb-8'>
        <button
          className='flex items-center gap-2 text-white text-lg font-bold hover:text-green-600'
          onClick={() => navigate('/home')}
        >
          <IoMdArrowRoundBack />
          Back
        </button>
        <Filter typeContent={type!} />
      </div>
      <section className='flex flex-col w-full rounded bg-gray-600 p-8 gap-8 md:p-4 md:gap-4'>
        {type === 'artists' && <TopArtists />}
        {type === 'tracks' && <TopTracks />}
      </section>
    </div>
  );
}
