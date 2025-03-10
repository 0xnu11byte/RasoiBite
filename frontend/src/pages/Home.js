import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'animate.css';
import { useNavigate } from "react-router-dom";

const Home = () => {

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


  const navigate = useNavigate();
  return (

    <Container className="text-center mt-5">
      <h1 className="animate__animated animate__fadeInDown">Welcome to Rasoi Bite 🍽️</h1>
      <p className="animate__animated animate__fadeInUp">Delicious Home-Style Meals Delivered to You!</p>

      <Row className="mt-4">
        <Col md={4}>
          <Card data-aos="fade-up">
            <Card.Img variant="top" src={`${API_BASE_URL}/images/image1.webp`} />
            <Card.Body>
              <Card.Title>Fresh & Healthy</Card.Title>
              <Card.Text>Experience the best home-cooked meals with organic ingredients.</Card.Text>
              <Button className="btn-custom">Order Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card data-aos="fade-up" data-aos-delay="200">
            <Card.Img variant="top" src={`${API_BASE_URL}/images/image2.webp`} />
            <Card.Body>
              <Card.Title>Affordable Prices</Card.Title>
              <Card.Text>Enjoy delicious meals without breaking your budget.</Card.Text>
              <Button className="btn-custom" onClick={() => navigate("/menu")}>View Menu</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card data-aos="fade-up" data-aos-delay="400">
            <Card.Img variant="top" src={`${API_BASE_URL}/images/image2.webp`} />
            <Card.Body>
              <Card.Title>Fast Delivery</Card.Title>
              <Card.Text>Your meal is just a few clicks away with our quick delivery.</Card.Text>
              <Button className="btn-custom">Get Started</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
