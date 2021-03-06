import React, { FC, ReactElement } from 'react';
import Helmet from 'react-helmet';
import Header from './header';

import useSiteMetadata from '../../hooks/useSiteMetadata';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LayoutProps {
  noPodcasts: number;
  noEpisodes: number;
}

// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image
// https://cards-dev.twitter.com/validator

const Layout: FC<LayoutProps> = ({ noPodcasts, noEpisodes, children }): ReactElement => {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pcarion" />
        <meta name="twitter:creator" content="@pcarion" />
        <meta name="twitter:title" content="Liste de podcasts tech en français" />
        <meta name="twitter:description" content="Découvrez de nouveaux podcasts ou ajoutez vos podcasts favoris." />
        <meta name="twitter:image" content="https://www.podcastfr.com/assets/twitter-card.jpg" />
      </Helmet>
      <body className="bg-circuit-board-pattern bg-blue-100 font-sans bg-fixed overflow-x-hidden">
        <div className="container w-full mx-auto flex flex-col justify-center items-center">
          <Header noPodcasts={noPodcasts} noEpisodes={noEpisodes} />
          {children}
        </div>
      </body>
    </>
  );
};

export default Layout;
