import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const MessageList = () => {
  const { user } = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessageData();
  }, [user.companyOwnerID]);

  const fetchMessageData = async () => {
    setLoading(true); // Start loading
    try {
      if (user) {
        const response = await axios.post(
          "http://localhost:8080/backend/api/Company/Message/message_list.php",
          {
            companyOwnerID: user.companyOwnerID,
          }
        );
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          setError("Error fetching messages: Invalid response format");
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error); // Log the error for debugging
      setError(
        error.response
          ? error.response.data.error || "Error fetching messages"
          : "Network error: Unable to reach the server"
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="text-center my-5">Message Details</h1>
      <div className="container">
        <div className="row">
          {messages.map((message) => (
            <div className="col-md-6 mb-4" key={message.contactID}>
              <div className="card h-100">
                <div className="thumbnail">
                  {/* Optional: Add an image here if needed */}
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{message.customerName}</h5>
                  <p className="card-text">
                    Created At: {new Date(message.date).toLocaleDateString()}
                  </p>
                  <p className="card-text">Email : {message.email}</p>
                  <Link
                    to={"/messageDetail/${message.contactID}"}
                    className="btn btn-danger mt-auto"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageList;
