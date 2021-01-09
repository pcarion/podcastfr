import { Podcast } from '../jtd/podcast/index';
import checkUrl from '../util/checkUrl';

export default async function validateFeedUrls(podcast: Podcast): Promise<void> {
  let count = 0;
  if (!podcast.feed) {
    throw new Error(`at least one feed URL is required`);
  }
  const feed = podcast.feed;

  if (feed.rss !== '_') {
    const url = await checkUrl(feed.rss);
    count++;
    feed.rss = url;
  }
  if (feed.castbox !== '_') {
    const url = await checkUrl(feed.castbox);
    count++;
    feed.castbox = url;
  }
  if (feed.deezer !== '_') {
    const url = await checkUrl(feed.deezer);
    count++;
    feed.deezer = url;
  }
  if (feed.google !== '_') {
    const url = await checkUrl(feed.google);
    count++;
    feed.google = url;
  }
  if (feed.itunes !== '_') {
    const url = await checkUrl(feed.itunes);
    count++;
    feed.itunes = url;
  }
  if (feed.pocketcast !== '_') {
    const url = await checkUrl(feed.pocketcast);
    count++;
    feed.pocketcast = url;
  }
  if (feed.soundcloud !== '_') {
    const url = await checkUrl(feed.soundcloud);
    count++;
    feed.soundcloud = url;
  }
  if (feed.spotify !== '_') {
    const url = await checkUrl(feed.spotify);
    count++;
    feed.spotify = url;
  }
  if (count === 0) {
    throw new Error(`at least one feed URL is required`);
  }
}
