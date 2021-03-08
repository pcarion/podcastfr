import React, { FC, ReactElement } from 'react';
import Layout from './layout';
import Podcast from './podcast';
import Footer from './footer';

import { PodcastExtra } from '../../types';

function numberOfEpisodes(podcasts: PodcastExtra[]): number {
  return podcasts.reduce<number>((acc, p) => acc + p.extra.episodes.length, 0);
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomePageProps {
  podcasts: PodcastExtra[];
}

const HomePage: FC<HomePageProps> = ({ podcasts }): ReactElement => {
  return (
    <Layout noPodcasts={podcasts.length} noEpisodes={numberOfEpisodes(podcasts)}>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {podcasts.map((data) => {
          return (
            <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
              <Podcast key={`${data.yamlDescriptionFile}`} podcast={data} />
            </li>
          );
        })}
      </ul>
      <Footer />
    </Layout>
  );
};

export default HomePage;
