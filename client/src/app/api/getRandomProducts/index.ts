import { BASE_URL } from "@/lib/constant/constant";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/product/random`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
