import fs from 'fs-extra';
import validatePodcastYamlFile from './validatePodcastYamlFile';
import validateFeedUrls from './validateFeedUrls';
import { Podcast } from './jtd/podcast';

import getPodcastDescriptionsFiles from './getPodcastDescriptionsFiles';

async function validate(podcastsDirectory: string, filesToValidate: string[], resultFile: string): Promise<void> {
  const files = await getPodcastDescriptionsFiles(podcastsDirectory, filesToValidate);
  const podcasts: Podcast[] = [];
  for (const fileName of files) {
    const podcast = await validatePodcastYamlFile(fileName);
    console.log(podcast);
    await validateFeedUrls(podcast);
    podcasts.push(podcast);
  }
  console.log(podcasts);
  await fs.writeJSON(resultFile, podcasts, {
    spaces: 2,
  });
}

// const podcastsDirectory = './podcasts';
const filesToValidte: string[] = [];

export default async function generateContentFile(contentFile: string, podcastsDirectory: string): Promise<void> {
  return validate(podcastsDirectory, filesToValidte, contentFile);
}
