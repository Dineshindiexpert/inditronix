'use client';

import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiService } from "../api/auth/Endpoint";

const Login = () => {
  const router = useRouter();

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        // ✅ get all users from mock API
        const res = await apiService.getUsers();

        // ✅ find matching user
        const user = res.data.find(
          (u) =>
            u.username === formData.username &&
            u.password === formData.password
        );

        if (user) {
          // ✅ store login info in localStorage (UI only)
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", "true");

           
          document.cookie = "token=logged_in_user; path=/";

          console.log("Login successful:", user);

          router.push("/product"); // ya jo tera main page hai
        } else {
          setError("Invalid username or password");
        }

      } catch (err) {
        console.error(err);
        setError("Login failed");
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

          {/* Left */}
          <Col md={7} className="d-flex flex-column justify-content-center align-items-center text-center text-white">
            <h1 className="fs-1 fw-5">Mizzle</h1>
            <p>Your one-stop shop for everything you love!</p>
          </Col>

          {/* Right */}
          <Col md={5} className="d-flex justify-content-center align-items-center">
            <Card
              className="shadow border-0 p-4 rounded-4"
              style={{ width: "400px", backgroundColor: "#DE1A58" }}
            >
              <Card.Body>

                <Card.Title className="text-center text-white mb-4 fw-bold">
                  Login / Sign In
                </Card.Title>

                {error && (
                  <p className="text-warning text-center">{error}</p>
                )}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                  {/* Username */}
                  <Form.Group className="mb-3">
                    <Form.Label className="small text-white">
                      Username
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-4">
                    <Form.Label className="small text-white">
                      Password
                    </Form.Label>
                    <Form.Control
                      required
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
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
                    LOGIN
                  </Button>

                  {/* Signup Link */}
                  <div className="text-center mt-3">
                    <Link
                      href="/register"
                      className="text-white text-decoration-none fw-semibold"
                    >
                      New user? Sign up
                    </Link>
                  </div>

                </Form>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Login;