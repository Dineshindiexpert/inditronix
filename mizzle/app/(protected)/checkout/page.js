"use client";

import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import PaymentQR from "../components/Paymentqr";
import { apiService } from "@/app/api/auth/Endpoint";

const Checkout = () => {
  const router = useRouter();
  const { cartItems, discountValue } = useSelector((state) => state.cart);

  const [showQR, setShowQR] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "cod",
  });

  const shippingCost = 50;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost - discountValue;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "payment") setShowQR(value === "online");
  };

  const handlePlaceOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("User not found!");
        return;
      }

      const orderData = {
        userId: user.id,  
        items: cartItems,
        total,
        shipping: shippingCost,
        discount: discountValue,
        address: formData,
        date: new Date().toISOString(),
        status: "placed",
      };

      await apiService.placeOrder(orderData);
      router.push("/orders");
    } catch (error) {
      console.error("Order failed:", error);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

  return (
    <Container className="my-5">
      <Row>
        {/* LEFT: Shipping Form */}
        <Col md={7}>
          <Card className="p-4 shadow-sm mb-4">
            <h5 className="mb-3">Shipping Details</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control name="name" value={formData.name} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control name="phone" value={formData.phone} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control name="address" value={formData.address} onChange={handleChange} />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control name="city" value={formData.city} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control name="pincode" value={formData.pincode} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <h6 className="mt-3">Payment Method</h6>
              <Form.Check type="radio" label="Cash on Delivery" name="payment" value="cod" checked={formData.payment === "cod"} onChange={handleChange} />
              <Form.Check type="radio" label="UPI / Card (Demo)" name="payment" value="online" checked={formData.payment === "online"} onChange={handleChange} />
            </Form>

            <PaymentQR show={showQR} onHide={() => setShowQR(false)} amount={total} />
          </Card>
        </Col>

        {/* RIGHT: Order Summary */}
        <Col md={5}>
          <Card className="p-4 shadow-sm">
            <h5>Order Summary</h5>
            {cartItems.map((item) => (
              <Row key={item.id} className="mb-3">
                <Col md={8}>
                  <p>{item.title}</p>
                  <small>Qty: {item.quantity}</small>
                </Col>
                <Col md={4} className="text-end">{formatCurrency(item.price * item.quantity)}</Col>
              </Row>
            ))}
            <hr />
            <Row>
              <Col>Total</Col>
              <Col className="text-end text-primary">{formatCurrency(total)}</Col>
            </Row>
            <Button onClick={handlePlaceOrder} className="w-100 mt-3 text-white" style={{ backgroundColor: "#F67D31" }}>
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;