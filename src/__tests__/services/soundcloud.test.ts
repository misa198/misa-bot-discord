import { expect } from 'chai';
import { SoundCloudService } from '@/services/soundcloud';
import { scdl } from '@/services/soundcloud';

describe('Get track details with keyword', () => {
  it('Return song object with valid url', async () => {
    await scdl.connect();
    const keyword = 'Shape of you';
    const result = await SoundCloudService.getTrackDetails(keyword);
    expect(result.url).not.equal('');
  });
});

describe('Get track details with url', () => {
  it('Return song object with valid url', async () => {
    await scdl.connect();
    const url = 'https://soundcloud.com/edsheeran/shape-of-you';
    const result = await SoundCloudService.getTrackDetails(url);
    expect(result.url).not.equal('');
  });
});

describe('Get playlist with url', () => {
  it('Return playlist object with songs', async () => {
    await scdl.connect();
    const url = 'https://soundcloud.com/edsheeran/sets/give-me-love';
    const result = await SoundCloudService.getPlaylist(url);
    expect(result.songs.length).greaterThan(0);
    expect(result.songs[0].title).not.equal('');
    expect(result.title).not.equal('');
  });
});
