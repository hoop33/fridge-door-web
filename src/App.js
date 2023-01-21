import React from "react";
import { Routes, Route } from "react-router-dom";
import MessageBoard from "./pages/MessageBoard";
import NewMessage from "./pages/NewMessage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MessageBoard />} />
        <Route path="/new" element={<NewMessage />} />
      </Routes>
    </div>
  );
}

export default App;
