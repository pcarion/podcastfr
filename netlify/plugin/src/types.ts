import { Podcast } from './jtd/podcast';

export interface PodcastExtra extends Podcast {
  extra: {
    colors: {
      vibrant: string | null;
      darkVibrant: string | null;
      lightVibrant: string | null;
      muted: string | null;
      darkMuted: string | null;
      lightMuted: string | null;
    };
    episodes: {
      publishingDate: string;
    }[];
  };
}
