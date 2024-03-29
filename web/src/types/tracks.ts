export interface Tracks {
  external_urls: {
    spotify: string;
  };
  name: string;
  id: string;
  album: {
    name: string;
    href: string;
    images: {
      height: number;
      width: number;
      url: string;
    }[];
  };
  artists: {
    external_urls: { spotify: string };
    name: string;
    href: string;
  }[];
  duration_ms: number;
  href: string;
  preview_url: string;
}

export interface CurrentlyPlaying {
  item: Tracks;
}
