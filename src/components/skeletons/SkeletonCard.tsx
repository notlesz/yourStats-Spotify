export default function SkeletonCard() {
  return (
    <div className='flex flex-col items-center justify-center gap-3 bg-gray-600 rounded w-[230px] min-h-[280px] py-4 px-1 self-start md:min-h-0 md:py-6 animate-pulse'>
      <div className='w-[150px] h-[150px] rounded-full bg-gray-500 md:w-[100px] md:h-[100px]'></div>
      <div className='h-4 bg-gray-500 rounded w-3/4'></div>
      <div className='h-3 bg-gray-500 rounded w-1/2'></div>
    </div>
  );
}
