import { PodcastDescription } from '../jtd/podcastDescription';
import { FeedUrls } from '../jtd/podcast/index';
import checkUrl from './checkUrl';

export default async function validateFeedUrls(podcast: PodcastDescription): Promise<FeedUrls> {
  const result: FeedUrls = {};
  let count = 0;
  if (!podcast.feed) {
    throw new Error(`at least one feed URL is required`);
  }
  const feed = podcast.feed;

  if (feed.rss) {
    const url = await checkUrl(feed.rss);
    count++;
    result.rss = url;
  }
  if (feed.castbox) {
    const url = await checkUrl(feed.castbox);
    count++;
    result.castbox = url;
  }
  if (feed.deezer) {
    const url = await checkUrl(feed.deezer);
    count++;
    result.deezer = url;
  }
  if (feed.google) {
    const url = await checkUrl(feed.google);
    count++;
    result.google = url;
  }
  if (feed.itunes) {
    const url = await checkUrl(feed.itunes);
    count++;
    result.itunes = url;
  }
  if (feed.pocketcast) {
    const url = await checkUrl(feed.pocketcast);
    count++;
    result.pocketcast = url;
  }
  if (feed.soundcloud) {
    const url = await checkUrl(feed.soundcloud);
    count++;
    result.soundcloud = url;
  }
  if (feed.spotify) {
    const url = await checkUrl(feed.spotify);
    count++;
    result.spotify = url;
  }
  if (count === 0) {
    throw new Error(`at least one feed URL is required`);
  }

  return result;
}
