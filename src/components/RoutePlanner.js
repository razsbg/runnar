import React, { useState } from 'react';
import { useDrop } from 'react-dnd';

import RouteLap from './RouteLap';

import { DragItemTypes, laps } from '../constants';
import { formatDistanceInKms } from '../helpers';

import '../scss/components/_route-planner.scss';

function RoutePlanner() {
  const [jogRoute, setJogRoute] = useState([]);

  const [{ isOver: isOverDropZone, canDrop }, drop] = useDrop({
    accept: DragItemTypes.LAP,
    drop: (item) => {
      setJogRoute([...jogRoute, { name: item.name, length: item.length }]);
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

    if (jogRoute.length !== 0) {
      const currentLastLap = [...jogRoute].pop();

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

  function removeLap(index) {
    const newJogRoute = [...jogRoute];
    newJogRoute.splice(index, 1);
    setJogRoute(newJogRoute);
  }

  function getJogRouteLength() {
    const jogRouteLength = jogRoute.reduce((acc, curr) => acc + curr.length, 0);

    return formatDistanceInKms(jogRouteLength);
  }

  return (
    <div className="route-planner" data-testid="route-planner">
      <h2>Route planner</h2>
      <div
        ref={drop}
        className={getDropzoneClassNames()}
        data-testid="drop-zone"
      >
        {jogRoute.map((lap, index) => (
          <RouteLap
            key={index}
            index={index}
            lapName={lap.name}
            length={lap.length}
            removeLap={removeLap}
          />
        ))}
      </div>
      {jogRoute.length >= 1 && (
        <p className="route-planner__length">
          <span className="label">Total length</span>
          {getJogRouteLength()} km
        </p>
      )}
    </div>
  );
}

export default RoutePlanner;
