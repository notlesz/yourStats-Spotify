import { IoMusicalNotesOutline, IoStatsChartOutline } from 'react-icons/io5';
import RedirectLogin from './components/redirect-login';

export default function Login() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center p-4'>
      <div className='max-w-md w-full'>
        {/* Logo and Title */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 shadow-lg shadow-green-500/50'>
            <IoMusicalNotesOutline className='w-12 h-12 text-white' />
          </div>
          <h1 className='text-4xl font-bold text-white mb-2'>Spotify Stats</h1>
          <p className='text-gray-400 text-lg'>Descubra suas músicas e artistas mais ouvidos</p>
        </div>

        {/* Features */}
        <div className='bg-[#282828] rounded-2xl p-8 mb-8 border border-gray-800'>
          <div className='space-y-6'>
            <div className='flex items-start gap-4'>
              <div className='w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                <IoStatsChartOutline className='w-6 h-6 text-green-500' />
              </div>
              <div>
                <h3 className='text-white font-semibold mb-1'>Suas Estatísticas</h3>
                <p className='text-gray-400 text-sm'>
                  Veja suas músicas e artistas mais ouvidos em diferentes períodos
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                <IoMusicalNotesOutline className='w-6 h-6 text-green-500' />
              </div>
              <div>
                <h3 className='text-white font-semibold mb-1'>Análise de Gêneros</h3>
                <p className='text-gray-400 text-sm'>
                  Descubra quais gêneros musicais você mais escuta
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                <svg
                  className='w-6 h-6 text-green-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3'
                  />
                </svg>
              </div>
              <div>
                <h3 className='text-white font-semibold mb-1'>Suas Playlists</h3>
                <p className='text-gray-400 text-sm'>
                  Acesse e organize todas as suas playlists favoritas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <RedirectLogin />

        {/* Footer */}
        <p className='text-center text-gray-500 text-sm mt-8'>
          Ao continuar, você concorda em conectar sua conta Spotify
        </p>
      </div>
    </div>
  );
}
