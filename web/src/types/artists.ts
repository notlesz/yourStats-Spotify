export interface Artists {
  name: string;
  id: string;
  href: string;
  genres: string[];
  images: {
    height: number;
    width: number;
    url: string;
  }[];
}
