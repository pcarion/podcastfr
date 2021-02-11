import React, { FC, ReactElement } from 'react';
import { Link } from 'gatsby';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomePageLinkProps {
  // nothing for now
}
const HomePageLink: FC<HomePageLinkProps> = (): ReactElement => {
  return (
    <Link to="/" className="w-full flex flex-row items-center justify-center bg-blue-100 hover:bg-blue-200">
      <div className="relative -mr-px w-0 flex-col flex-1 inline-flex items-center justify-center py-4 border border-transparent rounded-bl-lg">
        <span className="text-sm text-gray-700 text-center font-thin mx-auto ">Retour à la liste des podcasts</span>
      </div>
    </Link>
  );
};

export default HomePageLink;
