import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import Container from "react-bootstrap/Container";
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
      <LoginForm />
    </Container>
  );
};

export default Home;
