import fs from 'fs-extra';
import { Podcast } from '../jtd/podcast';

function addProp(lines: string[], propName: string, value: string | undefined, indent = 0): void {
  let tab = '';
  let name = propName;
  let withDash = false;
  if (propName.charAt(0) == '-') {
    name = propName.substring(1).trim();
    withDash = true;
  }
  for (let i = 0; i < indent; i++) {
    if (i == indent - 1 && withDash) {
      tab += '- ';
    } else {
      tab += '  ';
    }
  }
  const val = value || '_';
  lines.push(`${tab}${name}: ${val}`);
}

function writeDescription(lines: string[], description: string, indent: number) {
  let tab = '';
  for (let i = 0; i < indent; i++) {
    tab += '  ';
  }

  const parts = description.split('\n');
  lines.push(`${tab}description: |`);
  parts.forEach((p) => {
    lines.push(`${tab}  ${p}`);
  });
}

export default async function writePodcastYamlFile(podcast: Podcast, fileName: string): Promise<void> {
  const lines: string[] = [];
  addProp(lines, 'title', podcast.title);
  writeDescription(lines, podcast.description, 0);
  addProp(lines, 'imageUrl', podcast.imageUrl);
  lines.push('');
  lines.push('contacts:');
  addProp(lines, 'link', podcast.contacts?.link, 1);
  addProp(lines, 'email', podcast.contacts?.email, 1);
  addProp(lines, 'twitter', podcast.contacts?.twitter, 1);
  addProp(lines, 'patreon', podcast.contacts?.patreon, 1);
  addProp(lines, 'googleGroup', podcast.contacts?.googleGroup, 1);
  lines.push('');
  lines.push('hosts:');
  if (podcast.hosts && podcast.hosts.length > 0) {
    podcast.hosts.forEach((h) => {
      addProp(lines, '-name', h.name, 2);
      addProp(lines, 'twitter', h.twitter, 2);
    });
  } else {
    addProp(lines, '-name', undefined, 2);
    addProp(lines, 'twitter', undefined, 2);
  }
  lines.push('');
  lines.push('feed:');
  addProp(lines, 'rss', podcast.feed.rss, 1);
  addProp(lines, 'itunes', podcast.feed.itunes, 1);
  addProp(lines, 'spotify', podcast.feed.spotify, 1);
  addProp(lines, 'soundcloud', podcast.feed.soundcloud, 1);
  addProp(lines, 'deezer', podcast.feed.deezer, 1);
  addProp(lines, 'google', podcast.feed.google, 1);
  addProp(lines, 'castbox', podcast.feed.castbox, 1);
  addProp(lines, 'pocketcast', podcast.feed.pocketcast, 1);

  await fs.writeFile(fileName, lines.join('\n'));
}
