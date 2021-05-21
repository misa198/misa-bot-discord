import { StreamDispatcher } from "discord.js";

import { Resource } from "../services/youtube";

export interface Song {
  requester: string;
  resource: Resource;
}

export interface Server {
  [key: string]: {
    playing?: {
      song: Song;
      loop: boolean;
    };
    queue: Song[];
    dispatcher?: StreamDispatcher;
  };
}

export const servers: Server = {};
