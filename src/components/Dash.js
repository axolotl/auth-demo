import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button } from 'reactstrap';

// temp messages to get things up and running
import messages from './content/messages';

class Dash extends Component {
  state = {
    input: '',
    messages: messages,
  }

  handleChange = (e) => {
    this.setState({input: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.addMessage(this.state.input);
    this.setState({input: ''});
  }

  addMessage = (message) => {
    this.setState({messages: [message, ...this.state.messages]})
  }

  render() {
    const { input, messages } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <h4>Messages</h4>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="exampleText">To add a new message, write it in the box and click submit.</Label>
            <Input onChange={handleChange} value={input} type="textarea" name="text" id="exampleText" />
          </FormGroup>
          <Button>Submit</Button>
        </Form>

        
        <p />

        {messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}

      </div>
    )
  }
}

export default Dash;