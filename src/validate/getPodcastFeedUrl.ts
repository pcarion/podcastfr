import axios from 'axios';

import { FeedUrls } from '../jtd/podcast/index';
import url from 'url';

function trimEndUrl(url: string): string {
  for (let i = url.length - 1; i > 0; i -= 1) {
    const c = url.charAt(i);
    if ('<>!#?'.indexOf(c) < 0) {
      return url.substring(0, i + 1);
    }
  }
  return url;
}

function cleanUpFeedUrl(url: string): string {
  for (let i = 0; i < url.length; i += 1) {
    if (url.substring(i).startsWith('http')) {
      return trimEndUrl(url.substring(i));
    }
  }
  return url;
}

async function rssFeedFromItunes(itunesId: string): Promise<string> {
  const url = `https://itunes.apple.com/lookup?id=${itunesId}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const json = response.data;
        // const json = JSON.parse(data.trim());
        if (json.resultCount !== 1) {
          return reject(new Error(`error parsing: ${url}`));
        }
        const { feedUrl } = json.results[0];
        if (!feedUrl) {
          return reject(new Error(`error parsing: ${url} - missing feedUrl`));
        }
        resolve(cleanUpFeedUrl(feedUrl));
      })
      .catch((err) => {
        return reject(new Error(`Error accessing url: ${url}: ${err}`));
      });
  });
}

function getItunesPodcastId(itunesUrl: string): string | null {
  const path = url.parse(itunesUrl, true).pathname;
  if (!path) {
    return null;
  }
  const parts = path.split('/');
  if (!parts || parts.length < 2) {
    return null;
  }
  const lastPart = parts[parts.length - 1];
  if (lastPart.startsWith('id')) {
    return lastPart.substring(2);
  }
  return lastPart;
}

export default async function getPodcastFeedUrl(urls: FeedUrls): Promise<string | null> {
  if (urls.rss) {
    return urls.rss;
  }

  if (urls.itunes) {
    const itunesId = getItunesPodcastId(urls.itunes);
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
