import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Paper, Container } from "@mui/material";

interface NotFoundProps {
  message?: string;
  buttonText?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ 
  message = "Not found", 
  buttonText = "Back to Map" 
}) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">{message}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate("/")}
          sx={{ mt: 2 }}
        >
          {buttonText}
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;