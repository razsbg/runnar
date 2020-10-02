import React from 'react';
import PropTypes from 'prop-types';

import './scss/components/_route-lap.scss';

function Lap(props) {
  return (
    <div className="route-lap" onClick={() => props.removeLap(props.index)}>
      <h3>{props.lapName}</h3>
    </div>
  );
}

Lap.propTypes = {
  lapName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  removeLap: PropTypes.func.isRequired,
};

export default Lap;
