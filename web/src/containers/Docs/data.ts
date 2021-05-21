export const commands = [
  {
    id: 1,
    name: "!play",
    description:
      "Plays a song or playlist on Youtube with the given name or url",
    usage: "!play <link/query>",
  },
  {
    id: 2,
    name: "!soundcloud",
    description:
      "Plays a track or playlist on SoundCloud with the given name or url",
    usage: "!soundcloud or !sc <link/query>",
  },
  {
    id: 3,
    name: "!pause",
    description: "Pause current song",
    usage: "!pause",
  },
  {
    id: 4,
    name: "!resume",
    description: "Resume current song",
    usage: "!resume",
  },
  {
    id: 5,
    name: "!skip, !fs",
    description: "Skip current song",
    usage: "!skip or !fs",
  },
  {
    id: 6,
    name: "!stop",
    description: "Stop and leave audio channel",
    usage: "!stop",
  },
  {
    id: 7,
    name: "!nowplaying, !np",
    description: "Get current song info",
    usage: "!nowplaying or !np",
  },
  {
    id: 8,
    name: "!loop",
    description: "Loop current song",
    usage: "!loop",
  },
  {
    id: 9,
    name: "!queue",
    description: "View songs in queue",
    usage: "!queue",
  },
  {
    id: 10,
    name: "!select",
    description: "Select song by position in queue",
    usage: "!select <position>",
  },
  {
    id: 11,
    name: "!remove",
    description: "Remove song by position in queue",
    usage: "!remove <position>",
  },
];
