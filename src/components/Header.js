import React from 'react';

function Header() {
  return (
    <header className="header" data-testid="header">
      <div className="logo" data-testid="logo">
        <h1>runnar</h1>
      </div>
      <nav className="nav" data-testid="main-nav">
        <ul>
          <li>Explore</li>
          <li>Create</li>
          <li>My jog routes</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
