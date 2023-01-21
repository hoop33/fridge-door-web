import React, { useEffect, useState } from "react";
import "./Message";
import "./App.css";
import Message from "./Message";

function App() {
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
    <div className="App">
      <header className={`App-billboard App-${currentIndex}`}>
        <Message message={currentMessage} />
      </header>
    </div>
  );
}

export default App;
