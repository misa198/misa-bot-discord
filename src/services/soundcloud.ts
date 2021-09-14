import { DEFAULT_SOUND_CLOUD_ARTWORK } from '@/constants/config';
import { soundCloudTrackRegex } from '@/constants/regex';
import { Playlist } from '@/types/Playlist';
import { Platform, Song } from '@/types/Song';
import { SoundCloud } from 'scdl-core';

export const scdl = new SoundCloud();

export class SoundCloudService {
  public static async getTrackDetails(content: string): Promise<Song | null> {
    let url = '';
    const paths = content.match(soundCloudTrackRegex);
    if (!paths) {
      url = await this.searchTrack(content);
    } else {
      url = paths[0];
    }
    if (!url) return null;
    const track = await scdl.tracks.getTrack(url);
    if (track)
      return {
        title: track.title,
        length: track.duration / 1000,
        author: track.user.username,
        thumbnail: track.artwork_url
          ? track.artwork_url
          : DEFAULT_SOUND_CLOUD_ARTWORK,
        url,
        platform: Platform.SOUND_CLOUD,
      };
    return null;
  }

  public static async getPlaylist(url: string): Promise<Playlist | null> {
    const playlist = await scdl.playlists.getPlaylist(url);
    if (!playlist) return null;
    const songs: Song[] = [];
    playlist.tracks.forEach((track) => {
      songs.push({
        title: track.title,
        thumbnail: track.artwork_url
          ? track.artwork_url
          : DEFAULT_SOUND_CLOUD_ARTWORK,
        author: track.user.username,
        url: track.permalink_url,
        length: track.duration / 1000,
        platform: Platform.SOUND_CLOUD,
      });
    });

    return {
      title: `SoundCloud set ${playlist.id}`,
      thumbnail: playlist.artwork_url
        ? playlist.artwork_url
        : DEFAULT_SOUND_CLOUD_ARTWORK,
      author: `${playlist.user.first_name} ${playlist.user.last_name}`,
      songs,
    };
  }

  private static async searchTrack(keyword: string): Promise<string> {
    const res = await scdl.search({
      query: keyword,
      filter: 'tracks',
    });

    if (res.collection.length > 0) {
      return res.collection[0].permalink_url;
    }
    return '';
  }
}
