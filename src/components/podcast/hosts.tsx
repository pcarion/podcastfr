import React, { FC, ReactElement } from 'react';
import { Host as HostDescription } from '../../jtd/podcast';

interface HostProps {
  name: string;
  twitter: string | null;
}

const Host: FC<HostProps> = ({ name, twitter }): ReactElement => {
  return (
    <div className="flex flex-col">
      <p>{name}</p>
      {twitter != '_' && (
        <a href={`https://twitter.com/${twitter}`} className="text-xs">
          @{twitter}
        </a>
      )}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HostsProps {
  hosts: HostDescription[];
  textColor: string;
}

const Hosts: FC<HostsProps> = ({ hosts, textColor }): ReactElement => {
  return (
    <div className={`w-full grid grid-cols-3 gap-2 ${textColor} text-sm font-medium p-3`}>
      {(hosts || []).map((h) => (
        <Host name={h.name} twitter={h.twitter} />
      ))}
    </div>
  );
};

export default Hosts;
