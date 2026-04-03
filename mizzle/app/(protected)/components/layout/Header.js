'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Badge
} from "react-bootstrap";
import { Cart, Heart, Search } from "react-bootstrap-icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <Navbar bg="light" expand="lg" fixed="top" className="border-bottom">
      <Container>

        {/* Logo */}
        <Link href="/product" className="d-flex align-items-center text-decoration-none">
          <Image src="/logo.PNG" width={35} height={35} alt="logo" className="rounded-circle me-2" />
          <span className="fw-bold text-dark">MIzzle</span>
        </Link>

        {/* Toggle */}
        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          {/* Center Nav */}
          <Nav className="mx-auto text-center">
            <Link href="/product" className="nav-link">Home</Link>
            <Link href="/product" className="nav-link">Products</Link>

            <NavDropdown title="Explore">
              <NavDropdown.Item>Features</NavDropdown.Item>
              <NavDropdown.Item>Sales</NavDropdown.Item>
              <NavDropdown.Item>New Arrivals</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right Section */}
          <div className="d-flex align-items-center gap-3">

            {/* Search */}
            <InputGroup style={{ maxWidth: "220px" }}>
              <Form.Control
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) {
                    router.push(`/search?q=${query}`);
                  }
                }}
              />
              <Button
                variant="outline-secondary"
                onClick={() => query.trim() && router.push(`/search?q=${query}`)}
              >
                <Search />
              </Button>
            </InputGroup>


            {/* Wishlist */}
            <Link href="/Wishlist" className="position-relative text-dark">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {wishlistItems.length}
                </Badge>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="position-relative text-dark">
              <Cart size={22} />
              {cartItems.length > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItems.length}
                </Badge>
              )}
            </Link>

            {/* Profile */}
            <Nav>
              <NavDropdown
                align="end"
                title={
                  <Image
                    src="/logo.PNG"
                    width={32}
                    height={32}
                    alt="profile"
                    className="rounded-circle"
                  />
                }
              >
                <NavDropdown.Item>Account</NavDropdown.Item>
                <NavDropdown.Item>Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;