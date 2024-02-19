"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { IProduct } from "@/lib/types/products.types";
import { fetchProducts } from "@/app/api/getRandomProducts";
export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2 z-50" />
      <span className=" z-10 hidden md:block mt-2 h-[28px] w-full text-center bg-black/90 text-white text-pretty py-1 text-sm">
        FREE SHIPPING OVER <b>₹788/-</b>
      </span>
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
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
      const productsData = await fetchProducts();
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
      </Menu>
    </div>
  );
}
