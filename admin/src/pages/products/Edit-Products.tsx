"use client";
import Sidebar from "@/components/custom/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { authStore } from "@/lib/Zustand/store";

export default function EditProducts() {
  const {
    isAuthenticated,
    checkAuthStatus,
    userData,
    fetchUserData,
    fetchCart,
    cart,
    fetchProducts,
    products,
  } = authStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);

  return (
    <Sidebar currentPage="Products">
      <main className="flex flex-1 flex-col gap-4 md:gap-8 md:p-6 overflow-y-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="grid gap-4">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="rounded-lg object-cover w-full aspect-square"
                />
                <div className="grid gap-2">
                  <div className="font-bold text-lg">{product.title}</div>
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
