import { Feed } from '../jtd/podcast/index';
import extractPodcastIfFromItunesUrl from '../util/extractPodcastIfFromItunesUrl';
import rssFeedFromItunes from '../util/rssFeedFromItunes';

export default async function getPodcastFeedUrl(urls: Feed): Promise<string | null> {
  if (urls.rss) {
    return urls.rss;
  }

  if (urls.itunes) {
    const itunesId = extractPodcastIfFromItunesUrl(urls.itunes);
    if (itunesId) {
      const url = await rssFeedFromItunes(itunesId);
      if (url) {
        return url;
      }
    }
  }

  // TODO: extract from other URLs
  return null;
}
