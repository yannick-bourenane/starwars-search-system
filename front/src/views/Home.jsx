import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DetailedSheet from "../components/DetailedSheet";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

const Home = () => {
  const user = useSelector((state) => state.currentUser);

  // const [filteredList, setFilteredList] = useState([]);
  // const [type, setType] = useState("");

  // const handleFiltreType = () => {
  //   // On filtre
  // };

  //return <div>{/* <FiltreType callback={handleFiltreType} /> */}</div>;

  return (
    <Container>
      <Header />
      <LoginForm />
    </Container>
  );
};

export default Home;
