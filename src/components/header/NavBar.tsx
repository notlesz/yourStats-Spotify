'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import tsx from '@/utils/tsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const matches = useMediaQuery('(max-width:768px)');
  const pathname = usePathname();

  const handleShowMenu = () => setShowMenu(!showMenu);

  const links = [
    { href: '/home', label: 'Home' },
    { href: '/top/artists', label: 'Top Artists' },
    { href: '/top/tracks', label: 'Top Tracks' },
    { href: '/playlists/all', label: 'Playlists' },
  ];

  return (
    <nav className='flex justify-between items-center mb-4'>
      <Link href='/home'>
        <img src='../logo.png' alt='Logo' className='md:w-[180px] w-[260px]' />
      </Link>
      {matches ? (
        <div>
          <button
            type='button'
            className='flex items-center p-2 text-sm relative text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 '
            onClick={handleShowMenu}
          >
            {showMenu ? (
              <MdClose className='w-[30px] h-[30px] text-white' />
            ) : (
              <MdMenu className='w-[30px] h-[30px] text-white' />
            )}
          </button>
          {showMenu && (
            <ul className='flex flex-col text-lg items-center gap-3 w-full mb-4 bg-gray-600 absolute right-0 mt-2 py-4 z-50'>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={tsx('text-white font-semibold hover:text-green-500', {
                      'text-green-500': pathname === link.href,
                    })}
                    onClick={handleShowMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <ul className='flex gap-3 text-lg'>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={tsx('text-white font-semibold hover:text-green-500', {
                  'text-green-500': pathname === link.href,
                })}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
