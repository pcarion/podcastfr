import React, { FC, ReactElement } from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import { PodcastExtra } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LayoutProps {
  podcast: PodcastExtra;
}

// https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image
// https://cards-dev.twitter.com/validator

const Layout: FC<LayoutProps> = ({ podcast, children }): ReactElement => {
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
      <body className="bg-circuit-board-pattern bg-blue-100 font-sans h-screen overflow-x-hidden md:bg-fixed ">
        <div
          id={podcast.pid}
          className="container w-full mx-auto flex flex-col p-2 justify-center items-center md:max-w-prose"
        >
          {children}
        </div>
      </body>
    </>
  );
};

export default Layout;
