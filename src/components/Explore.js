import React from 'react';
import PropTypes from 'prop-types';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { formatFirebaseTimestamp } from '../helpers';

import '../scss/components/_explore.scss';

function Explore(props) {
  const jogRoutesRef = props.firestore.collection('jogRoutes');
  const [snapshots, loading] = useCollectionData(jogRoutesRef);

  return (
    <div className="explore">
      <h3>Explore jogging routes</h3>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <div className="explore__routes">
          {snapshots.map((jogRoute, index) => (
            <div key={index} className="jog-route">
              <p>
                <span>Created by: {jogRoute.owner.displayName}</span>
              </p>
              <p>@{formatFirebaseTimestamp(jogRoute.createdAt)}</p>
              <p className="jog-route__laps">Laps: {jogRoute.laps.length}</p>
              <p>Length: {jogRoute.length}km</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Explore.propTypes = {
  firestore: PropTypes.object.isRequired,
};

export default Explore;
