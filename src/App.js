import React, { useEffect, useState } from "react";
import "./Message";
import "./App.css";
import Message from "./Message";

function App() {
  const defaultMessage = { id: 0, text:"Greetings from your fridge door" };
  const [currentMessage, setCurrentMessage] = useState(defaultMessage);

  useEffect(() => {
    const interval = setInterval(async () => {
      await updateMessage();
    }, 5000);

    return () => clearInterval(interval);
  });

  const updateMessage = async () => {
    const message = await getMessage();
    setCurrentMessage(message? message : defaultMessage);
  }

  const getMessage = async () => {
    const response = await fetch(
      `/messages?count=1&since_id=${currentMessage.id}`,
      {
        mode: "cors",
      }
    );
    const messages = await response.json();
    return messages ? messages[0] : null;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Message message={currentMessage} />
      </header>
    </div>
  );
}

export default App;
