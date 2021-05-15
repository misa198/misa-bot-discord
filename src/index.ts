import { config } from "dotenv";
config();

import { Client } from "discord.js";

import { prefix } from "./constant/config";

const client = new Client();
const token = process.env.TOKEN;

client.on("ready", () => {
  console.log("Misabox is online!");
});

client.on("message", (message) => {
  console.log(message);
});

client.login(token);
