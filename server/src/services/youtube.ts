import ytsr from "ytsr";
import ytdl from "ytdl-core";
import ytpl from "ytpl";

import { youtubeVideoRegex } from "../constant/regex";
import { youtubeLogo, soundCloudLogo } from "../constant/config";

const searchVideo = async (keyword: string) => {
  const result = await ytsr(keyword, { pages: 1 });
  const filteredRes = result.items.filter((e) => e.type === "video");
  if (filteredRes.length === 0) throw "🔎 Can't find video!";
  const item = filteredRes[0] as {
    id: string;
  };
  return item.id;
};

export enum Platform {
  YOUTUBE,
  SOUNDCLOUD,
}

export const platforms = {
  [Platform.YOUTUBE.toString()]: youtubeLogo,
  [Platform.SOUNDCLOUD.toString()]: soundCloudLogo,
};

export interface Resource {
  title: string;
  length: number;
  author: string;
  thumbnail: string;
  url: string;
  platform: Platform;
}

export const getVideoDetails = async (content: string): Promise<Resource> => {
  const parsedContent = content.match(youtubeVideoRegex);
  let id = "";

  try {
    if (!parsedContent) {
      id = await searchVideo(content);
    } else {
      id = parsedContent[1];
    }
    const url = `https://www.youtube.com/watch?v=${id}`;

    const result = await ytdl.getInfo(url);
    return {
      title: result.videoDetails.title,
      length: parseInt(result.videoDetails.lengthSeconds, 10),
      author: result.videoDetails.author.name,
      thumbnail:
        result.videoDetails.thumbnails[
          result.videoDetails.thumbnails.length - 1
        ].url,
      url,
      platform: Platform.YOUTUBE,
    };
  } catch (e) {
    throw "❌ Can't find anything!";
  }
};

interface Playlist {
  title: string;
  thumbnail: string;
  author: string;
  resources: Resource[];
}

export const getPlaylist = async (url: string): Promise<Playlist> => {
  try {
    const id = url.split("?")[1].split("=")[1];
    const playlist = await ytpl(id);

    const resources: Resource[] = [];
    playlist.items.forEach((item) => {
      resources.push({
        title: item.title,
        thumbnail: item.bestThumbnail.url,
        author: item.author.name,
        url: item.shortUrl,
        length: item.durationSec,
        platform: Platform.YOUTUBE,
      });
    });

    return {
      title: playlist.title,
      thumbnail: playlist.bestThumbnail.url,
      author: playlist.author.name,
      resources,
    };
  } catch (e) {
    throw "❌ Can't find anything!";
  }
};
