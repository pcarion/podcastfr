import React, { FC, ReactElement } from 'react';
// import { Podcast as PodcastDescription, Feed as FeedDescription } from '../../jtd/podcast';
import * as fontColorContrast from 'font-color-contrast';
import tinycolor from 'tinycolor2';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import { PodcastExtra } from '../../types';
import Hosts from './hosts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PodcastHeaderProps {
  podcast: PodcastExtra;
  link: string;
  withHost: boolean;
  withDescription: boolean;
  withBottomRounded: boolean;
}

const PodcastHeader: FC<PodcastHeaderProps> = ({ podcast, link, withHost, withDescription }): ReactElement => {
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
    <Link to={link}>
      <div
        className="rounded-lg rounded-b-none w-full flex items-center justify-between p-2 space-x-3"
        style={{ backgroundColor: headerColor }}
      >
        {podcast.extra.imageFluid ? (
          <Img className="w-32 h-32 bg-gray-300 flex-shrink-0" fluid={podcast.extra.imageFluid} />
        ) : (
          <img className="w-32 h-32 bg-gray-300 flex-shrink-0" src={podcast.imageUrl} alt="" />
        )}
        <div className="flex-1 flex-col">
          <div className="flex items-center space-x-3">
            <h3 className={`${h3TextColor} text-2xl font-light py-3`}>{podcast.title}</h3>
          </div>
          {withHost && (
            <div className="flex mr-1" style={{ backgroundColor: bgHostColor }}>
              <Hosts hosts={podcast.hosts} textColor={h4TextColor} bgColor={headerColor} />
            </div>
          )}
        </div>
      </div>
      {withDescription && (
        <div className="w-full  bg-white p-6 hover:bg-gray-100">
          <p className="mt-1 text-gray-500 text-sm">
            {podcast.description.split('\n').map((t) => (
              <p>{t}</p>
            ))}
          </p>
        </div>
      )}
    </Link>
  );
};

export default PodcastHeader;
