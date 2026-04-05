'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { Provider } from "react-redux";
import { store } from "../store/Store";

export default function ProtectedLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); 
    }
  }, [router]);

  return (
    <Provider store={store}>
      <Header />
      <Container fluid="lg">
        <Row className="mt-5">
          <Col md={12}>{children}</Col>
        </Row>
      </Container>
      <Footer />
    </Provider>
  );
}