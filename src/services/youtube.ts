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

export const getAudioUrl = async (content: string): Promise<string> => {
  const parsedContent = content.match(youtubeVideoRegex);
  let id = "";

  if (!parsedContent) {
    id = await searchVideo(content);
  } else {
    id = parsedContent[1];
  }
  return ytdl
    .getInfo(`https://www.youtube.com/watch?v=${id}`)
    .then((result) => {
      const resources = result.player_response.streamingData.adaptiveFormats;
      const audios = resources.filter((resource: any) =>
        resource.mimeType.match(audioRegex)
      );
      audios.sort((audio: any) => audio.averageBitrate);
      const audio = audios[0] as {
        url: string;
      };
      return audio.url;
    })
    .catch(() => {
      throw "❌ Error";
    });
};
