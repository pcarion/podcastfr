import extractPodcastIfFromItunesUrl from '../util/extractPodcastIfFromItunesUrl';
import rssFeedFromItunes from '../util/rssFeedFromItunes';
import extractPodcastInfoFromRss from '../util/extractPodcastInfoFromRss';

export async function processPodcastRssUrl(rssUrl: string): Promise<void> {
  const info = await extractPodcastInfoFromRss(rssUrl);
  console.log(info);
}

export async function processPodcastItunesUrl(itunesUrl: string): Promise<void> {
  const itunesId = extractPodcastIfFromItunesUrl(itunesUrl);
  if (!itunesId) {
    throw new Error(`not a valid itunes url: ${itunesUrl}`);
  }
  const url = await rssFeedFromItunes(itunesId);
  if (!url) {
    throw new Error(`could not retrieve rss from itunes url: ${itunesUrl}`);
  }
  return processPodcastRssUrl(url);
}
