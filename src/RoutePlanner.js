import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

import { DragItemTypes, laps } from './constants';

import './scss/components/_route-planner.scss';

function RoutePlanner(props) {
  const [route, setRoute] = useState([]);

  const [{ isOver }, drop] = useDrop({
    accept: DragItemTypes.LAP,
    drop: (item) => {
      setRoute([...route, item.name]);
    },
    canDrop: (item) => {
      if (isLapEligible(item)) {
        return true;
      }

      return false;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  function isLapEligible(lap) {
    const currentLastLap = [...route].pop() || '';
    let isEligible = true;

    switch (lap.name) {
      case 'small':
      case 'medium':
      case 'large':
        if (currentLastLap.name === laps.xxlarge.name) {
          isEligible = false;
        }

        break;
      case 'xlarge':
        if (currentLastLap.name === laps.medium.name) {
          isEligible = false;
        }

        break;
      case 'xxlarge':
        if (
          currentLastLap.name === laps.small.name ||
          currentLastLap.name === laps.medium.name ||
          currentLastLap.name === laps.large.name
        ) {
          isEligible = false;
        }

        break;
      default:
        break;
    }

    return isEligible;
  }

  return (
    <div className="route-planner">
      <h2>RoutePlanner</h2>
      <div
        ref={drop}
        className={`drop-zone ${isOver ? 'drop-zone--highlight' : ''}`}
      >
        {route.map((lapName) => (
          <div className="route-lap">
            <h3>{lapName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoutePlanner;
