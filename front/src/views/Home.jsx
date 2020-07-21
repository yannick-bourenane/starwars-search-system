import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

const Home = () => {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading)
    return <div className="flex-center-column loading">Loading...</div>;
  if (isLoggedIn) return <Redirect to="/search" />;

  return (
    <Container>
      <Header />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="main-color">Login Required</h2>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
