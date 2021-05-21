import scdl from "soundcloud-downloader";

import { soundcloudTrackRegex } from "../constant/regex";
import { defaultSCArtWork } from "../constant/config";

const searchVideo = async (keyword: string): Promise<number> => {
  const res = await scdl.search({
    query: keyword,
    limit: 10,
    offset: 0,
    resourceType: "tracks",
  });
  if (res.collection.length > 0) {
    return res.collection[0].id;
  } else {
    throw "";
  }
};

export interface Resource {
  title: string;
  length: number;
  author: string;
  thumbnail: string;
  url: string;
}

export const getTrackDetails = async (content: string): Promise<Resource> => {
  let url = "";
  try {
    const paths = content.match(soundcloudTrackRegex);
    if (!paths) {
      const id = await searchVideo(content);
      url = `https://soundcloud.com/tracks/${id}`;
    } else {
      url = paths[0];
    }
    const track = await scdl.getInfo(url);
    if (track)
      return {
        title: track.title,
        length: track.duration,
        author: `${track.user.first_name} ${track.user.last_name}`,
        thumbnail: track.artwork_url ? track.artwork_url : defaultSCArtWork,
        url,
      };
    else throw "";
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
    const playlist = await scdl.getSetInfo(url);

    const resources: Resource[] = [];
    playlist.tracks.forEach((track) => {
      resources.push({
        title: track.title,
        thumbnail: track.artwork_url ? track.artwork_url : defaultSCArtWork,
        author: `${track.user.first_name} ${track.user.last_name}`,
        url: `https://soundcloud.com/tracks/${track.id}`,
        length: track.duration,
      });
    });

    return {
      title: `SoundCloud set ${playlist.id}`,
      thumbnail: playlist.artwork_url ? playlist.artwork_url : defaultSCArtWork,
      author: `${playlist.user.first_name} ${playlist.user.last_name}`,
      resources,
    };
  } catch (e) {
    throw "❌ Invalid playlist!";
  }
};
