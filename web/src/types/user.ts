export interface User {
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  images: {
    height: number;
    url: string;
    width: number | string | null;
  }[];
  followers: {
    total: number;
  };
}
