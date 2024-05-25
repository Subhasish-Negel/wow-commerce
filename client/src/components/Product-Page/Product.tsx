"use client";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { JSX, SVGProps, useEffect, useState } from "react";
import { BASE_URL } from "@/lib/constant/constant";
import { useParams } from "next/navigation";

interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export default function Product() {
  const params = useParams<{ productID: string }>();
  const { productID } = params;
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      const fetcher = async (url: string) => {
        const response: any = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const error: any = new Error(
            "An error occurred while fetching the product"
          );
          error.info = await response.json();
          error.status = response.status;
          error.message = "An error occurred while fetching the product";
          throw error;
        }

        return response.json();
      };

      try {
        if (productID) {
          const data = await fetcher(`${BASE_URL}/product/${productID}`);
          setProduct(data.product);
        }
      } catch (error: any) {
        if (error.status === 400) {
          setError(error.info.message);
        } else {
          setError("Server is Broken. Please Try Again");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productID]);

  useEffect(() => {
    setMainImage((product as IProduct)?.thumbnail);
  }, [product]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">{error}</div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center">
        No product found
      </div>
    );
  }

  const handleImageClick = (image: any) => {
    setMainImage(image);
  };

  console.log(product.images);
  return (
    <div className="grid md:grid-cols-2 items-start max-w-3xl px-4 mx-auto py-6 gap-6 md:gap-12 h-screen">
      <div className="grid gap-4 items-start">
        <div className="flex items-start">
          <div className="grid gap-4">
            <div className="gap-2">
              <h1 className="font-bold text-2xl sm:text-3xl">
                {(product as IProduct).title}
              </h1>
              <div className="text-sm text-gray-400 font-bold">{`${
                (product as IProduct).brand
              }`}</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-4xl font-bold">{`$ ${
          (product as IProduct).price
        }`}</div>
        <form className="grid gap-4 md:gap-10">
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="quantity">
              Quantity
            </Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="lg">Add to cart</Button>
        </form>
        <Separator className="border-gray-200 dark:border-gray-800" />
        <div className="grid gap-4 text-sm leading-loose">
          <p>{(product as IProduct).description}</p>
        </div>
      </div>
      <div className="grid gap-3 items-start">
        <div className="hidden md:flex gap-4 items-start">
          {(product as IProduct)?.images?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(image)}
              className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50"
            >
              <Image
                alt={`Preview thumbnail ${index + 1}`}
                className="aspect-square object-cover"
                height={100}
                src={image}
                width={100}
              />
              <span className="sr-only">View Image {index + 1}</span>
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:gap-10">
          <Image
            alt="Product Image"
            className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height={600}
            src={mainImage as string}
            width={600}
          />
          <div className="flex md:hidden items-start">
            {(product as IProduct).images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(image)}
                className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50"
              >
                <Image
                  alt={`Preview thumbnail ${index + 1}`}
                  className="aspect-square object-cover"
                  height={100}
                  src={image}
                  width={100}
                />
                <span className="sr-only">View Image {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
