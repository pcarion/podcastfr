import React, { FC, ReactElement } from 'react';

import useSiteMetadata from '../../hooks/useSiteMetadata';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps {
  noPodcasts: number;
  noEpisodes: number;
}

const Header: FC<HeaderProps> = ({ noPodcasts, noEpisodes }): ReactElement => {
  const { title, description, addLink, buildTime } = useSiteMetadata();

  return (
    <div className="w-full my-4">
      <div className="bg-gray-50 pt-5">
        <div className="mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">{title}</h2>
        </div>
        <div className="mt-10 pb-3 bg-white">
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
                  <a
                    href={addLink}
                    className=" border-gray-100 align-middle text-center p-4 sm:border-0 sm:border-l font-light text-indigo-600 underline"
                  >
                    {description}
                  </a>
                </dl>
              </div>
              <p className="text-gray-500 pt-2 text-right font-light text-sm">{buildTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
