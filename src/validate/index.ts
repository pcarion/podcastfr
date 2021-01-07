import fs from 'fs-extra';
import validateYamlFile from './validateYamlFile';
import validateFeedUrls from './validateFeedUrls';
import validateContentFile from '../generate/validateContentFile';

import getPodcastDescriptionsFiles from './getPodcastDescriptionsFiles';
import getPodcastFeedUrl from './getPodcastFeedUrl';
import extractPodcastInfoFromRss from '../util/extractPodcastInfoFromRss';
import { Podcast } from '../jtd/podcast';

export default async function validate(
  podcastsDirectory: string,
  filesToValidate: string[],
  resultFile: string,
): Promise<void> {
  const files = await getPodcastDescriptionsFiles(podcastsDirectory, filesToValidate);
  const podcasts = await validateContentFile(resultFile);

  for (const fileName of files) {
    const podcast = await validateYamlFile(fileName);
    console.log(podcast);
    await validateFeedUrls(podcast);
    const rssUrl = await getPodcastFeedUrl(podcast.feed);
    console.log('rssUrl:', rssUrl);
    if (rssUrl) {
      podcast.feed.rss = rssUrl;
      const info = await extractPodcastInfoFromRss(rssUrl);
      console.log(info);

      const ix = -1; // podcasts.findIndex((p) => p.meta.fileName === fileName);
      if (ix < 0) {
        podcasts.push(podcast);
      } else {
        podcasts[ix] = podcast;
      }
    }
  }
  console.log(podcasts);
  await fs.writeJSON(resultFile, podcasts, {
    spaces: 2,
  });
}
