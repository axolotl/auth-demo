import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button } from 'reactstrap';

class Dash extends Component {
  render() {
    return (
      <div>
        <h4>Messages</h4>
        <Form>
          <FormGroup>
            <Label for="exampleText">To add a new message, write it in the box and click submit.</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup>
        </Form>

        <Button>Submit</Button>
        <p />

        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores 
        </p>

        <p>
          et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est         </p>

        <p>
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi 
        </p>   

        <p>
          optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. 
        </p>

        <p>
          Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae 
        </p>

      </div>
    )
  }
}

export default Dash;