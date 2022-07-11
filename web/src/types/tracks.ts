export interface Tracks {
  name: string;
  id: string;
  album: {
    name: string;
    images: {
      height: number;
      width: number;
      url: string;
    }[];
  };
  artists: {
    external_urls: { spotify: string };
    name: string;
  }[];
  href: string;
}

export interface CurrentlyPlaying {
  item: Tracks
}
