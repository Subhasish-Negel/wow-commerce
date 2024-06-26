"use client";
import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/custom/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AddProduct() {
  const [uploadedImages, setUploadedImages] = useState<File[] | []>([]);
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });

  const handleImageUpload = (index: number, file: File) => {
    setUploadedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = file;
      return updatedImages;
    });
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailImage(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !newProduct.name ||
      !newProduct.description ||
      newProduct.price <= 0 ||
      newProduct.quantity <= 0 ||
      uploadedImages.length !== 4 ||
      !thumbnailImage
    ) {
      // Handle validation errors
      return;
    }

    // Submit the new product details
    console.log("New product details:", newProduct);
    console.log("Uploaded images:", uploadedImages);
    console.log("Thumbnail image:", thumbnailImage);

    // Reset the form
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      quantity: 0,
    });
    setUploadedImages([]);
    setThumbnailImage(null);
  };

  return (
    <Sidebar currentPage="Add Product">
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
        <div className="w-full max-w-2xl space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Add New Product
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6" method="POST">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="images"
              >
                Product Images
              </label>
              <div className="mt-1 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[0, 1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="relative flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 dark:border-gray-600"
                  >
                    <div className="space-y-1 text-center">
                      <div className="relative">
                        {uploadedImages[index] ? (
                          <Image
                            alt={`Product Image ${index + 1}`}
                            className="mx-auto h-24 w-24 rounded-md object-cover"
                            height={256}
                            id={`product-image-${index + 1}`}
                            src={URL.createObjectURL(uploadedImages[index])}
                            style={{
                              aspectRatio: "256/256",
                              objectFit: "cover",
                            }}
                            width={256}
                          />
                        ) : (
                          <Image
                            alt={`Product Image ${index + 1}`}
                            className="mx-auto h-24 w-24 rounded-md object-cover bg-gray-200"
                            height={256}
                            id={`product-image-${index + 1}`}
                            src="/picture.svg"
                            style={{
                              aspectRatio: "256/256",
                              objectFit: "cover",
                            }}
                            width={256}
                          />
                        )}
                        <button
                          className="absolute top-0 right-0 -mt-2 -mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
                          type="button"
                          onClick={() => {
                            const updatedImages = [...uploadedImages];
                            //@ts-ignore
                            updatedImages[index] = null;
                            setUploadedImages(updatedImages);
                          }}
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex text-sm text-gray-600 dark:text-gray-200">
                        <label
                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 dark:bg-gray-950 dark:text-indigo-400 dark:hover:text-indigo-300"
                          htmlFor={`image-${index + 1}`}
                        >
                          <span>Upload Image</span>
                          <input
                            className="sr-only"
                            id={`image-${index + 1}`}
                            name="images[]"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(index, file);
                              }
                            }}
                            required
                            type="file"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="thumbnail"
              >
                Product Thumbnail
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 dark:border-gray-600">
                <div className="space-y-1 text-center">
                  <div className="relative">
                    {thumbnailImage ? (
                      <Image
                        alt="Thumbnail"
                        className="mx-auto h-48 w-full rounded-md object-cover"
                        height={384}
                        id="thumbnail"
                        src={URL.createObjectURL(thumbnailImage)}
                        style={{
                          aspectRatio: "1/1",
                          objectFit: "cover",
                        }}
                        width={384}
                      />
                    ) : (
                      <Image
                        alt="Thumbnail"
                        className="mx-auto h-48 w-48 rounded-md object-cover bg-gray-200"
                        height={384}
                        id="thumbnail"
                        src="/picture.svg"
                        style={{
                          aspectRatio: "1/1",
                          objectFit: "cover",
                        }}
                        width={384}
                      />
                    )}
                    <button
                      className="absolute top-0 right-0 -mt-2 -mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
                      type="button"
                      onClick={() => setThumbnailImage(null)}
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <Label
                      className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 dark:bg-gray-950 dark:text-indigo-400 dark:hover:text-indigo-300"
                      htmlFor="thumbnail"
                    >
                      <Input
                        id="thumbnail"
                        name="thumbnail"
                        onChange={handleThumbnailUpload}
                        required
                        type="file"
                      />
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="title"
              >
                Product Title
              </label>
              <div className="mt-1">
                <input
                  autoComplete="title"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
                  id="title"
                  name="title"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  required
                  type="text"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="description"
              >
                Product Description
              </label>
              <div className="mt-1">
                <textarea
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
                  id="description"
                  name="description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter product description..."
                  required
                  rows={3}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="price"
              >
                Product Price
              </label>
              <div className="mt-1">
                <input
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                  required
                  type="number"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="quantity"
              >
                Product Quantity
              </label>
              <div className="mt-1">
                <input
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-400"
                  id="quantity"
                  name="quantity"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      quantity: parseInt(e.target.value),
                    })
                  }
                  required
                  type="number"
                />
              </div>
            </div>
            <div>
              <button
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400"
                type="submit"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Sidebar>
  );
}

export default AddProduct;

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
