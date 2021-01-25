import React, { FC, ReactElement } from 'react';
// import { Podcast as PodcastDescription, Feed as FeedDescription } from '../../jtd/podcast';
import * as fontColorContrast from 'font-color-contrast';
import tinycolor from 'tinycolor2';

import { PodcastExtra } from '../../types';
import Palette from './palette';
import FeedLogo from './feedLogo';
import Hosts from './hosts';
import CalendarHeatMap from './calendarHeatMap';

const renderPalette = false;
const renderCalendarHeatMap = true;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PodcastProps {
  podcast: PodcastExtra;
}

const Podcast: FC<PodcastProps> = ({ podcast }): ReactElement => {
  const headerColor = podcast.extra.colors.darkMuted; // lightVibrant;
  const tinyHeaderColr = tinycolor(headerColor);
  const bgHostColor = tinyHeaderColr.lighten(5).toHexString();
  const contrastedColor = fontColorContrast(headerColor);
  let h3TextColor;
  let h4TextColor;
  if (contrastedColor === '#ffffff') {
    // white constrasted color
    h3TextColor = 'text-white';
    h4TextColor = 'text-white';
  } else {
    // black constrasted color
    h3TextColor = 'text-grey-900';
    h4TextColor = 'text-grey-800';
  }
  return (
    <div id={podcast.pid} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 m-2">
      <div className="w-full flex items-center justify-between p-2 space-x-3" style={{ backgroundColor: headerColor }}>
        <img className="w-32 h-32 bg-gray-300 flex-shrink-0" src={podcast.imageUrl} alt="" />
        <div className="flex-1 flex-col">
          <div className="flex items-center space-x-3">
            <h3 className={`${h3TextColor} text-2xl font-light py-3`}>{podcast.title}</h3>
          </div>
          <div className="flex mr-1" style={{ backgroundColor: bgHostColor }}>
            <Hosts hosts={podcast.hosts} textColor={h4TextColor} />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <p className="mt-1 text-gray-500 text-sm">
          {podcast.description.split('\n').map((t) => (
            <p>{t}</p>
          ))}
        </p>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <FeedLogo feed={podcast.feed} webUrl={podcast.contacts.link} />
        </div>
      </div>
      {renderPalette && <Palette colors={podcast.extra.colors} />}
      {renderCalendarHeatMap && <CalendarHeatMap episodes={podcast.extra.episodes} />}
      <a
        className="min-w-0 w-full flex flex-row p-1 justify-between"
        href={`https://github.com/pcarion/podcastfr/blob/main/podcasts/${podcast.yamlDescriptionFile}`}
      >
        <div className="flex flex-row flex-auto text-sm font-medium text-gray-300 py-2">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          <div className="flex-auto overflow-ellipsis">{podcast.yamlDescriptionFile}</div>
        </div>
        <h4 className="flex-auto text-sm font-medium text-gray-300 py-2 text-right">{podcast.pid}</h4>
      </a>
    </div>
  );
};

export default Podcast;
