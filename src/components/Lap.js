import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

import { DragItemTypes } from '../constants';
import { formatDistanceInKms } from '../helpers';

import '../scss/components/_lap.scss';

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
    <div
      ref={drag}
      className={`lap${isDragging ? ' lap--dragging' : ''}`}
      data-testid={`lap-${lap.name}`}
    >
      <h3>{lap.name}</h3>
      <p>
        <span className="label">Total length</span>
        {formatDistanceInKms(props.lap.getLapLength())}km
      </p>
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
