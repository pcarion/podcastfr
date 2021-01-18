import React, { FC, ReactElement } from 'react';
import useSiteMetadata from '../hooks/useSiteMetadata';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HeaderProps {
  // nothing for now
}

const Header: FC<HeaderProps> = ({}): ReactElement => {
  const { title, addText, addLink } = useSiteMetadata();

  return (
    <div className="md:flex md:items-center md:justify-between md:space-x-5 my-4">
      <div className="flex items-start space-x-5">
        <div className="flex-shrink-0">
          <div className="relative">
            <img className="h-16 w-16 rounded-full" src="/assets/images/FR.png" alt="" />
            <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true"></span>
          </div>
        </div>
        {/* Use vertical padding to simulate center alignment when both lines of text are one line,
          but preserve the same layout if the text wraps without making the image jump around. */}
        <div className="pt-1.5">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="w-full rounded-md shadow  text-sm font-medium text-gray-900 bg-blue-100 text-center mt-2">
            <a href={addLink} className="p-1 m-auto">
              {addText}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
