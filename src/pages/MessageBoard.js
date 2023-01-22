import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Message from "../Message";

function MessageBoard() {
  const defaultMessage = { id: 0, text: "Greetings from your fridge door" };
  const maxIndex = 5;
  const [currentMessage, setCurrentMessage] = useState(defaultMessage);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      await updateMessage();
    }, 5000);

    return () => clearInterval(interval);
  });

  const updateMessage = async () => {
    const message = await getMessage();
    setCurrentMessage(message ? message : defaultMessage);
    setCurrentIndex(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  };

  const getMessage = async () => {
    const response = await fetch(
      `/messages?count=1&since_id=${currentMessage.id}`,
      {
        mode: "cors",
      }
    ).catch(() => {
      return null;
    });
    const messages = await response.json().catch(() => {
      return null;
    });
    return messages ? messages[0] : null;
  };

  return (
    <>
      <div className={`Message-Board Message-Board-${currentIndex}`}>
        <Message message={currentMessage} />
      </div>
      <div className={`Message-Board-Footer Message-Board-${currentIndex}`}>
        <Link to="/new">Add a message</Link>
      </div>
    </>
  );

}

export default MessageBoard;
