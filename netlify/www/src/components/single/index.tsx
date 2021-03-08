import React, { FC, ReactElement } from 'react';
import Layout from './layout';
import PodcastHeader from '../../components/podcastHeader';
import PodcastStats from './podcastStats';
import CalendarHeatMap from '../../components/calendarHeatMap';
import AppLink from './appLink';
import PodcastWebLink from './podcastWebLink';
import HomePageLink from './homePageLink';

import { PodcastExtra } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SingleProps {
  podcast: PodcastExtra;
}

const SinglePodcastPage: FC<SingleProps> = ({ podcast }): ReactElement => {
  return (
    <Layout podcast={podcast}>
      <div className=" bg-white rounded-lg shadow divide-y divide-gray-200">
        <PodcastHeader podcast={podcast} link="/" withDescription={true} withHost={true} />
        <PodcastWebLink link={podcast.contacts.link} />
        <PodcastStats episodes={podcast.extra.episodes} />
        <CalendarHeatMap episodes={podcast.extra.episodes} />
        <AppLink title={podcast.title} feeds={podcast.feed} />
        <HomePageLink />
      </div>
    </Layout>
  );
};

export default SinglePodcastPage;
