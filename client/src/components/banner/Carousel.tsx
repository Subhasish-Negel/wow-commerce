"use client";
import Autoplay from "embla-carousel-autoplay";
import { BannerProducts } from "@/lib/api/getBannerProducts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IBanner } from "@/lib/types/banner.types";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Banner() {
  const [products, setProducts] = useState<IBanner[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const productsData = await BannerProducts();
      setProducts(productsData);
    };
    fetchData();
  }, []);

  return (
    <Carousel
      className="w-4/6"
      plugins={[
        Autoplay({
          delay: 2500,
          stopOnInteraction: false,
          stopOnHover: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {products?.map((product) => (
          <CarouselItem key={product.id}>
            <div className="p-1 flex items-center justify-center">
              <Image
                src={product.image}
                alt="carousel item"
                width={500}
                height={500}
                priority
                className="min-w-full h-[300px] sm:h-[400px] md:h-[600px] rounded-md shadow-2xl"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-8 opacity-85"/>
      <CarouselNext className="right-8 opacity-85"/>
    </Carousel>
  );
}
