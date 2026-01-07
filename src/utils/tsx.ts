import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function tsx(...props: ClassValue[]) {
  return twMerge(clsx(props));
}

export default tsx;
