import { Message } from "discord.js";

import { servers } from "../data/server";

export default {
  name: "resume",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (server.dispatcher && server.playing) {
        message.channel.send("⏯ Resume").then(() => server.dispatcher.resume());
      }
    } else message.channel.send("❌ Nothing to resume!");
  },
};
