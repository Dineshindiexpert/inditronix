"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, ProgressBar, Spinner } from "react-bootstrap";
import { CheckCircleFill, Truck } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";
import { apiService } from "@/app/api/auth/Endpoint";
import { div } from "motion/react-client";
import Nordersyet from "../components/nordersyet";
import Loading from "../components/loading";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) { setLoading(false); return; }
      // console.log("Fetching orders for user ID:", user.id);

      const res = await apiService.getOrdersByUser(user.id);
      setOrders(res.data.reverse());
      console.log("Fetched orders:", res.data);

    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount = 0) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

  return (
    <Container className="my-5" >
      {/* <pre>{JSON.stringify(orders, null, 2)}</pre> */}
      <Row className="mb-4">
        <Col>
          <h3 className="fw-bold">Your Orders</h3>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => router.push("/product")}>Continue Shopping</Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center"><Loading /></div>
      ) : orders.length === 0 ? (
        <div className="text-center">
          <p className="lead fs-3 fw-bold">No orders found.</p>
          <Nordersyet />
        </div>
      ) : (
        orders.map((order) => {
          const subtotal = order.items?.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0) || 0;
          return (
            <Card key={order.id} className="p-4 shadow-sm mb-4">
              <Row className="mb-3 align-items-center">
                <Col><h5 className="fw-bold">Order #{order.id || "N/A"}</h5></Col>

              </Row>

              <Row className="mb-3"><Col><Truck className="me-2" />Tracking info will be shared via email.</Col></Row>

              <Row>
                <Col md={4}>
                  <p><strong>Order Date:</strong></p>
                  <p>{order.date ? new Date(order.date).toLocaleDateString() : "N/A"}</p>
                  <p className="text-success">Arriving soon</p>
                </Col>

                <Col md={4}>
                  <p className="fw-bold">Shipping Address</p>
                  <p>{order.address?.name}</p>
                  <p>{order.address?.address}</p>
                  <p>{order.address?.city}</p>
                  <p>{order.address?.pincode}</p>
                </Col>

                <Col md={4} className="text-center">
                  <CheckCircleFill color="green" size={24} />
                  <p className="mt-2 text-capitalize">{order.status || "placed"}</p>
                  <ProgressBar now={25} className="mb-2" />
                  <div className="d-flex justify-content-between small">
                    <span>Placed</span><span>Processing</span><span>Shipped</span><span>Delivered</span>
                  </div>
                </Col>
              </Row>

              <hr />
              {order.items?.map((item) => (
                <Row key={item.id} className="align-items-center mb-3">
                  <Col md={2}><img src={item.thumbnail} alt={item.title} className="img-fluid" style={{ maxHeight: "80px", objectFit: "contain" }} /></Col>
                  <Col md={6}><p className="fw-bold">{item.title}</p></Col>
                  <Col md={2}>Qty: {item.quantity}</Col>
                  <Col md={2} className="text-end fw-bold">{formatCurrency((item.price || 0) * (item.quantity || 1))}</Col>
                </Row>
              ))}

              <hr />
              <Row>
                <Col md={4}>
                  <Card className="p-3">
                    <h6>Order Summary</h6>
                    <Row><Col>Subtotal</Col><Col className="text-end">{formatCurrency(subtotal)}</Col></Row>
                    <Row><Col>Shipping</Col><Col className="text-end">{formatCurrency(order.shipping || 0)}</Col></Row>
                    <Row><Col>Discount</Col><Col className="text-end text-success">-{formatCurrency(order.discount || 0)}</Col></Row>
                    <hr />
                    <Row className="fw-bold"><Col>Total</Col><Col className="text-end text-primary">{formatCurrency(order.total || 0)}</Col></Row>
                  </Card>
                </Col>
              </Row>
            </Card>
          );
        })
      )}
    </Container>
  );
};

export default Orders;