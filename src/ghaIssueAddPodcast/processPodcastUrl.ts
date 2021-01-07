import sanitizeFileName from 'sanitize-filename';
import { remove as removeDiacritics } from 'diacritics';

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

export async function processPodcastRssUrl(rssUrl: string, issueNumber: number): Promise<void> {
  const info = await extractPodcastInfoFromRss(rssUrl);
  const podcastFileName = podcastJsonFileName(info.title, issueNumber);
  console.log(info);
  console.log('@@@ fileName:', podcastFileName);

  const fileName = `./podcasts/${podcastFileName}.yaml`;
  await writePodcastYamlFile(info, fileName);
}

export async function processPodcastItunesUrl(itunesUrl: string, issueNumber: number): Promise<void> {
  const itunesId = extractPodcastIfFromItunesUrl(itunesUrl);
  if (!itunesId) {
    throw new Error(`not a valid itunes url: ${itunesUrl}`);
  }
  const url = await rssFeedFromItunes(itunesId);
  if (!url) {
    throw new Error(`could not retrieve rss from itunes url: ${itunesUrl}`);
  }
  return processPodcastRssUrl(url, issueNumber);
}
