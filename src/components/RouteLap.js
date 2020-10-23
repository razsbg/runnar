import React from 'react';
import PropTypes from 'prop-types';

import '../scss/components/_route-lap.scss';

function RouteLap(props) {
  return (
    <div
      className={`route-lap ${props.className ?? ''}`}
      onClick={() => props.removeLap(props.index)}
    >
      <h4>
        <span>{props.lapName}</span>
        <span className="order">{props.index + 1}</span>
      </h4>
    </div>
  );
}

RouteLap.propTypes = {
  index: PropTypes.number.isRequired,
  lapName: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  removeLap: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default RouteLap;
