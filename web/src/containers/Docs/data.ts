export const commands = [
  {
    id: 1,
    name: "!play",
    description: "Plays a song with the given name or url",
    usage: "!play <link/query>",
  },
  {
    id: 2,
    name: "!pause",
    description: "Pause current song",
    usage: "!play",
  },
  {
    id: 3,
    name: "!resume",
    description: "Resume current song",
    usage: "!resume",
  },
  {
    id: 4,
    name: "!skip, !fs",
    description: "Skip current song",
    usage: "!skip or !fs",
  },
  {
    id: 5,
    name: "!stop",
    description: "Stop and leave audio channel",
    usage: "!stop",
  },
  {
    id: 6,
    name: "!nowplaying, !np",
    description: "Get current song info",
    usage: "!nowplaying or !np",
  },
  {
    id: 7,
    name: "!loop",
    description: "Loop current song",
    usage: "!loop",
  },
  {
    id: 8,
    name: "!queue",
    description: "View songs in queue",
    usage: "!queue",
  },
  {
    id: 9,
    name: "!select",
    description: "Select song by position in queue",
    usage: "!select <position>",
  },
];
