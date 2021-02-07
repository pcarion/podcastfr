import React, { FC, ReactElement } from 'react';
import Layout from './layout';
import Podcast from './podcast';
import Header from './header';
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
    <Layout>
      <Header noPodcasts={podcasts.length} noEpisodes={numberOfEpisodes(podcasts)} />
      <ul className="grid gap-6 grid-cols-1">
        {podcasts.map((data) => {
          return (
            <li>
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
