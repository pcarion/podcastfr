import checkUrl from '../util/checkUrl';

import { Feed } from '../jtd/podcast';
import { emptyFeed } from '../util/empty';

import processPodcastFeed from './processPodcastFeed';

interface ProcessUrlResult {
  url: string;
  isValid: boolean;
  isItunesUrl: boolean;
}

function checkIfValidUrl(input: string): boolean {
  let url;

  try {
    url = new URL(input);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

async function checkInputUrl(input: string): Promise<ProcessUrlResult> {
  const urlCandidate = input.trim();
  try {
    if (!checkIfValidUrl(urlCandidate)) {
      return {
        url: urlCandidate,
        isValid: false,
        isItunesUrl: false,
      };
    }
    const actualUrl = await checkUrl(urlCandidate);
    if (!actualUrl) {
      return {
        url: urlCandidate,
        isValid: false,
        isItunesUrl: false,
      };
    }
    const url = new URL(actualUrl);
    const hostname = url.hostname;
    let isItunesUrl = false;
    if (hostname.endsWith('apple.com')) {
      isItunesUrl = true;
    }
    return {
      url: actualUrl,
      isValid: true,
      isItunesUrl: isItunesUrl,
    };
  } catch (err) {
    return {
      url: urlCandidate,
      isValid: false,
      isItunesUrl: false,
    };
  }
}

export default async function processUrl(urlCandidate: string, issueNumber: number): Promise<void> {
  try {
    const info = await checkInputUrl(urlCandidate);
    if (!info.isValid) {
      throw new Error(`invalid URL: ${urlCandidate}`);
    }
    let feed: Feed | undefined;
    if (info.isItunesUrl) {
      feed = {
        ...emptyFeed,
        itunes: info.url,
      };
    } else {
      feed = {
        ...emptyFeed,
        rss: info.url,
      };
    }
    if (feed) {
      await processPodcastFeed(feed, issueNumber);
    } else {
      throw new Error(`no feed URL for ${info}`);
    }
  } catch (err) {
    console.log(`Error processing: url=${urlCandidate} issueNumber=${issueNumber}:`, err);
    throw err;
  }
}
