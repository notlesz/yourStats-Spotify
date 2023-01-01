interface CardProps {
  title: string;
  subTitle?: string;
  image?: string;
  total?: number;
  ranked: boolean;
  position?: number;
}

export default function Card({
  title,
  subTitle,
  image,
  total,
  ranked,
  position,
}: CardProps) {
  return (
    <li className="text-white flex items-center justify-around animate-hideToShow">
      <div
        className={`flex flex-col items-center ${ranked ? "justify-start" : "justify-center"} gap-3 bg-gray-600 rounded w-[200px] min-h-[280px] py-4 px-1 self-start`}
      >
        {ranked && position ? (
          <span
            className={`text-gray-300 font-bold self-center ${
              ranked && position <= 3
                ? `w-7 h-7   ${
                    position === 1
                      ? "bg-gold-500"
                      : position === 2
                      ? "bg-silver-500"
                      : "bg-bronze-500"
                  } flex items-center justify-center rounded-full`
                : ""
            }`}
          >
            {position}º
          </span>
        ) : null}
        <img
          className="w-[150px] h-[150px] rounded-full object-cover "
          src={image}
          alt={title}
        />
        <span className="font-bold text-center text-sm">{title}</span>
        {subTitle ? (
          <span className="text-sm text-gray-100 text-center">{subTitle}</span>
        ) : null}
        {total ? (
          <span className="text-sm text-gray-100">Tracks: {total}</span>
        ) : null}
      </div>
    </li>
  );
}
