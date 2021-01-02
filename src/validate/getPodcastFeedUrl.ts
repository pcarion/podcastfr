import { FeedUrls } from '../jtd/podcast/index';

export default async function getPodcastFeedUrl(urls: FeedUrls): Promise<string | null> {
  if (urls.rss) {
    return urls.rss;
  }

  // TODO: extract from other URLs
  return null;
}
