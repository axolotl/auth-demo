import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

import Header from './Header';
import Intro from './Intro';
import Join from './Join';
import Login from './Login';
import Dash from './Dash';

// this component imports all the other page components and manages them in react-router
// additionally, it wraps them all in header (which also acts as a wrapper for the content)

// const homeHandler = ({ isLoggedIn }) => (
//   {isLoggedIn == false
//     ? <Intro />
//     : <Dash />
//   }
// )

class App extends Component {
  state = {
    loading: true,
    loggedIn: false,
  }

  componentDidMount() {
    axios.get(`/api/isLoggedIn`)
      .then(() => this.setState({ loading: false, loggedIn: true }))
      .catch(() => this.setState({ loading: false, loggedIn: false }))
  }

  toggleLoggedIn = () => {
    this.setState({ loggedIn: !this.state.loggedIn })
  }

  render() {
    const { loading, loggedIn } = this.state;
    const { toggleLoggedIn } = this;

    return (
      <Router>
        <Header>

          {loading &&
            <p>loading</p>
          }

          {loggedIn 
            ? <Route exact path="/" component={Dash} />
            : <Route exact path="/" component={Intro} />
          }

          <Route path="/join" component={Join} />

          <Route path="/login" render={(props) => (
            <Login {...props} toggleLoggedIn={toggleLoggedIn} />
          )}/>


          <Route path="/dash" component={Dash} />

        </Header>
      </Router>


    )
  }
};

export default App;