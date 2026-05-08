import { useMemo, useState } from "react";

export const usePagination = (items = [], pageSize = 6) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  return { currentPage, setCurrentPage, totalPages, paginatedItems };
};
