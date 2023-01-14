import { Link } from 'react-router-dom';
import { redirectTo } from '../utils/document';
export default function Footer() {
  return (
    <footer className='bg-gray-600'>
      <div className='max-w-[1350px] mx-auto py-5 flex justify-between items-center md:flex-col md:gap-5 md:pb-8'>
        <Link to='/home'>
          <img src='../logo.png' alt='Logo' className='md:w-[180px] w-[260px]' />
        </Link>
        <p className='text-white text-xl transition-colors md:text-center md:text-lg'>
          Developed by{' '}
          <strong
            className='hover:text-slate-400 hover:cursor-pointer'
            onClick={() => redirectTo('https://github.com/elton-souza')}
          >
            Elton
          </strong>
        </p>
      </div>
    </footer>
  );
}
