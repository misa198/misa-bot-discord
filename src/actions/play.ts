import { Message, VoiceConnection } from "discord.js";

import { servers } from "../data/server";
import { getAudioUrl } from "../services/youtube";

const play = (connection: VoiceConnection, message: Message) => {
  const server = servers[message.guild.id];
  server.dispatcher = connection.play(server.queue[0].resource.audio);
  server.queue.shift();
  server.dispatcher.on("finish", () => {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
};

export default {
  name: "play",
  execute: (message: Message, content: string): void => {
    if (!content)
      message.channel.send(
        "❌ You need to provide an Youtube URL or name of video\n\n✅ Ex: !play Shape of You"
      );
    else if (!message.member.voice.channel)
      message.channel.send("❌ You must be in a voice channel!");
    else {
      if (!servers[message.guild.id])
        servers[message.guild.id] = {
          queue: [],
        };
      const server = servers[message.guild.id];

      getAudioUrl(content)
        .then((result) => {
          server.queue.push({
            requester: message.member.displayName,
            resource: result,
          });
          if (!message.member.voice.connection)
            message.member.voice.channel.join().then((connection) => {
              play(connection, message);
            });
        })
        .catch((e) => {
          message.channel.send(JSON.stringify(e));
        });
    }
  },
};
