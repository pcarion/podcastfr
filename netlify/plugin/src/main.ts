import { generateContentFiles } from './generateContentFiles';

if (process.argv.length !== 4) {
  console.log(`Usage: ${process.argv[0]} ${process.argv[1]} <content generation directory> <podcasts directory>`);
  process.exit(1);
}

const contentDirectory = process.argv[2];
const podcastsDirectory = process.argv[3];

console.log(`- contentDirectory: ${contentDirectory}`);
console.log(`- podcastsDirectory: ${podcastsDirectory}`);

generateContentFiles({ outputJsonDirectory: contentDirectory, inputYamlDirectory: podcastsDirectory })
  .then(() => {
    console.log('DONE');
  })
  .catch((err) => {
    console.log(err);
  });
