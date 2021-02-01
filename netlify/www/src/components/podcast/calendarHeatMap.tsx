import React, { FC, ReactElement } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { EpisodeDate } from '../../types';

import 'react-calendar-heatmap/dist/styles.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CalendarHeatMapProps {
  episodes: EpisodeDate[];
}

function episodeDateValues(episodes: EpisodeDate[]) {
  const r = episodes.map((e) => ({
    date: e.publishingDate,
    count: 1,
  }));
  return r;
}

const CalendarHeatMap: FC<CalendarHeatMapProps> = ({ episodes }): ReactElement => {
  const endDate = new Date();
  const startDate = new Date().setFullYear(endDate.getFullYear() - 1);
  return (
    <div className="min-w-0 w-full flex-1 p-1">
      <h2 className="text-sm font-medium text-gray-900 py-2">
        Total: {episodes.length} épisodes. Publications depuis un an:
      </h2>
      <CalendarHeatmap startDate={startDate} endDate={endDate} values={episodeDateValues(episodes)} />
    </div>
  );
};

export default CalendarHeatMap;
