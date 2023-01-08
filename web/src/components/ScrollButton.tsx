import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import useMediaQuery from '../hooks/useMediaQuery';

export default function ScrollButton() {
  const [showButton, setShowButton] = useState(false);
  const matchesDesktop = useMediaQuery('(min-width:2000px)');

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleNavigation = useCallback((e: any) => {
    const window = e.currentTarget;
    if (window.scrollY > 100) {
      setShowButton(true);
    }
    if (window.scrollY < 100) {
      setShowButton(false);
    }
  }, []);

  useEffect(() => {
    setShowButton(false);
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <button
      className={classNames(
        'fixed bottom-5 w-[50px] h-[50px] bg-green-600 rounded-full flex justify-center items-center ',
        {
          'left-[80%]': matchesDesktop,
          'right-5': !matchesDesktop,
          'hidden ease-in-out': !showButton,
        },
      )}
      onClick={scrollTop}
    >
      <MdKeyboardArrowUp className='w-[30px] h-[30px] text-white' />
    </button>
  );
}
