import { Tracks } from './tracks';

export interface Playlists {
  name: string;
  id: string;
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  owner: {
    display_name: string;
    id: string;
    external_urls: {
      spotify: string;
    };
  };
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  tracks: {
    href: string;
    total: number;
    limit: number;
    items?: {
      added_at: string;
      added_by: {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
      };
      isLocal: boolean;
      track: Tracks;
    }[];
  };
}
