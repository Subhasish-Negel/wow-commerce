import { useRouter } from "next/navigation";
import { Pagination } from "@nextui-org/react";

interface PaginationProps {
  page: number;
  total: number;
  url: string;
}

export default function PaginationModule({
  page,
  total,
  url,
}: PaginationProps) {
  const router = useRouter();
  console.log(url);
  return (
    <Pagination
      initialPage={1}
      isCompact
      showControls
      total={total}
      page={page}
      onChange={(page: number) => {
        router.push(`${url}&page=${page}`);
      }}
    />
  );
}
