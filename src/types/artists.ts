export interface Artists {
  external_urls: {
    spotify: string
  };
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
