'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import {Container, Form, InputGroup, Nav, Navbar,NavDropdown, Button, Badge} from "react-bootstrap";
import { Cart, Heart, Search } from "react-bootstrap-icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { apiService } from "@/app/api/auth/Endpoint";

const Header = () => {

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
    <Navbar bg="light" expand="lg" fixed="top" className="border-bottom">
      <Container>

        {/* Logo */}
        <Link href="/product" className="d-flex align-items-center text-decoration-none">
          <Image
            src="/logo.PNG"
            width={35}
            height={35}
            alt="logo"
            className="rounded-circle me-2"
          />
          <span className="fw-bold text-dark">Mizzle</span>
        </Link>

        {/* Toggle */}
        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          {/* Center Nav */}
          <Nav className="mx-auto text-center">
            <Link href="/product" className="nav-link">Home</Link>
            <Link href="/product" className="nav-link">Products</Link>
            <Link href="/contact" className="nav-link">Contact</Link>

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
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button variant="outline-secondary" onClick={handleSearch}>
                <Search />
              </Button>
            </InputGroup>

            {/* Wishlist */}
            <Link href="/Wishlist" className="position-relative text-dark">
              <Heart size={20} />
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
            <Link href="/cart" className="position-relative text-dark">
              <Cart size={22} />
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

            <Nav className="ms-auto">
              <pre>{JSON.stringify(user.avatar)</pre>
              <NavDropdown
                align="end"
                title={
                //   <Image
                //    src={user?.avatar || "/logo.PNG"}
                //     width={50}
                //     height={50}
                //     alt="profile"
                //     className="rounded-circle"
                //   />
                // }
                // 
                adjfl
              >
                {/* My Account Link */}
                <NavDropdown.Item as={Link} href="/profile" passHref>
                  My Account
                </NavDropdown.Item>

                {/* Username display */}
                <NavDropdown.ItemText>
                  {user?.username || "User"}
                </NavDropdown.ItemText>

                <NavDropdown.Item onClick={handleorders}>
                  orders
                </NavDropdown.Item>
                <NavDropdown.Divider />

                {/* Logout */}
                <NavDropdown.Item onClick={handleLogout}>
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