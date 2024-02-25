import Image from "next/image";
import Link from "next/link";
import AddtoCart from "@/components/CustomComponents/AddToCartButton";
import { IProduct } from "@/lib/types/products.types";
import { ProductCardSlider } from "@/components/ProductCard/Product-Card-Slider";
interface ProductItemProps {
  product: IProduct;
}

function ProductCard({ product }: ProductItemProps) {
  return (
    <div className="flex flex-col w-52 sm:w-72 md:w-80 bg-[#18181b] shadow rounded">
      <ProductCardSlider product={product} />
      <div className="p-4 flex flex-col items-center">
        <Link
          className="border-b border-transparent hover:border-b-white h-[40px]"
          href={`/products/${product.id}`}
        >
          {product.title}
        </Link>
        <h1 className="text-gray-200 text-center mt-1"></h1>{" "}
        <p className="text-center text-gray-200 mt-1">₹{product.price}</p>{" "}
        <AddtoCart product={product} />
      </div>
    </div>
  );
}

export default ProductCard;
