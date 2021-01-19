import React, { FC, ReactElement } from 'react';
import { LogoColors } from '../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PaletteProps {
  colors: LogoColors;
}

interface LogoColorProps {
  name: string;
  color: string;
}
const LogoColor: FC<LogoColorProps> = ({ name, color }): ReactElement => {
  return (
    <div className="space-y-1.5">
      <div
        className="h-10 w-full rounded ring-1 ring-inset ring-black ring-opacity-0"
        style={{ backgroundColor: `${color}` }}
      ></div>
      <div className="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block">
        <div className="w-6 font-medium text-gray-900">{name}</div>
      </div>
    </div>
  );
};

const Palette: FC<PaletteProps> = ({ colors }): ReactElement => {
  return (
    <div className="min-w-0 flex-1 grid grid-cols-3 gap-x-4 gap-y-3 2xl:gap-x-2 p-1">
      <LogoColor name="muted" color={colors.muted} />
      <LogoColor name="lightMuted" color={colors.lightMuted} />
      <LogoColor name="darkMuted" color={colors.darkMuted} />
      <LogoColor name="vibrant" color={colors.vibrant} />
      <LogoColor name="lightVibrant" color={colors.lightVibrant} />
      <LogoColor name="darkVibrant" color={colors.darkVibrant} />
    </div>
  );
};

export default Palette;
