import React, { ReactElement } from 'react';

import Layout from '../components/layout';
import Podcast from '../components/podcast';
import usePodcasts from '../hooks/usePodcasts';
import { PodcastExtra } from '../types';
// reference:
// https://stackoverflow.com/a/2450976/1985560

function numberOfEpisodes(podcasts: PodcastExtra[]): number {
  return podcasts.reduce<number>((acc, p) => acc + p.extra.episodes.length, 0);
}

export default (): ReactElement => {
  const podcasts = usePodcasts();
  return (
    <Layout noPodcasts={podcasts.length} noEpisodes={numberOfEpisodes(podcasts)}>
      <ul className="grid gap-6 grid-cols-1">
        {podcasts.map((data) => {
          return (
            <li>
              <Podcast key={`${data.yamlDescriptionFile}`} podcast={data} />
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};
