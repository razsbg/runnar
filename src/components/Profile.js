import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

import Loader from './Loader';

import { formatFirebaseTimestamp, sortByTimestampDesc } from '../helpers';

import '../scss/components/_profile.scss';

function Profile(props) {
  const jogRoutesRef = props.firestore.collection('jogRoutes');
  const currentUserIsOwnerQuery = jogRoutesRef.where(
    'owner.uid',
    '==',
    props.user.uid
  );
  const [jogRoutes, loading] = useCollectionDataOnce(currentUserIsOwnerQuery, {
    idField: 'id',
  });

  function renderJogRoute(jogRoute, index) {
    return (
      <div
        key={index}
        className="jog-route"
        style={{ animationDelay: index !== 0 ? `${index * 0.1}s` : null }}
      >
        {jogRoute?.updatedAt && (
          <p>Updated@{formatFirebaseTimestamp(jogRoute.updatedAt)}</p>
        )}
        <p>Created@{formatFirebaseTimestamp(jogRoute.createdAt)}</p>
        <p>Laps: {jogRoute.laps.length}</p>
        <p>Length: {jogRoute.length}km</p>
        <div className="jog-route__actions">
          <Link
            to={{
              pathname: '/create',
              state: {
                jogRoute,
              },
            }}
            className="edit"
          >
            Edit
          </Link>
          <Link to={`/jog-route/${jogRoute.id}`} className="details">
            Details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="user">
        <img src={props.user.photoURL} alt={props.user.displayName} />
        <h2>{props.user.displayName}</h2>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          {jogRoutes.length === 0 ? (
            <h3>You don't have any jog routes. Go and create some 🏃‍♂️!</h3>
          ) : (
            <>
              <h3>Your jog routes</h3>
              {jogRoutes
                .sort(sortByTimestampDesc('updatedAt'))
                .map(renderJogRoute)}
            </>
          )}
        </div>
      )}
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  firestore: PropTypes.object.isRequired,
};

export default Profile;
