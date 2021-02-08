import React, { FC, ReactElement } from 'react';
import { Feed } from '../../jtd/podcast';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppLinkProps {
  title: string;
  feeds: Feed;
}

function extractItunesId(itunesUrl: string): string | null {
  if (!itunesUrl || itunesUrl.length < 5) {
    return null;
  }
  const path = new URL(itunesUrl).pathname;
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

function mkOvercastUrl(url: string, itunesId: string) {
  if (!url || url.length < 5) {
    return null;
  }
  if (!itunesId) {
    return null;
  }
  return `https://overcast.fm/itunes${itunesId}`;
  // return `overcast://x-callback-url/add?url=${url}`;
}

function mkApplePodcastsUrl(title: string, itunesId: string) {
  if (!itunesId) {
    return null;
  }
  return `podcasts://podcasts.apple.com/us/podcast/${encodeURI(title)}/id${itunesId}`;
}

function mkCastroUrl(itunesId: string) {
  if (!itunesId) {
    return null;
  }
  return `https://castro.fm/itunes/${itunesId}`;
}

function renderLink(name: string, url: string, imagePath: string): ReactElement {
  if (!url || url.length < 5) {
    return null;
  }
  return (
    <li>
      <a href={url} className="col-span-1 flex shadow-sm rounded-md border bg-white hover:bg-yellow-200">
        <img src={imagePath} className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-l-md p-2" />
        <div className="flex-1 flex items-center justify-between  border-gray-200 rounded-r-md truncate">
          <div className="flex-1 px-4 py-2 text-sm truncate text-gray-900 font-thin hover:text-gray-600">
            Open with <span className="font-semibold">{name}</span>
          </div>
        </div>
      </a>
    </li>
  );
}

const AppLink: FC<AppLinkProps> = ({ title, feeds }): ReactElement => {
  const itunesId = extractItunesId(feeds.itunes);

  return (
    <div className="p-4">
      <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
        {renderLink('Spotify', feeds.spotify, '/assets/logos/spotify.svg')}
        {renderLink('Apple Podcasts', mkApplePodcastsUrl(title, itunesId), '/assets/logos/apple-podcast.svg')}
        {renderLink('Overcast', mkOvercastUrl(feeds.rss, itunesId), '/assets/logos/overcast.svg')}
        {renderLink('Castro', mkCastroUrl(itunesId), '/assets/logos/castro.svg')}
      </ul>
    </div>
  );
};

export default AppLink;
