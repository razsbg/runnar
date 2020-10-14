import React from 'react';
import PropTypes from 'prop-types';

import '../scss/components/_profile.scss';

function Profile(props) {
  return (
    <div className="profile">
      <div className="user">
        <img src={props.user.photoURL} alt={props.user.displayName} />
        <h2>{props.user.displayName}</h2>
      </div>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Profile;
