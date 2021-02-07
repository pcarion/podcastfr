import React, { ReactElement } from 'react';

import HomePage from '../components/home';
import usePodcasts from '../hooks/usePodcasts';

export default (): ReactElement => {
  const podcasts = usePodcasts();
  return <HomePage podcasts={podcasts} />;
};
