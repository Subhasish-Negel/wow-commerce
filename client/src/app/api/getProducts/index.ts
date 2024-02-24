import { BASE_URL } from "@/lib/constant/constant";
interface FetchProductsProps {
  page?: number;
  limit?: number;
}
export const fetchProducts = async ({
  page,
  limit,
}: FetchProductsProps = {}) => {
  try {
    let url = `${BASE_URL}/products`;

    if (page) {
      url += `?page=${page}`;
    }

    if (limit) {
      if (url.includes("?")) {
        url += `&limit=${limit}`;
      } else {
        url += `?limit=${limit}`;
      }
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
