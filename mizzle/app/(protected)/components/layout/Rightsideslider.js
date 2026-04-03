'use client'

import Link from "next/link";
import { useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Form,
  ListGroup,
  Offcanvas,
  ProgressBar,
} from "react-bootstrap";
import {
  ChevronRight,
  CurrencyRupee,
  FilterSquare,
  Tag,
} from "react-bootstrap-icons";

const Rightsideslider = () => {
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div>
      {/* Icon button to open filter */}
      <Button variant="transparent" onClick={handleShow}>
        <FilterSquare size={40} />
      </Button>

      {/* Right-side filter drawer */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter Products</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column">
          <Accordion defaultActiveKey={["0", "1", "2"]} alwaysOpen>

            {/* CATEGORIES */}
            <Accordion.Item eventKey="0" className="border-0 mb-3">
              <Accordion.Header>
                <Tag className="me-2 text-primary fs-5" />
                <span className="fw-semibold">Categories</span>
              </Accordion.Header>
              <Accordion.Body className="p-0">
                <ListGroup variant="flush">
                  {["Electronics", "Clothing", "Books", "Home"].map(
                    (category) => (
                      <ListGroup.Item
                        key={category}
                        action
                        onClick={() => toggleCategory(category)}
                        className={`d-flex justify-content-between align-items-center border-0 py-2 px-3 rounded-3 mb-1 hover-shadow ${
                          selectedCategories.includes(category)
                            ? "bg-light"
                            : ""
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        {category}
                        <ChevronRight size={16} />
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            {/* PRICE FILTER */}
            <Accordion.Item eventKey="1" className="border-0 mb-3">
              <Accordion.Header>
                <CurrencyRupee className="me-2 text-success fs-5" />
                <span className="fw-semibold">Price Filter</span>
              </Accordion.Header>
              <Accordion.Body>
                <Form.Range
                  min={0}
                  max={1000}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mb-2"
                />
                <p>Max Price: ₹{price}</p>
                <ProgressBar
                  now={(price / 1000) * 100}
                  variant="primary"
                  className="rounded-pill"
                />
              </Accordion.Body>
            </Accordion.Item>

            {/* BRANDS */}
            <Accordion.Item eventKey="2" className="border-0 mb-3">
              <Accordion.Header>
                <Tag className="me-2 text-warning fs-5" />
                <span className="fw-semibold">Brands</span>
              </Accordion.Header>
              <Accordion.Body>
                {["Apple", "Samsung", "Nike", "Adidas"].map((brand) => (
                  <Form.Check
                    key={brand}
                    type="checkbox"
                    id={brand}
                    label={brand}
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="mb-2"
                  />
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Sticky Apply Filters Button */}
          <Button
            variant="primary"
            className="mt-auto w-100"
            onClick={handleClose}
          >
            Apply Filters
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Rightsideslider;