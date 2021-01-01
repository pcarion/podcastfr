import fs from 'fs-extra';
import copyAssets from './copyAssets';
import validateContentFile from './validateContentFile';
import { htmlStart, htmlEnd } from './html';
import header from './header';
import outputPodcast from './outputPodcast';
import generateContentFile from '../generateContentFile';

const destDirectory = './__html__';
const assetDirectory = './static';

// reference:
// https://stackoverflow.com/a/2450976/1985560
function shuffle(array: unknown[]) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

async function generateHtml(contenFile: string): Promise<void> {
  const lines: string[] = [];
  const podcasts = await validateContentFile(contenFile);
  shuffle(podcasts);
  const indexFile = `${destDirectory}/index.html`;
  await copyAssets(assetDirectory, destDirectory);

  htmlStart(lines, 'Podcast Tech Français');
  header(lines);
  lines.push(`<ul class="grid gap-6 grid-cols-1">`);
  podcasts.forEach((p) => {
    outputPodcast(lines, p);
  });
  lines.push(`
  </ul>
  `);
  htmlEnd(lines);

  await fs.writeFile(indexFile, lines.join('\n'));
}

const podcastContentFile = './content/podcasts.json';
generateContentFile(podcastContentFile)
  .then(() => {
    return generateHtml(podcastContentFile);
  })
  .then(() => {
    console.log('DONE');
  })
  .catch((err) => {
    console.log(err);
  });
