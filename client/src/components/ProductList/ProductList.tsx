"use client";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api/getProducts";
import ProductCard from "@/components/ProductCard/ProductCard";
import { IProduct } from "@/lib/types/products.types";
import PaginationModule from "@/components/Pagination/Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SearchBar from "@/components/SearchBar/Search";
import SortingComponent from "@/components/Products-Sorting/Sorting";

interface FetchParams {
  page?: number;
  limit?: number;
  search?: string;
  sortField?: string; // Optional sort field
  sortOrder?: string; // Optional sort order
}

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[] | null>();
  const [totalPages, setTotalPages] = useState();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const sortField = searchParams.get("sort");
  const sortOrder = searchParams.get("by");
  const queryParams = new URLSearchParams();

  // Add parameters conditionally
  if (search) {
    queryParams.append("search", search.toString());
  }
  if (sortField && sortOrder) {
    queryParams.append("sort", sortField);
    queryParams.append("by", sortOrder);
  }
  if (limit) {
    queryParams.append("limit", limit.toString());
  }

  // Construct the full URL with query parameters
  const url = {
    pathname: `${pathName}?`,
    query: queryParams.toString(), // Convert URLSearchParams to a string
  };

  useEffect(() => {
    const fetchData = async () => {
      let fetchParams: FetchParams = {
        page: Number(page) || 1,
        limit: Number(limit) || 4,
        search: search || "",
        sortOrder: sortOrder || "desc", // Always set sortOrder
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
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex text-7xl gap-4">
          <AiOutlineLoading3Quarters className="animate-spin" />
          <p>Now Loading...</p>
        </div>
        <p className="text-xl mt-10">
          If still loading after 1 min, Please Reload the Page
        </p>
      </div>
    );
  }

  console.log(url);

  return (
    <div className="gap-10">
      <SearchBar />
      <SortingComponent />
      <div className="flex justify-center w-full my-6">
        <PaginationModule
          page={Number(page)}
          total={totalPages || 1}
          url={`${url.pathname}${url.query}`}
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
