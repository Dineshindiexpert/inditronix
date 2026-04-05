'use client';

import { useState } from "react";
import {
  Button,
  Offcanvas,
  Form,
  ProgressBar
} from "react-bootstrap";
import {
  FilterSquare,
  CurrencyRupee
} from "react-bootstrap-icons";

const Rightsideslider = ({ onPriceChange }) => {
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(1000);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleApply = () => {
    if (onPriceChange) {
      onPriceChange(price);  
    }
    handleClose();
  };

  return (
    <>
      {/* Premium Icon Button */}
      <Button
        onClick={handleShow}
        className="rounded-circle shadow-sm d-flex align-items-center justify-content-center"
        style={{
          width: "45px",
          height: "45px",
          background: "#111",
          border: "none"
        }}
      >
        <FilterSquare size={20} />
      </Button>

      {/*  Offcanvas */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        className="border-0"
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="fw-bold">
            Filter by Price
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column justify-content-between">

          {/* PRICE SECTION */}
          <div>
            <div className="d-flex align-items-center mb-3">
              <CurrencyRupee className="me-2 text-success fs-4" />
              <h6 className="mb-0 fw-semibold">Select Max Price</h6>
            </div>

            {/* Range Slider */}
            <Form.Range
              min={0}
              max={2000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mb-3"
            />

            {/* Price Display */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted">₹0</span>
              <span className="fw-bold text-dark fs-5">
                ₹{price}
              </span>
              <span className="text-muted">₹2000</span>
            </div>

            {/* Progress Bar */}
            <ProgressBar
              now={(price / 2000) * 100}
              style={{
                height: "6px",
                borderRadius: "10px"
              }}
              variant="dark"
            />
          </div>

          {/* APPLY BUTTON */}
          <Button
            onClick={handleApply}
            className="w-100 mt-4 rounded-pill fw-semibold"
            style={{
              background: "#111",
              border: "none",
              padding: "10px"
            }}
          >
            Apply Filter
          </Button>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Rightsideslider;