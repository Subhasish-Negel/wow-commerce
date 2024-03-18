import { Nav } from "@/components/Navbar/Navbar";
import ProductsPage from "@/components/ProductList/ProductList";
import SortingComponent from "@/components/Products-Sorting/Sorting";
import SearchBar from "@/components/SearchBar/Search";
import { Suspense } from "react";

const page = () => {
  return (
    <main className="px-10 sm:px-20">
      <Nav />
      <Suspense fallback={null}>
        <SearchBar />
        <SortingComponent />
        <ProductsPage items={20} pagination={true} />
      </Suspense>
    </main>
  );
};

export default page;
