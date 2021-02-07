import React, { FC, ReactElement } from 'react';
import useSiteMetadata from '../../hooks/useSiteMetadata';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps {
  noPodcasts: number;
  noEpisodes: number;
}

const Header: FC<HeaderProps> = ({ noPodcasts, noEpisodes }): ReactElement => {
  const { title, description, addText, addLink } = useSiteMetadata();

  return (
    <div className="md:flex md:items-center md:justify-between md:space-x-5 my-4">
      <div className="bg-gray-50 pt-12 sm:pt-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-5 mx-auto text-center">
            <div className="flex-shrink-0">
              <div className="relative">
                <img className="h-16 w-16 rounded-full" src="/assets/images/FR.png" alt="" />
                <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h2>
            </div>
          </div>
          <p className="mt-3 text-xl break-words text-center text-gray-500 sm:mt-4">{description}</p>
        </div>
        <div className="mt-10 pb-12 bg-white sm:pb-16">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
            <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto">
                <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                  <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Podcasts</dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">{noPodcasts}</dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Épisodes</dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">{noEpisodes}</dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <a href={addLink} className="rounded-md shadow text-lg font-medium text-indigo-600  text-center">
                      {addText}
                    </a>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
