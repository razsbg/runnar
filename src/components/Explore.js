import React from 'react';
import firebase from 'firebase/app';
import { useList } from 'react-firebase-hooks/database';

import '../scss/components/_explore.scss';

function Explore() {
  const reference = firebase.database().ref('/jog-routes');
  const [snapshots, loading] = useList(reference);

  return (
    <div className="explore">
      <h3>This is the explore routes page</h3>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        snapshots.map((jogRoute) => (
          <div key={jogRoute.key} className="jog-route">
            {console.log(jogRoute.val())}
            <p>Owner: {jogRoute.val().owners}</p>
            <p>
              Laps:{' '}
              {jogRoute.val().laps.map((lapName) => (
                <span>{lapName}</span>
              ))}
            </p>
            <p>Length: {jogRoute.val().length}km</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Explore;
