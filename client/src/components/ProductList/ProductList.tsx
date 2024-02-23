"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/api/getProducts";
import ProductCard from "@/components/ProductCard/ProductCard";
import { IProduct } from "@/lib/types/products.types";

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[] | null>();
  const [count, setCount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData.products);
      setCount(productsData.metadata.totalItems);
    };

    fetchData();
  }, []);
  console.log(count);
  return (
    <div>
      <p className="text-2xl bg-red-700">{count}</p>
      <div className="flex justify-center items-center my-4">
        <div className="flex flex-col space-y-4"></div>
      </div>
      <ul className="flex flex-wrap gap-6 justify-center items-center">
        {products?.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
