"use client";
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup, Nav } from "react-bootstrap";
import { ArrowLeft, Cart as CartIcon, PatchMinus, PatchPlus, } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { removeFromcartitems, incrementQty, decrementQty, applyCoupon, } from "../../store/slice/CartSlice";
import Link from "next/link";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, coupon, discountValue } = useSelector(
    (state) => state.cart
  );

  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    dispatch(applyCoupon(couponCode));
    setCouponCode("");
  };

  const handleRemoveCoupon = () => {
    dispatch(applyCoupon(""));
  };

  const shippingCost = 14.9;

  const grandTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalOriginalPrice = cartItems.reduce(
    (acc, item) =>
      acc + (item.originalPrice || item.price) * item.quantity,
    0
  );

  const totalDiscount = totalOriginalPrice - grandTotal;

  const discountPercentage =
    totalOriginalPrice > 0
      ? Math.round((totalDiscount / totalOriginalPrice) * 100)
      : 0;

  const finalTotal = Math.max(
    grandTotal + shippingCost - discountValue,
    0
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <Container className="my-5">
      <div>

        <h2 className="mb-4">
          <CartIcon className="me-2" />
          Shopping Cart
        </h2>
        <Button   href="/product" variant="primary" className="mb-4 link">
          <ArrowLeft /> Continue Shopping
        </Button>
      </div>



      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="lead">Your cart is empty.</p>
          <Button  href="/product" variant="primary">
            <ArrowLeft /> Continue Shopping
          </Button>
        </div>
      ) : (
        <Row>
          {/* CART ITEMS */}

          <Col md={8}>
            {cartItems.map((item) => (
              <Card key={item.id} className="mb-3 shadow-sm border-0">
                <Row className="align-items-center g-0 p-3">
                  <Col xs={3} md={2}>
                    <Card.Img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{
                        height: "80px",
                        objectFit: "contain",
                      }}
                    />
                  </Col>

                  <Col xs={9} md={3}>
                    <Card.Body className="py-0">
                      <Card.Title className="h6 mb-1">
                        {item.title}
                      </Card.Title>

                      <Card.Subtitle className="text-primary">
                        {formatCurrency(item.price)}

                        {item.originalPrice &&
                          item.originalPrice > item.price && (
                            <>
                              <span className="text-muted text-decoration-line-through ms-2">
                                {formatCurrency(item.originalPrice)}
                              </span>

                              <span className="text-success ms-2">
                                ({item.discountPercentage}% OFF)
                              </span>
                            </>
                          )}
                      </Card.Subtitle>
                    </Card.Body>
                  </Col>

                  <Col xs={6} md={3} className="text-center">
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={item.quantity === 1}
                      onClick={() =>
                        dispatch(decrementQty(item.id))
                      }
                    >
                      <PatchMinus />
                    </Button>

                    <span className="mx-2">{item.quantity}</span>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        dispatch(incrementQty(item.id))
                      }
                    >
                      <PatchPlus />
                    </Button>
                  </Col>

                  <Col xs={6} md={2} className="text-end fw-bold">
                    {formatCurrency(item.price * item.quantity)}
                  </Col>

                  <Col xs={12} md={2} className="text-end mt-2 mt-md-0">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        dispatch(removeFromcartitems(item.id))
                      }
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>

              </Card>
            ))}
          </Col>

          {/* ORDER SUMMARY */}
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>

                {/* Subtotal */}
                <Row className="mb-2">
                  <Col>Subtotal</Col>
                  <Col className="text-end">
                    {formatCurrency(grandTotal)}
                  </Col>
                </Row>

                {/* Product Discount */}
                {totalDiscount > 0 && (
                  <Row className="mb-2 text-success">
                    <Col>Product Discount</Col>
                    <Col className="text-end">
                      {formatCurrency(totalDiscount)} (
                      {discountPercentage}% OFF)
                    </Col>
                  </Row>
                )}

                {/* Coupon Discount */}
                {discountValue > 0 && (
                  <Row className="mb-2 text-success">
                    <Col>Coupon </Col>
                    <Col className="text-end">
                      -{formatCurrency(discountValue)}
                    </Col>
                  </Row>
                )}

                {/* Shipping */}
                <Row className="mb-2">
                  <Col>Shipping</Col>
                  <Col className="text-end">
                    {formatCurrency(shippingCost)}
                  </Col>
                </Row>

                <hr />

                {/* TOTAL */}
                <Row className="fw-bold">
                  <Col>Total</Col>
                  <Col className="text-end">
                    {formatCurrency(finalTotal)}
                  </Col>
                </Row>

                <Button  href="/checkout"
                  className="w-100 mt-3 text-white"
                  style={{ backgroundColor: "#F67D31" }}
                >
                  Proceed to Checkout
               
              

                <hr />

                {/* COUPON INPUT */}
                <Form.Label className="fw-bold">
                  Apply Coupon
                </Form.Label>

                <InputGroup>
                  <Form.Control
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(e.target.value)
                    }
                  />
                  <Button
                    variant="dark"
                    onClick={handleApplyCoupon}
                    disabled={!couponCode.trim()}
                  >
                    Apply
                  </Button>
                </InputGroup>

                {/* APPLIED COUPON */}
                {coupon && (
                  <Row className="mt-3 align-items-center">
                    <Col className="text-success">
                      Coupon Applied: <strong>{coupon}</strong>
                    </Col>
                    <Col className="text-end">
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={handleRemoveCoupon}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;
