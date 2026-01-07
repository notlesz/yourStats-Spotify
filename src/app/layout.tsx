import { Metadata } from 'next';
import tsx from '@/utils/tsx';
import { Outfit } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'yourStats',
};

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={tsx(outfit.className)}>{children}</body>
    </html>
  );
}
