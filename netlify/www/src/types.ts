import { Podcast } from './jtd/podcast';
import { FluidObject } from 'gatsby-image';

export interface LogoColors {
  vibrant: string | null;
  darkVibrant: string | null;
  lightVibrant: string | null;
  muted: string | null;
  darkMuted: string | null;
  lightMuted: string | null;
}

export interface EpisodeDate {
  publishingDate: string;
}

export interface PodcastExtra extends Podcast {
  extra: {
    colors: LogoColors;
    episodes: EpisodeDate[];
    imageFluid: FluidObject;
  };
}
