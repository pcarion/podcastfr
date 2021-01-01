import fs from 'fs-extra';
import validateYamlFile from '../util/validateYamlFile';
import validateFeedUrls from './validateFeedUrls';
import { Podcast } from '../jtd/podcast';

import getPodcastDescriptionsFiles from './getPodcastDescriptionsFiles';
import getPodcastFeedUrl from './getPodcastFeedUrl';

async function validate(podcastsDirectory: string, filesToValidate: string[], resultFile: string): Promise<void> {
  const files = await getPodcastDescriptionsFiles(podcastsDirectory, filesToValidate);
  const podcasts: Podcast[] = [];
  for (const fileName of files) {
    const podcast = await validateYamlFile(fileName);
    console.log(podcast);
    await validateFeedUrls(podcast);
    const rssUrl = await getPodcastFeedUrl(podcast.feed);
    console.log('rssUrl:', rssUrl);
    if (rssUrl) {
      // podcast.feed.rss = rssUrl;
      // const info = await extractPodcastInfoFromRss(rssUrl);
      // console.log(info);

      podcasts.push(podcast);
    }
  }
  console.log(podcasts);
  await fs.writeJSON(resultFile, podcasts, {
    spaces: 2,
  });
}

const podcastsDirectory = './podcasts';
const filesToValidte: string[] = [];

export default async function generateContentFile(contentFile: string): Promise<void> {
  return validate(podcastsDirectory, filesToValidte, contentFile);
}
