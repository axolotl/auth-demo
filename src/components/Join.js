import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { 
  Form,
  FormGroup,
  FormFeedback,
  Button,
  Label,
  Input } from 'reactstrap';
import axios from 'axios';


// what's gonna set join apart from login?
// 1. explainer text
// 2. password failure
// 3. username duplicate
// 4. on success -> redirect to success page

class Join extends Component {
  // isInvalid set to true by default. isInvalid: false will yell at user
  // isValid will be used to let user know when their input has reached specification
  // users is used to check for name duplicates
  state = {
    username: {
      value: '',
      isInvalid: false,
      isValid: false,
    },
    password: {
      value: '',
      isInvalid: false,
      isValid: false,
    },
    users: [],
    registerFailure: false,
    usernameError: '',
  }

  // get users in database so we can avoid namespace problems
  componentDidMount() {
    const users = [];
    axios.get(`/api/users`)
      .then(res => {
        res.data.map(user => users.push(user.username));
        this.setState({ users });
      })
      .catch(err => console.log(err))
  }

  // change handlers for username and password are different in this component because they will be used for real time checking
  // which is (obviously) specific to each one
  handleUsernameChange = (e) => {
    let { username, users, usernameError } = this.state;
    const name = e.target.value;

    if (users.indexOf(name) >= 0) {
      username.isInvalid = true;
      usernameError = 'Username is already taken.';
    } else {
      username.isInvalid = false;
    }

    if (name.length > 3 && username.isInvalid === false) {
      username.isValid = true;
    } else {
      username.isValid = false;
    }

    username.value = name;
    this.setState({ username, usernameError });
  }

  handlePasswordChange = (e) => {
    const { password } = this.state;
    const entry = e.target.value;

    password.isInvalid = false;

    if (entry.length > 6) {
      password.isValid = true;
    } else {
      password.isValid = false;
    }

    password.value = entry;
    this.setState({ password });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    let { username, password, usernameError } = this.state;
    
    if (username.isValid && password.isValid) {
      // axios stuff here
      console.log('ready for axios')
    }

    else {
      if (!username.isValid) {
        usernameError = 'Username must be at least 4 characters.';
        username.isInvalid = true;
      }
      if (!password.isValid) {
        password.isInvalid = true;
      }
      this.setState({ password, username, usernameError })
    }
  }

  render() {
    const { username, password, registerFailure, usernameError } = this.state;
    const { handleSubmit, handleUsernameChange, handlePasswordChange } = this;

    return (
      <Form onSubmit={handleSubmit} >

        <h4>Join</h4>
        <p>To join, enter a username and a password and click submit.</p>

        <FormGroup>
          <Label for="exampleUsername">Username</Label>
          <Input 
            invalid={username.isInvalid}
            valid={username.isValid} 
            type="username" 
            name="username" 
            onChange={handleUsernameChange} 
            value={username.value} 
            id="exampleUsername" 
            placeholder="username" 
            autoComplete='off' />
          <FormFeedback>{usernameError}</FormFeedback>
          <FormFeedback valid>Looks good!</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input 
            invalid={password.isInvalid} 
            valid={password.isValid}
            type="password" 
            name="password" 
            onChange={handlePasswordChange} 
            value={password.value} 
            id="examplePassword" 
            placeholder="password" />
          <FormFeedback>Password must be at least 6 characters.</FormFeedback>
          <FormFeedback valid>Looks good!</FormFeedback>
        </FormGroup>

        {registerFailure &&
          <p style={{color: 'red'}}>An error occurred. Please try again.</p>
        }

        <Button>Submit</Button>

      </Form>
    )
  }
}

export default withRouter(Join);