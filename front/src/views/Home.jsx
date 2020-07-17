import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchBar from "../components/Filters/SearchBar";
import FilterByType from "../components/Filters/FilterByType";

const Home = () => {
  // const [filteredList, setFilteredList] = useState([]);
  // const [type, setType] = useState("");

  // const handleFiltreType = () => {
  //   // On filtre
  // };

  //return <div>{/* <FiltreType callback={handleFiltreType} /> */}</div>;

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <SearchBar />
          <FilterByType />
        </Col>
        <Col sm={8}></Col>
      </Row>
    </Container>
  );
};

export default Home;
