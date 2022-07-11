export interface Playlists {
  name: string;
  id: string;
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  owner:{
    display_name: string;
    id: string;
  }
  images:{
    height: number;
    url: string;
    width: number;
  }[]
  tracks: {
    href: string;
    total:  number
  }
}
