import { config } from "dotenv";
config();

import express from "express";
import bot from "./bot";

const port = process.env.PORT || 5000;
const server = express();

server.disable("x-powered-by");
server.use(express.static(`${__dirname}/../build`));

server.get("*", (_req, res) => {
  res.sendFile(`${__dirname}/../build/index.html`);
});

server.listen(port, () => {
  bot();
  console.log(`🚀 Server is running on port ${port} ✨`);
});
