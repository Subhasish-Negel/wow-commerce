export const BannerProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/banner");
    const data = await response.json();
    return data.images;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
