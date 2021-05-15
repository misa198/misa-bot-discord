import { StreamDispatcher } from "discord.js";

import { Resource } from "../services/youtube";

export interface Song {
  requester: string;
  resource: Resource;
}

interface Server {
  [key: string]: {
    playing?: Song;
    queue: Song[];
    dispatcher?: StreamDispatcher;
  };
}

export const servers: Server = {};
