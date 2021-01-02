/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { parseString } from 'xml2js';
import { Information as PodcastInformation } from '../jtd/podcast';

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

function infoFromRss(rss: any): PodcastInformation {
  const channel = rss.channel && rss.channel[0];
  if (!channel) {
    throw new Error('bad rss');
  }
  const info: PodcastInformation = {};
  if (channel.title) {
    info.title = stringFromArray(channel.title);
  }
  if (channel.link) {
    info.link = stringFromArray(channel.link);
  }
  if (channel['itunes:author']) {
    info.author = stringFromArray(channel['itunes:author']);
  }
  if (channel['itunes:summary']) {
    info.description = stringFromArray(channel['itunes:summary']);
  } else if (channel['description']) {
    info.description = stringFromArray(channel['description']);
  }
  if (channel['itunes:image']) {
    const atts = getAttributes(channel['itunes:image']);
    if (atts && atts['href']) {
      info.imageUrl = atts['href'];
    }
  }
  return info;
}

// old / obsolete? format
// http://1v5d8f8hvcfdr.blogspot.com/feeds/posts/default
function infoFromFeed(feed: any): PodcastInformation {
  const info: PodcastInformation = {};
  info.title = getTextFromFeed(feed.title);
  if (feed.author) {
    const elementName = feed.author.find((e: any) => !!e.name);
    if (elementName) {
      info.author = stringFromArray(elementName.name);
    }
  }
  return info;
}

export default async function extractPodcastInfoFromRss(rssUrl: string): Promise<PodcastInformation> {
  return new Promise((resolve, reject) => {
    axios
      .get(rssUrl)
      .then((response) => {
        const xmlString = response.data as string;
        parseString(xmlString, (err, xml) => {
          if (err || !xml) {
            return reject(new Error(`error parsing xml`));
          }
          if (xml.rss) {
            return resolve(infoFromRss(xml.rss));
          } else if (xml.feed) {
            return resolve(infoFromFeed(xml.feed));
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
