import sanitizeFileName from 'sanitize-filename';
import { remove as removeDiacritics } from 'diacritics';

import { Podcast, Feed } from '../jtd/podcast';
import extractPodcastIfFromItunesUrl from '../util/extractPodcastIfFromItunesUrl';
import rssFeedFromItunes from '../util/rssFeedFromItunes';
import extractPodcastInfoFromRss from '../util/extractPodcastInfoFromRss';
import writePodcastYamlFile from '../util/writePodcastYamlFile';

function podcastJsonFileName(title: string, issueNumber: number): string {
  const clean1 = sanitizeFileName(title || 'podcast');
  const clean2 = removeDiacritics(clean1);
  const clean3 = clean2.replace(/\s/g, '_').toLowerCase();
  return `${clean3}-${issueNumber}`;
}

async function processPodcastRssUrl(rssUrl: string): Promise<Podcast> {
  const info = await extractPodcastInfoFromRss(rssUrl);
  return info;
}

async function processPodcastItunesUrl(itunesUrl: string): Promise<Podcast> {
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

export default async function processPodcastFeed(feed: Feed, issueNumber: number): Promise<void> {
  let info: Podcast | undefined;
  if (feed.rss) {
    info = await processPodcastRssUrl(feed.rss);
  } else if (feed.itunes) {
    info = await processPodcastItunesUrl(feed.itunes);
  }

  if (info) {
    const podcastFileName = podcastJsonFileName(info.title, issueNumber);
    info.feed = {
      ...feed,
      ...info.feed,
    };
    console.log(info);
    console.log('@@@ fileName:', podcastFileName);

    const fileName = `./podcasts/${podcastFileName}.yaml`;
    await writePodcastYamlFile(info, fileName);
  } else {
    throw new Error(`no podcast found with feed urls: ${feed}`);
  }
}
