"use client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { IProduct } from "@/lib/types/products.types";
import Link from "next/link";

interface ProductItemProps {
  product: IProduct;
}

export function ProductCardSlider({ product }: ProductItemProps) {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={
        [
          // Autoplay({
          //   delay: 2500,
          //   stopOnInteraction: false,
          //   stopOnHover: true,
          //   stopOnMouseEnter: true,
          // }),
        ]
      }
    >
      <CarouselContent>
        {product.images.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1 flex items-center justify-center">
              <Link
                // href={`/products/${product.id}`}
                href={`#`}
                className="h-32 sm:h-40 md:h-48 w-52 sm:w-72 md:w-80 bg-gray-200 flex flex-col justify-between bg-cover bg-center rounded-t"
              >
                <Image
                  className="h-full w-full cursor-pointer rounded-t"
                  src={item}
                  alt="slider item"
                  height={300}
                  width={300}
                  priority
                />
              </Link>
              {/* <Image
                src={item}
                alt="carousel item"
                width={100}
                height={100}
                priority
                className="min-w-full h-[300px] sm:h-[400px] md:h-[600px] rounded-md shadow-2xl"
              /> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 size-5 bg-black/45 border-transparent" />
      <CarouselNext className="right-4 size-5 bg-black/45 border-transparent" />
    </Carousel>
  );
}
