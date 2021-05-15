import { Message } from "discord.js";

import { servers } from "../data/server";

export default {
  name: "skip",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (server.queue.length === 0) {
        message.channel.send("❌ Nothing to skip!");
      }
      if (server.dispatcher) {
        server.dispatcher.end();
      }
    } else {
      message.channel.send("❌ Nothing to skip!");
    }
  },
};
