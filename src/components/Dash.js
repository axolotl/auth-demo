import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button } from 'reactstrap';
import uuid from 'uuid';
import axios from 'axios';

// import other components
import Message from './Message';

class Dash extends Component {
  state = {
    input: '',
    messages: [],
  }

  componentDidMount() {
    axios.get(`/api/messages`)
      .then(res => {
        const messages = [];
        res.data.map(message => messages.push({id: message.id, message: message.message}));
        // sort by most recent added
        messages.sort((a,b) => b.id-a.id);
        this.setState({messages});
      })
      .catch(err => console.log(err))
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
    axios.post(`/api/messages`, {
      message
    }).then(res => console.log(res))
      .catch(err => console.log(err));
    this.setState({messages: [{id: uuid(), message: message}, ...this.state.messages]})
  }

  deleteMessage = (id) => {
    axios.delete(`/api/messages/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
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

        {messages && messages.map((message) => <Message key={message.id} id={message.id} message={message.message} deleteMessage={deleteMessage} /> )}

      </div>
    )
  }
}

export default Dash;