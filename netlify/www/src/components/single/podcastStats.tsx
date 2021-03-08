import React, { FC, ReactElement } from 'react';
import { EpisodeDate } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PodcastStatsProps {
  episodes: EpisodeDate[];
}

const PodcastStats: FC<PodcastStatsProps> = ({ episodes }): ReactElement => {
  return (
    <div className="min-w-0 w-full flex-1 p-1">
      <h2 className="text-sm font-medium text-gray-900 py-2">
        Total: {episodes.length} épisodes. Publications depuis un an:
      </h2>
    </div>
  );
};

export default PodcastStats;
