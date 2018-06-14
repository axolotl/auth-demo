import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Form,
  FormGroup,
  FormFeedback,
  Button,
  Label,
  Input
} from "reactstrap";
import axios from "axios";

class Join extends Component {
  // isInvalid set to false by default. isInvalid: true will yell at user
  // isValid will be used to let user know when their input has reached specification
  // users is used to check for name duplicates
  state = {
    username: {
      value: "",
      isInvalid: false,
      isValid: false
    },
    password: {
      value: "",
      isInvalid: false,
      isValid: false
    },
    users: [],
    registerFailure: false,
    usernameError: ""
  };

  // get users in database so we can avoid namespace problems
  // because this is a demo project and not for production and will be using a slow free database
  // i have elected for this method even though I know it wouldn't be appropriate in production
  componentDidMount() {
    const users = [];
    axios
      .get(`/api/users`)
      .then(res => {
        res.data.map(user => users.push(user.username));
        this.setState({ users });
      })
      .catch(err => console.log(err));
  }

  handleUsernameChange = e => {
    const name = e.target.value;
    const taken = this.state.users.indexOf(name) >= 0;

    const username = {
      value: name,
      isInvalid: taken,
      isValid: name.length > 3 && !taken
    };

    const usernameError = taken ? "Username is already taken." : "";

    this.setState({ username, usernameError, registerFailure: false });
  };

  handlePasswordChange = e => {
    const entry = e.target.value;

    const password = {
      value: entry,
      isInvalid: false,
      isValid: entry.length > 6
    };

    this.setState({ password, registerFailure: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    let { username, password, usernameError } = this.state;

    if (username.isValid && password.isValid) {
      axios
        .post(`/api/register`, {
          username: username.value,
          password: password.value
        })
        .then(res => {
          this.props.setLoggedIn(res.data.username);
          this.props.history.push("/welcome");
        })
        .catch(err => {
          this.setState({ registerFailure: true });
        });
    } else {
      if (!username.isValid && !username.isInvalid) {
        usernameError = "Username must be at least 4 characters.";
        username.isInvalid = true;
      }
      if (!password.isValid) {
        password.isInvalid = true;
      }
      this.setState({ password, username, usernameError });
    }
  };

  render() {
    const { username, password, registerFailure, usernameError } = this.state;
    const { handleSubmit, handleUsernameChange, handlePasswordChange } = this;

    return (
      <Form onSubmit={handleSubmit}>
        <h4>Join</h4>
        <p>To join, enter a username and a password and click submit.</p>

        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            invalid={username.isInvalid}
            valid={username.isValid}
            type="username"
            name="username"
            onChange={handleUsernameChange}
            value={username.value}
            id="username"
            placeholder="username"
            autoComplete="off"
          />
          <FormFeedback>{usernameError}</FormFeedback>
          <FormFeedback valid>Looks good!</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            invalid={password.isInvalid}
            valid={password.isValid}
            type="password"
            name="password"
            onChange={handlePasswordChange}
            value={password.value}
            id="password"
            placeholder="password"
          />
          <FormFeedback>Password must be at least 6 characters.</FormFeedback>
          <FormFeedback valid>Looks good!</FormFeedback>
        </FormGroup>

        {registerFailure && (
          <p style={{ color: "red" }}>An error occurred. Please try again.</p>
        )}

        <Button>Submit</Button>
      </Form>
    );
  }
}

export default withRouter(Join);
