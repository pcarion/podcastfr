import React, { ReactElement } from 'react';

import Layout from '../components/layout';
import Podcast from '../components/podcast';
import usePodcasts from '../hooks/usePodcasts';
// reference:
// https://stackoverflow.com/a/2450976/1985560

export default (): ReactElement => {
  const podcasts = usePodcasts();
  return (
    <Layout>
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
