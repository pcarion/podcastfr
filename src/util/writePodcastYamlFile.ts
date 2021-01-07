import fs from 'fs-extra';
import { Podcast } from '../jtd/podcast';

function addProp(lines: string[], propName: string, value: string, indent = 0): void {
  let tab = '';
  for (let i = 0; i < indent; i++) {
    tab += '  ';
  }
  const val = value || '_';
  lines.push(`${tab}${propName}: ${val}`);
}

export default async function writePodcastYamlFile(podcast: Podcast, fileName: string): Promise<void> {
  const lines: string[] = [];
  addProp(lines, 'title', podcast.title);
  addProp(lines, 'description', podcast.description);
  addProp(lines, 'imageUrl', podcast.imageUrl);

  await fs.writeFile(fileName, lines.join('\n'));
}
