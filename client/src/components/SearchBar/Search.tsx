import { usePathname, useRouter } from "next/navigation"; // Import useSearchParams
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { BiSearchAlt } from "react-icons/bi";
import { SearchList } from "@/lib/api/getForSearch";
import Link from "next/link";
import Image from "next/image";

interface Suggestion {
  id: number;
  title: string;
  brand: string;
  thumbnail: string;
  category: string;
  description: string;
}

const SearchBar = () => {
  const pathname = usePathname();
  const [activeSearch, setActiveSearch] = useState<Suggestion[]>([]);
  const [products, setProducts] = useState<Suggestion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isInputFocused, setInputFocus] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await SearchList();
      setProducts(productsData);
    };
    fetchData();
  }, [setProducts]);

  const handleOnBlur = () => {
    setTimeout(() => {
      setInputFocus(false);
    }, 150);
  };

  const hadleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    setSearchTerm(search);

    if (search.length === 0) {
      setActiveSearch([]);
      return false;
    }

    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
    );

    setActiveSearch(filteredProducts);
  };

  return (
    <div className="z-50 relative group w-full sm:w-5/6 md:w-2/3 xl:w-1/2 mx-auto py-6">
      <Input
        radius="full"
        size="sm"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => hadleSearch(e)}
        onFocus={() => setInputFocus(true)}
        onBlur={handleOnBlur}
        endContent={
          <Link href={`${pathname}?search=${searchTerm}&page=1`}>
            <button className="bg-black/40 hover:bg-black p-2 rounded-full">
              <BiSearchAlt className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            </button>
          </Link>
        }
      />
      {searchTerm.length > 0 && (
        <div
          className={`h-fit max-h-[350px] overflow-y-scroll absolute top-20 bg-[#161618] text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex-col ${
            !isInputFocused || activeSearch.length === 0 ? "hidden" : "flex"
          }`}
        >
          {activeSearch.map((suggestion) => (
            <Link
              className="hover:bg-slate-700 p-2 text-lg font-semibold rounded-2xl flex"
              key={suggestion.id}
              href={`/products/${suggestion.id}`}
            >
              <Image
                className="size-14 mx-2 rounded-md"
                src={suggestion.thumbnail}
                alt={suggestion.title}
                height={80}
                width={80}
              />
              <span>{suggestion.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
