import { Message } from "discord.js";

import { servers } from "../data/server";

export default {
  name: "stop",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];

    if (message.guild.voice) {
      if (server) {
        if (server.dispatcher) {
          for (let i = server.queue.length - 1; i >= 0; i--) {
            server.queue.splice(i, 1);
          }
          server.playing = null;
          server.dispatcher.end();
          message.channel.send("Ending and leave voice channel!");
        }
      } else message.channel.send("❌ Nothing to stop!");
      if (message.guild.voice.connection)
        message.guild.voice.connection.disconnect();
    } else message.channel.send("❌ Nothing to stop!");
  },
};
