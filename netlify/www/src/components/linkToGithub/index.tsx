import React, { FC, ReactElement } from 'react';
import { PodcastExtra } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LinkToGithubProps {
  podcast: PodcastExtra;
}

const LinkToGithub: FC<LinkToGithubProps> = ({ podcast }): ReactElement => {
  return (
    <div>
      <a
        className="min-w-0 w-full flex flex-row p-1 justify-between"
        href={`https://github.com/pcarion/podcastfr/blob/main/podcasts/${podcast.yamlDescriptionFile}`}
      >
        <div className="flex flex-row flex-auto text-sm font-medium text-gray-300 py-2">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          <div className="flex-auto overflow-ellipsis">{podcast.yamlDescriptionFile}</div>
        </div>
        <h4 className="flex-auto text-sm font-medium text-gray-300 py-2 text-right">{podcast.pid}</h4>
      </a>
    </div>
  );
};

export default LinkToGithub;
