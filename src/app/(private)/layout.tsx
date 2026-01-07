'use client';
import { ScrollButton, ScrollToTop } from '@/components';
import { Sidebar } from '@/components/layout/Sidebar';
import { queryClient } from '@/services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='flex min-h-screen bg-background'>
        <Sidebar />
        <main className='flex-1 ml-64 min-h-screen'>
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
        </main>
      </div>
    </QueryClientProvider>
  );
}
