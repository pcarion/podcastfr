import fs from 'fs-extra';
import path from 'path';
import validatePodcastYamlFile from './validatePodcastYamlFile';
import validateFeedUrls from './validateFeedUrls';
import processPodcast from './processPodcast';
import { Podcast } from './jtd/podcast';
import { PodcastExtra } from './types';

import getPodcastDescriptionsFiles from './getPodcastDescriptionsFiles';

async function validate(podcastsDirectory: string, filesToValidate: string[], contentDirectory: string): Promise<void> {
  const files = await getPodcastDescriptionsFiles(podcastsDirectory, filesToValidate);
  const podcasts: PodcastExtra[] = [];
  for (const fileName of files) {
    const podcast = await validatePodcastYamlFile(fileName);
    console.log(podcast);
    // await validateFeedUrls(podcast);
    const podcastExtra = await processPodcast(podcast);
    const podcastYamlFileName = path.join(contentDirectory, `${podcast.pid}.json`);
    await fs.writeJSON(podcastYamlFileName, podcastExtra, {
      spaces: 2,
    });
    podcasts.push(podcastExtra);
  }
  console.log(podcasts);
  const resultFile = path.join(contentDirectory, 'podcasts.json');
  await fs.writeJSON(resultFile, podcasts, {
    spaces: 2,
  });
}

// const podcastsDirectory = './podcasts';
const filesToValidte: string[] = [];

export default async function generateContentFile(contentDirectory: string, podcastsDirectory: string): Promise<void> {
  return validate(podcastsDirectory, filesToValidte, contentDirectory);
}
