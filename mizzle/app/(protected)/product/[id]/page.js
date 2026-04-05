'use client';

import { apiService } from "@/app/api/auth/Endpoint";
import { useEffect, useState } from "react";
import {Badge,Button,Card,Col,Container,Row,Spinner} from "react-bootstrap";
import {ArrowLeft,CartPlus,Check,LightningFill,StarFill} from "react-bootstrap-icons";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Loading from "../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/store/slice/CartSlice";

export default function ProductDetails({ params }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);


  const handleAddToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
     toast.error("Product already in cart");
      return;
    }
    dispatch(addToCart(product));
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiService.getSingleProduct(id);
        setProduct(res.data);


        if (res.data?.category) {
          const catRes = await apiService.getProductsByCategory(
            res.data.category
          );

          const filtered =
            catRes?.data?.products?.filter((item) => item.id !== res.data.id)?.slice(0, 4) || [];

          setRelated(filtered);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchData();
  }, [id]);


  if (!product) {
    return (
      <h2 className="text-center mt-5">
        <Loading />
      </h2>
    );
  }

  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-light p-4 rounded-4"
      >

        {/* Back Button */}
        <Button
          variant="link"
          className="text-dark text-decoration-none mb-4 p-0 d-flex align-items-center"
          onClick={() => router.back()}
        >
          <ArrowLeft className="me-2" /> Back to Shop
        </Button>

        {/* PRODUCT DETAILS */}
        <Row className="bg-white rounded-4 shadow-sm overflow-hidden g-0 mb-5">

          {/* IMAGE */}
          <Col lg={6} className="p-4 d-flex align-items-center justify-content-center">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.2 }} // 
              transition={{ duration: 0.5 }}
              src={product.thumbnail}
              className="img-fluid"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </Col>

          {/* DETAILS */}
          <Col lg={6} className="p-4">
            <Badge bg="secondary" className="mb-2">
              {product.category}
            </Badge>

            <h2>{product.title}</h2>

            <div className="d-flex align-items-center mb-3">
              <StarFill className="text-warning me-2" />
              <span>{product.rating}</span>
              <span className="ms-3 text-muted">
                Stock: {product.stock}
              </span>
            </div>

            <h3 className="text-primary">₹{product.price}</h3>

            <p className="mt-3">{product.description}</p>

            {/* BUTTONS */}

            <div className="d-flex gap-3 mt-4">
              {cartItems.find((item) => item.id === product.id) ? (
                <Button variant="success">
                  <CartPlus className="me-2" />
                  <Check /> Added to Cart
                </Button>
              ) : (
                <Button
                  onClick={() => handleAddToCart(product)}
                  variant="outline-dark"
                >
                  <CartPlus className="me-2" />
                  Add to Cart
                </Button>)}

              <Button
                style={{ background: "#F67D31", border: "none" }}
              >
                <LightningFill className="me-2" />
                Buy Now
              </Button>
            
          </div>
        </Col>
      </Row>

      {/* RELATED PRODUCTS */}
      <h3 className="fw-bold mb-4">Related Products</h3>

      {loadingRelated ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : related.length === 0 ? (
        <p>No related products found</p>
      ) : (
        <Row>
          {related.map((item) => (
            <Col md={3} key={item.id} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="h-100 shadow-sm cursor-pointer"
                  onClick={() => router.push(`/product/${item.id}`)}
                >
                  <Card.Img
                    variant="top"
                    src={item.thumbnail}
                    style={{ height: "180px", objectFit: "contain" }}
                  />

                  <Card.Body>
                    <Card.Title style={{ fontSize: "14px" }}>
                      {item.title}
                    </Card.Title>

                    <div className="fw-bold text-primary">
                      ₹{item.price}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      )}
    </motion.div>
    </Container >
  );
}