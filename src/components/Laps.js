import React from 'react';

import Lap from './Lap';

import { laps } from '../constants';

function Laps() {
  return (
    <div className="drag-sources" data-testid="laps">
      <h2>Laps</h2>
      {Object.keys(laps).map((lap) => (
        <Lap key={laps[lap].name} lap={laps[lap]} />
      ))}
    </div>
  );
}

export default Laps;
