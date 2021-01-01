import validateYamlFile from './validateYamlFile';
import validateFeedUrls from './validateFeedUrls';
import getPodcastDescriptionsFiles from './getPodcastDescriptionsFiles';

async function validate(podcastsDirectory: string): Promise<void> {
  const files = await getPodcastDescriptionsFiles(podcastsDirectory);
  for (const fileName of files) {
    const descriptions = await validateYamlFile(fileName);
    console.log(descriptions);
    await validateFeedUrls(descriptions);
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
