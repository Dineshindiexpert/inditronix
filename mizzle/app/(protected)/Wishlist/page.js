'use client';
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../store/slice/WishlistSlice";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { addToCart } from "@/app/store/slice/CartSlice";

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);
    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

    const handlmovecart = (item) => {
        dispatch(addToCart(item));
        dispatch(removeFromWishlist(item.id));
    }
    return (
        <Container className="my-5">
            <h2 className="mb-4">My Wishlist</h2>

            {wishlistItems.length > 0 ? (
                <Row>
                    {wishlistItems.map((item) => {
                        const productLink = `/product/${item.id}`;

                        return (
                            <Col key={item.id} xs={12} md={6} lg={4} className="mb-3">
                                <Card className="p-3 h-100 shadow-sm d-flex flex-column">
                                    <div>
                                        <Link href={productLink} className="d-block text-center mb-2">
                                            <Card.Img
                                                variant="top"
                                                src={item.image || item.thumbnail}
                                                style={{ height: "150px", objectFit: "contain" }}
                                            />
                                        </Link>
                                    </div>


                                    <div className="flex-grow-1">
                                        <Card.Body className="d-flex flex-column justify-content-between">
                                            <div>
                                                {item.description && (
                                                    <p className="text-muted small mb-1">
                                                        {item.description.length > 100
                                                            ? item.description.slice(0, 100) + "..."
                                                            : item.description}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <Card.Title className="fs-6">{item.title}</Card.Title>
                                                <Card.Text className="fw-bold">
                                                    {formatCurrency(item.price)}
                                                </Card.Text>
                                            </div>

                                            <div className="d-grid  d-flex justify-content-between gap-2">
                                                <Button
                                                    variant="danger"
                                                    onClick={() => dispatch(removeFromWishlist(item.id))}
                                                >
                                                    Remove
                                                </Button>
                                                <Button
                                                    variant="success"
                                                    onClick={handlmovecart.bind(null, item)}

                                                >
                                                    Move to Cart
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            ) : (
                <div className="text-center mt-5">
                    <p className="lead">Your wishlist is empty.</p>
                    <Link href="/product">
                        <Button variant="primary">Continue Shopping</Button>
                    </Link>
                </div>
            )}
        </Container>
    );
};

export default Wishlist;