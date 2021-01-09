/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { parseString } from 'xml2js';
import { htmlToText } from 'html-to-text';

import { Podcast, Host } from '../jtd/podcast';
import { emptyFeed, emptyContacts } from './empty';

function parseHost(hosts: string): Host[] {
  if (!hosts || hosts.trim().length === 0) {
    return [];
  }
  return hosts
    .trim()
    .split(',')
    .map((h) => ({
      name: h.trim(),
    }));
}

function filterText(input: string, length: number): string {
  const parts = htmlToText(input, { wordwrap: false })
    .split('\n')
    .filter((s) => s.length > 0);

  let curlen = 0;
  return parts
    .filter((s) => {
      if (curlen > length) {
        return false;
      }
      curlen += s.length;
      return true;
    })
    .join('\n');
}

// other podcast parsers:
// https://github.com/akupila/node-podcast-parser/blob/master/src/index.js

function stringFromArray(arr: string[]): string {
  return arr.map((a) => a.trim()).join(' ');
}

function getTextFromFeed(element: any): string {
  return element.map((e: any) => e._.trim()).join(' ');
}

function getAttributes(element: any): any {
  if (element['$']) {
    return element['$'];
  }
  const filtered = element.filter((e: any) => !!e['$']);
  if (filtered.length > 0) {
    return filtered[0]['$'];
  }
  return null;
}

function infoFromRss(rss: any, rssUrl: string): Podcast {
  const channel = rss.channel && rss.channel[0];
  if (!channel) {
    throw new Error('bad rss');
  }
  const info = {
    title: '',
    link: '',
    author: '',
    description: '',
    imageUrl: '',
  };
  if (channel.title) {
    info.title = filterText(stringFromArray(channel.title), 260);
  }
  if (channel.link) {
    info.link = stringFromArray(channel.link);
  }
  if (channel['itunes:author']) {
    info.author = stringFromArray(channel['itunes:author']);
  }
  if (channel['itunes:summary']) {
    info.description = filterText(stringFromArray(channel['itunes:summary']), 260);
  } else if (channel['description']) {
    info.description = filterText(stringFromArray(channel['description']), 260);
  }
  if (channel['itunes:image']) {
    const atts = getAttributes(channel['itunes:image']);
    if (atts && atts['href']) {
      info.imageUrl = atts['href'];
    }
  }
  return {
    title: info.title || '_',
    description: info.description || '_',
    imageUrl: info.imageUrl || '_',
    feed: {
      ...emptyFeed,
      rss: rssUrl,
    },
    hosts: parseHost(info.author),
    contacts: {
      ...emptyContacts,
    },
  };
}

// old / obsolete? format
// http://1v5d8f8hvcfdr.blogspot.com/feeds/posts/default
function infoFromFeed(feed: any, rssUrl: string): Podcast {
  const info = {
    title: '',
    author: '',
  };
  info.title = getTextFromFeed(feed.title);
  if (feed.author) {
    const elementName = feed.author.find((e: any) => !!e.name);
    if (elementName) {
      info.author = stringFromArray(elementName.name);
    }
  }
  return {
    title: info.title || '_',
    description: '_',
    imageUrl: '_',
    feed: {
      ...emptyFeed,
      rss: rssUrl,
    },
    hosts: parseHost(info.author),
    contacts: {
      ...emptyContacts,
    },
  };
}

export default async function extractPodcastInfoFromRss(rssUrl: string): Promise<Podcast> {
\  return new Promise((resolve, reject) => {
    axios
      .get(rssUrl)
      .then((response) => {
        const xmlString = response.data as string;
        parseString(xmlString, (err, xml) => {
          if (err || !xml) {
            return reject(new Error(`error parsing xml`));
          }
          if (xml.rss) {
            return resolve(infoFromRss(xml.rss, rssUrl));
          } else if (xml.feed) {
            return resolve(infoFromFeed(xml.feed, rssUrl));
          } else {
            return reject(new Error('invalid xml podcast data'));
          }
        });
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
