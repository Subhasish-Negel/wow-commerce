import { Navbar } from "@/components/Navbar/Navbar";
import { Banner } from "@/components/banner/Carousel";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Navbar />
      <Banner />
    </div>
  );
}
