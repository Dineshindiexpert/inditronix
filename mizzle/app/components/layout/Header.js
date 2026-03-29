'use client';

import { useEffect } from "react";
import Image from "next/image";
import {
    Container,
    Form,
    InputGroup,
    Nav,
    Navbar,
    NavDropdown,
    Button
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const Header = () => {

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);

    return (
        <Navbar
            expand="lg"
            bg="white"
            fixed="top"
            className="shadow-sm py-2"
        >
            <Container>

                {/* Logo */}
                <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
                    <Image src="/logo.PNG" width={38} height={38} alt="logo" className="rounded-circle"/>
                    <span className="fw-bold fs-5 text-dark">MIzzle</span>
                </Navbar.Brand>

                {/* Toggle */}
                <Navbar.Toggle aria-controls="main-navbar" />

                <Navbar.Collapse id="main-navbar" className="d-flex justify-content-between">
                    <div className="mx-auto">

                        {/* Center Nav */}
                        <Nav className="mx-auto mb-2 mb-lg-0 gap-lg-4 text-center">
                            <Nav.Link href="/" className="fw-medium">Home</Nav.Link>
                            <Nav.Link href="/product" className="fw-medium">Products</Nav.Link>

                            <NavDropdown title="Explore">
                                <NavDropdown.Item>Features</NavDropdown.Item>
                                <NavDropdown.Item>Sales</NavDropdown.Item>
                                <NavDropdown.Item>New Arrivals</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>More</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </div>

                    {/* Right Side */}
                    <div className="d-flex flex-column flex-lg-row  align-items-lg-center gap-2 gap-lg-3 w-50 w-lg-auto me-0 justify-content-between">

                        {/* Search */}
                        <InputGroup className="rounded-pill overflow-hidden w-50 me-0 mx-auto">
                            <Form.Control
                                placeholder="Search products..."
                                className="border-end-0"
                            />
                            <Button variant="light" >
                                <Search />
                            </Button>
                        </InputGroup>

                        {/* Profile */}
                        <Nav className="align-items-center">
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
                                <NavDropdown.Item>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </div>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;