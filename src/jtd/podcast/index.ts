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

export interface Podcast {
  feedUrls: FeedUrls;

  title: string;
}
