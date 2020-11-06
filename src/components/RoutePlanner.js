import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import firebase from 'firebase/app';

import RouteLap from './RouteLap';

import { DragItemTypes, laps } from '../constants';
import { formatDistanceInKms } from '../helpers';

import '../scss/components/_route-planner.scss';

function RoutePlanner(props) {
  const [jogRoute, setJogRoute] = useState([]);
  const newJogRouteRef = props.firestore.collection('jogRoutes').doc();
  const currentJoggerRef = props.firestore
    .collection('joggers')
    .doc(props.user.uid);

  const location = useLocation();
  const isEditExistingRoute = !!location.state;

  useEffect(() => {
    if (location.state) {
      let currentJogRoute = [];

      for (let lapName of location.state.jogRoute.laps) {
        currentJogRoute.push({
          name: lapName,
          length: laps[lapName].getLapLength(),
        });
      }

      setJogRoute(currentJogRoute);
    }
  }, [location.state]);

  const [{ isOver: isOverDropZone, canDrop }, drop] = useDrop({
    accept: DragItemTypes.LAP,
    drop: (item) => {
      setJogRoute([...jogRoute, { name: item.name, length: item.length }]);
    },
    canDrop: function canDrop(item) {
      return isLapEligible(item);
    },
    collect: function collect(monitor) {
      return {
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      };
    },
  });

  function isLapEligible(lap) {
    var isEligible = true;

    if (jogRoute.length !== 0) {
      const currentLastLap = [...jogRoute].pop();

      switch (lap.name) {
        case 's':
        case 'm':
        case 'l':
          if (currentLastLap.name === laps.xxl.name) {
            isEligible = false;
          }

          break;
        case 'xl':
          if (currentLastLap.name === laps.m.name) {
            isEligible = false;
          }

          break;
        case 'xxl':
          if (
            currentLastLap.name === laps.s.name ||
            currentLastLap.name === laps.m.name ||
            currentLastLap.name === laps.l.name
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

  function clearJogRoute() {
    setJogRoute([]);
  }

  function saveJogRoute() {
    var batch = props.firestore.batch();
    var laps = jogRoute.map(function keepOnlyName(lap) {
      return lap.name;
    });
    var jogRouteLength = getJogRouteLength();

    var newJogRoute = {
      owner: {
        displayName: props.user.displayName,
        uid: props.user.uid,
      },
      laps,
      length: jogRouteLength,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    batch.set(newJogRouteRef, newJogRoute);
    batch.update(currentJoggerRef, {
      jogRoutes: firebase.firestore.FieldValue.increment(1),
    });

    batch
      .commit()
      .then(function success() {
        console.log('Batch writes successfully commited ✨!');
      })
      .catch(function error(err) {
        console.error('Batch write failed 🚧! Reason:', err);
      });

    clearJogRoute();
  }

  function updateJogRoute() {
    var jogRouteRef = props.firestore
      .collection('jogRoutes')
      .doc(location.state.jogRoute.id);

    var laps = jogRoute.map(function keepOnlyName(lap) {
      return lap.name;
    });
    var jogRouteLength = getJogRouteLength();

    jogRouteRef.update({
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      laps,
      length: jogRouteLength,
    });
  }

  function renderActions() {
    if (jogRoute.length > 1) {
      return (
        <div className="route-planner__actions">
          <button
            className="button button--large"
            onClick={isEditExistingRoute ? updateJogRoute : saveJogRoute}
          >
            {isEditExistingRoute ? 'Update' : 'Save'} jog route
          </button>
          <button className="button button--large" onClick={clearJogRoute}>
            Clear
          </button>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="route-planner" data-testid="route-planner">
      <h2>Route Planner - {isEditExistingRoute ? 'edit' : 'create'}</h2>
      {renderActions()}
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

RoutePlanner.propTypes = {
  firestore: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default RoutePlanner;
