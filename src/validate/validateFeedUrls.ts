import { PodcastDescription } from '../jtd/podcastDescription';
import checkUrl from './checkUrl';

export default async function validateFeedUrls(podcast: PodcastDescription): Promise<void> {
  console.log(`\n${podcast.title}:`);
  if (!podcast.feed) {
    throw new Error(`at least one feed URL is required`);
  }
  const feed = podcast.feed;

  if (feed.rss) {
    const url = await checkUrl(feed.rss);
    console.log(`${feed.rss} => ${url}`);
  }
  if (feed.castbox) {
    const url = await checkUrl(feed.castbox);
    console.log(`${feed.castbox} => ${url}`);
  }
  if (feed.deezer) {
    const url = await checkUrl(feed.deezer);
    console.log(`${feed.deezer} => ${url}`);
  }
  if (feed.google) {
    const url = await checkUrl(feed.google);
    console.log(`${feed.google} => ${url}`);
  }
  if (feed.itunes) {
    const url = await checkUrl(feed.itunes);
    console.log(`${feed.itunes} => ${url}`);
  }
  if (feed.pocketcast) {
    const url = await checkUrl(feed.pocketcast);
    console.log(`${feed.pocketcast} => ${url}`);
  }
  if (feed.soundcloud) {
    const url = await checkUrl(feed.soundcloud);
    console.log(`${feed.soundcloud} => ${url}`);
  }
  if (feed.spotify) {
    const url = await checkUrl(feed.spotify);
    console.log(`${feed.spotify} => ${url}`);
  }
}
