'use client';
import { UserProvider } from '@/context/userContext';

import 'react-toastify/dist/ReactToastify.css';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <UserProvider>{children}</UserProvider>
    </main>
  );
}
