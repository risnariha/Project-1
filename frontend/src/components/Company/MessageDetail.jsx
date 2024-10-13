import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ReplyIcon from "@mui/icons-material/Reply";
import CancelIcon from "@mui/icons-material/Cancel";
import { Modal, Form } from "react-bootstrap";

const MessageDetail = () => {
  const { contactID } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchMessageDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/backend/api/Company/Message/message_detail.php?contact_id=${contactID}`
        );
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        setMessage(response.data);
      } catch (err) {
        console.error(
          "API Error:",
          err.response ? err.response.data : err.message
        );
        setError("Error fetching Message details");
      } finally {
        setLoading(false);
      }
    };

    fetchMessageDetails();
  }, [contactID]);

  const downloadFile = () => {
    if (!message || !message.dataFile) return;
    const filePath = `http://localhost:8080/backend/api/Company/Message/download_file.php?contact_id=${message.contactID}`;
    const link = document.createElement("a");
    link.href = filePath;
    link.setAttribute("download", `${message.customerName}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReply = () => {
    setShowMessageModal(true);
    setSelectedCustomer(message);
  };


  const handleShowMessageModal = () => {
    setShowMessageModal(true);
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
    setReplyMessage(""); // Reset message field
    setFile(null); // Reset file input
  };

  const handleCloseModal = () => {
    navigate('/company/messageList'); 
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); 
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault(); // Prevent submission first

    if (!replyMessage.trim()) {
      alert("Message field is required");
      return;
    }

    const formData = new FormData();
      formData.append("companyOwnerID", message.companyOwnerID);
      formData.append("customerID", selectedCustomer.customerID);
      formData.append("email", selectedCustomer.email);
      formData.append("companyName", message.companyName); // Assuming companyName is available in user context
      formData.append("customerName", selectedCustomer.customerName);
      formData.append("message", replyMessage);
      formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/backend/api/Company/Message/contact.php",
        formData
      );
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      handleCloseMessageModal();
    } catch (error) {
      alert("Error sending message: " + error.message);
    }
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading message details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!message) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="body1" color="textSecondary">
          No message details found!
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom>
            {message.customerName}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {message.email}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Message :</strong> {message.message}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>View Data:</strong>{" "}
            {message.dataFile ? (
              <MuiLink
                href={message.dataFile}
                target="_blank"
                rel="noopener noreferrer"
              >
                Click Here !
              </MuiLink>
            ) : (
              "No data available"
            )}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Created At:</strong>{" "}
            {new Date(message.date).toLocaleDateString()}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={downloadFile}
            >
              Download File
            </Button>
            <Button
              variant="outlined"
              startIcon={<ReplyIcon />}
              onClick={handleReply}
            >
              Reply
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Stack>
        </CardContent>
      </Card>

     {/* Message Modal */}
      {selectedCustomer && (
      <Modal show={showMessageModal} onHide={handleCloseMessageModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "1.5rem" }}>
            Send Message to {selectedCustomer.customerName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "1.2rem" }}>
                Company Name
              </Form.Label>
              <Form.Control type="text" value={message.companyName} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "1.2rem" }}>
                Customer Name
              </Form.Label>
              <Form.Control
                type="text"
                value={selectedCustomer.customerName}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "1.2rem" }}>Email</Form.Label>
              <Form.Control
                type="email"
                value={selectedCustomer.email}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "1.2rem" }}>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Enter your message"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "1.2rem" }}>
                Attach File
              </Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseMessageModal}
            style={{ backgroundColor: "#6c757d", color: "white" }} // Secondary color
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmitMessage}
            style={{ backgroundColor: "#007bff", color: "white" }} // Primary color
          >
            Send Message
          </Button>
        </Modal.Footer>
      </Modal>
      )}
    </Container>
  );
};

export default MessageDetail;
