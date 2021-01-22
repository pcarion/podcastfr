import fs from 'fs-extra';
import path from 'path';
import validatePodcastYamlFile from './validatePodcastYamlFile';
import validateFeedUrls from './validateFeedUrls';
import processPodcast from './processPodcast';
import { Podcast } from './jtd/podcast';
import { PodcastExtra } from './types';

import getPodcastDescriptionsFiles from './getPodcastDescriptionsFiles';
import validatePodcastYaml from './validatePodcastYamlFile';

async function validate(podcastsDirectory: string, filesToValidate: string[], contentDirectory: string): Promise<void> {
  try {
    const files = await getPodcastDescriptionsFiles(podcastsDirectory, filesToValidate);
    console.log(`[${files.length}] files are: \n${files.join('\n')}\n`);
    for (const fileName of files) {
      console.log(`\n# processing: ${fileName}`);
      const podcast = await validatePodcastYamlFile(fileName);
      console.log(`# from: ${fileName} ${podcast.title} - ${podcast.pid}`);
      // await validateFeedUrls(podcast);
      const podcastExtra = await processPodcast(podcast);
      const podcastYamlFileName = path.join(contentDirectory, `${podcastExtra.pid}.json`);
      console.log(`# write ${podcastExtra.title} - ${podcastExtra.pid} to: ${podcastYamlFileName}`);
      await fs.writeJSON(podcastYamlFileName, podcastExtra, {
        spaces: 2,
      });
    }
    console.log('\n-- done processing files\n');
  } catch (err) {
    console.log(`\n\n### error processing files; ${err}`);
    console.log(err);
    throw err;
  }
}

// const podcastsDirectory = './podcasts';
const filesToValidte: string[] = [];

export default async function generateContentFile(contentDirectory: string, podcastsDirectory: string): Promise<void> {
  return validate(podcastsDirectory, filesToValidte, contentDirectory);
}
