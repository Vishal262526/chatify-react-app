import { useEffect } from "react";
import client, { COLLECTION_ID, DATABASE_ID, database } from "../appwrite/config";
import { useState } from "react";
import { ID, Query } from "appwrite";
import { Trash } from "react-feather";


const Room = () => {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  // const [error, setError] = useState("");

  useEffect(() => {
    getMessage();


    const unSubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`, (res ) => {
      if(res.events[1] === "databases.*.collections.*.documents.*.delete"){
        setMessages(message => message.filter(curMessage => curMessage.$id !== res.payload.$id));

        console.log("Message Delete");
      }
      if(res.events[1] === "databases.*.collections.*.documents.*.create"){
        setMessages(message => [res.payload, ...message]);

      }
    })


    return () => {
      unSubscribe();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      body: messageBody,
    };

    try {
        await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        payload
      );
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

  const handleDeleteMessage = async (id) => {
    try{
       await database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
     
    }catch(e){
      console.log(e.message);
    }
    
    
  };

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
                  {new Date(message.$createdAt).toLocaleString()}
                </small>
                <Trash className="delete--btn" onClick={() => handleDeleteMessage(message.$id)} />
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
