import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

import { DragItemTypes, laps } from './constants';

import './scss/components/_route-planner.scss';

function RoutePlanner() {
  const [route, setRoute] = useState([]);

  const [{ isOver: isOverDropZone, canDrop }, drop] = useDrop({
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
      canDrop: !!monitor.canDrop(),
    }),
  });

  function isLapEligible(lap) {
    var isEligible = true;

    if (route.length !== 0) {
      const currentLastLap = [...route].pop();

      switch (lap.name) {
        case 'small':
        case 'medium':
        case 'large':
          if (currentLastLap === laps.xxlarge.name) {
            isEligible = false;
          }

          break;
        case 'xlarge':
          if (currentLastLap === laps.medium.name) {
            isEligible = false;
          }

          break;
        case 'xxlarge':
          if (
            currentLastLap === laps.small.name ||
            currentLastLap === laps.medium.name ||
            currentLastLap === laps.large.name
          ) {
            isEligible = false;
          }

          break;
        default:
          break;
      }
    }

    return isEligible;
  }

  function getDropzoneClassNames() {
    var classNames = ['drop-zone'];

    if (isOverDropZone && canDrop) {
      classNames.push('drop-zone--eligible');
    }

    if (isOverDropZone && !canDrop) {
      classNames.push('drop-zone--ineligible');
    }

    if (!isOverDropZone && canDrop) {
      classNames.push('drop-zone--highlight');
    }

    return classNames.join(' ');
  }

  return (
    <div className="route-planner">
      <h2>RoutePlanner</h2>
      <div ref={drop} className={getDropzoneClassNames()}>
        {route.map((lapName, index) => (
          <div key={index} className="route-lap">
            <h3>{lapName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoutePlanner;
