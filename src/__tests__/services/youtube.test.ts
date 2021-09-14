import { expect } from 'chai';
import { YoutubeService } from '../../services/youtube';

describe('Get video details with keyword', () => {
  it('Return song object with valid url', async () => {
    const keyword = 'Shape of you';
    const result = await YoutubeService.getVideoDetails(keyword);
    expect(result.url).not.equal('');
  });
});

describe('Get video details with url', () => {
  it('Return song object with valid url', async () => {
    const url = 'https://www.youtube.com/watch?v=JGwWNGJdvx8';
    const result = await YoutubeService.getVideoDetails(url);
    expect(result.url).not.equal('');
  });
});

describe('Get playlist with url', () => {
  it('Return playlist object with songs', async () => {
    const url =
      'https://www.youtube.com/playlist?list=PLjp0AEEJ0-fGs1_EVsLd8efDByQ9GnvTq';
    const result = await YoutubeService.getPlaylist(url);
    expect(result.songs.length).greaterThan(0);
    expect(result.songs[0].title).not.equal('');
    expect(result.title).not.equal('');
  });
});
