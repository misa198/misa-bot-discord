import express from "express";
import herokuAwake from "heroku-awake";

import bot from "./bot";

const port = process.env.PORT || 3000;
const server = express();

server.listen(port, () => {
  bot();
  herokuAwake(process.env.APP_URL);
  console.log(`🚀 Server is running on port ${port} ✨`);
});
