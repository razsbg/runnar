import React from 'react';

import Lap from './Lap';

import { laps } from '../constants';

function Laps() {
  return (
    <div className="drag-sources" data-testid="laps">
      <h2>Laps</h2>
      {Object.keys(laps).map((key) => (
        <Lap key={laps[key].name} lap={laps[key]} />
      ))}
    </div>
  );
}

export default Laps;
