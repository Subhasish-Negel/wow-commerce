// "use client";
// import { IProduct } from "@/lib/types/products.types";
// import { MdOutlineAddShoppingCart } from "react-icons/md";
// import { authStore } from "@/lib/Zustand/store";
// import { IUser } from "@/lib/Zustand/constant";
// import { BASE_URL } from "@/lib/constant/constant";
// import toast from "react-hot-toast";
// // import { useCartStore } from "@/lib/zustand/store";

// interface CustomButtonProps {
//   product: IProduct;
// }

// const AddtoCart: React.FC<CustomButtonProps> = ({ product }) => {
//   // const { addItem } = useCartStore();
//   const { userData } = authStore();

//   let payload = {
//     productId: product.id,
//     quantity: 1,
//   };

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     const fetcher = async (
//       url: string,
//       data: { productId: string; quantity: number }
//     ) => {
//       const response: any = await fetch(url, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json", // Set the Content-Type header to application/json
//         },
//         body: JSON.stringify(data), // Convert the data object to a JSON string
//       });

//       if (!response.ok) {
//         const error: any = new Error(
//           "An error occurred while registering the user"
//         );
//         // Attach extra info to the error object.
//         error.info = await response.json();
//         error.status = response.status;
//         error.message = "An error occurred while registering the user";
//         throw error;
//       }

//       return response.json();
//     };

//     try {
//       const data = await fetcher(`${BASE_URL}/cart`, payload);
//       toast.success(data.message);
//     } catch (error: any) {
//       if (error.status === 400) {
//         toast.error(error.info.message);
//       } else {
//         toast.error("Server is Broken. Please Try Again");
//       }
//     }
//   };
//   return (
//     <button
//       onClick={(e) => onSubmit}
//       className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 mt-4 w-full flex items-center justify-center hover:scale-[1.03] active:scale-[.97] active:duration-75 transition-all ease-in-out"
//       // onClick={() => addItem(product)}
//     >
//       Add to order <MdOutlineAddShoppingCart className=" text-2xl mx-2" />
//     </button>
//   );
// };

// export default AddtoCart;
