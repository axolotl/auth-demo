import React, { Component } from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

const Welcome = ({ history }) => (
  <div>
    <h4>Welcome!</h4>
    <p>Thank you for signing up. Press continue to proceed to the dashboard.</p>
    <Button onClick={() => history.push("/")}>Continue</Button>
  </div>
);

export default withRouter(Welcome);
