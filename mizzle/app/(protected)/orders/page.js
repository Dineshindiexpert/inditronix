"use client";

import React from "react";
import {Container,Row,Col,Card,Button,ProgressBar,} from "react-bootstrap";
import { CheckCircleFill, Truck } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Order = () => {
  const router = useRouter();

  //  Redux se cart data
  const { cartItems } = useSelector((state) => state.cart);

  //  Cart ko order me convert kiya
  const orders = cartItems.length
    ? [
        {
          id: "ORD123",
          date: new Date().toLocaleDateString(),
          shipping: 50,
          tax: 20,
          address: {
            name: "Demo User",
            street: "Panipat Street",
            city: "Panipat",
          },
          items: cartItems,
        },
      ]
    : [];

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h3 className="fw-bold">Your Orders</h3>
        </Col>
      </Row>

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        orders.map((order) => {
          const subtotal = order.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );

          const total = subtotal + order.shipping + order.tax;

          return (
            <Card key={order.id} className="p-4 shadow-sm mb-4">
              {/* HEADER */}
              <Row className="mb-3 align-items-center">
                <Col>
                  <h5 className="fw-bold">Order #{order.id}</h5>
                </Col>

                <Col className="text-end">
                  <Button
                    variant="success"
                    onClick={() => router.push("/product")}
                  >
                    Continue Shopping
                  </Button>
                </Col>
              </Row>

              {/* STATUS */}
              <Row className="mb-3">
                <Col>
                  <Truck className="me-2" />
                  Tracking info will be shared via email.
                </Col>
              </Row>

              {/* INFO */}
              <Row>
                <Col md={4}>
                  <p><strong>Order Date:</strong></p>
                  <p>{order.date}</p>
                  <p className="text-success">Arriving soon</p>
                </Col>

                <Col md={4}>
                  <p className="fw-bold">Shipping Address</p>
                  <p>{order.address.name}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city}</p>
                </Col>

                <Col md={4} className="text-center">
                  <CheckCircleFill color="green" size={24} />
                  <p>Order placed</p>

                  <ProgressBar now={25} className="mb-2" />

                  <div className="d-flex justify-content-between small">
                    <span>Placed</span>
                    <span>Processing</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                </Col>
              </Row>

              <hr />

              {/* ITEMS */}
              {order.items.map((item) => (
                <Row key={item.id} className="align-items-center mb-3">
                  <Col md={2}>
                    <img
                      src={item.thumbnail}     
                      alt={item.title}
                      className="img-fluid"
                      style={{
                        maxHeight: "80px",
                        objectFit: "contain",
                      }}
                    />
                  </Col>

                  <Col md={6}>
                    <p className="fw-bold">{item.title}</p>
                  </Col>

                  <Col md={2}>Qty: {item.quantity}</Col>

                  <Col md={2} className="text-end fw-bold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </Col>
                </Row>
              ))}

              <hr />

              {/* SUMMARY */}
              <Row>
                <Col md={4}>
                  <Card className="p-3">
                    <h6>Order Summary</h6>

                    <Row>
                      <Col>Subtotal</Col>
                      <Col className="text-end">
                        ₹{subtotal.toFixed(2)}
                      </Col>
                    </Row>

                    <Row>
                      <Col>Shipping</Col>
                      <Col className="text-end">
                        ₹{order.shipping}
                      </Col>
                    </Row>

                    <Row>
                      <Col>Tax</Col>
                      <Col className="text-end">
                        ₹{order.tax}
                      </Col>
                    </Row>

                    <hr />

                    <Row className="fw-bold">
                      <Col>Total</Col>
                      <Col className="text-end text-primary">
                        ₹{total.toFixed(2)}
                      </Col>
                    </Row>
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

export default Order;