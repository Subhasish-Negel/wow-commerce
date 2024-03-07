"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SortField = "price" | "rating" | "discountPercentage";
type SortOrder = "asc" | "desc";

const SortingComponent = () => {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  // const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const queryParams = new URLSearchParams();

  // Add parameters conditionally
  if (search) {
    queryParams.append("search", search.toString());
  }

  if (limit) {
    queryParams.append("limit", limit.toString());
  }

  // if (page) {
  //   queryParams.append("page", page.toString());
  // }

  // Construct the full URL with query parameters

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = event.target.value.split("_") as [
      SortField,
      SortOrder
    ];

    queryParams.set("sort", field);
    queryParams.set("by", order);

    const url = {
      pathname: `${pathName}?`,
      query: queryParams.toString(), // Convert URLSearchParams to a string
    };

    // const url = new URL(window.location.href);
    // url.searchParams.set("sort", field);
    // url.searchParams.set("by", order);
    // router.push(`${url.pathname}${url.query}`);
    window.location.href = `${url.pathname}${url.query}`;
  };

  return (
    <div className="w-full max-w-xs mt-5">
      <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
        Sort by
      </label>
      <select
        id="sort"
        name="sort"
        // value={}
        className="mt-1 block w-full py-2 px-3 border  rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={handleSortChange}
      >
        <option value="" disabled selected>
          Sort by
        </option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="rating_asc">Rating: Low to High</option>
        <option value="rating_desc">Rating: High to Low</option>
        <option value="discountPercentage_asc">Discount: Low to High</option>
        <option value="discountPercentage_desc">Discount: High to Low</option>
      </select>
    </div>
  );
};

export default SortingComponent;
