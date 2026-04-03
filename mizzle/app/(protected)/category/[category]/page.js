'use client';

import { useParams } from "next/navigation";
import Category from "@/app/(protected)/components/Category";
import Categoryproducts from "@/app/(protected)/components/Categoryproducts";

const CategoryPage = () => {
  const { category } = useParams();

  return (
    <div>
      {/* Category Buttons */}
      <Category activeCategory={category} />

      {/* Products */}
      <Categoryproducts category={category} />
    </div>
  );
};

export default CategoryPage;