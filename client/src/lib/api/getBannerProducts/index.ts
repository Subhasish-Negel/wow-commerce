import { BASE_URL } from "@/lib/constant/constant";

export const BannerProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/banner`);
    const data = await response.json();
    return data.images;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
