import { config } from "dotenv";
config();

import express from "express";
import bot from "./bot";

const port = process.env.PORT || 3000;
const server = express();

server.listen(port, () => {
  bot();
  console.log(`🚀 Server is running on port ${port} ✨`);
});
