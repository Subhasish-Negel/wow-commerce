import { NextNav } from "@/components/Navbar/Navbar";
import ProductsPage from "@/components/ProductList/ProductList";
import { Banner } from "@/components/banner/Carousel";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="">
      <NextNav />
      <div className="flex flex-col items-center px-10 sm:px-20">
        <Banner />
        <Suspense fallback={null}>
          <ProductsPage items={8} />
        </Suspense>
      </div>
    </div>
  );
}
