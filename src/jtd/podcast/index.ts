export interface FeedUrls {
  castbox?: string;

  deezer?: string;

  google?: string;

  itunes?: string;

  pocketcast?: string;

  rss?: string;

  soundcloud?: string;

  spotify?: string;
}

export interface Information {
  author?: string;

  description?: string;

  imageUrl?: string;

  link?: string;

  title?: string;
}

export interface Meta {
  fileName: string;
}

export interface Podcast {
  feedUrls: FeedUrls;

  information: Information;

  meta: Meta;
}
