import PropTypes from 'prop-types';

export const lapType = PropTypes.shape({
  name: PropTypes.string,
  sides: PropTypes.arrayOf(PropTypes.number),
  getLapLength: PropTypes.func,
}).isRequired;
