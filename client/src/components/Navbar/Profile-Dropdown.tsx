// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";
// import { BASE_URL } from "@/lib/constant/constant";
// import { checkCookieExists } from "@/lib/api/FetchUser";
// import Link from "next/link";
// import { authStore } from "@/lib/Zustand/store";
// import { IUser } from "@/lib/Zustand/constant";
// import Image from "next/image";
// import { LuUserCircle2 } from "react-icons/lu";

// const token = checkCookieExists("jwtoken");

// const ProfileDropdown = () => {
//   const { userData } = authStore();
//   const objectLength = Object.keys(userData).length;
//   const handleLogout = async () => {
//     await logoutUser();
//   };
//   console.log(userData);
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger className="outline-none">
//         {objectLength > 1 ? (
//           (userData as IUser)?.image ? (
//             <Image
//               src={(userData as IUser)?.image}
//               width={40}
//               height={40}
//               className="size-9 rounded-full"
//               alt="user"
//             />
//           ) : (
//             <p className="size-9 flex items-center justify-center bg-black/50 rounded-full">
//               {(userData as IUser).name.split(" ")[0].charAt(0).toUpperCase()}
//             </p>
//           )
//         ) : (
//           <LuUserCircle2 className="size-9 bg-black/50 rounded-full" />
//         )}
//       </DropdownMenuTrigger>
//       <DropdownMenuContent>
//         <DropdownMenuLabel>My Account</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem>Profile</DropdownMenuItem>
//         <DropdownMenuItem>Billing</DropdownMenuItem>
//         <DropdownMenuItem>Team</DropdownMenuItem>
//         {token ? (
//           <Button
//             onClick={handleLogout}
//             className="mx-auto p-1 my-2 w-3/4 flex rounded-md bg-red-600"
//             variant="destructive"
//           >
//             Logout
//           </Button>
//         ) : (
//           <Button
//             asChild
//             className="mx-auto p-1 my-2 w-3/4 flex rounded-md bg-green-600 hover:bg-green-700 text-white"
//           >
//             <Link href="/login">Login</Link>
//           </Button>
//         )}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default ProfileDropdown;
