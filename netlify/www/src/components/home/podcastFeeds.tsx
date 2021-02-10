import React, { FC, ReactElement } from 'react';
import { Link } from 'gatsby';

interface FeedLogoProps {
  link: string;
}
const PodcastFeeds: FC<FeedLogoProps> = ({ link }): ReactElement => {
  return (
    <Link to={link} className="w-full flex flex-row items-center justify-center hover:bg-gray-100">
      <div className="relative -mr-px w-0 flex-col flex-1 inline-flex items-center justify-center py-4 border border-transparent rounded-bl-lg">
        <img src="/assets/logos/mobile.svg" className="w-8 h-8 mx-auto p-2" />
        <span className="text-sm text-gray-700 text-center font-thin mx-auto ">Ecouter sur Mobile</span>
      </div>
      <div className="relative -mr-px w-0 flex-col flex-1 inline-flex items-center justify-center py-4 border border-transparent rounded-bl-lg">
        <img src="/assets/logos/desktop.svg" className="w-8 h-8 mx-auto p-2" />
        <span className="text-sm text-gray-700 font-thin mx-auto ">Ecouter sur Desktop</span>
      </div>
    </Link>
  );
};

export default PodcastFeeds;
