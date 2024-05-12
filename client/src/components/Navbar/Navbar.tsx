"use client";
import React, { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import { authStore } from "@/lib/Zustand/store";
import { useRouter } from "next/navigation";

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
} from "@nextui-org/react";
import { AcmeLogo } from "@/components/Navbar/AcmeLogo";
import { ICart, IUser } from "@/lib/Zustand/constant";
import { logoutUser } from "@/lib/api/logOut";
import AuthProtection from "@/lib/Providers/AuthProtection";
import { FiShoppingCart } from "react-icons/fi";

interface ProtectedUserProps {
  offer?: boolean;
}

export function Nav(props: ProtectedUserProps) {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 4;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <AuthProtection>
      <div className="relative w-full flex flex-col items-center justify-center">
        <NextNavComponent />
        {"offer" in props && (
          <span className="z-10 hidden md:block mt-2 h-[28px] w-full text-center bg-black/90 text-white text-pretty py-1 text-sm">
            FREE SHIPPING OVER <b>₹788/-</b>
          </span>
        )}
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={20}
          toastOptions={{
            duration: 2000,
          }}
        />
      </div>
    </AuthProtection>
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
  ];
  const router = useRouter();

  const {
    isAuthenticated,
    checkAuthStatus,
    userData,
    fetchUserData,
    fetchCart,
    cart,
  } = authStore();

  const handleLogout = async () => {
    await logoutUser();
  };

  useEffect(() => {
    fetchUserData();
    checkAuthStatus();
    fetchCart();
  }, [checkAuthStatus, fetchCart, fetchUserData]);

  console.log(cart as ICart);

  return (
    <Navbar>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent
        className="sm:hidden pr-3 cursor-pointer"
        onClick={() => router.push("/")}
        justify="center"
      >
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">WoW</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4 cursor-pointer"
        onClick={() => router.push("/")}
        justify="center"
      >
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

      <NavbarContent as="div" justify="end" className="space-x-2">
        <div className="relative cursor-pointer">
          {isAuthenticated && (
            <>
              {(cart as ICart).cartItems &&
                (cart as ICart).cartItems.length > 0 && (
                  <div className="t-0 absolute left-3">
                    <p className="flex size-4 items-center justify-center rounded-full bg-red-600 p-2 text-xs text-gray-50">
                      {(cart as ICart).cartItems.length}
                    </p>
                  </div>
                )}
              <FiShoppingCart className="mt-2 size-6" />
            </>
          )}
        </div>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {isAuthenticated ? (
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
                <p className="size-8 flex items-center justify-center bg-[#1f2937] rounded-full cursor-pointer">
                  {(userData as IUser)?.name
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
            {isAuthenticated ? (
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

            <DropdownItem key="settings" onClick={() => router.push("/user")}>
              My Account
            </DropdownItem>
            <DropdownItem key="system">Settings</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="contact_us">Contact Us</DropdownItem>
            {isAuthenticated ? (
              <DropdownItem onClick={handleLogout} key="logout" color="danger">
                Log Out
              </DropdownItem>
            ) : (
              <DropdownItem href="/login" key="login" color="success">
                Log in
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={index === 2 ? "warning" : "foreground"}
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        {isAuthenticated ? (
          <NavbarMenuItem key="logout" className="cursor-pointer">
            <Link onClick={handleLogout} color="danger">
              Log Out
            </Link>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem key="login">
            <Link href="/login" color="success">
              Login
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
