'use client';

import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <Container>

        <Row className="gy-4">

          <Col lg={4} md={6}>
            <h4 className="fw-bold">MIzzle</h4>
            <p className="text-secondary">
              Discover modern products with the best quality and experience.
            </p>
          </Col>

          <Col lg={2} md={6}>
            <h6 className="fw-semibold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-secondary text-decoration-none">About</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Careers</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Blog</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          <Col lg={2} md={6}>
            <h6 className="fw-semibold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-secondary text-decoration-none">Help Center</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Terms</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Privacy</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">FAQ</a></li>
            </ul>
          </Col>

          <Col lg={4} md={6}>
            <h6 className="fw-semibold mb-3">Stay Updated</h6>
            <Form className="d-flex gap-2">
              <Form.Control placeholder="Enter your email" />
              <Button variant="primary">Subscribe</Button>
            </Form>
          </Col>

        </Row>

        <hr className="border-secondary my-4" />

        <Row className="text-center text-md-start">
          <Col md={6}>
            <small className="text-secondary">
              © {new Date().getFullYear()} MIzzle
            </small>
          </Col>

          <Col md={6} className="text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#" className="text-secondary">Facebook</a>
              <a href="#" className="text-secondary">Instagram</a>
              <a href="#" className="text-secondary">Twitter</a>
            </div>
          </Col>
        </Row>

      </Container>
    </footer>
  );
};

export default Footer;