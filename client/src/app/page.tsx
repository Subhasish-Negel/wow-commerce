import { NavbarDemo } from "@/components/Navbar/Navbar";
import { Banner } from "@/components/banner/Carousel";

export default function Home() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <NavbarDemo />
      <Banner />
    </div>
  );
}
