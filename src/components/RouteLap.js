import React from 'react';
import PropTypes from 'prop-types';

import '../scss/components/_route-lap.scss';

function RouteLap(props) {
  return (
    <div
      className={`route-lap route-lap--${props.lapName}`}
      onClick={() => props.removeLap(props.index)}
    >
      <h4>{props.lapName}</h4>
      <span className="order">{props.index + 1}</span>
    </div>
  );
}

RouteLap.propTypes = {
  index: PropTypes.number.isRequired,
  lapName: PropTypes.string.isRequired,
  removeLap: PropTypes.func.isRequired,
};

export default RouteLap;
