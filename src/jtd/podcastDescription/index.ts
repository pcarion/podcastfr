export interface Feed {
  castbox?: string;

  deezer?: string;

  google?: string;

  itunes?: string;

  pocketcast?: string;

  rss?: string;

  soundcloud?: string;

  spotify?: string;
}

export interface PodcastDescription {
  feed: Feed;

  ignore?: boolean;

  title: string;
}
