import React, { FC, ReactElement } from 'react';
import { Link } from 'gatsby';

interface PodcastWebLinkProps {
  link: string;
}
const PodcastWebLink: FC<PodcastWebLinkProps> = ({ link }): ReactElement => {
  if (!link || link.length < 5) {
    return null;
  }
  return (
    <a href={link} className="w-full flex flex-row items-center justify-center hover:bg-gray-100">
      <div className="relative -mr-px w-0 flex-col flex-1 inline-flex items-center justify-center py-4 border border-transparent rounded-bl-lg">
        <span className="text-sm text-gray-700 text-center font-thin mx-auto ">Podcast web page - {link}</span>
      </div>
    </a>
  );
};

export default PodcastWebLink;
