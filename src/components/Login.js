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

class Login extends Component {
  // isValid set to true by default. isValid: false will yell at user
  state = {
    username: {
      value: '',
      isInvalid: false,
    },
    password: {
      value: '',
      isInvalid: false,
    }
  }

  handleChange = (e) => {
    // this method is designed to work for both username and password given nested state
    // here's how it works: 
    // assign valiable "name" to either username or password based on what the event tells us
    // destructure the part of state we want with reassignment to avoid namespace collision
    // set this nested state and trim input value at the same time to avoid spaces
    // reset isInvalid while we're at it
    // set state, again name will reference either username or password

    const name = e.target.name;
    const { [name]: data } = this.state;
    data.value = e.target.value.trim();
    data.isInvalid = false;
    this.setState({ [name]: data });
  }

  handleSubmit = (e) => {
    const { username, password } = this.state;
    e.preventDefault();

    if (username.value.length === 0) {
      username.isInvalid = true;
      this.setState({ username })
    };

    if (password.value.length === 0) {
      password.isInvalid = true;
      this.setState({ password });
    };

    if (!username.isInvalid && !password.isInvalid) {
      axios.post(`/api/login`, { username: username.value, password: password.value })
        .then(res => {
          console.log(res.data)
          this.props.toggleLoggedIn();
          this.props.history.push('/')
        })
        .catch(err => console.log(err))
    }

  }

  render() {
    const { username, password } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <Form onSubmit={handleSubmit} >

        <h4>Login</h4>
        <p>To login, enter username and password and click submit.</p>

        <FormGroup>
          <Label for="exampleUsername">Username</Label>
          <Input 
            invalid={username.isInvalid} 
            type="username" 
            name="username" 
            onChange={handleChange} 
            value={username.value} 
            id="exampleUsername" 
            placeholder="username" 
            autoComplete='off' />
          <FormFeedback>Please enter username to login</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input 
            invalid={password.isInvalid} 
            type="password" 
            name="password" 
            onChange={handleChange} 
            value={password.value} 
            id="examplePassword" 
            placeholder="password" />
          <FormFeedback>Please enter password to login</FormFeedback>
        </FormGroup>

        <Button>Submit</Button>

      </Form>
    )
  }
}

export default withRouter(Login);