import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import redirectTo from '../utils/document';

interface CardProps {
  title: string;
  subTitle?: string;
  image?: string;
  total?: number;
  ranked: boolean;
  position?: number;
  externalUrl?: string;
  id?: string;
}

export default function Card({
  title,
  subTitle,
  image,
  total,
  ranked,
  position,
  externalUrl,
  id,
}: CardProps) {
  const navigate = useNavigate();

  return (
    <li
      className='text-white flex items-center justify-around animate-hideToShow hover:text-green-500 hover:cursor-pointer'
      onClick={() => {
        if (id) {
          return navigate(`/playlists/${id}`);
        }
        redirectTo(externalUrl);
      }}
    >
      <div
        className={`flex flex-col items-center ${
          ranked ? 'justify-start' : 'justify-center'
        } gap-3 bg-gray-600 rounded w-[230px] min-h-[280px] py-4 px-1 self-start md:min-h-0 md:py-6`}
      >
        {ranked && position ? (
          <span
            className={classNames('text-gray-300 font-bold self-center', {
              'w-7 h-7 flex items-center justify-center rounded-full': ranked && position <= 3,
              'bg-gold-500': position === 1,
              'bg-silver-500': position === 2,
              'bg-bronze-500': position === 3,
            })}
          >
            {position}º
          </span>
        ) : null}
        <img
          className='w-[150px] h-[150px] rounded-full object-cover md:w-[100px] md:h-[100px]'
          src={image}
          alt={title}
        />
        <span className='font-bold text-sm text-center'>{title}</span>
        {subTitle ? <span className='text-sm text-gray-100 text-center'>{subTitle}</span> : null}
        {total ? <span className='text-sm text-gray-100'>Tracks: {total}</span> : null}
      </div>
    </li>
  );
}
