export const youtubeVideoRegex = new RegExp(
  /(?:youtube\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\\/\s]{11})/
);

export const youtubePlaylistRegex = new RegExp(
  /(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*/
);

export const soundcloudTrackRegex = new RegExp(
  /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/
);

export const soundcloudPlaylistRegex = new RegExp(
  /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)\/sets\/(.*)$/
);
