import React from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import { DragItemTypes } from './constants';

import './scss/components/_lap.scss';

function Lap(props) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: DragItemTypes.LAP, name: props.name, sides: props.sides },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`lap ${isDragging ? 'lap--dragging' : ''}`}>
      <h3>{props.name}</h3>
      <p>
        <span className="lap-label">Sides</span>
        {props.sides.map((side, index) => (
          <span key={index} className="lap__side">
            {side}
          </span>
        ))}
      </p>
    </div>
  );
}

Lap.propTypes = {
  name: PropTypes.string.isRequired,
  sides: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Lap;
