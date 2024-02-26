import { usePathname, useRouter } from "next/navigation"; // Import useSearchParams
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { BiSearchAlt } from "react-icons/bi";

const SearchBar: React.FC = () => {
  const router = useRouter(); // Use useRouter instead of useSearchParams
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    // Update the URL with the new search parameter
    router.push(`${pathname}?search=${searchTerm}&page=1`);
  };

  return (
    <div className="flex justify-center items-center">
      <Input
        className="w-full sm:w-5/6 md:w-2/3 xl:w-1/2 my-6"
        radius="sm"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        endContent={
          <button
            onClick={handleSearch}
            className="bg-black/50 hover:bg-black p-2 rounded-full"
          >
            <BiSearchAlt className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          </button>
        }
      />
    </div>
  );
};

export default SearchBar;
