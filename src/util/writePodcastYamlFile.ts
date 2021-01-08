import fs from 'fs-extra';
import { Podcast } from '../jtd/podcast';

function addProp(lines: string[], propName: string, value: string | undefined, indent = 0): void {
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
  lines.push('');
  lines.push('contacts:');
  addProp(lines, 'link', podcast.contacts?.link, 1);
  addProp(lines, 'email', podcast.contacts?.email, 1);
  addProp(lines, 'twitter', podcast.contacts?.twitter, 1);
  addProp(lines, 'patreon', podcast.contacts?.patreon, 1);
  addProp(lines, 'googleGroup', podcast.contacts?.googleGroup, 1);
  lines.push('');

  await fs.writeFile(fileName, lines.join('\n'));
}
