import React, { FC, ReactElement } from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from '../hooks/useSiteMetadata';
import Header from './header';
import Footer from './footer';

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
      <body className="bg-blue-200 font-sans">
        <div className="container mx-auto flex flex-col p-2 justify-center items-center max-w-prose">
          <Header noPodcasts={noPodcasts} noEpisodes={noEpisodes} />
          {children}
          <Footer />
        </div>
      </body>
    </>
  );
};

export default Layout;
