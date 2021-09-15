import { Message } from "discord.js";

import { servers } from "../data/server";

export default {
  name: "clear",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      server.queue = [];
      message.channel.send("🧹 Cleaned ordered list!");
    } else {
      message.channel.send("❌ Nothing to clear!");
    }
  },
};
