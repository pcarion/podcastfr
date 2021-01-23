export interface Contacts {
  email: string;

  googleGroup: string;

  link: string;

  patreon: string;

  twitter: string;
}

export interface Feed {
  castbox: string;

  deezer: string;

  google: string;

  itunes: string;

  pocketcast: string;

  rss: string;

  soundcloud: string;

  spotify: string;
}

export interface Host {
  name?: string;

  twitter?: string;
}

export interface Podcast {
  contacts: Contacts;

  description: string;

  feed: Feed;

  hosts: Host[];

  imageUrl: string;

  pid: string;

  title: string;

  yamlDescriptionFile?: string;
}
