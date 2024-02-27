// /products/searchlist

import { BASE_URL } from "@/lib/constant/constant";

export const SearchList = async () => {
  try {
    const response = await fetch(`${BASE_URL}products/searchlist`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
