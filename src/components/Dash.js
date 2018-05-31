import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button } from 'reactstrap';
import uuid from 'uuid';

// temp messages to get things up and running
import messages from './content/messages';

// import other components
import Message from './Message';

class Dash extends Component {
  state = {
    input: '',
    messages: messages,
  }

  handleChange = (e) => {
    this.setState({input: e.target.value});
  }

  handleSubmit = (e) => {
    const { input } = this.state;
    e.preventDefault();
    if (input.trim().length > 0) {
      this.addMessage(input);
      this.setState({input: ''});
    }
  }

  addMessage = (message) => {
    this.setState({messages: [{id: uuid(), message: message}, ...this.state.messages]})
  }

  deleteMessage = (id) => {
    const messages = [];
    this.state.messages.map((message) => {if (message.id !== id) {messages.push(message)}});
    this.setState({messages});
  }

  render() {
    const { input, messages } = this.state;
    const { handleSubmit, handleChange, deleteMessage } = this;

    return (
      <div>
        <h4>Messages</h4>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="exampleText">To add a new message, write it in the box and click submit.</Label>
            <Input style={{marginBottom: '10px'}} onChange={handleChange} value={input} type="textarea" name="text" id="exampleText" />
            <Button>Submit</Button>
          </FormGroup>

        </Form>

        {messages.map((message) => <Message key={message.id} id={message.id} message={message.message} deleteMessage={deleteMessage} /> )}

      </div>
    )
  }
}

export default Dash;