import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

import LoginForm from "../components/LoginForm";
import { FaEmpire } from "react-icons/fa";
import withSpaceBackground from "../hoc/withSpaceBackground";

const Home = () => {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading)
    return (
      <Container>
        <div className="loading-wrap">
          <Spinner animation="border" variant="danger" />
        </div>
      </Container>
    );
  if (isLoggedIn) return <Redirect to="/search" />;

  return (
    <Container id="login">
      <Row className="align-items-center" style={{ height: "90vh" }}>
        <Col md={{ span: 6, offset: 3 }}>
          <FaEmpire size="8em" className="second-color" />
          <h1 className="main-color title">Galaxy database</h1>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};

export default withSpaceBackground(Home);
