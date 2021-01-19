import generateContentFile from '.';

if (process.argv.length !== 4) {
  console.log(`Usage: ${process.argv[0]} ${process.argv[1]} <podcasts.json file> <podcasts directory>`);
  process.exit(1);
}

const contentFile = process.argv[2];
const podcastsDirectory = process.argv[3];

console.log(`- contentFile: ${contentFile}`);
console.log(`- podcastsDirectory: ${podcastsDirectory}`);

generateContentFile(contentFile, podcastsDirectory)
  .then(() => {
    console.log('DONE');
  })
  .catch((err) => {
    console.log(err);
  });
