import React, { Component } from 'react';
import { 
  Form,
  FormGroup,
  Button,
  Label,
  Input } from 'reactstrap';

class Login extends Component {
  render() {
    return (
      <Form>
        <h4>Login</h4>
        <p>To login, enter username and password and click submit.</p>
        <FormGroup>
          <Label for="exampleUsername">Username</Label>
          <Input type="username" name="username" id="exampleUsername" placeholder="username" autocomplete='off' />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
  )
  }
}

export default Login;