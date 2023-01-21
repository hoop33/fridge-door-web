import React from "react";

function Message({ message }) {

  return (
    <div>
      <div>{message.text}</div>
    </div>
  );

}

export default Message;
