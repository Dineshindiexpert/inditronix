'use client';

import React, { useState } from "react";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiService, apiServiceRegister } from "../api/auth/Endpoint";

const Signup = () => {
  const router = useRouter();

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    else if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
    }
    else {
      try {
        await apiService.registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });

        alert("Signup successful ✅");
        router.push("/login");

      } catch (err) {
        setError("Signup failed ❌");
      }
    }

    setValidated(true);
  };



  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/homebanner.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Row className="w-100">

          {/* Left Section */}
          <Col
            md={7}
            className="d-flex flex-column justify-content-center align-items-center text-center text-white"
          >
            <motion.h1
              className="display-4 fw-bold mb-3"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Join Our Community
            </motion.h1>

            <motion.p
              className="lead"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Create your account and start shopping today!
            </motion.p>
          </Col>

          {/* Right Section */}
          <Col
            md={5}
            className="d-flex justify-content-center align-items-center"
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: -50, right: 50 }}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card
                className="shadow border-0 p-4 rounded-4"
                style={{ width: "400px", backgroundColor: "#DE1A58" }}
              >
                <Card.Body>

                  <Card.Title className="text-center text-white mb-4 fw-bold">
                    Sign Up
                  </Card.Title>

                  {/* Error Message */}
                  {error && (
                    <p className="text-warning text-center">{error}</p>
                  )}

                  <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    {/* Username */}
                    <Form.Group className="mb-3" controlId="username">
                      <Form.Label className="small text-white">
                        Username
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label className="small text-white">
                        Email
                      </Form.Label>
                      <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-4" controlId="password">
                      <Form.Label className="small text-white">
                        Password
                      </Form.Label>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    {/* Confirm Password */}
                    <Form.Group className="mb-4" controlId="confirmPassword">
                      <Form.Label className="small text-white">
                        Confirm Password
                      </Form.Label>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    {/* Button */}
                    <Button
                      type="submit"
                      className="w-100 py-2 fw-bold"
                      style={{
                        backgroundColor: "#F67D31",
                        border: "none"
                      }}
                    >
                      SIGN UP
                    </Button>

                    {/* Login Link */}
                    <div className="text-center mt-3">
                      <span className="text-white me-2">
                        Already have an account?
                      </span>
                      <Link
                        href="/login"
                        className="text-white text-decoration-none fw-semibold"
                      >
                        Login
                      </Link>
                    </div>

                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Signup;