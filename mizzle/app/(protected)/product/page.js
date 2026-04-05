'use client';

import { useEffect, useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import {
  Check,
  Heart,
  HeartFill,
  LightningFill,
  StarFill,
  Tag
} from "react-bootstrap-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { apiService } from "@/app/api/auth/Endpoint";
import Loading from "../components/loading";
import Category from "../components/Category";
import Pagination from "../components/Pagination";
import { addToCart } from "@/app/store/slice/CartSlice";
import { addToWishlist } from "@/app/store/slice/WishlistSlice";

const Homeproduct = () => {
  const [products, setProducts] = useState([]);

  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiService.getProducts();
        setProducts(res?.data?.products || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleWishlist = (product) => {
    const exists = wishlistItems.find((item) => item.id === product.id);
    if (!exists) {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (!exists) {
      dispatch(addToCart(product));
    }
  };

  return (
    <>
      <Category />
      <div className="my-3">
        <Pagination />
      </div>

      {products.length > 0 ? (
        <div className="container py-4">
          <div className="row g-4">
            {products.map((item) => {
              const productLink = `/product/${item.id}`;
              const inWishlist = wishlistItems.some(w => w.id === item.id);
              const inCart = cartItems.some(c => c.id === item.id);

              return (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
                  <motion.div whileHover={{ scale: 1.03 }} className="h-100">
                    <Card className="h-100 shadow-sm">

                      {/* Image Section */}
                      <div className="bg-light text-center position-relative p-3">

                        <Badge bg="secondary" className="position-absolute top-0 start-0 m-2 text-capitalize">
                          {item.category}
                        </Badge>

                        {/* Wishlist Icon */}
                        <div
                          className="position-absolute top-0 end-0 m-2"
                          onClick={() => handleWishlist(item)}
                          style={{ cursor: "pointer" }}
                        >
                          {inWishlist ? (
                            <HeartFill className="text-danger" size={25} />
                          ) : (
                            <Heart className="text-danger" size={25} />
                          )}
                        </div>

                        <Link href={productLink}>
                          <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.2 }} // 
                            transition={{ duration: 1.0 }}
                            src={item.thumbnail}
                            className="img-fluid"
                            style={{ maxHeight: "200px", objectFit: "contain" }}
                          />
                          {/* <Card.Img
                            src={item.thumbnail}
                            height="180"
                            style={{ objectFit: "contain" }}
                          /> */}
                        </Link>
                      </div>

                      {/* Body */}
                      <Card.Body className="d-flex flex-column">

                        <Link href={productLink} className="text-decoration-none text-dark">
                          <Card.Title className=" fw-semibold">
                            {item.title.length > 50
                              ? item.title.slice(0, 50) + "..."
                              : item.title}
                          </Card.Title>
                        </Link>
                        {/* description */}
                        <div className="flex-grow-1">
                          <div>

                            <p className="text-muted small">
                              {item.description.length > 100
                                ? item.description.slice(0, 100) + "..."
                                : item.description}
                            </p>
                          </div>

                          <div className="">
                            <Tag className="me-1" size={20} />
                            {item.discountPercentage}% off
                          </div>
                        </div>

                        {/* Rating & Price */}
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small className="text-muted">
                            <StarFill className="text-warning me-1" />
                            {item.rating || 4.5}
                          </small>

                          <span className="fw-bold text-primary">
                            ₹{item.price}
                          </span>
                        </div>

                        {/* Buttons */}
                        <div className="mt-auto  d-flex justify-content-between gap-2">

                          {inCart ? (
                            <Button variant="success" size="sm">
                              <Check className="me-1" />
                              In Cart
                            </Button>
                          ) : (
                            <Button
                              variant="outline-dark"
                              size="sm"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add to Cart
                            </Button>
                          )}

                          <Link href={productLink} className="d-grid text-decoration-none">
                            <Button variant="warning" size="lg">
                              <LightningFill className="me-1" />
                              Buy Now
                            </Button>
                          </Link>

                        </div>
                      </Card.Body>

                    </Card>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div >
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Homeproduct;