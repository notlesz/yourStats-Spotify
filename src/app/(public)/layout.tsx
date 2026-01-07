'use client';

import 'react-toastify/dist/ReactToastify.css';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
