export default function SkeletonRow() {
  return (
    <div className='flex items-center justify-between gap-2 anime-pulse'>
      <div className='flex items-center gap-6 md:gap-3 w-full'>
        <div className='w-7 h-7 bg-gray-600 rounded-full'></div>
        <div className='w-[80px] h-[80px] rounded-md bg-gray-600 md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px]'></div>
        <div className='flex flex-col gap-2 w-full max-w-[200px]'>
          <div className='h-4 bg-gray-600 rounded w-3/4'></div>
          <div className='h-3 bg-gray-600 rounded w-1/2'></div>
        </div>
      </div>
      <div className='h-4 bg-gray-600 rounded w-16'></div>
    </div>
  );
}
