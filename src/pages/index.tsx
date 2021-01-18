import React, { ReactElement } from 'react';

import Layout from '../components/layout';
import Podcast from '../components/podcast';
import JSONPodcasts from '../../content/podcasts.json';

export default (): ReactElement => (
  <Layout>
    <ul className="grid gap-6 grid-cols-1">
      {JSONPodcasts.map((data) => {
        return (
          <li>
            <Podcast key={`${data.yamlDescriptionFile}`} podcast={data} />
          </li>
        );
      })}
    </ul>
  </Layout>
);
