import axios from 'axios';

function trimEndUrl(url: string): string {
  for (let i = url.length - 1; i > 0; i -= 1) {
    const c = url.charAt(i);
    if ('<>!#?'.indexOf(c) < 0) {
      return url.substring(0, i + 1);
    }
  }
  return url;
}

function cleanUpFeedUrl(url: string): string {
  for (let i = 0; i < url.length; i += 1) {
    if (url.substring(i).startsWith('http')) {
      return trimEndUrl(url.substring(i));
    }
  }
  return url;
}

export default async function rssFeedFromItunes(itunesId: string): Promise<string> {
  const url = `https://itunes.apple.com/lookup?id=${itunesId}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const json = response.data;
        // const json = JSON.parse(data.trim());
        if (json.resultCount !== 1) {
          return reject(new Error(`error parsing: ${url}`));
        }
        const { feedUrl } = json.results[0];
        if (!feedUrl) {
          return reject(new Error(`error parsing: ${url} - missing feedUrl`));
        }
        resolve(cleanUpFeedUrl(feedUrl));
      })
      .catch((err) => {
        return reject(new Error(`Error accessing url: ${url}: ${err}`));
      });
  });
}
