import classNames from 'classnames';
import { useState } from 'react';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';
import useMediaQuery from '../../../hooks/useMediaQuery';

interface Props {
  filter: 'all' | 'others' | 'me';
  handleFilter: (filter: 'all' | 'others' | 'me') => void;
}

export default function PlaylistFilter({ filter, handleFilter }: Props) {
  const [show, setShow] = useState(false);
  const matches = useMediaQuery('(max-width:580px)');

  if (matches) {
    return (
      <div>
        <button
          className='text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center gap-2 relative'
          type='button'
          onClick={() => setShow(!show)}
        >
          Filter
          {!show ? <IoMdArrowDown /> : <IoMdArrowUp />}
        </button>
        <div
          className={classNames(
            'z-10 bg-gray-700 divide-y divide-gray-100 rounded shadow w-44  absolute right-0 mt-2 mr-4',
            { hidden: !show },
          )}
        >
          <ul className='py-1 text-sm text-gray-200'>
            <li
              onClick={() => {
                handleFilter('all');
                setShow(!show);
              }}
              className={classNames('hover:bg-gray-100 hover:cursor-pointer', {
                'bg-white text-gray-600': filter === 'all',
              })}
            >
              <span className='block px-4 py-2'>All</span>
            </li>
            <li
              onClick={() => {
                handleFilter('me');
                setShow(!show);
              }}
              className={classNames('hover:bg-gray-100 hover:cursor-pointer', {
                'bg-white text-gray-600': filter === 'me',
              })}
            >
              <span className='block px-4 py-2 '>Me</span>
            </li>
            <li
              onClick={() => {
                handleFilter('others');
                setShow(!show);
              }}
              className={classNames('hover:bg-gray-100 hover:cursor-pointer', {
                'bg-white text-gray-600': filter === 'others',
              })}
            >
              <span className='block px-4 py-2'>Others</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className='flex gap-3'>
      <span
        className={classNames(
          'cursor-pointer text-white text-sm font-bold py-[5px] px-[10px] flex items-center justify-center rounded border border-white hover:text-black hover:bg-white transition-colors',
          {
            'bg-white text-black': filter === 'all',
          },
        )}
        onClick={() => {
          handleFilter('all');
        }}
      >
        All
      </span>
      <span
        className={classNames(
          'cursor-pointer text-white text-sm font-bold py-[5px] px-[10px] flex items-center justify-center rounded border border-white hover:text-black hover:bg-white transition-colors',
          {
            'bg-white text-black': filter === 'me',
          },
        )}
        onClick={() => {
          handleFilter('me');
        }}
      >
        Me
      </span>
      <span
        className={classNames(
          'cursor-pointer text-white text-sm font-bold py-[5px] px-[10px] flex items-center justify-center rounded border border-white hover:text-black hover:bg-white transition-colors',
          {
            'bg-white text-black': filter === 'others',
          },
        )}
        onClick={() => {
          handleFilter('others');
        }}
      >
        Others
      </span>
    </div>
  );
}
