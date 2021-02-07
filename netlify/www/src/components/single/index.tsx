import React, { FC, ReactElement } from 'react';
import Layout from './layout';
import Podcast from '../../components/podcastHeader';

import { PodcastExtra } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SingleProps {
  podcast: PodcastExtra;
}

const SinglePodcastPage: FC<SingleProps> = ({ podcast }): ReactElement => {
  return (
    <Layout podcast={podcast}>
      <Podcast podcast={podcast} />
    </Layout>
  );
};

export default SinglePodcastPage;
