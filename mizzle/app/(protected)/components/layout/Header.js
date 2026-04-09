'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container, Form, InputGroup, Nav, Navbar, NavDropdown, Button, Badge, Dropdown } from "react-bootstrap";
import { Cart, Heart, Search } from "react-bootstrap-icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { apiService } from "@/app/api/auth/Endpoint";

const Header = () => {
  // dropdown state
  const [show, setShow] = useState(false);

  // redux state
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);

  // local state
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);

  const router = useRouter();

  // load bootstrap js
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // search handler
  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${query.trim()}`);
    }
  };


  useEffect(() => {

    //  load from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    //  Fetch fresh user from API
    const userId = localStorage.getItem('userId');

    if (userId) {
      apiService.getUserById(userId)
        .then(res => {
          setUser(res.data);

          // update localStorage with fresh data
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch(err => {
          console.error("Error fetching user:", err);
        });
    }

  }, []);
  const handleorders = () => {
    router.push("/orders")
  }

  // logout
  const handleLogout = () => {
    localStorage.clear();
    document.cookie = "token=; path=/; max-age=10"; // Clear cookie for 10 seconds
    router.push("/login");
  };

  return (
    <Navbar bg="dark" expand="lg" fixed="top" className="fs-4 text-white ">
      <Container >

        {/* Logo */}
        <Link href="/product" className="d-flex align-items-center text-decoration-none">
          <Image
            src="/logo.PNG"
            width={35}
            height={35}
            alt="logo"
            className="rounded-circle me-2"
          />
          <span className="fw-bold text-white">Mizzle</span>
        </Link>

        {/* Toggle */}
        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          {/* Center Nav */}
          <Nav className="mx-auto text-center ">
            <Link href="/product" className="nav-link text-white">Home</Link>
            <Link href="/product" className="nav-link text-white">Products</Link>
            <Link href="/contact" className="nav-link text-white">Contact</Link>


          </Nav>

          {/* Right Section */}
          <div className="d-flex align-items-center gap-3">

            {/* Search */}
            <InputGroup
              className="shadow-sm rounded-pill overflow-hidden"
              style={{ maxWidth: "340px", border: "1px solid #ddd" }}
            >
              <Form.Control
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="border-0 px-3"
                style={{ borderRadius: 0 }}
              />
              <Button
                variant="primary"
                onClick={handleSearch}
                className="d-flex align-items-center justify-content-center px-3"
                style={{
                  borderRadius: 0,
                  background: "linear-gradient(90deg, #f67d31, #ff8c42)",
                  border: "none"
                }}
              >
                <Search size={18} />
              </Button>
            </InputGroup>

            {/* Wishlist */}
            <Link href="/Wishlist" className="position-relative text-white">
              <Heart size={25} />
              {wishlistItems?.length > 0 && (
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
            <Link href="/cart" className="position-relative text-white ms-2">
              <Cart size={25} />
              {cartItems?.length > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItems.length}
                </Badge>
              )}
            </Link>

            {/* User Dropdown */}

            <Nav>
             
            
                {/* My Account Link */}

                <Dropdown

                  show={show}
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}

                >

                  <Dropdown.Toggle as="div" id="dropdown-custom-components" style={{ cursor: 'pointer' }} bsPrefix=' '>
                    <Image
                      src={user?.avatar || "/logo.PNG"}
                      width={50}
                      height={50}
                      alt="profile"
                      className="rounded-circle"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item href="/profile">My Account</Dropdown.Item>
                    <Dropdown.Item href="/profile">{user?.username || "User"}</Dropdown.Item>
                    <Dropdown.Item href="/orders" onClick={handleorders}>
                      orders
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>
            </Nav>

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;