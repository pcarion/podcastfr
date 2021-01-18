import React, { FC, ReactElement } from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from '../hooks/useSiteMetadata';
import Header from './header';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LayoutProps {
  // nothing for now
}

const Layout: FC<LayoutProps> = ({ children }): ReactElement => {
  const { title, description } = useSiteMetadata();

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <body className="bg-blue-200 font-sans">
        <div className="container mx-auto flex flex-col p-2 justify-center items-center max-w-full md:max-w-prose">
          <Header />
          {children}
        </div>
      </body>
    </>
  );
};

export default Layout;
