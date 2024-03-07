"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { IProduct } from "@/lib/types/products.types";
import { fetchRandomProducts } from "@/lib/api/getRandomProducts";
import Link from "next/link";
import ProfileDropdown from "@/components/Navbar/Profile-Dropdown";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

export function Navbar() {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 4;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <div className="relative w-full flex items-center justify-center">
      <NavbarTemplate className="top-2 z-50" />
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

function NavbarTemplate({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [products, setProducts] = useState<IProduct[] | null>(null);

  function getFirstFourWords(sentence: string) {
    const wordsArray = sentence.split(" ");
    const firstFourWords = wordsArray.slice(0, 2);
    return firstFourWords.join(" ");
  }

  function smallDesc(sentence: string) {
    const wordsArray = sentence.split(" ");
    const firstFourWords = wordsArray.slice(0, 6);
    return firstFourWords.join(" ");
  }

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchRandomProducts();
      setProducts(productsData);
    };
    fetchData();
  }, []);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-1 text-sm">
            <HoveredLink className="bg-stone-800" href="/web-dev">
              Web Development
            </HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Hot Deals🔥">
          <div className="text-sm grid grid-cols-2 gap-6 p-4">
            {products?.map((product) => (
              <ProductItem
                key={product.id}
                title={getFirstFourWords(product.title)}
                href={product.thumbnail}
                src={product.thumbnail}
                price={`₹ ${product.price}`}
                description={`${smallDesc(product.description)}...`}
              />
            ))}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-1 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
        <Link href="/products">All Products</Link>
        <ProfileDropdown />
      </Menu>
    </div>
  );
}
