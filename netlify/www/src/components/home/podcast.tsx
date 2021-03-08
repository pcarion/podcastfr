import React, { FC, ReactElement } from 'react';
import PodcastHeader from '../../components/podcastHeader';

import { PodcastExtra } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PodcastProps {
  podcast: PodcastExtra;
}

const Podcast: FC<PodcastProps> = ({ podcast }): ReactElement => {
  return (
    <div className=" bg-white rounded-lg shadow divide-y divide-gray-200">
      <PodcastHeader podcast={podcast} link={`/podcasts/${podcast.pid}`} withHost={false} withDescription={false} />
    </div>
  );
};

export default Podcast;
