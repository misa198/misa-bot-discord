import { Song } from './Song';

export interface Playlist {
  title: string;
  thumbnail: string;
  author: string;
  songs: Song[];
}
