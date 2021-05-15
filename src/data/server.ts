import { StreamDispatcher } from "discord.js";

interface Song {
  requester: string;
  url: string;
}

interface Server {
  [key: string]: {
    queue: string[];
    dispatcher?: StreamDispatcher;
  };
}

export const servers: Server = {};
