import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import checkUrl from '../util/checkUrl';

import processPodcastUrl from './processPodcastUrl';
import { Feed } from '../jtd/podcast';
import emptyFeed from '../util/emptyFeed';

function checkIfValidUrl(input: string): boolean {
  let url;

  try {
    url = new URL(input);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

interface ProcessUrlResult {
  url: string;
  isValid: boolean;
  isItunesUrl: boolean;
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

async function run() {
  try {
    // get information on everything
    const token = process.env['GH_PAT'];
    if (!token) {
      throw new Error(`missing gh token`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const octokit = getOctokit(token);

    if (context.payload.issue) {
      const issueNumber = context.payload.issue.number;
      const title = context.payload.issue.title as string;
      if (!title) {
        core.setFailed('no title for the issue');
      } else {
        console.log('title of issue:', title);
        // we have a title for the issue
        const urlCandidate = title.trim();
        const info = await checkInputUrl(urlCandidate);
        if (!info.isValid) {
          core.setFailed('title is not a URL');
        } else {
          console.log('url info:', info);
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
            await processPodcastUrl(feed, issueNumber);
          } else {
            throw new Error(`no feed URL for ${info}`);
          }
        }
      }
    } else {
      core.setFailed('no issue data');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
