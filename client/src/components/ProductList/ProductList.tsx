"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api/getProducts";
import ProductCard from "@/components/ProductCard/ProductCard";
import { IProduct } from "@/lib/types/products.types";
import PaginationModule from "@/components/Pagination/Pagination";
import { useSearchParams } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface FetchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortField?: string; // Optional sort field
  sortOrder?: "asc" | "desc";
}

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const sortField = searchParams.get("sort");
  const sortOrder = searchParams.get("by");
  const [products, setProducts] = useState<IProduct[] | null>();

  const [totalPages, setTotalPages] = useState();
  const queryParams = new URLSearchParams();

  // Add parameters conditionally
  if (search) {
    queryParams.append("search", search.toString());
  }
  if (sortField && sortOrder) {
    queryParams.append("sortField", sortField);
    queryParams.append("sortOrder", sortOrder);
  }
  if (limit) {
    queryParams.append("limit", limit.toString());
  }

  // Construct the full URL with query parameters
  const url = {
    pathname: "/products?",
    query: queryParams.toString(), // Convert URLSearchParams to a string
  };

  useEffect(() => {
    const fetchData = async () => {
      let fetchParams: FetchParams = {
        page: Number(page) || 1,
        limit: Number(limit) || 8,
        search: search || "",
        sortOrder: "desc", // Always set sortOrder
      };

      // Add sortField parameter if it exists
      if (sortField && sortOrder) {
        fetchParams.sortField = sortField;
      }

      const productsData = await fetchProducts(fetchParams);
      setProducts(productsData.products);
      setTotalPages(productsData.metadata.totalPages);
    };

    fetchData();
  }, [limit, page, search, setProducts, setTotalPages, sortField, sortOrder]);

  if (!products && !totalPages) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="flex text-7xl animate-ping gap-4">
          <AiOutlineLoading3Quarters className="animate-spin" />
          <p>Now Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-20 gap-10">
      <div className="flex justify-center w-full my-6">
        <PaginationModule
          page={Number(page)}
          total={totalPages || 1}
          url={`/products?${url.query}`}
        />
      </div>
      <ul className="flex flex-wrap gap-6 justify-center items-center">
        {products?.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <div className="flex justify-center w-full my-6">
        <PaginationModule
          page={Number(page)}
          total={totalPages || 1}
          url={`${url.pathname}${url.query}`}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
