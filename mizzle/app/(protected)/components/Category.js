'use client';

import { Button } from "react-bootstrap";
import Rightsideslider from "./layout/Rightsideslider";
import { useRouter } from "next/navigation";
import { apiService } from "@/app/api/auth/Endpoint";
import { useState, useEffect } from "react";

const Category = ({ activeCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
      if (typeof window === "undefined") return;

    const fetchcategory = async () => {
      try {
        const res = await apiService.getCategories();

        console.log("CATEGORIES API:", res.data); 

        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchcategory();
  }, []);

  //  format label function
  const formatName = (name) => {
    if (!name) return "";
    return name
      .toString()
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="d-flex gap-3 p-3 align-items-center mt-1">

     

      {/* Categories */}
      <div className="d-flex gap-2 overflow-auto flex-nowrap p-4 hide-scrollbar rounded ">

        {/* All Button */}
        <Button
          variant={!activeCategory ? "dark" : "outline-secondary"}
          onClick={() => router.push("/product")}
          className="rounded-pill px-3 py-1 text-nowrap"
        >
          All
        </Button>

        {/* Loading */}
        {loading && (
          <span className="text-muted px-2">Loading...</span>
        )}

        {/* Categories List */}
        {!loading && categories.length > 0 &&
          categories.map((item) => {
            
            const value =
              typeof item === "string" ? item : item?.slug;

            const label =
              typeof item === "string" ? item : item?.name;

            const isActive =
              activeCategory?.toLowerCase() ===
              value?.toLowerCase();

            return (
              <Button
                key={value}
                variant={isActive ? "dark" : "outline-secondary"}
                onClick={() => router.push(`/category/${value}`)}
                className="rounded-pill px-3 py-1 text-nowrap"
              >
                {formatName(label)}
              </Button>
            );
          })
        }

        {/* No Data */}
        {!loading && categories.length === 0 && (
          <span className="text-muted px-2">
            No categories found
          </span>
        )}

      </div>
    </div>
  );
};

export default Category;