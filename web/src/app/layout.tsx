import { Metadata } from 'next';

import tsx from '@/utils/tsx';
import { Rubik, Russo_One } from 'next/font/google';
import './globals.css';

import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'yourStats',
};

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-rubik',
});

const russoOne = Russo_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-russo-one',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={tsx(rubik.className, russoOne.className)}>{children}</body>
    </html>
  );
}
