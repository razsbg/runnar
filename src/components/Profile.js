import React from 'react';
import PropTypes from 'prop-types';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';

import { formatFirebaseTimestamp } from '../helpers';

import '../scss/components/_profile.scss';

function Profile(props) {
  const jogRoutesRef = props.firestore.collection('jogRoutes');
  const currentUserIsOwnerQuery = jogRoutesRef.where(
    'owner.uid',
    '==',
    props.user.uid
  );
  const [snapshots, loading] = useCollectionDataOnce(
    currentUserIsOwnerQuery,
    jogRoutesRef
  );

  return (
    <div className="profile">
      <div className="user">
        <img src={props.user.photoURL} alt={props.user.displayName} />
        <h2>{props.user.displayName}</h2>
      </div>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="jog-routes">
          <h3>Your jog routes</h3>
          {snapshots.map((jogRoute, index) => (
            <div key={index} className="jog-routes__item">
              <p>Created@{formatFirebaseTimestamp(jogRoute.createdAt)}</p>
              <p>Laps: {jogRoute.laps.length}</p>
              <p>Length: {jogRoute.length}km</p>
            </div>
          ))}
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
