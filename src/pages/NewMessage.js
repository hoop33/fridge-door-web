import {useState} from "react";

function NewMessage() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/messages", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: message,
      }),
    }).catch((err) => console.log(err));

    if (response.ok) {
      setMessage("");
    }
  };

  return (
    <div className="New-Message">
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows="4" cols="60"/>
        </label>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default NewMessage;
