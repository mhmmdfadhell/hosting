import { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import { API } from "../config/server";
import CardList from "../components/Product/CardList";
import { useCountUp } from "react-countup";

import { Container, Row, Col, Image } from "react-bootstrap";
import { review } from "../assets";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  useCountUp({ ref: "counter1", end: 80 });
  useCountUp({ ref: "counter2", end: 50 });
  useCountUp({ ref: "counter3", end: 10 });
  useCountUp({ ref: "counter4", end: 70 });

  const fetchProducts = async () => {
    try {
      const response = await API("/products");
      console.log(response);
      setProducts(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
    <Container>
      <Jumbotron />
      <div className="container ">
        <Row className="section-stats">
          <Col className="stats-detail">
            <h2 className="num" id="counter1">
              80
            </h2>
            <h2 className="detail">K</h2>
            <p className="content-count">Members</p>
          </Col>
          <Col className="stats-detail">
            <h2 className="num" id="counter2">
              50
            </h2>
            <h2 className="detail">+</h2>
            <p className="content-count">Countries</p>
          </Col>
          <Col className="stats-detail">
            <h2 className="num" id="counter3">
              10
            </h2>
            <h2 className="detail">+</h2>
            <p className="content-count">Varian</p>
          </Col>
          <Col className="stats-detail">
            <h2 className="num" id="counter4">
              75
            </h2>
            <h2 className="detail">+</h2>
            <p className="content-count">Partners</p>
          </Col>
        </Row>
        <Row style={{ marginTop: "100px" }}>
          <Col md={8} data-aos="zoom-in" data-aos-duration="500">
            <h3 style={{ color: "#7E8CAC", fontWeight: "400" }}>
              Hello Everyone,
            </h3>
            <h2 style={{ color: "#2C273F", fontWeight: "bold" }}>
            Dancing Goat Coffe is a platform.
            </h2>
            <h4 style={{ color: "#2C273F", fontWeight: "400" }}>
              The provision of drinks that have
            </h4>
            <h4 style={{ color: "#2C273F", fontWeight: "400" }}>
              several variants and ready to be delivered.
            </h4>
            <h4 style={{ color: "#2C273F", fontWeight: "400" }}>
              Users can order through digital platforms
              <br />
              through Dancing Goat Coffe.
            </h4>
            <h4 style={{ color: "#2C273F", fontWeight: "400" }}>
              Kami menyediakan varian coffe untuk membantu anda agar gampang
              memesan coffe secara digital.
            </h4>
          </Col>
          <Col md={8}>
            <Image
            width={400}
              src={review}
              className="img-fluid content-img-review mb-5"
              data-aos="flip-left"
              data-aos-duration="500"
              style={{position:'relative',left:'320px',top:'50px'}}
            />
          </Col>
        </Row>
      </div>
      <h1 className="text-overide text-danger mb-5 mt-5">Let's order</h1>
      <div className="mt-5 mb-5">

      <CardList data={products} />
      </div>
    </Container>
    <Footer style={{ marginTop: "100px" }} />
    </>
  );
};

export default Home;
