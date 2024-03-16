// Assuming you have a BASE_URL defined elsewhere
import { BASE_URL } from "@/lib/constant/constant";

interface FetchProductsProps {
  page?: number;
  limit?: number;
  search?: string; // Add search parameter
  sortField?: string; // Add sortField parameter
  sortOrder?: string; // Add sortOrder parameter
}

export const fetchProducts = async ({
  page,
  limit,
  search,
  sortField,
  sortOrder,
}: FetchProductsProps = {}) => {
  try {
    let url = `${BASE_URL}/products`;

    // Add search parameter to URL if provided
    if (search) {
      url += `?search=${search}`;
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



    const response = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error: any = new Error(
        "An error occurred while registering the user"
      );

      // Attach extra info to the error object.
      error.info = await response.json();
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
