"use client";
import Sidebar from "@/components/custom/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Image from "next/image";

export default function EditProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Acme Prism T-Shirt",
      description: "Comfortable and stylish t-shirt",
      price: 24.99,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Aqua Filters",
      description: "High-quality water filters",
      price: 19.99,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Zest Juicers",
      description: "Powerful juicing machines",
      price: 79.99,
      image: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Glimmer Lamps",
      description: "Elegant and modern lamps",
      price: 39.99,
      image: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Eco Planters",
      description: "Sustainable plant containers",
      price: 14.99,
      image: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Flexi Wearables",
      description: "Comfortable and flexible wearables",
      price: 59.99,
      image: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Fall Foliage Table Runner",
      description: "Decorative autumn-themed table runner",
      price: 24.99,
      image: "/placeholder.svg",
    },
    {
      id: 8,
      name: "Spiced Apple Cider Syrup",
      description: "Delicious syrup for drinks",
      price: 9.99,
      image: "/placeholder.svg",
    },
  ]);
  return (
    <Sidebar currentPage="Products">
      <main className="flex flex-1 flex-col gap-4 md:gap-8 md:p-6 overflow-y-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="grid gap-4">
                <Image
                  src="/placeholder.svg"
                  alt={product.name}
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-square"
                />
                <div className="grid gap-2">
                  <div className="font-bold text-lg">{product.name}</div>
                  <p className="text-gray-500 dark:text-gray-400">
                    {product.description}
                  </p>
                  <div className="font-semibold">${product.price}</div>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Product
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </Sidebar>
  );
}
