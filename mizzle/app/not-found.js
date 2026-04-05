'use client';

import Link from "next/link";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center px-3">

      {/* 404 Text */}
      <motion.h1 
        className="fw-bold display-1 text-dark"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        className="text-muted fs-4 mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Oops! Page not found 
      </motion.p>

     

      {/* Go Home Button */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <Link href="/product">
          <Button
            className="rounded-pill px-5 py-2 fw-semibold"
            style={{
              background: "linear-gradient(135deg, #ff8a00, #e52e71)",
              border: "none",
              color: "#fff",
              fontSize: "1rem"
            }}
          >
            Go Back Home
          </Button>
        </Link>
      </motion.div>

      {/* Optional Subtle Footer */}
      <motion.p
        className="text-muted mt-4"
        style={{ fontSize: "0.9rem" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        © 2026 YourBrand. All rights reserved.
      </motion.p>

    </div>
  );
}