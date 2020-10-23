import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { formatFirebaseTimestamp } from '../helpers';

function Single(props) {
  const match = useRouteMatch();
  const jogRouteRef = props.firestore
    .collection('jogRoutes')
    .doc(match.params.jogRouteId);
  const [jogRoute, loading] = useDocumentData(jogRouteRef);

  return (
    <div className="single">
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <p>
            <span>Auth {jogRoute.owner.displayName}</span>
            <span>@{formatFirebaseTimestamp(jogRoute.createdAt)}</span>
          </p>
          <p>Length: {jogRoute.length}km</p>
          <p>Laps: {jogRoute.laps.length}</p>
          <p>
            Laps order:
            {jogRoute.laps.map(function renderLap(lapName, index) {
              return <span key={index}>{lapName}</span>;
            })}
          </p>
        </>
      )}
    </div>
  );
}

Single.propTypes = {
  firestore: PropTypes.object.isRequired,
};

export default Single;
