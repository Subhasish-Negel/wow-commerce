import Image from "next/image";
import Link from "next/link";
import AddtoCart from "@/components/CustomComponents/AddToCartButton";
import { IProduct } from "@/lib/types/products.types";
interface ProductItemProps {
  product: IProduct;
}

function ProductCard({ product }: ProductItemProps) {
  return (
    <div className="w-52 sm:w-72 md:w-80 bg-gray-700 shadow rounded">
      <Link
        // href={`/products/${product.id}`}
        href={`#`}
        className="h-32 sm:h-40 md:h-48 w-full bg-gray-200 flex flex-col justify-between bg-cover bg-center rounded-t"
      >
        <Image
          className="h-full w-full cursor-pointer rounded-t"
          src={product.thumbnail}
          alt={product.title}
          height={300}
          width={300}
          priority
        />
      </Link>
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
