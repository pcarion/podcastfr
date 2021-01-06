import url from 'url';

export default function extractPodcastIfFromItunesUrl(itunesUrl: string): string | null {
  const path = url.parse(itunesUrl, true).pathname;
  if (!path) {
    return null;
  }
  const parts = path.split('/');
  if (!parts || parts.length < 2) {
    return null;
  }
  const lastPart = parts[parts.length - 1];
  if (lastPart.startsWith('id')) {
    return lastPart.substring(2);
  }
  return lastPart;
}
