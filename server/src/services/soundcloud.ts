import { scdl } from "../bot";
import { soundcloudTrackRegex } from "../constant/regex";
import { defaultSCArtWork } from "../constant/config";
import { Platform, Playlist, Resource } from "./types";

const searchTrack = async (keyword: string): Promise<string> => {
  const res = await scdl.search({
    query: keyword,
    limit: 10,
    offset: 0,
    filter: "tracks",
  });

  if (res.collection.length > 0) {
    return res.collection[0].permalink_url;
  } else {
    throw "";
  }
};

export const getTrackDetails = async (content: string): Promise<Resource> => {
  let url = "";
  try {
    const paths = content.match(soundcloudTrackRegex);
    if (!paths) {
      url = await searchTrack(content);
    } else {
      url = paths[0];
    }
    const track = await scdl.info.getTrackByPermalink(url);

    if (track)
      return {
        title: track.title,
        length: track.duration / 1000,
        author: track.user.username,
        thumbnail: track.artwork_url ? track.artwork_url : defaultSCArtWork,
        url,
        platform: Platform.SOUNDCLOUD,
      };
    else throw "";
  } catch (e) {
    throw "❌ Can't find anything!";
  }
};

export const getPlaylist = async (url: string): Promise<Playlist> => {
  try {
    const playlist = await scdl.info.getPlaylistByPermalink(url);

    const resources: Resource[] = [];
    playlist.tracks.forEach((track) => {
      resources.push({
        title: track.title,
        thumbnail: track.artwork_url ? track.artwork_url : defaultSCArtWork,
        author: track.user.username,
        url: track.permalink_url,
        length: track.duration / 1000,
        platform: Platform.SOUNDCLOUD,
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
