import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

export default function MessageDetail() {
  const { id } = useParams();
  const [messsage, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const downloadCV = () => {
    const cvPath = `http://localhost:8080/backend/api/Company/Message/downloadCV.php?id=${message.contactID}`;
    const link = document.createElement("a");
    link.href = cvPath;
    link.setAttribute("download", `${message.customerName}_CV.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReply = () => {
    // Logic for replying (e.g., navigating to a reply form)
    console.log("Reply clicked");
  };

  const handleCancel = () => {
    // Logic for canceling (e.g., resetting form or navigating back)
    console.log("Cancel clicked");
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading company details...
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

  if (!company) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="body1" color="textSecondary">
          No company details found!
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom>
            {company.companyname}
          </Typography>
          <Typography variant="body1">
            <strong>Company ID:</strong> {company.companyid}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>CV Path:</strong>{" "}
            <MuiLink
              href={company.cv_path}
              target="_blank"
              rel="noopener noreferrer"
            >
              View CV
            </MuiLink>
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Created At:</strong>{" "}
            {new Date(company.created_at).toLocaleDateString()}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={downloadCV}
            >
              Download CV
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
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
