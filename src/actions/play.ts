import { Message } from "discord.js";

import { getAudioUrl } from "../services/youtube";

export default {
  name: "play",
  execute: (message: Message, content: string) => {
    if (!content)
      message.channel.send(
        "❌ You need to provide an Youtube URL or name of video\n\n✅ Ex: !play Shape of You"
      );
    else
      getAudioUrl(content)
        .then((result) => message.channel.send(result))
        .catch((e) => message.channel.send(e));
  },
};
