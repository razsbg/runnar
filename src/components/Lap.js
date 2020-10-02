import React from 'react';
import { useDrag } from 'react-dnd';

import { DragItemTypes } from '../constants';
import { lapType } from '../propTypes';

import '../scss/components/_lap.scss';

function Lap(props) {
  const { lap } = props;

  const [{ isDragging }, drag] = useDrag({
    item: { type: DragItemTypes.LAP, name: lap.name, sides: lap.sides },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`lap ${isDragging ? 'lap--dragging' : ''}`}>
      <h3>{lap.name}</h3>
      <p>Total length: {props.lap.getLapLength()} m</p>
    </div>
  );
}

Lap.propTypes = {
  lap: lapType,
};

export default Lap;
