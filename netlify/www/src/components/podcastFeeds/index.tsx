import React, { FC, ReactElement } from 'react';

import { Feed as FeedDescription } from '../../jtd/podcast';

interface PodcastFeeds {
  name: string;
  mkLogo: () => ReactElement;
}

const feedProviders: PodcastFeeds[] = [
  {
    name: 'web',
    mkLogo: () => (
      <>
        <svg
          className="w-5 h-5 text-gray-400"
          version="1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          enable-background="new 0 0 48 48"
        >
          <g fill="#1976D2">
            <path d="M38,13h-3c-5.5,0-10,4.5-10,10s4.5,10,10,10h3c5.5,0,10-4.5,10-10S43.5,13,38,13z M38,29h-3 c-3.3,0-6-2.7-6-6s2.7-6,6-6h3c3.3,0,6,2.7,6,6S41.3,29,38,29z" />
            <path d="M13,13h-3C4.5,13,0,17.5,0,23s4.5,10,10,10h3c5.5,0,10-4.5,10-10S18.5,13,13,13z M13,29h-3 c-3.3,0-6-2.7-6-6s2.7-6,6-6h3c3.3,0,6,2.7,6,6S16.3,29,13,29z" />
          </g>
          <path fill="#42A5F5" d="M33,21H15c-1.1,0-2,0.9-2,2s0.9,2,2,2h18c1.1,0,2-0.9,2-2S34.1,21,33,21z" />
        </svg>

        <span>Web</span>
      </>
    ),
  },
  {
    name: 'rss',
    mkLogo: () => (
      <>
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-28.364 -29.444 42.324 42.822"
          aria-hidden="true"
        >
          <path
            fill="#F60"
            d="M-17.392 7.875c0 3.025-2.46 5.485-5.486 5.485s-5.486-2.46-5.486-5.485c0-3.026 2.46-5.486 5.486-5.486s5.486 2.461 5.486 5.486zm31.351 5.486C14.042.744 8.208-11.757-1.567-19.736c-7.447-6.217-17.089-9.741-26.797-9.708v9.792C-16.877-19.785-5.556-13.535.344-3.66a32.782 32.782 0 0 1 4.788 17.004h8.827v.017zm-14.96 0C-.952 5.249-4.808-2.73-11.108-7.817c-4.821-3.956-11.021-6.184-17.255-6.15v8.245c6.782-.083 13.432 3.807 16.673 9.774a19.296 19.296 0 0 1 2.411 9.326h8.278v-.017z"
          />
        </svg>
        <span>RSS</span>
      </>
    ),
  },
  {
    name: 'itunes',
    mkLogo: () => (
      <>
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 602 602"
          aria-hidden="true"
        >
          <g transform="translate(0 -450.362)">
            <linearGradient
              id="a"
              gradientUnits="userSpaceOnUse"
              x1="342.206"
              y1="289.775"
              x2="342.79"
              y2="880.123"
              gradientTransform="matrix(1 0 0 -1 -41.5 1338.724)"
            >
              <stop offset="0" stop-color="#bb5bfd" />
              <stop offset="1" stop-color="#eb82d6" />
            </linearGradient>
            <path
              fill="url(#a)"
              d="M138.684 451.362h324.631c76.277 0 137.685 61.407 137.685 137.684v324.631c0 76.277-61.407 137.685-137.685 137.685H138.684C62.407 1051.362 1 989.955 1 913.678V589.046c0-76.277 61.407-137.684 137.684-137.684z"
            />
            <path
              fill="#FFF"
              d="M300.462 487.623c-142.359 0-257.758 115.399-257.758 257.758 0 142.36 115.399 257.759 257.758 257.759 142.36 0 257.759-115.398 257.759-257.759 0-142.359-115.399-257.758-257.759-257.758zm0 28.449c126.63 0 229.311 102.681 229.311 229.31 0 126.63-102.681 229.311-229.311 229.311-126.629 0-229.095-102.681-229.095-229.311 0-126.629 102.466-229.31 229.095-229.31z"
            />
            <path
              fill="#FFF"
              d="M407.873 573.447l-178.746 48.334h-.207v72.706h.207v130c-7.82-4.706-17.407-7.5-27.707-7.5-26.533 0-47.913 18.427-47.913 41.04 0 22.62 21.386 40.834 47.913 40.834s49.073-18.233 48.127-40.833l-.487-11.6-1.18-157.154 141.247-38.127v143.54c-8.247-5.686-18.774-9.166-30.207-9.166-26.533 0-47.92 18.427-47.92 41.04 0 22.62 21.387 40.833 47.92 40.833s48.833-18.213 48.833-40.833c0-.213.007-.413 0-.627l.127-179.793V573.447h-.007z"
            />
          </g>
        </svg>
        <span>iTunes</span>
      </>
    ),
  },
  {
    name: 'spotify',
    mkLogo: () => (
      <>
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2931 2931"
          aria-hidden="true"
        >
          <path
            fill="#2ebd59"
            d="M1465.5 0C656.1 0 0 656.1 0 1465.5S656.1 2931 1465.5 2931 2931 2274.9 2931 1465.5C2931 656.2 2274.9.1 1465.5 0zm672.1 2113.6c-26.3 43.2-82.6 56.7-125.6 30.4-344.1-210.3-777.3-257.8-1287.4-141.3-49.2 11.3-98.2-19.5-109.4-68.7-11.3-49.2 19.4-98.2 68.7-109.4C1242.1 1697.1 1721 1752 2107.3 1988c43 26.5 56.7 82.6 30.3 125.6zm179.3-398.9c-33.1 53.8-103.5 70.6-157.2 37.6-393.8-242.1-994.4-312.2-1460.3-170.8-60.4 18.3-124.2-15.8-142.6-76.1-18.2-60.4 15.9-124.1 76.2-142.5 532.2-161.5 1193.9-83.3 1646.2 194.7 53.8 33.1 70.8 103.4 37.7 157.1zm15.4-415.6c-472.4-280.5-1251.6-306.3-1702.6-169.5-72.4 22-149-18.9-170.9-91.3-21.9-72.4 18.9-149 91.4-171 517.7-157.1 1378.2-126.8 1922 196 65.1 38.7 86.5 122.8 47.9 187.8-38.5 65.2-122.8 86.7-187.8 48z"
          />
        </svg>
        <span>Spotify</span>
      </>
    ),
  },
  {
    name: 'google',
    mkLogo: () => (
      <>
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          aria-hidden="true"
        >
          <g fill="none">
            <path
              d="M64 238.545v34.91c0 17.673-14.327 32-32 32s-32-14.327-32-32v-34.91c0-17.673 14.327-32 32-32s32 14.327 32 32z"
              fill="#0066d9"
            />
            <path
              d="M448.013 239.455a32.6 32.6 0 0 1-.013-.91c0-17.673 14.327-32 32-32s32 14.327 32 32c0 .304-.004.608-.013.91H512v34.909h-.013c-.48 17.252-14.618 31.09-31.987 31.09s-31.506-13.838-31.987-31.09H448v-34.91h.013z"
              fill="#4285f4"
            />
            <path
              d="M174.545 343.273v34.909c0 17.673-14.326 32-32 32s-32-14.327-32-32v-34.91c0-17.672 14.327-32 32-32s32 14.328 32 32zM174.545 133.818V248h-.008c-.386 17.337-14.562 31.273-31.992 31.273S110.94 265.337 110.554 248h-.009V133.818c0-17.673 14.327-32 32-32s32 14.327 32 32z"
              fill="#ea4335"
            />
            <path
              d="M337.455 168.727c0 17.673 14.326 32 32 32s32-14.327 32-32v-34.909c0-17.673-14.327-32-32-32s-32 14.327-32 32z"
              fill="#34a853"
            />
            <path
              d="M224 66.91c0 17.672 14.327 32 32 32s32-14.328 32-32V32c0-17.673-14.327-32-32-32s-32 14.327-32 32zM224 445.09c0-17.672 14.327-32 32-32s32 14.328 32 32V480c0 17.673-14.327 32-32 32s-32-14.327-32-32z"
              fill="#fab908"
            />
            <path
              d="M337.455 264.727c0-17.673 14.326-32 32-32s32 14.327 32 32v113.455c0 17.673-14.327 32-32 32s-32-14.327-32-32z"
              fill="#34a853"
            />
            <path
              d="M288 162.91v186.18c0 17.674-14.327 32-32 32s-32-14.326-32-32V162.91c0-17.674 14.327-32 32-32s32 14.326 32 32z"
              fill="#fab908"
            />
          </g>
        </svg>
        <span>Google</span>
      </>
    ),
  },
  {
    name: 'deezer',
    mkLogo: () => (
      <>
        <svg
          className="w-5 h-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 46.9 24.5"
          aria-hidden="true"
        >
          <path
            id="path59"
            fill="#b1e3fa"
            d="M38.3 13.9v-1h8.6v2h-8.6v-1zm0-3.2v-1h8.6v2h-8.6v-1zm0-3.2v-1h8.6v2h-8.6v-1zm0-3.3v-1h8.6v2.1h-8.6V4.2zm0-3.1V0h8.6v2.2h-8.6V1.1z"
          />
          <path
            id="path57"
            fill="#f7bacf"
            d="M19.1 13.9v-1h8.6v2h-8.6v-1zm0-3.2v-1h8.6v2h-8.6v-1zm0-3.2v-1h8.6v2h-8.6v-1zm0-3.3v-1h8.6v2.1h-8.6V4.2z"
          />
          <path id="path55" fill="#e7ee9f" d="M28.7 13.9v-1h8.6v2h-8.6v-1zm0-3.2v-1h8.6v2h-8.6v-1z" />
          <path id="path53" fill="#feea3a" d="M9.6 23.5v-1H18v2H9.6v-1zm0-3.3v-1H18v2H9.6v-1zm0-3.2v-1H18v2H9.6v-1z" />
          <path id="path51" fill="#fe9d7f" d="M0 13.9v-1h8.4v2H0v-1zm0-3.2v-1h8.4v2H0v-1z" />
          <path
            id="path49"
            fill="#4ec2f6"
            d="M38.4 23.5v-1h8.4v2h-8.4v-1zm0-3.3v-1h8.4v2h-8.4v-1zm0-3.2v-1h8.4v2h-8.4v-1z"
          />
          <path
            id="path47"
            fill="#ccdb38"
            d="M28.8 23.5v-1h8.4v2h-8.4v-1zm0-3.3v-1h8.4v2h-8.4v-1zm0-3.2v-1h8.4v2h-8.4v-1z"
          />
          <path
            id="path45"
            fill="#fe3f80"
            d="M19.2 23.5v-1h8.4v2h-8.4v-1zm0-3.3v-1h8.4v2h-8.4v-1zm0-3.2v-1h8.4v2h-8.4v-1z"
          />
          <path id="path43" fill="#fe3d02" d="M0 23.5v-1h8.4v2H0v-1zm0-3.3v-1h8.4v2H0v-1zM0 17v-1h8.4v2H0v-1z" />
        </svg>
        <span>Deezer</span>
      </>
    ),
  },
];

function renderFeed(url: string, feed: PodcastFeeds): ReactElement | null {
  if (!url || url === '_') {
    return null;
  }
  return (
    <div className="w-0 flex-1 flex">
      <a
        href={url}
        className="relative -mr-px w-0 flex-col flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
      >
        {feed.mkLogo()}
      </a>
    </div>
  );
}

interface FeedLogoProps {
  feed: FeedDescription;
  webUrl: string;
}
const PodcastFeeds: FC<FeedLogoProps> = ({ feed, webUrl }): ReactElement => {
  const allFeeds: Record<string, string> = {
    ...feed,
  };
  // we add the web url
  allFeeds['web'] = webUrl;
  return <>{feedProviders.map((provider) => renderFeed(allFeeds[provider.name], provider))}</>;
};

export default PodcastFeeds;
