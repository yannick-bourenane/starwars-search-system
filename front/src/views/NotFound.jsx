import React from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <Container>
      <Header />
      <div>404 - Page non trouvée</div>
    </Container>
  );
};

export default NotFound;
