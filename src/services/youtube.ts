import { youtubeVideoRegex } from '@/constants/regex';
import { Error } from '@/models/Error';
import { Playlist } from '@/types/Playlist';
import { Platform, Song } from '@/types/Song';
import ytdl from 'ytdl-core';
import ytpl from 'ytpl';
import ytsr, { Video } from 'ytsr';

export class YoutubeService {
  public static async getVideoDetails(content: string): Promise<Song> {
    try {
      const parsedContent = content.match(youtubeVideoRegex);
      let id = '';
      if (!parsedContent) {
        id = await this.searchVideo(content);
      } else {
        id = parsedContent[1];
      }
      const videoUrl = this.generateVideoUrl(id);
      const result = await ytdl.getInfo(videoUrl);
      return {
        title: result.videoDetails.title,
        length: parseInt(result.videoDetails.lengthSeconds, 10),
        author: result.videoDetails.author.name,
        thumbnail:
          result.videoDetails.thumbnails[
            result.videoDetails.thumbnails.length - 1
          ].url,
        url: videoUrl,
        platform: Platform.YOUTUBE,
      };
    } catch (e) {
      throw new Error("❌ Can't find anything!");
    }
  }

  public static async getPlaylist(url: string): Promise<Playlist> {
    try {
      const id = url.split('?')[1].split('=')[1];
      const playlist = await ytpl(id);

      const songs: Song[] = [];
      playlist.items.forEach((item) => {
        songs.push({
          title: item.title,
          thumbnail: item.bestThumbnail.url || '',
          author: item.author.name,
          url: item.shortUrl,
          length: item.durationSec || 0,
          platform: Platform.YOUTUBE,
        });
      });

      return {
        title: playlist.title,
        thumbnail: playlist.bestThumbnail.url || '',
        author: playlist.author.name,
        songs,
      };
    } catch (e) {
      throw new Error("❌ Can't find anything!");
    }
  }

  private static async searchVideo(keyword: string): Promise<string> {
    const result = await ytsr(keyword, { pages: 1 });
    const filteredRes = result.items.filter((item) => item.type === 'video');
    if (filteredRes.length === 0) throw new Error("🔎 Can't find video!");
    const item = filteredRes[0] as Video;
    return item.id;
  }

  private static generateVideoUrl(id: string) {
    return `https://www.youtube.com/watch?v=${id}`;
  }
}
