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
  info.feed.rss = rssUrl;
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
  const podcast = await processPodcastRssUrl(url);
  podcast.feed.itunes = itunesUrl;
  return podcast;
}

function mergeProps(object1: unknown, object2: unknown): void {
  const o1 = object1 as Record<string, unknown>;
  const o2 = object2 as Record<string, unknown>;

  for (const prop in o1) {
    if (o1[prop] === '_') {
      o1[prop] = o2[prop] || '_';
    }
  }
}

export default async function processPodcastFeed(feed: Feed, issueNumber: number): Promise<Podcast> {
  let podcast: Podcast | undefined;
  if (feed.rss !== '_') {
    podcast = await processPodcastRssUrl(feed.rss);
  } else if (feed.itunes !== '_') {
    podcast = await processPodcastItunesUrl(feed.itunes);
  }

  if (podcast) {
    const podcastFileName = podcastJsonFileName(podcast.title, issueNumber);
    mergeProps(podcast.feed, feed);
    console.log(podcast);
    console.log('Generating fileName:', podcastFileName);

    const fileName = `./podcasts/${podcastFileName}.yaml`;
    await writePodcastYamlFile(podcast, fileName);
    return podcast;
  } else {
    throw new Error(`no podcast found with feed urls: ${feed}`);
  }
}
