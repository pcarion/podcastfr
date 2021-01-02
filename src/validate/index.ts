import validateYamlFile from './validateYamlFile';
import validateFeedUrls from './validateFeedUrls';
import getPodcastDescriptionsFiles from './getPodcastDescriptionsFiles';
import getPodcastFeedUrl from './getPodcastFeedUrl';
import extractPodcastInfoFromRss from './extractPodcastInfoFromRss';

async function validate(podcastsDirectory: string): Promise<void> {
  const files = await getPodcastDescriptionsFiles(podcastsDirectory);
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
      const info = await extractPodcastInfoFromRss(rssUrl);
      console.log(info);
    }
  }
}

const podcastsDirectory = './podcasts';
validate(podcastsDirectory)
  .then(() => {
    console.log('File is valid');
  })
  .catch((err) => {
    console.log('File is not valid');
    console.log(err);
  });
