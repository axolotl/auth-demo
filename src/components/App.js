import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './Header';
import Intro from './Intro';
import Join from './Join';
import Login from './Login';
import Dash from './Dash';

// this component imports all the other page components and manages them in react-router
// additionally, it wraps them all in header (which also acts as a wrapper for the content)

const App = () => (
  <Router>
    <Header>
      <Route exact path="/" component={Intro} />
      <Route path="/join" component={Join} />
      <Route path="/login" component={Login} />
      <Route path="/dash" component={Dash} />
    </Header>
  </Router>
);

export default App;