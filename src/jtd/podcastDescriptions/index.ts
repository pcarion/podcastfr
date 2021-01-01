export type PodcastDescriptions = PodcastDescription[];

export interface PodcastDescription {
  feed: PodcastDescriptionFeed;

  titre: string;
}

export interface PodcastDescriptionFeed {
  castbox?: string;

  deezer?: string;

  google?: string;

  itunes?: string;

  pocketcast?: string;

  rss?: string;

  soundcloud?: string;

  spotify?: string;
}
