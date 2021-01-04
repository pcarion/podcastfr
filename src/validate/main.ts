import validate from '.';
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
