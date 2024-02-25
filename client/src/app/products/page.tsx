import ProductsPage from "@/components/ProductList/ProductList";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <ProductsPage />
    </Suspense>
  );
};

export default page;
