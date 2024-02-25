// Assuming you have a BASE_URL defined elsewhere
import { BASE_URL } from "@/lib/constant/constant";

interface FetchProductsProps {
  page?: number;
  limit?: number;
  search?: string; // Add search parameter
  sortField?: string; // Add sortField parameter
  sortOrder?: "asc" | "desc"; // Add sortOrder parameter
}

export const fetchProducts = async ({
  page,
  limit,
  search,
  sortField,
  sortOrder,
}: FetchProductsProps = {}) => {
  try {
    let url = `${BASE_URL}/search`;

    // Add search parameter to URL if provided
    if (search) {
      url += `?search=${(search)}`;
    }

    // Add pagination parameters to URL if provided
    if (page) {
      url += `${url.includes("?") ? "&" : "?"}page=${page}`;
    }
    if (limit) {
      url += `${url.includes("?") ? "&" : "?"}limit=${limit}`;
    }

    // Add sorting parameters to URL if provided
    if (sortField && sortOrder) {
      url += `${
        url.includes("?") ? "&" : "?"
      }sortField=${sortField}&sortOrder=${sortOrder}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
