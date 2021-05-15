import { config } from "dotenv";
config();

import { Client } from "discord.js";

import { prefix } from "./constant/config";

import play from "./actions/play";

const client = new Client();
const token = process.env.TOKEN;

client.on("ready", () => {
  console.log("🚀 Misabox is online! ✨");
});

client.once("reconnecting", () => {
  console.log("🔗 Reconnecting!");
});

client.once("disconnect", () => {
  console.log("🛑 Disconnect!");
});

client.on("message", (message) => {
  const args = message.content.substring(prefix.length).split(" ");

  const content = message.content.substring(prefix.length + args[0].length);

  switch (args[0]) {
    case play.name:
      play.execute(message, content);
      break;
  }
});

client.login(token);
