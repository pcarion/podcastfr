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

function mkOvercastUrl(url: string) {
  if (!url || url.length < 5) {
    return null;
  }
  // return `https://overcast.fm/itunes${itunesId}`;
  return `overcast://x-callback-url/add?url=${url}`;
}

function mkApplePodcastsUrl(title: string, itunesId: string) {
  if (!itunesId) {
    return null;
  }
  return `podcasts://podcasts.apple.com/us/podcast/${encodeURI(title)}/id${itunesId}`;
}

function mkLink(url: string) {
  if (!url || url.length < 5) {
    return null;
  }
  return url;
}

function mkCastroUrl(itunesId: string) {
  if (!itunesId) {
    return null;
  }
  return `https://castro.fm/itunes/${itunesId}`;
}

function mkDeezerUrl(url: string) {
  if (!url || url.length < 5) {
    return null;
  }
  const path = new URL(url).pathname;
  if (!path) {
    return null;
  }
  const parts = path.split('/');
  if (!parts || parts.length < 2) {
    return null;
  }
  const lastPart = parts[parts.length - 1];
  return `https://www.deezer.com/open_app?page=show%2F${lastPart}&source=MF_Show`;
}

function renderLink(name: string, url: string, imagePath: string, isOpenWith = true): ReactElement {
  if (!url || url.length < 5) {
    return null;
  }
  return (
    <li>
      <a href={url} className="col-span-1 flex shadow-sm rounded-md border bg-white hover:bg-yellow-200">
        <img src={imagePath} className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-l-md p-2" />
        <div className="flex-1 flex items-center justify-between  border-gray-200 rounded-r-md truncate">
          <div className="flex-1 px-4 py-2 text-sm truncate text-gray-900 font-thin hover:text-gray-600">
            {isOpenWith ? 'Open with' : ''} <span className="font-semibold">{name}</span>
          </div>
        </div>
      </a>
    </li>
  );
}

function renderIosLinks({ title, feeds }): ReactElement {
  const itunesId = extractItunesId(feeds.itunes);

  return (
    <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
      {renderLink('Spotify', mkLink(feeds.spotify), '/assets/logos/spotify.svg')}
      {renderLink('Apple Podcasts', mkApplePodcastsUrl(title, itunesId), '/assets/logos/apple-podcast.svg')}
      {renderLink('Google Podcasts', mkLink(feeds.google), '/assets/logos/google-podcasts.svg')}
      {renderLink('Overcast', mkOvercastUrl(feeds.rss), '/assets/logos/overcast.svg')}
      {renderLink('Castro', mkCastroUrl(itunesId), '/assets/logos/castro.svg')}
      {renderLink('Deezer', mkDeezerUrl(feeds.deezer), '/assets/logos/deezer.svg')}
    </ul>
  );
}

function renderAndroidLinks({ title, feeds }): ReactElement {
  const itunesId = extractItunesId(feeds.itunes);

  return (
    <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
      {renderLink('Spotify', mkLink(feeds.spotify), '/assets/logos/spotify.svg')}
      {renderLink('Google Podcasts', mkLink(feeds.google), '/assets/logos/google-podcasts.svg')}
      {renderLink('Overcast', mkOvercastUrl(feeds.rss), '/assets/logos/overcast.svg')}
      {renderLink('Castro', mkCastroUrl(itunesId), '/assets/logos/castro.svg')}
      {renderLink('Deezer', mkDeezerUrl(feeds.deezer), '/assets/logos/deezer.svg')}
    </ul>
  );
}

function renderDesktopLinks({ title, feeds }): ReactElement {
  const itunesId = extractItunesId(feeds.itunes);

  return (
    <ul className="mt-3 grid grid-cols-1 gap-5 sm:gap-6">
      {renderLink('Spotify', mkLink(feeds.spotify), '/assets/logos/spotify.svg')}
      {renderLink('Apple Podcasts', mkApplePodcastsUrl(title, itunesId), '/assets/logos/apple-podcast.svg')}
      {renderLink('Google Podcasts', mkLink(feeds.google), '/assets/logos/google-podcasts.svg')}
      {renderLink('RSS', mkLink(feeds.rss), '/assets/logos/rss.svg', false)}
    </ul>
  );
}

const Tabs = ({ title, feeds }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 1 ? 'text-white bg-blue-600' : 'text-blue-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                iOS
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 2 ? 'text-white bg-blue-600' : 'text-blue-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Android
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 3 ? 'text-white bg-blue-600' : 'text-blue-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Desktop
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 ">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                  <p className="text-sm font-extralight bg-red-100">
                    Travail en cours... certains liens ne fonctionnent pas
                  </p>
                  {renderIosLinks({ title, feeds })}
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                  <p className="text-sm font-extralight bg-red-100">
                    Travail en cours... certains liens ne fonctionnent pas
                  </p>
                  {renderAndroidLinks({ title, feeds })}
                </div>
                <div className={openTab === 3 ? 'block' : 'hidden'} id="link3">
                  <p className="text-sm font-extralight bg-red-100">
                    Travail en cours... certains liens ne fonctionnent pas
                  </p>
                  {renderDesktopLinks({ title, feeds })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AppLink: FC<AppLinkProps> = ({ title, feeds }): ReactElement => {
  return (
    <div className="p-4">
      <Tabs title={title} feeds={feeds} />
    </div>
  );
};

export default AppLink;
