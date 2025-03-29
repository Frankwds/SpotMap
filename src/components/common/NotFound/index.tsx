import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Paper, Container } from "../../../components/styled";

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
      <Paper>
        <Typography variant="h4">{message}</Typography>
        <Button 
          onClick={() => navigate("/")}
        >
          {buttonText}
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;