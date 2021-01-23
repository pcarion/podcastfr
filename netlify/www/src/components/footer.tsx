import React, { FC, ReactElement } from 'react';
import useSiteMetadata from '../hooks/useSiteMetadata';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FooterProps {
  // nothing for now
}

const Footer: FC<FooterProps> = ({}): ReactElement => {
  const { buildTime, commitRef } = useSiteMetadata();

  return (
    <div className="md:flex md:items-center md:justify-between md:space-x-5 my-4">
      <div className="flex items-start space-x-5">
        <div className="pt-1.5">
          <h3 className="text-sm font-thin text-gray-900">
            Version: {commitRef} at {buildTime}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;
