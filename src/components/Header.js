import * as React from 'react';
import { Link } from 'react-router-dom';

import Nav from './Nav';

function Header() {
  return (
    <header className="header" data-testid="header">
      <div className="logo" data-testid="logo">
        <h1>
          <Link to="/">runnar</Link>
        </h1>
      </div>
      <Nav />
    </header>
  );
}

export default Header;
