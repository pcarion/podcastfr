import { Podcast } from './jtd/podcast';
import { PodcastExtra } from './types';
import Vibrant from 'node-vibrant';

export default async function processPodcast(podcast: Podcast): Promise<PodcastExtra> {
  const result: PodcastExtra = {
    ...podcast,
    extra: {
      colors: {
        vibrant: null,
        darkVibrant: null,
        lightVibrant: null,
        muted: null,
        darkMuted: null,
        lightMuted: null,
      },
    },
  };
  return new Promise((resolve, reject) => {
    if (podcast.imageUrl != '_') {
      Vibrant.from(podcast.imageUrl).getPalette((err, palette) => {
        if (err) {
          return reject(err);
        }
        console.log(palette);
        if (palette) {
          result.extra.colors.vibrant = palette.DarkMuted?.hex || null;
          result.extra.colors.darkVibrant = palette.DarkVibrant?.hex || null;
          result.extra.colors.lightVibrant = palette.LightVibrant?.hex || null;
          result.extra.colors.muted = palette.Muted?.hex || null;
          result.extra.colors.darkMuted = palette.DarkMuted?.hex || null;
          result.extra.colors.lightMuted = palette.LightMuted?.hex || null;
        }
        return resolve(result);
      });
    }
  });
}
