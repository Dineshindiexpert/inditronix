'use client';

import { useEffect, useState } from "react";
import { apiService } from "../../api/auth/Endpoint";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

const Categoryproducts = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiService.getProducts();
        let data = res?.data?.products || [];

        if (category) {
          data = data.filter((p) => p.category === category);
        }

        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row g-4">

        {products.length === 0 ? (
          <p className="text-center text-muted">No products found</p>
        ) : (
          products.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
              <Card className="h-100 shadow-sm">

                <Link href={`/product/${item.id}`}>
                  <Card.Img
                    variant="top"
                    src={item.thumbnail}
                    style={{ height: "180px", objectFit: "contain" }}
                  />
                </Link>

                <Card.Body className="d-flex flex-column">
                  <Card.Title className="small">
                    {item.title}
                  </Card.Title>

                  <Card.Text className="text-muted small">
                    {item.description?.slice(0, 60)}...
                  </Card.Text>

                  <h6 className="text-primary">
                    ₹{item.price}
                  </h6>

                  <Button variant="dark" className="mt-auto">
                    Add to Cart
                  </Button>
                </Card.Body>

              </Card>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default Categoryproducts;