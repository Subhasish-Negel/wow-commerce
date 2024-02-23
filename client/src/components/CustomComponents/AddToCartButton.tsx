"use client";
import { IProduct } from "@/lib/types/products.types";
import { MdOutlineAddShoppingCart } from "react-icons/md";
// import { useCartStore } from "@/lib/zustand/store";

interface CustomButtonProps {
  product: IProduct;
}

const AddtoCart: React.FC<CustomButtonProps> = ({ product }) => {
  // const { addItem } = useCartStore();
  return (
    <button
      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 mt-4 w-full flex items-center justify-center hover:scale-[1.03] active:scale-[.97] active:duration-75 transition-all ease-in-out"
      // onClick={() => addItem(product)}
    >
      Add to order <MdOutlineAddShoppingCart className=" text-2xl mx-2" />
    </button>
  );
};

export default AddtoCart;
