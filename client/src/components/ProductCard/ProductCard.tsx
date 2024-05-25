import { useRouter } from "next/navigation";
import Link from "next/link";
// import AddtoCart from "@/components/CustomComponents/AddToCartButton";
import { IProduct } from "@/lib/types/products.types";
import { ProductCardSlider } from "@/components/ProductCard/Product-Card-Slider";
import { BASE_URL } from "@/lib/constant/constant";
import toast from "react-hot-toast";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { authStore } from "@/lib/Zustand/store";
interface ProductItemProps {
  product: IProduct;
}

function ProductCard({ product }: ProductItemProps) {
  const router = useRouter();
  let payload = {
    productId: product.id,
    quantity: 1,
  };
  const addToCart = async () => {
    const fetcher = async (
      url: string,
      data: { productId: string; quantity: number }
    ) => {
      const response: any = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to application/json
        },
        body: JSON.stringify(data), // Convert the data object to a JSON string
      });

      if (!response.ok) {
        const error: any = new Error(
          "An error occurred while registering the user"
        );
        // Attach extra info to the error object.
        error.info = await response.json();
        error.status = response.status;
        error.message = "An error occurred while registering the user";
        throw error;
      }

      return response.json();
    };

    try {
      await fetcher(`${BASE_URL}/cart`, payload);
      toast.success(`${product.title} added to your cart`);
      // setTimeout(() => {
      //   router.refresh();
      // }, 2000);

      authStore.getState().fetchCart();
    } catch (error: any) {
      if (error.status === 400) {
        toast.error(error.info.message);
      } else {
        toast.error("Server is Broken. Please Try Again");
      }
    }
  };

  return (
    <div className="flex flex-col w-52 sm:w-72 md:w-80 bg-[#18181b] shadow rounded">
      <Link href={`/products/${product.id}`}>
        <ProductCardSlider product={product} />
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
        <button
          onClick={addToCart}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 mt-4 w-full flex items-center justify-center hover:scale-[1.03] active:scale-[.97] active:duration-75 transition-all ease-in-out"
          // onClick={() => addItem(product)}
        >
          Add to order <MdOutlineAddShoppingCart className=" text-2xl mx-2" />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
