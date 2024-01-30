'use client';
import { Header, ScrollButton, ScrollToTop } from '@/components';
import SpotifyProvider from '@/context/spotifyContext';
import { UserProvider } from '@/context/userContext';
import { queryClient } from '@/services/queryClient';
import { QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function PrivateProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SpotifyProvider>
          <Header />
          <ScrollToTop />
          <ToastContainer
            position='top-right'
            autoClose={3000}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            hideProgressBar={false}
            closeOnClick
            theme='dark'
            limit={2}
          />
          <ScrollButton />
          {children}
        </SpotifyProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
