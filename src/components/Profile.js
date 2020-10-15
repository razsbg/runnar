import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { useList } from 'react-firebase-hooks/database';

import '../scss/components/_profile.scss';

function Profile(props) {
  const reference = firebase
    .database()
    .ref(`user-jog-routes/${props.user.uid}`);
  const [snapshots, loading] = useList(reference);

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
          {snapshots.map((jogRoute) => (
            <div className="jog-routes__item">
              <p>Key: {jogRoute.key}</p>
              <p>
                Laps:{' '}
                {jogRoute.val().laps.map((lapName) => (
                  <span>{lapName}</span>
                ))}
              </p>
              <p>Length: {jogRoute.val().length}km</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Profile;
