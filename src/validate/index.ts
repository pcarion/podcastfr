import fs from 'fs-extra';
import validateYamlFile from './validateYamlFile';
import validateFeedUrls from './validateFeedUrls';
import validateContentFile from '../generate/validateContentFile';

import getPodcastDescriptionsFiles from './getPodcastDescriptionsFiles';
import getPodcastFeedUrl from './getPodcastFeedUrl';
import extractPodcastInfoFromRss from './extractPodcastInfoFromRss';
import { Podcast } from '../jtd/podcast';

export default async function validate(
  podcastsDirectory: string,
  filesToValidate: string[],
  resultFile: string,
): Promise<void> {
  const files = await getPodcastDescriptionsFiles(podcastsDirectory, filesToValidate);
  const podcasts = await validateContentFile(resultFile);

  const descriptions: Podcast[] = [];
  for (const fileName of files) {
    const description = await validateYamlFile(fileName);
    if (description.ignore) {
      continue;
    }
    console.log(description);
    const feedUrls = await validateFeedUrls(description);
    console.log('FeedUrls:');
    console.log(feedUrls);
    const rssUrl = await getPodcastFeedUrl(feedUrls);
    console.log('rssUrl:', rssUrl);
    if (rssUrl) {
      if (!feedUrls.rss) {
        feedUrls.rss = rssUrl;
      }
      const info = await extractPodcastInfoFromRss(rssUrl);
      console.log(info);

      const newPodcast: Podcast = {
        meta: {
          fileName: fileName,
        },
        information: info,
        feedUrls: feedUrls,
      };

      const ix = podcasts.findIndex((p) => p.meta.fileName === fileName);
      if (ix < 0) {
        descriptions.push(newPodcast);
      } else {
        descriptions[ix] = newPodcast;
      }
    }
  }
  console.log(descriptions);
  await fs.writeJSON(resultFile, descriptions, {
    spaces: 2,
  });
}

const podcastsDirectory = './podcasts';
const resultFile = './content/podcasts.json';
const filesToValidte: string[] = [];

validate(podcastsDirectory, filesToValidte, resultFile)
  .then(() => {
    console.log('File is valid');
  })
  .catch((err) => {
    console.log('File is not valid');
    console.log(err);
  });
