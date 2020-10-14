import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import '../scss/components/_profile.scss';

function Profile(props) {
  const [biggerPhotoUrl, setBiggerPhotoUrl] = useState();

  useEffect(() => {
    if (props.user.photoUrl !== null) {
      setBiggerPhotoUrl(props.user.photoUrl.replace('=s96', '=s256'));
    }
  }, [props.user.photoUrl]);

  return (
    <div className="profile">
      <div className="user">
        {biggerPhotoUrl && (
          <img src={biggerPhotoUrl} alt={props.user.displayName} />
        )}
        <h2>{props.user.displayName}</h2>
      </div>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoUrl: PropTypes.string,
  }).isRequired,
};

export default Profile;
