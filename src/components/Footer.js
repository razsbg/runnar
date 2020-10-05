import React from 'react';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <p data-testid="footer-copyright">
        Made with
        <span role="img" aria-labelledby="heart">
          💖
        </span>
        by <strong>Răzvan Sbîngu</strong>
      </p>
    </footer>
  );
}

export default Footer;
