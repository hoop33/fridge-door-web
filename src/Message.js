import React from "react";

function Message({ message }) {

  return (
    <div>
      <div>{message.text}</div>
      <small>{message.id}</small>
    </div>
  );

}

export default Message;
