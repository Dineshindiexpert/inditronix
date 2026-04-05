'use client';

import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { Envelope, Person, ChatDots } from "react-bootstrap-icons";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    // no any here submit data have no any api method 
    toast.success("Message sent successfully ");

    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <Container className="py-5">

      <Row className="justify-content-betweeen align-items-center">
        <Col md={4} lg={6} className="mb-4 mb-md-0">
          <h1 className="display-4 fw-bold">Get in Touch</h1>
          <p className="lead text-muted">
            Have questions or want to collaborate? Send us a message!
          </p>
        </Col>

        <Col md={8} lg={6}>

          <Card className="shadow-lg border-0 rounded-4 p-4">

            {/* Heading */}
            <div className="text-center mb-4">
              <h2 className="fw-bold">Contact Us</h2>
              <p className="text-muted">
                We'd love to hear from you 
              </p>
            </div>

            {/* Form */}
            <Form onSubmit={handleSubmit}>

              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  <Person className="me-2" />
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-pill px-3 py-2"
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  <Envelope className="me-2" />
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-pill px-3 py-2"
                />
              </Form.Group>

              {/* Message */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">
                  <ChatDots className="me-2" />
                  Message
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  className="rounded-3 px-3 py-2"
                />
              </Form.Group>

              {/* Submit */}
              <Button
                type="submit"
                className="w-100 rounded-pill fw-semibold"
                style={{
                  background: "#111",
                  border: "none",
                  padding: "10px"
                }}
              >
                Send Message
              </Button>

            </Form>

          </Card>

        </Col>
      </Row>

    </Container>
  );
};

export default ContactUs;