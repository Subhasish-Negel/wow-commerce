export const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/product/random");
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
