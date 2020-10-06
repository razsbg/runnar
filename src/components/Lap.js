import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

import { DragItemTypes } from '../constants';

import '../scss/components/_lap.scss';
import { formatDistanceInKms } from '../helpers';

function Lap(props) {
  const { lap } = props;

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: DragItemTypes.LAP,
      name: lap.name,
      length: lap.getLapLength(),
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`lap ${isDragging ? 'lap--dragging' : ''}`}>
      <h3>{lap.name}</h3>
      <p>Total length: {formatDistanceInKms(props.lap.getLapLength())}km</p>
    </div>
  );
}

Lap.propTypes = {
  lap: PropTypes.shape({
    name: PropTypes.string,
    sides: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};

export default Lap;
