import React, { FC, ReactElement } from 'react';
import Layout from './layout';
import PodcastHeader from '../../components/podcastHeader';
import CalendarHeatMap from '../../components/calendarHeatMap';
import AppLink from './appLink';
import PodcastWebLink from './podcastWebLink';

import { PodcastExtra } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SingleProps {
  podcast: PodcastExtra;
}

const SinglePodcastPage: FC<SingleProps> = ({ podcast }): ReactElement => {
  return (
    <Layout podcast={podcast}>
      <div className=" bg-white rounded-lg shadow divide-y divide-gray-200">
        <PodcastHeader podcast={podcast} link="/" />
        <PodcastWebLink link={podcast.contacts.link} />
        <CalendarHeatMap episodes={podcast.extra.episodes} />
        <AppLink title={podcast.title} feeds={podcast.feed} />
      </div>
    </Layout>
  );
};

export default SinglePodcastPage;
