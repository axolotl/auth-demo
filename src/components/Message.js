import React from "react";
import { Button } from "reactstrap";

const divStyle = {
  margin: "10px 0 10px 0"
};

const pStyle = {
  margin: "0px",
  marginTop: "10px"
};

const Message = ({ id, message, deleteMessage }) => (
  <div style={divStyle}>
    <p style={pStyle}>{message}</p>
    <Button outline size="sm" color="primary" onClick={() => deleteMessage(id)}>
      Delete Message
    </Button>
  </div>
);

export default Message;
