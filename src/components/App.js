import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Intro from "./Intro";
import Join from "./Join";
import Login from "./Login";
import Dash from "./Dash";
import Welcome from "./Welcome";

// this component imports all the other page components and manages them in react-router
// additionally, it wraps them all in header (which also acts as a wrapper for the content)

class App extends Component {
  state = {
    loading: true,
    loggedIn: false,
    user: ""
  };

  componentDidMount() {
    // make api call to databse to see if user is logged in. if yes, return username
    axios
      .get(`/api/isLoggedIn`)
      .then(res => {
        this.setState({
          loading: false,
          loggedIn: true,
          user: res.data.username
        });
      })
      .catch(() => this.setState({ loading: false, loggedIn: false }));
  }

  setLoggedIn = username => {
    this.setState({ loggedIn: true, user: username });
  };

  setLoggedOut = () => {
    this.setState({ loggedIn: false, user: "" });
  };

  render() {
    const { loading, loggedIn, user } = this.state;
    const { toggleLoggedIn, setLoggedIn, setLoggedOut } = this;

    return (
      <Router>
        <Header loggedIn={loggedIn} user={user} setLoggedOut={setLoggedOut}>
          {loading && <p>loading</p>}

          {!loading && loggedIn && <Route exact path="/" component={Dash} />}

          {!loading && !loggedIn && <Route exact path="/" component={Intro} />}

          <Route
            path="/join"
            render={props => <Join {...props} setLoggedIn={setLoggedIn} />}
          />

          <Route
            path="/login"
            render={props => <Login {...props} setLoggedIn={setLoggedIn} />}
          />

          <Route path="/welcome" component={Welcome} />
        </Header>
      </Router>
    );
  }
}

export default App;
