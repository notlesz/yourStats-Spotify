import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollToTop() {
  const pathname = usePathname();

  const scrollTop = () => window.scrollTo(0, 0);

  useEffect(() => {
    scrollTop();
  }, [pathname]);

  useEffect(() => {
    scrollTop();
  }, []);

  return null;
}
