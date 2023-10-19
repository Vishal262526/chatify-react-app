import { useEffect } from "react";
import { COLLECTION_ID, DATABASE_ID, database } from "../appwrite/config";
import { useState } from "react";
import { ID, Query } from "appwrite";

const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  // const [error, setError] = useState("");

  useEffect(() => {
    getMessage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      body: messageBody,
    };

    try {
      const res = await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        payload
      );

      setMessages((message) => [res, ...message]);

      setMessageBody("");
    } catch (e) {
      console.log(e);
    }
  };

  const getMessage = async () => {
    const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
      Query.limit(5),
    ]);

    const { documents } = res;
    setMessages(documents);
  };

  // const deleteMessage = async (id) => {
  //   const res = database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  // };

  return (
    <main className="container">
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message--form">
          <div>
            <textarea
              required
              maxLength={100}
              placeholder="Say Something..."
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            <input type="submit" className="btn btn--secondary" value="Send" />
          </div>
        </form>

        <div>
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <small className="message-timestamp">
                  {message.$createdAt}
                </small>
              </div>
              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
