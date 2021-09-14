export const schema = [
  {
    name: 'play',
    description: 'Plays a song or playlist on Youtube',
    options: [
      {
        name: 'input',
        type: 'STRING' as const,
        description:
          'The url or keyword to search videos or playlist on Youtube',
        required: true,
      },
    ],
  },
  {
    name: 'soundcloud',
    description: 'Plays a song, album or playlist on SoundCloud',
    options: [
      {
        name: 'input',
        type: 'STRING' as const,
        description:
          'The url or keyword to search videos or playlist on SoundCloud',
        required: true,
      },
    ],
  },
  {
    name: 'skip',
    description: 'Skip to the next song in the queue',
  },
  {
    name: 'queue',
    description: 'See the music queue',
  },
  {
    name: 'pause',
    description: 'Pauses the song that is currently playing',
  },
  {
    name: 'resume',
    description: 'Resume playback of the current song',
  },
  {
    name: 'leave',
    description: 'Leave the voice channel',
  },
  {
    name: 'jump',
    description: 'Jump to song in queue by position',
    options: [
      {
        name: 'position',
        type: 'NUMBER' as const,
        description: 'The position of song in queue',
        required: true,
      },
    ],
  },
];
