'use client';

import { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function SearchClient() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SearchContent />
    </Suspense>
  );
}