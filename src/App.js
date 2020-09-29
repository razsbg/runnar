import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <Main>
        <h2>
          Hello there
          <span role="img" aria-labelledby="Sparkles">
            ✨
          </span>
        </h2>
        <p>
          Lorem Ipsum best not make any more threats to your website. It will be
          met with fire and fury like the world has never seen. All of the words
          in Lorem Ipsum have flirted with me - consciously or unconsciously.
          That's to be expected. You have so many different things placeholder
          text has to be able to do, and I don't believe Lorem Ipsum has the
          stamina. Lorem Ipsum is the single greatest threat. We are not - we
          are not keeping up with other websites. You have so many different
          things placeholder text has to be able to do, and I don't believe
          Lorem Ipsum has the stamina.
        </p>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
