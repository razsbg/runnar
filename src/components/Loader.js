import React from 'react';

import { ReactComponent as InfinitySvg } from '../assets/infinity.svg';

import '../scss/components/_loader.scss';

function Loader() {
  return (
    <div className="loader">
      <InfinitySvg className="loader-icon" />
    </div>
  );
}

export default Loader;
