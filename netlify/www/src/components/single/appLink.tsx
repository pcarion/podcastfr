import React, { FC, ReactElement } from 'react';
import { Feed } from '../../jtd/podcast';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppLinkProps {
  feeds: Feed;
}

function mkOvercastUrl(url: string) {
  if (url.length < 5) {
    return null;
  }
  return `podcast://${url}`;
}

function mkApplePodcastsUrl(url: string) {
  if (url.length < 5) {
    return null;
  }
  return `overcast://x-callback-url/add?url=${url}`;
}

function renderLink(name: string, url: string, imagePath: string): ReactElement {
  if (url.length < 5) {
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

const AppLink: FC<AppLinkProps> = ({ feeds }): ReactElement => {
  return (
    <div className="p-4">
      <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
        {renderLink('Spotify', feeds.spotify, '/assets/logos/spotify.svg')}
        {renderLink('Apple Podcasts', mkApplePodcastsUrl(feeds.rss), '/assets/logos/apple-podcast.svg')}
        {renderLink('Overcast', mkOvercastUrl(feeds.rss), '/assets/logos/overcast.svg')}
      </ul>
    </div>
  );
};

export default AppLink;
