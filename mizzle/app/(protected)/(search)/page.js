'use client';

import { apiService } from "@/app/api/auth/Endpoint";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { Card } from "react-bootstrap";

const Search = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await apiService.searchProducts(query);
                setProducts(res?.data?.products || []);
            } catch (err) {
                console.error(err);
            }
        };

        if (query) fetchProducts();
    }, [query]);

    return (
        <Card>
            <Card.Body>
                <Card.Title>Search Results</Card.Title>
                <Card.Text>
                    {products.length > 0 ? (
                        <ul>
                            {products.map((item) => (
                                <li key={item.id}>{item.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No products found.</p>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    )
};

export default Search;