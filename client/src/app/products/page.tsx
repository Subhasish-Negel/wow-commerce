import ProductsPage from "@/components/ProductList/ProductList";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={null}>
      <ProductsPage />
    </Suspense>
  );
};

export default page;
