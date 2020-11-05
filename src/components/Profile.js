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
      <Link
        to={`/jog-route/${jogRoute.id}`}
        key={index}
        className="jog-routes__item"
        style={{ animationDelay: index !== 0 ? `${index * 0.1}s` : null }}
      >
        <p>Created@{formatFirebaseTimestamp(jogRoute.createdAt)}</p>
        <p>Laps: {jogRoute.laps.length}</p>
        <p>Length: {jogRoute.length}km</p>
      </Link>
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
        <div className="jog-routes">
          {jogRoutes.length === 0 ? (
            <h3>You don't have any jog routes. Go and create some 🏃‍♂️!</h3>
          ) : (
            <>
              <h3>Your jog routes</h3>
              {jogRoutes
                .sort(sortByTimestampDesc('createdAt'))
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
