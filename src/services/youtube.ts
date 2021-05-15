import ytsr from "ytsr";
import ytdl from "ytdl-core";

import { youtubeVideoRegex, audioRegex } from "../constant/regex";

const searchVideo = (keyword: string) => {
  try {
    return ytsr(keyword, { pages: 1 })
      .then((result) => {
        const filteredRes = result.items.filter((e) => e.type === "video");
        if (filteredRes.length === 0) throw "🔎 Can't find video!";
        const item = filteredRes[0] as {
          id: string;
        };
        return item.id;
      })
      .catch((error) => {
        throw error;
      });
  } catch (e) {
    throw "❌ Invalid params";
  }
};

export interface Resource {
  audio: string;
  youtube: string;
}

export const getAudioUrl = async (content: string): Promise<Resource> => {
  const parsedContent = content.match(youtubeVideoRegex);
  let id = "";

  if (!parsedContent) {
    id = await searchVideo(content);
  } else {
    id = parsedContent[1];
  }
  const url = `https://www.youtube.com/watch?v=${id}`;

  return ytdl
    .getInfo(url)
    .then((result) => {
      const resources = result.player_response.streamingData.adaptiveFormats;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const audios = resources.filter((resource: any) =>
        resource.mimeType.match(audioRegex)
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      audios.sort((audio: any) => audio.averageBitrate);
      const audio = audios[0] as {
        url: string;
      };
      return {
        youtube: `https://youtu.be/${id}`,
        audio: audio.url,
      };
    })
    .catch(() => {
      throw "❌ Error";
    });
};
