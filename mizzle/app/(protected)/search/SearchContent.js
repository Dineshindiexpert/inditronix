'use client';

import { useSearchParams } from "next/navigation";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div>
      <h1>Search Page</h1>
      <p>Query: {query}</p>
    </div>
  );
}
