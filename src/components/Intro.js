import React from 'react';

const Intro = () => (
  <div>
    <h4>Welcome to auth-demo</h4>
    <p>auth-demo is a single-page React app serving account creation, login, and the ability to save messages to the server.</p>
    <p>The front-end is created with create-react-app and bootstrap (via reactstrap). The backend is created with postgres, express, and passport.</p>
    <p>To get started, click <a href="/join">join</a>. If you already have an accound, proceed to <a href="/login">login</a>.</p>
  </div>
)

export default Intro;