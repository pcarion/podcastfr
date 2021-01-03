import fs from 'fs-extra';
import copyAssets from './copyAssets';
import validateContentFile from './validateContentFile';
import { htmlStart, htmlEnd } from './html';
import header from './header';
import outputPodcast from './outputPodcast';

const destDirectory = './__html__';
const assetDirectory = './static';
const contenFile = './content/podcasts.json';

async function generateHtml(): Promise<void> {
  const lines: string[] = [];
  const podcasts = await validateContentFile(contenFile);
  const indexFile = `${destDirectory}/index.html`;
  await copyAssets(assetDirectory, destDirectory);

  htmlStart(lines);
  header(lines);
  lines.push(`<ul class="grid grid-cols-1 gap-6 grid-cols-2">`);
  podcasts.forEach((p) => {
    outputPodcast(lines, p);
  });
  lines.push(`
  </ul>
  `);
  htmlEnd(lines);

  await fs.writeFile(indexFile, lines.join('\n'));
}

generateHtml()
  .then(() => {
    console.log('DONE');
  })
  .catch((err) => {
    console.log(err);
  });
