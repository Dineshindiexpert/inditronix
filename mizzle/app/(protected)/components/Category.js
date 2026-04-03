'use client';

import { Button } from "react-bootstrap";
import Rightsideslider from "./layout/Rightsideslider";
import { useRouter } from "next/navigation";
import { apiService } from "@/app/api/auth/Endpoint";
import { useState, useEffect } from "react";

const Category = ({ activeCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const router = useRouter();

  useEffect(() => {
    const fetchcategory = async () => {
      try {
        setLoading(true);
        const res = await apiService.getCategories();
        // Defensive check to ensure we are setting an array
        setCategories(Array.isArray(res?.data?.categories) ? res.data.categories : []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchcategory();
  }, []);

  return (
    <div className="d-flex gap-3 p-3 align-items-center mt-1">

      {/* Sidebar */}
      <Rightsideslider />

      {/* Categories */}
      <div className="d-flex gap-2 overflow-auto flex-nowrap" style={{ WebkitOverflowScrolling: 'touch' }}>

        {/* All */}
        <Button
          variant={!activeCategory ? "dark" : "outline-secondary"}
          onClick={() => router.push("/product")}
          className="rounded-pill px-3 py-1 text-nowrap" // Added text-nowrap
        >
          All
        </Button>

        {/* Map API data */}
        {!loading && categories.map((item, index) => {
          // Assuming item is a string based on your original code. 
          // If item is an object (e.g., {id, name}), change to item.name
          const isActive = activeCategory === item;

          return (
            <Button
              key={index}
              variant={isActive ? "dark" : "outline-secondary"}
              onClick={() => router.push(`/category/${item}`)}
              className="rounded-pill px-3 py-1 text-nowrap" // Added text-nowrap
            >
              {item}
            </Button>
          );
        })}

      </div>
    </div>
  );
};

export default Category;
