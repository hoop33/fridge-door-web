import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const defaultMessage = "Greetings from your fridge door";
  const [sinceID, setSinceID] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(defaultMessage);

  useEffect(() => {
    const interval = setInterval(async () => {
      await updateMessage();
    }, 5000);

    return () => clearInterval(interval);
  });

  const updateMessage = async () => {
    const message = await getMessage();
    setSinceID(message? message.id : 0);
    setCurrentMessage(message? message.text: defaultMessage);
  }

  const getMessage = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/messages?count=1&since_id=${sinceID}`,
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
        <p>
          {currentMessage}
        </p>
      </header>
    </div>
  );
}

export default App;
