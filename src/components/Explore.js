import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import Loader from './Loader';

import { formatFirebaseTimestamp, sortByTimestampDesc } from '../helpers';

import '../scss/components/_explore.scss';

function Explore(props) {
  const jogRoutesRef = props.firestore.collection('jogRoutes');
  const [jogRoutes, loading] = useCollectionData(jogRoutesRef, {
    idField: 'id',
  });

  function renderJogRoute(jogRoute, index) {
    return (
      <Link to={`/jog-route/${jogRoute.id}`} key={index} className="jog-route">
        <h4>Length: {jogRoute.length}km</h4>
        <p>Laps: {jogRoute.laps.length}</p>
        <p className="jog-route__author">
          Author: {jogRoute.owner.displayName}
          <span>@{formatFirebaseTimestamp(jogRoute.createdAt)}</span>
        </p>
      </Link>
    );
  }

  return (
    <div className="explore">
      <h3>Explore jogging routes</h3>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          {jogRoutes.sort(sortByTimestampDesc('createdAt')).map(renderJogRoute)}
        </div>
      )}
    </div>
  );
}

Explore.propTypes = {
  firestore: PropTypes.object.isRequired,
};

export default Explore;
