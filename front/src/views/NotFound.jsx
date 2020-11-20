import React from "react";
import Container from "react-bootstrap/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import withSpaceBackground from "../hoc/withSpaceBackground";

const NotFound = () => {
  return (
    <Container>
      <Header />
      <div>404 - Page non trouvée</div>
    </Container>
  );
};

export default withSpaceBackground(NotFound);
