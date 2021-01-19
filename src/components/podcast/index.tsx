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
  console.log(`@@@ headerColor=${headerColor}, contrastedColor=${contrastedColor}, bgHostColor=${bgHostColor}`);
  return (
    <div className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 m-2">
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
          <FeedLogo feed={podcast.feed} />
        </div>
      </div>
      {renderPalette && <Palette colors={podcast.extra.colors} />}
      {renderCalendarHeatMap && <CalendarHeatMap episodes={podcast.extra.episodes} />}
    </div>
  );
};

export default Podcast;
