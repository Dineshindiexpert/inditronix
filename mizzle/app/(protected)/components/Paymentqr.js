"use client";

import React from "react";
import { Modal, Button } from "react-bootstrap";
 
const PaymentQR = ({ show, onHide, amount }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      centered
    >
      {/* HEADER */}
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">
          UPI Payment
        </Modal.Title>
      </Modal.Header>

      {/* BODY */}
      <Modal.Body className="text-center">
        <h5 className="mb-2">Scan & Pay</h5>

        <p className="text-muted mb-3">
          Use any UPI app to scan the QR code
        </p>

        {/* QR IMAGE */}
        <img
          src="/Paymentqr.jpeg"
          alt="QR Code"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
          }}
          className="mb-3"
        />

        {/* AMOUNT */}
        {amount && (
          <h6 className="fw-bold text-success">
            Amount: ₹{amount}
          </h6>
        )}

        <p className="small text-muted mt-2">
          After payment, click confirm below
        </p>
      </Modal.Body>

      {/* FOOTER */}
      <Modal.Footer className="justify-content-between">
        <Button variant="outline-secondary" onClick={onHide}>
          Cancel
        </Button>

        <Button
          style={{ backgroundColor: "#F67D31", border: "none" }}
          onClick={onHide}
        >
          I have Paid
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentQR;