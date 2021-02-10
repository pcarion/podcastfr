import React, { FC, ReactElement } from 'react';
import PodcastHeader from '../../components/podcastHeader';
import PodcastFeeds from './podcastFeeds';
import CalendarHeatMap from '../../components/calendarHeatMap';
import LinkToGithub from '../../components/linkToGithub';

import { PodcastExtra } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PodcastProps {
  podcast: PodcastExtra;
}

const Podcast: FC<PodcastProps> = ({ podcast }): ReactElement => {
  return (
    <div className=" bg-white rounded-lg shadow divide-y divide-gray-200">
      <PodcastHeader podcast={podcast} link={`/podcasts/${podcast.pid}`} />
      <div className="-mt-px flex divide-x divide-gray-200">
        <PodcastFeeds link={`/podcasts/${podcast.pid}`} />
      </div>
      <CalendarHeatMap episodes={podcast.extra.episodes} />
      <LinkToGithub podcast={podcast} />
    </div>
  );
};

export default Podcast;
