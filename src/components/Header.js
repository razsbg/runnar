import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header" data-testid="header">
      <div className="logo" data-testid="logo">
        <h1>
          <Link to="/">runnar</Link>
        </h1>
      </div>
      <nav className="nav" role="navigation">
        <ul>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
          <li>
            <Link to="/create">Plan a route</Link>
          </li>
          <li>
            <Link to="/profile">My profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
