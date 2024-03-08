"use client";
import React, { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { authStore } from "@/lib/Zustand/store";
import { checkCookieExists, fetchUserData } from "@/lib/api/FetchUser";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "@/components/Navbar/AcmeLogo";
import { IUser } from "@/lib/Zustand/constant";
import { logoutUser } from "@/lib/api/logOut";

export function NextNav() {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 4;
  const { userData, setUserData } = authStore();

  useEffect(() => {
    const fetchUser = async () => {
      const objectLength = Object.keys(userData).length;

      if (objectLength < 1) {
        if (checkCookieExists("jwtoken")) {
          const user = await fetchUserData();
          setUserData(user);
        }
      }
    };

    fetchUser();
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [setUserData, toasts, userData]);

  console.log(userData);

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      <NextNavComponent />
      <span className=" z-10 hidden md:block mt-2 h-[28px] w-full text-center bg-black/90 text-white text-pretty py-1 text-sm">
        FREE SHIPPING OVER <b>₹788/-</b>
      </span>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={20}
        toastOptions={{
          duration: 2000,
        }}
      />
    </div>
  );
}
export default function NextNavComponent() {
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  const token = checkCookieExists("jwtoken");
  const { userData } = authStore();
  const objectLength = Object.keys(userData).length;
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">WoW</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Brands
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Category
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="warning" href="/products">
            All Products
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {objectLength > 1 ? (
              (userData as IUser)?.image ? (
                <Avatar
                  src={(userData as IUser)?.image}
                  size="sm"
                  alt="user"
                  as="button"
                  className="transition-transform"
                  color="secondary"
                />
              ) : (
                <p className="size-8 flex items-center justify-center bg-[#1f2937] rounded-full">
                  {(userData as IUser).name
                    .split(" ")[0]
                    .charAt(0)
                    .toUpperCase()}
                </p>
              )
            ) : (
              <Avatar
                size="sm"
                alt="user"
                as="button"
                className="transition-transform"
                color="secondary"
              />
            )}
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {objectLength > 1 ? (
              <DropdownItem
                disableAnimation
                key="profile"
                className="h-14 gap-2"
              >
                <p className="font-semibold">Signed in as:</p>
                <p className="font-bold">{(userData as IUser)?.name}</p>
              </DropdownItem>
            ) : (
              <DropdownItem className="hidden" />
            )}

            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            {token ? (
              <DropdownItem onClick={handleLogout} key="logout" color="danger">
                Log Out
              </DropdownItem>
            ) : (
              <DropdownItem href="/login" key="login" color="success">
                Log in
              </DropdownItem>
            )}
            {/* <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem> */}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

// function NavbarTemplate({ className }: { className?: string }) {
//   const [active, setActive] = useState<string | null>(null);
//   const [products, setProducts] = useState<IProduct[] | null>(null);

//   function getFirstFourWords(sentence: string) {
//     const wordsArray = sentence.split(" ");
//     const firstFourWords = wordsArray.slice(0, 2);
//     return firstFourWords.join(" ");
//   }

//   function smallDesc(sentence: string) {
//     const wordsArray = sentence.split(" ");
//     const firstFourWords = wordsArray.slice(0, 6);
//     return firstFourWords.join(" ");
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       const productsData = await fetchRandomProducts();
//       setProducts(productsData);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div
//       className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
//     >
//       <Menu setActive={setActive}>
//         <MenuItem setActive={setActive} active={active} item="Services">
//           <div className="flex flex-col space-y-1 text-sm">
//             <HoveredLink className="bg-stone-800" href="/web-dev">
//               Web Development
//             </HoveredLink>
//             <HoveredLink href="/interface-design">Interface Design</HoveredLink>
//             <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
//             <HoveredLink href="/branding">Branding</HoveredLink>
//           </div>
//         </MenuItem>
//         <MenuItem setActive={setActive} active={active} item="Hot Deals🔥">
//           <div className="text-sm grid grid-cols-2 gap-6 p-4">
//             {products?.map((product) => (
//               <ProductItem
//                 key={product.id}
//                 title={getFirstFourWords(product.title)}
//                 href={product.thumbnail}
//                 src={product.thumbnail}
//                 price={`₹ ${product.price}`}
//                 description={`${smallDesc(product.description)}...`}
//               />
//             ))}
//           </div>
//         </MenuItem>
//         <MenuItem setActive={setActive} active={active} item="Pricing">
//           <div className="flex flex-col space-y-1 text-sm">
//             <HoveredLink href="/hobby">Hobby</HoveredLink>
//             <HoveredLink href="/individual">Individual</HoveredLink>
//             <HoveredLink href="/team">Team</HoveredLink>
//             <HoveredLink href="/enterprise">Enterprise</HoveredLink>
//           </div>
//         </MenuItem>
//         <Link href="/products">All Products</Link>
//         <ProfileDropdownShadcn />
//       </Menu>
//     </div>
//   );
// }
